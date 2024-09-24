import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import Card from '../components/Card'
import Navbar from '../components/Navbar';

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
      
        <Navbar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Main Dashboard</h1>
          <div className="flex items-center space-x-4 bg-white p-2 rounded-full shadow-lg">
            <i class="fa-solid fa-moon ml-3"></i>
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

        {/* Affichage des cartes filtrées */}
        <div className="w-full h-5/6 p-10 pr-0 pl-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            {filteredCards.length > 0 ? (
            filteredCards.map((card, index) => (
                <Card
                key={index}
                imageSrc={card.imageSrc}
                title={card.title}
                description={card.description}
                tags={card.tags}
                />
            ))
            ) : (
            <p>No results found.</p> // Message si aucun résultat n'est trouvé
            )}
        </div>
        

        </div>
        
      </div>
    );
};

export default DashBoard;                