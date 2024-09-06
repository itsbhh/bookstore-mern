import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { FaUserLarge, FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from "./SeeUserData";

const AllOrders = () => {
  const [AllOrders, setAllOrders] = useState([]);
  const [Options, setOptions] = useState(-1);
  const [Values, setValues] = useState({ status: "" });
  const [userDiv, setuserDiv] = useState("hidden");
  const [userDivData, setuserDivData] = useState("hidden");
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-all-orders",
          { headers }
        );
        setAllOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };
    fetchOrders();
  }, []);

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    const id = AllOrders[i]._id;
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v1/update-status/${id}`,
        Values,
        { headers }
      );
      alert(response.data.message);

      // Update the local state for real-time UI update
      const updatedOrders = [...AllOrders];
      updatedOrders[i].status = Values.status;
      setAllOrders(updatedOrders); // Update the state with the new status

      // Close the dropdown options
      setOptions(-1);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <>
      {!AllOrders.length && (
        <div className="h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}

      {AllOrders.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            All Orders
          </h1>

          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>

            <div className="w-[40%] md:w-[22%]">
              <h1 className="">Books</h1>
            </div>

            <div className="w-0 md:w-[45%] hidden md:block">
              <h1 className="">Description</h1>
            </div>

            <div className="w-[17%] md:w-[9%]">
              <h1 className="">Price</h1>
            </div>

            <div className="w-[30%] md:w-[16%]">
              <h1 className="">Status</h1>
            </div>

            <div className="w-[10%] md:w-[5%]">
              <h1 className="">
                <FaUserLarge />
              </h1>
            </div>
          </div>

          {AllOrders.map((items, i) => (
            <div
              key={i}
              className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer"
            >
              <div className="w-[3%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>

              <div className="w-[40%] md:w-[22%]">
                <Link
                  to={`/view-book-details/${items.book._id}`}
                  className="hover:text-blue-300"
                >
                  {items.book.title}
                </Link>
              </div>

              <div className="w-0 md:w-[45%] hidden md:block">
                <h1>{items.book.desc.slice(0, 40)}...</h1>
              </div>

              <div className="w-[17%] md:w-[9%]">
                <h1>{items.book.price}</h1>
              </div>

              <div className="w-[30%] md:w-[16%]">
                <h1 className="font-semibold">
                  <button
                    className="hover:scale-105 transition-all duration-300"
                    onClick={() => setOptions(i)}
                  >
                    {items.status === "Order placed" ? (
                      <div className="text-yellow-500">{items.status}</div>
                    ) : items.status === "Canceled" ? (
                      <div className="text-red-500">{items.status}</div>
                    ) : (
                      <div className="text-green-500">{items.status}</div>
                    )}
                  </button>
                  <div
                    className={`${
                      Options === i ? "block" : "hidden"
                    } flex mt-4`}
                  >
                    <select
                      name="status"
                      className="bg-gray-800"
                      onChange={change}
                      value={Values.status}
                    >
                      {[
                        "Order placed",
                        "Out for delivery",
                        "Delivered",
                        "Canceled",
                      ].map((statusOption, j) => (
                        <option value={statusOption} key={j}>
                          {statusOption}
                        </option>
                      ))}
                    </select>

                    <button
                      className="text-green-500 hover:text-pink-600 mx-2"
                      onClick={() => {
                        submitChanges(i);
                      }}
                    >
                      <FaCheck />
                    </button>
                  </div>
                </h1>
              </div>

              <div className="w-[10%] md:w-[5%] ">
                <button
                  className=" text-xl hover:text-orange-500"
                  onClick={() => {
                    setuserDiv("fixed");
                    setuserDivData(items.user);
                  }}
                >
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {userDivData && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setuserDiv={setuserDiv}
        />
      )}
    </>
  );
};

export default AllOrders;
