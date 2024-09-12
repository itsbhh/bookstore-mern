import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useState } from "react";
import { useEffect } from "react";
import { GrLanguage } from "react-icons/gr";
import { FaEdit, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MdOutlineDelete } from "react-icons/md";

const ViewBookDetails = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const [Data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://bookstore-mern-1uaq.onrender.com/api/v1/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, []);
  const { id } = useParams();
  const navigate = useNavigate();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  const handleFavourite = async () => {
    const response = await axios.put(
      `https://bookstore-mern-1uaq.onrender.com/api/v1/add-book-to-favourite`,
      {},
      { headers }
    );
    alert(response.data.message);
  };
  const handleCart = async () => {
    const response = await axios.put(
      `https://bookstore-mern-1uaq.onrender.com/api/v1/add-to-cart`,
      {},
      { headers }
    );
    alert(response.data.message);
  };
  const deleteBook = async () => {
    const response = await axios.delete(
      `https://bookstore-mern-1uaq.onrender.com/api/v1/delete-book`,

      { headers }
    );
    alert(response.data.message);
    navigate("/all-books");
  };
  return (
    <>
      {Data && (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-3/6">
            <div className="bg-zinc-800 rounded px-4 py-12  flex flex-col lg:flex-row  justify-around ">
              {" "}
              <img
                src={Data.url}
                alt="/"
                className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded"
              />
              {isLoggedIn === true && role === "user" && (
                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0">
                  <button
                    className="bg-white rounded lg:rounded-full text-4xl lg:text-3xl p-3"
                    onClick={handleFavourite}
                  >
                    <FaHeart />
                  </button>
                  <button
                    className="bg-white rounded lg:rounded-full  text-3xl p-3 mt-8 md:mt-0 lg:mt-8"
                    onClick={handleCart}
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              )}
              {isLoggedIn === true && role === "admin" && (
                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0">
                  <Link
                    to={`/UpdateBook/${id}`}
                    className="bg-white rounded lg:rounded-full text-4xl lg:text-3xl p-3"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    className="bg-white rounded lg:rounded-full  text-3xl p-3 mt-8 md:mt-0 lg:mt-8"
                    onClick={deleteBook}
                  >
                    <MdOutlineDelete />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {Data.title}
            </h1>
            <p className="mt-1 text-zinc-400 ">by {Data.author}</p>
            <p className="mt-4 text-zinc-500 font-semibold text-xl">
              {Data.desc}
            </p>
            <p className="flex mt-4 items-center justify-start text-zinc-400">
              {" "}
              <GrLanguage className="me-3" /> {Data.language}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              Price : ${Data.price}
            </p>
          </div>
        </div>
      )}
      {!Data && (
        <div className="h-screen bg-zinc-900 flex-items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
