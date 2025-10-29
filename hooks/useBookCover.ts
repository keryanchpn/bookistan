import { useEffect, useState } from "react";
import { ImageSourcePropType } from "react-native";

import coverNotFound from "@/assets/images/cover-not-found.png";
import { Book } from "@/model/Book";
import { fetchCoverUrlByIsbn, fetchIsbnByTitleAuthor } from "@/service/BookService";

const isbnCache = new Map<string, string>();
const coverUrlCache = new Map<string, string | null>();

type UseBookCoverResult = {
  isbn: string;
  coverSource: ImageSourcePropType;
};

export function useBookCover(book: Book | null): UseBookCoverResult {
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

    if (!book || !isbn) {
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
      } else {
        setCoverSource(coverNotFound);
      }
    };

    setCoverSource(coverNotFound);
    resolveCover();

    return () => {
      cancelled = true;
    };
  }, [book?.id, isbn]);

  return { isbn, coverSource };
}
