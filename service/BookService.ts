import { Book } from "@/model/Book";

export default async function getBooks() {
    const response = await fetch("https://api.books.tristan-renard.com/books");
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
