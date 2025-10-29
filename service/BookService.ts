import { Book, BookTheme } from "@/model/Book";

const API_URL = "https://book-api-5ofb.onrender.com";

const THEME_VALUES = new Set(Object.values(BookTheme));
type BookDTO = Omit<Book, "theme"> & { theme: string };

function normalizeTheme(theme: string): BookTheme {
    return THEME_VALUES.has(theme as BookTheme) ? (theme as BookTheme) : BookTheme.Classique;
}

export async function getBooks() {
    const response = await fetch(`${API_URL}/books` );
    if (!response.ok) {
        throw new Error("Failed to fetch books");
    }
    const data: BookDTO[] = await response.json();
    const books = data.map((book) => ({
        id: book.id,
        name: book.name,
        author: book.author,
        editor: book.editor,
        year: book.year,
        read: book.read,
        favorite: book.favorite,
        rating: book.rating,
        cover: book.cover,
        theme: normalizeTheme(book.theme),
    }));
    return books;
}

export async function getBooksWithParams(params: Record<string, string | number | boolean>) {
    const queryParams = new URLSearchParams();
    for (const key in params) {
        queryParams.append(key, params[key].toString());
    }
    const response = await fetch(`${API_URL}/books?${queryParams.toString()}`);
    if (!response.ok) {
        throw new Error("Failed to fetch books with parameters");
    }
    const data: BookDTO[] = await response.json();
    const books = data.map((book) => ({
        id: book.id,
        name: book.name,
        author: book.author,
        editor: book.editor,
        year: book.year,
        read: book.read,
        favorite: book.favorite,
        rating: book.rating,
        cover: book.cover,
        theme: normalizeTheme(book.theme),
    }));
    return books;
}

export type BookSortKey = "title" | "author" | "theme";
export type SortOrder = "asc" | "desc";

export async function getBooksFiltered(
    read: boolean | null,
    favorite: boolean | null,
    sort?: BookSortKey,
    order?: SortOrder,
) {
    const params = new URLSearchParams();
    if (read !== null) {
        params.append("read", read.toString());
    }
    if (favorite !== null) {
        params.append("favorite", favorite.toString());
    }
    if (sort) {
        params.append("sort", sort);
    }
    if (order) {
        params.append("order", order);
    }
    const response = await fetch(`${API_URL}/books?${params.toString()}`);
    if (!response.ok) {
        throw new Error("Failed to fetch filtered books");
    }
    const data: BookDTO[] = await response.json();
    const books = data.map((book) => ({
        id: book.id,
        name: book.name,
        author: book.author,
        editor: book.editor,
        year: book.year,
        read: book.read,
        favorite: book.favorite,
        rating: book.rating,
        cover: book.cover,
        theme: normalizeTheme(book.theme),
    }));
    return books;
}



export async function getBookById(id: number) {
    const response = await fetch(`${API_URL}/books/${id}`);
    if(!response.ok) {
        throw new Error("Book not found")
    }
    const data: BookDTO = await response.json();
    return {
        ...data,
        theme: normalizeTheme(data.theme),
    } as Book;
}

export async function addBook(book: Omit<Book, "id">) {
    const response = await fetch(`${API_URL}/books`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
    });
    if (!response.ok) {
        throw new Error("Failed to add book");
    }
    const data: BookDTO = await response.json();
    return {
        ...data,
        theme: normalizeTheme(data.theme),
    } as Book;
}

export async function updateBook(id: number, updates: Partial<Book>) {
    const response = await fetch(`${API_URL}/books/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
    });
    if (!response.ok) {
        throw new Error("Failed to update book");
    }
    const data: BookDTO = await response.json();
    return {
        ...data,
        theme: normalizeTheme(data.theme),
    } as Book;
}

export async function deleteBook(id: number) {
    const response = await fetch(`${API_URL}/books/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete book");
    }
    return true;
}

export async function getBookComments(bookId: number) {
    const response = await fetch(`${API_URL}/books/${bookId}/notes`);
    if (!response.ok) {
        throw new Error("Failed to fetch book comments");
    }
    const data = await response.json();
    return data;
}

export async function addBookComment(bookId: number, content: string) {
    const response = await fetch(`${API_URL}/books/${bookId}/notes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
    });
    if (!response.ok) {
        throw new Error("Failed to add comment");
    }
    const data = await response.json();
    return data;
}

// Code créé par l'ia pour récupérer un isbn via l'api open library

const OPEN_LIBRARY_ROOT = "https://openlibrary.org";
const OPEN_LIBRARY_COVER_ROOT = "https://covers.openlibrary.org";
type OpenLibraryDoc = {
  isbn?: string[];
  edition_key?: string[];
  author_name?: string[];
};

export async function fetchIsbnByTitleAuthor(
  title: string,
  author?: string,
): Promise<string | null> {
  const trimmedTitle = title.trim();
  const trimmedAuthor = author?.trim();
  if (!trimmedTitle) return null;

  const params = new URLSearchParams({
    title: trimmedTitle,
    fields: "title,isbn,edition_key,author_name",
    limit: "10",
  });
  if (trimmedAuthor) params.append("author", trimmedAuthor);

  const searchRes = await fetch(`${OPEN_LIBRARY_ROOT}/search.json?${params}`);
  if (!searchRes.ok) return null;

  const searchData = await searchRes.json();
  const docs: OpenLibraryDoc[] = searchData?.docs ?? [];

  const pickIsbn = (doc: OpenLibraryDoc) => {
    if (!doc.isbn?.length) return null;
    return doc.isbn.find((code) => code.length === 13) ?? doc.isbn[0];
  };

  const matchingDocs = trimmedAuthor
    ? docs.filter((doc) =>
        (doc.author_name ?? []).some(
          (name) => name.toLowerCase() === trimmedAuthor.toLowerCase(),
        ),
      )
    : docs;

  for (const doc of matchingDocs) {
    const direct = pickIsbn(doc);
    if (direct) return direct;

    for (const editionKey of doc.edition_key ?? []) {
      const editionRes = await fetch(
        `${OPEN_LIBRARY_ROOT}/api/books?bibkeys=OLID:${editionKey}&format=json&jscmd=data`,
      );
      if (!editionRes.ok) continue;

      const editionPayload = await editionRes.json();
      const edition = editionPayload[`OLID:${editionKey}`];
      const fromEdition =
        edition?.identifiers?.isbn_13?.[0] ?? edition?.identifiers?.isbn_10?.[0];
      if (fromEdition) return fromEdition;
    }
  }
  return null;
}

export async function fetchCoverUrlByIsbn(
  isbn: string,
  size: "S" | "M" | "L" = "L",
): Promise<string | null> {
  const trimmedIsbn = isbn.trim();
  if (!trimmedIsbn) {
    return null;
  }

  const url = `${OPEN_LIBRARY_COVER_ROOT}/b/isbn/${encodeURIComponent(trimmedIsbn)}-${size}.jpg?default=false`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    return url;
  } catch {
    return null;
  }
}
