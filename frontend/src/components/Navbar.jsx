// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { CiLogin } from "react-icons/ci";
import { useLocation } from 'react-router-dom';

const Navbar = ({ darkMode }) => {
  const { username, isLoggedIn, logout } = useUser();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className={`w-64 h-svh ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} shadow-lg`}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-8 m-4 text-center">My D<span className='font-semibold'>igital</span> I<span className='font-semibold'>nnovation</span> L<span className='font-semibold'>ab</span></h2>
          <hr></hr>
          <ul className='mt-6'>
            <li className="mb-4">
            <Link 
            to="/DashBoard" 
            className={`flex items-center p-2 text-lg font-medium group ${
                isActive('/DashBoard') ? '' : 'text-gray-700'
            }`}>
                <span>
                    <i className={`fa-solid fa-house w-8 group-hover:text-[#3948FF] ${
                    isActive('/DashBoard') ? 'text-[#3948FF]' : ''
                    }`}></i>
                    Main Dashboard
                </span>
                {isActive('/DashBoard') && (
                    <span className='bg-[#3948FF] w-1 h-7 ml-auto rounded-md'></span>
                )}
            </Link>
            </li>
            <li className="mb-4">
            <Link 
            to="/Material" 
            className={`flex items-center p-2 text-lg font-medium group ${
                isActive('/Material') ? '' : 'text-gray-700'
            }`}>
                <span>
                    <i className={`fa-solid fa-toolbox w-8 group-hover:text-[#3948FF] ${
                    isActive('/Material') ? 'text-[#3948FF]' : ''
                    }`}></i>
                    Matériel
                </span>
                {isActive('/Material') && (
                    <span className='bg-[#3948FF] w-1 h-7 ml-auto rounded-md'></span>
                )}
            </Link>
            </li>
            <li className="mb-4">
            <Link 
            to="/Profile" 
            className={`flex items-center p-2 text-lg font-medium group ${
                isActive('/Profile') ? '' : 'text-gray-700'
            }`}>
                <span>
                    <i className={`fa-solid fa-user w-8 group-hover:text-[#3948FF] ${
                    isActive('/Profile') ? 'text-[#3948FF]' : ''
                    }`}></i>
                    Profile
                </span>
                {isActive('/Profile') && (
                    <span className='bg-[#3948FF] w-1 h-7 ml-auto rounded-md'></span>
                )}
            </Link>
            </li>
            <li className="mb-4">
            <Link 
            to="/Admin" 
            className={`flex items-center p-2 text-lg font-medium group ${
                isActive('/Admin') ? '' : 'text-gray-700'
            }`}>
                <span>
                    <i className={`fa-solid fa-lock w-8 group-hover:text-[#3948FF] ${
                    isActive('/Admin') ? 'text-[#3948FF]' : ''
                    }`}></i>
                    Admin
                </span>
                {isActive('/Admin') && (
                    <span className='bg-[#3948FF] w-1 h-7 ml-auto rounded-md'></span>
                )}
            </Link>
            </li>
          </ul>
        </div>
      </aside>
  );
};

export default Navbar;
