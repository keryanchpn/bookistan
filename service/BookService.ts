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
