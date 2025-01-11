import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="relative px-8 py-4 flex justify-between items-center bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-500 shadow-xl rounded-b-lg sticky top-0 z-50">
            {/* Left side with the styled title */}
            <span className="text-3xl font-bold text-white tracking-wider hover:text-blue-200 transition duration-300 ease-in-out">
                WEATHER/GALLERY
            </span>

            {/* Right side with the original simple Home and Search links */}
            <ul className="flex space-x-8 ml-auto">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "text-lg text-white font-semibold px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-800 transition duration-300"
                                : "text-lg text-white hover:text-blue-200 hover:bg-blue-600 px-4 py-2 rounded-md transition duration-300"
                        }
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/search"
                        className={({ isActive }) =>
                            isActive
                                ? "text-lg text-white font-semibold px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-800 transition duration-300"
                                : "text-lg text-white hover:text-blue-200 hover:bg-blue-600 px-4 py-2 rounded-md transition duration-300"
                        }
                    >
                        Search
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
