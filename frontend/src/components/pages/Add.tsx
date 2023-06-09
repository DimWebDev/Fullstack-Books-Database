import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface IBook {
  title: string;
  description: string;
  price: number | null;
  cover: string;
}

export const Add = () => {
  const [book, setBook] = useState<IBook>({
    title: "",
    description: "",
    price: null,
    cover: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(book);
  };

  const navigate = useNavigate();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8800/books", book);
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="formDiv">
      <h1>Add</h1>
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
        Add
      </button>
    </div>
  );
};
