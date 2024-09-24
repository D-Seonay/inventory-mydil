import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import Cards from '../components/Cards'

const DashBoard = () => {
    const location = useLocation();

    const [searchTerm, setSearchTerm] = useState('');

    const cardsData = [
        {
            imageSrc: '/mountain.jpg',
            title: 'Mountain',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.',
            tags: ['photography', 'travel', 'winter'],
          },
          {
            imageSrc: '/river.jpg',
            title: 'River',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.',
            tags: ['photography', 'travel', 'summer'],
          },
          {
            imageSrc: '/forest.jpg',
            title: 'Forest',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.',
            tags: ['photography', 'travel', 'fall'],
          },
    ];

    const filteredCards = cardsData.filter((card) =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) || // Filtre par titre
        card.description.toLowerCase().includes(searchTerm.toLowerCase()) || // Filtre par description
        card.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) // Filtre par tags
      );

    const isActive = (path) => location.pathname === path;

    return (
        
        <div className="flex min-h-screen bg-gray-100 ">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
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

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Main Dashboard</h1>
          <div className="flex items-center space-x-4 bg-white p-2 rounded-full shadow-lg">
            <div className="relative">
                <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2"></i>
                <input
                type="text"
                placeholder="Search..."
                className="bg-gray-200 rounded-full p-2 pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <i class="fa-solid fa-moon"></i>
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid">
          <div className="p-4 flex justify-between bg-white shadow-lg rounded-lg">
            <div className='w-1/5'>
                <h3 className="text-lg font-semibold">Date</h3>
                <p className="text-gray-400 font-normal">Aujourd'hui, Mardi 24 Septembre, 2024</p>
            </div>
            <span className=' bg-gray-300 w-px h-full rounded-full'></span>
            <div className='w-1/2 flex items-center justify-between'>
                <div className='flex items-center'>
                    <h3 className="text-2xl font-semibold">Matériel</h3>
                    <p className="font-extrabold text-xl m-3">-</p>
                    <p className="text-gray-500">DashBoard</p><i class="text-gray-500 fa-solid fa-angle-down ml-2"></i>
                </div>
                <div className="relative mr-4">
                    <div className="absolute -top-5 right-[85px] w-10 h-10 bg-gray-300 rounded-full border-white border-2"></div>
                    <div className="absolute -top-5 right-[65px] w-10 h-10 bg-gray-300 rounded-full border-white border-2"></div>
                    <div className="absolute -top-5 right-[45px] w-10 h-10 bg-gray-300 rounded-full border-white border-2"></div>
                    <div className="absolute -top-5 right-[25px] w-10 h-10 bg-gray-300 rounded-full border-white border-2"></div>
                    <div className="absolute -top-5 right-[5px] w-10 h-10 bg-gray-300 rounded-full border-white border-2"></div>
                    <div className="absolute -top-5 right-[-15px] w-10 h-10 bg-gray-300 rounded-full border-white border-2"></div>
                    <div className="absolute -top-5 right-[-35px] w-10 h-10 bg-gray-300 rounded-full border-white border-2"></div>
                </div>
            </div>
            <span className=' bg-gray-300 w-px h-full rounded-full'></span>
            <div className='w-1/5'>
                <h3 className="text-lg font-semibold">Earnings</h3>
                <p className="text-2xl font-bold">$340.50</p>
            </div>
            
          </div>
        </div>

        {/* Cards */}


        <Cards />

        

        </div>
        
      </div>
    );
};

export default DashBoard;                