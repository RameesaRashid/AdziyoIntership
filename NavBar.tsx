import type React from "react";
import { Link } from "react-router-dom";

export const NavBar: React.FC = () => {
    return(
        <nav className="flex pl-1 bg-black w-full h-40 shadow-2xl text-white rounded-b-4xl">
            {/* <button className="cursor-pointer ml-10">Menu
            </button> */}
            <Link to="/" className="pt-10 ml-120 mt-5 mr-30 text-2xl text-white font-light ml-8 hover:text-red-500">Home</Link>
            <Link to="/Task" className="pt-10 mr-30 mt-5 text-2xl text-white font-light ml-8 hover:text-red-500">Tasks</Link>
            <Link to="/Saved-Tasks" className="pt-10 mr-30 mt-5 text-2xl text-white font-light ml-8 hover:text-red-500">Saved Task</Link>
            <Link to="/Notes" className="pt-10 mr-30 mt-5 text-2xl text-white font-light ml-8 hover:text-red-500">Notes</Link>
            <Link to="/About" className="pt-10 mr-30 mt-5 text-2xl text-white font-light ml-8 hover:text-red-500">About</Link>
        </nav>
        )

    }