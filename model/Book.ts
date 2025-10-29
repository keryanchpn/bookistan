export enum BookTheme {
    ContePhilosophique = "Conte philosophique",
    Cyberpunk = "Cyberpunk",
    Fantasy = "Fantasy",
    Philosophique = "Philosophique",
    Classique = "Classique",
    ScienceFiction = "Science-Fiction",
    Dystopie = "Dystopie",
    Thriller = "Thriller",
    Policier = "Policier",
    Romance = "Romance",
    Historique = "Historique",
    YoungAdult = "Young Adult",
    Horreur = "Horreur",
    Aventure = "Aventure",
    Biographie = "Biographie",
    Essai = "Essai",
    Mythologie = "Mythologie",
}

export type Book = {
    id: number;
    name: string;
    author: string;
    editor: string;
    year: number;
    read: boolean;
    favorite: boolean;
    rating: number;
    cover: string;
    theme: BookTheme;
};
