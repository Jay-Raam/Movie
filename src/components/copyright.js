import React from "react";

const Copyright = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-10 lg:mt-20 border-t-2 border-gray-300">
      <p className="text-center text-gray-700 py-2">
        &copy; {currentYear} All rights reserved by Jayasriraam
      </p>
    </footer>
  );
};

export default Copyright;
