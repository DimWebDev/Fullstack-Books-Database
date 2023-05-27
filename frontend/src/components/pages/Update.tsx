import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface IBook {
  title: string;
  description: string;
  price: number | null;
  cover: string;
}

export const Update = () => {
  const [book, setBook] = useState<IBook>({
    title: "",
    description: "",
    price: null,
    cover: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];

  const handleClick = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8800/books/${bookId}`,
        book
      );
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="formDiv">
      <h1>Update the book</h1>
      <input
        type="text"
        placeholder="Title"
        name="title"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Description"
        name="description"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Price"
        name="price"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Cover"
        name="cover"
        onChange={handleChange}
      />
      <button className="formButton" onClick={handleClick}>
        Update
      </button>
    </div>
  );
};
