import {Author} from "./author";
export class Book {
    id: String;
    title: String;
    author: Author;

    constructor(title: String, author = new Author()) {
        this.title = title;
        this.author = author;
        this.id = Math.random().toString(36).substring(7);
    }

    static getTestData(authors: Author[]): Book[] {
        return [
            new Book('Pan Tadeus', authors[0]),
            new Book('Nad Niemnem', authors[1]),
            new Book('Kordian', authors[2])
        ]
    }
}