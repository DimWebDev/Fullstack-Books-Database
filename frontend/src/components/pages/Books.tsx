import React, { useState, useEffect, MouseEvent } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface IBook {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
}

interface IResponse {
  data: IBook[];
}

export const Books = () => {
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res: IResponse = await axios.get("http://localhost:8800/books");
        console.log(res.data);
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Dimitrios' Book Shop</h1>
      <div className="books">
        {books.map((book: IBook) => (
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt="book cover" />}
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <span>{book.price}</span>
            <button className="delete" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
            <button className="update">
              <Link to={`/update/${book.id}`}>Update</Link>
            </button>
          </div>
        ))}
      </div>
      <button id="addNewBook">
        <Link to="/add">Add new book</Link>
      </button>
    </div>
  );
};
