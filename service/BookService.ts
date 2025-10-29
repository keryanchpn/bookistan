import { Book } from "@/model/Book";

const API_URL = "https://book-api-5ofb.onrender.com";

export async function getBooks() {
    const response = await fetch(`${API_URL}/books` );
    if (!response.ok) {
        throw new Error("Failed to fetch books");
    }
    const data = await response.json();
    const books = data.map((book: Book) => ({
        id: book.id,
        name: book.name,
        author: book.author,
        editor: book.editor,
        year: book.year,
        read: book.read,
        favorite: book.favorite,
        rating: book.rating,
        cover: book.cover,
        theme: book.theme,
    }));
    return books;
}

export async function getBookById(id: number) {
    const response = await fetch(`${API_URL}/books/${id}`);
    if(!response.ok) {
        throw new Error("Book not found")
    }
    const data = await response.json();
    return data;
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
    const data = await response.json();
    return data;
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
    const data = await response.json();
    return data;
}
