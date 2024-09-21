import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import MobileNav from "../components/Profile/MobileNav";

const Profile = () => {
  const [Profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://bookstore-mern-1uaq.onrender.com/api/v1/get-user-information",
        { headers }
      );
      setProfile(response.data);
    };
    fetch();
  }, []);
  const PlaceOrder = async () => {
    try {
      const response = await axios.post(
        `https://bookstore-mern-1uaq.onrender.com/api/v1/place-order`,

        { order: Cart },

        { headers }
      );

      alert(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row  py-8 gap-4 text-white">
      {!Profile && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full h-screen flex-items-center justify-center">
            <Loader />
          </div>
        </div>
      )}
      {Profile && (
        <>
          <div className="w-full md:w-1/5 h-auto lg:h-screen">
            <Sidebar data={Profile} />
            <MobileNav />
          </div>

          <div className="w-full md:w-4/5">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
