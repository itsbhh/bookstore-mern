import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-black py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section: Text */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-white mb-6">
            Welcome to Our Bookstore
          </h1>
          <p className="text-gray-400 text-lg mb-6">
            At our bookstore, we believe that every book tells a story and has
            the power to inspire, educate, and entertain. Founded with a passion
            for reading, our store offers a wide range of books across various
            genres, from timeless classics to the latest bestsellers.
          </p>
          <p className="text-gray-400 text-lg mb-6">
            Whether you're looking for a thrilling mystery, a heartwarming
            romance, or a deep dive into non-fiction, we have something for
            everyone. Our team of book enthusiasts is dedicated to helping you
            find your next great read.
          </p>
          <p className="text-gray-400 text-lg">
            Join us in celebrating the love of books, and let us help you embark
            on a literary journey that you'll never forget.
          </p>
        </div>

        {/* Right Section: Image */}
        <div className="flex justify-center lg:justify-end">
          <img
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
            alt="Bookshelf"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
