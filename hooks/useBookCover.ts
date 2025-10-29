import { useEffect, useState } from "react";
import { ImageSourcePropType } from "react-native";

import coverNotFound from "@/assets/images/cover-not-found.png";
import { Book } from "@/model/Book";
import { fetchCoverUrlByIsbn, fetchIsbnByTitleAuthor, updateBook } from "@/service/BookService";

const isbnCache = new Map<string, string>();
const coverUrlCache = new Map<string, string | null>();
const coverUpdateCache = new Set<number>();

type UseBookCoverOptions = {
  onCoverPersisted?: (coverUrl: string) => void;
};

type UseBookCoverResult = {
  isbn: string;
  coverSource: ImageSourcePropType;
};

export function useBookCover(book: Book | null, options: UseBookCoverOptions = {}): UseBookCoverResult {
  const { onCoverPersisted } = options;
  const [isbn, setIsbn] = useState<string>("");
  const [coverSource, setCoverSource] = useState<ImageSourcePropType>(coverNotFound);

  useEffect(() => {
    let cancelled = false;

    if (!book) {
      setIsbn("");
      setCoverSource(coverNotFound);
      return () => {
        cancelled = true;
      };
    }

    const cacheKey = `${book.id}:${book.name}:${book.author}`;

    const resolveIsbn = async () => {
      if (isbnCache.has(cacheKey)) {
        if (!cancelled) {
          setIsbn(isbnCache.get(cacheKey) ?? "");
        }
        return;
      }

      try {
        const foundIsbn = await fetchIsbnByTitleAuthor(book.name, book.author);
        if (!cancelled) {
          const resolved = foundIsbn ?? "";
          isbnCache.set(cacheKey, resolved);
          setIsbn(resolved);
        }
      } catch {
        if (!cancelled) {
          isbnCache.set(cacheKey, "");
          setIsbn("");
        }
      }
    };

    setIsbn("");
    resolveIsbn();

    return () => {
      cancelled = true;
    };
  }, [book?.id, book?.name, book?.author]);

  useEffect(() => {
    let cancelled = false;

    if (!book) {
      setCoverSource(coverNotFound);
      return () => {
        cancelled = true;
      };
    }

    if (book.cover) {
      setCoverSource({ uri: book.cover });
      return () => {
        cancelled = true;
      };
    }

    if (!isbn) {
      setCoverSource(coverNotFound);
      return () => {
        cancelled = true;
      };
    }

    const resolveCover = async () => {
      if (coverUrlCache.has(isbn)) {
        if (!cancelled) {
          const cachedUrl = coverUrlCache.get(isbn);
          setCoverSource(cachedUrl ? { uri: cachedUrl } : coverNotFound);
        }
        return;
      }

      const url = await fetchCoverUrlByIsbn(isbn);
      if (cancelled) {
        return;
      }

      coverUrlCache.set(isbn, url);
      if (url) {
        setCoverSource({ uri: url });
        if (!cancelled && book && !coverUpdateCache.has(book.id) && book.cover !== url) {
          try {
            await updateBook(book.id, { cover: url });
            coverUpdateCache.add(book.id);
            onCoverPersisted?.(url);
          } catch (error) {
            console.error("Failed to persist cover url", error);
          }
        }
      } else {
        setCoverSource(coverNotFound);
      }
    };

    setCoverSource(coverNotFound);
    resolveCover();

    return () => {
      cancelled = true;
    };
  }, [book?.id, book?.cover, isbn]);

  return { isbn, coverSource };
}
