// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="bg-blue-600 text-white p-4 shadow-md">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         <h1 className="text-xl font-bold">SupportEase</h1>
//         <div className="space-x-4">
//           <Link to="/" className="hover:underline">
//             Home
//           </Link>
//           <Link to="/chat" className="hover:underline">
//             Live Chat
//           </Link>
//           <Link to="/history" className="hover:underline">
//             History
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">SupportEase</h1>
        <div className="space-x-4">
          <Link
            to="/"
            className={`hover:underline ${isActive("/") ? "font-bold" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/chat"
            className={`hover:underline ${
              isActive("/chat") ? "font-bold" : ""
            }`}
          >
            Live Chat
          </Link>
          <Link
            to="/history"
            className={`hover:underline ${
              isActive("/history") ? "font-bold" : ""
            }`}
          >
            History
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
