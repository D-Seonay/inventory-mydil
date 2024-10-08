import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cards from '../components/Cards';

const DashBoard = () => {
    const location = useLocation();

    const [equipments, setEquipments] = useState([]); // État pour stocker les équipements
    const [searchTerm, setSearchTerm] = useState('');
    const [darkMode, setDarkMode] = useState(false); // État pour le mode sombre
  
    useEffect(() => {
        const fetchEquipments = async () => {
            try {
                const response = await axios.get('http://localhost:5001/equipment', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setEquipments(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des équipements:', error);
            }
        };

        fetchEquipments();
    }, []);


    const isActive = (path) => location.pathname === path;

    // Fonction pour basculer le mode sombre
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    return (
        <div className="flex min-h-screen bg-gray-100 ">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-8 m-4 text-center">My D<span className='font-semibold'>igital</span> I<span className='font-semibold'>nnovation</span> L<span className='font-semibold'>ab</span></h2>
                    <hr />
                    <ul className='mt-6'>
                        <li className="mb-4">
                            <Link to="/DashBoard" className={`flex items-center p-2 text-lg font-medium group ${isActive('/DashBoard') ? '' : 'text-gray-700'}`}>
                                <span>
                                    <i className={`fa-solid fa-house w-8 group-hover:text-[#3948FF] ${isActive('/DashBoard') ? 'text-[#3948FF]' : ''}`}></i>
                                    Main Dashboard
                                </span>
                                {isActive('/DashBoard') && <span className='bg-[#3948FF] w-1 h-7 ml-auto rounded-md'></span>}
                            </Link>
                        </li>
                        
                        <li className="mb-4">
                            <Link to="/Profile" className={`flex items-center p-2 text-lg font-medium group ${isActive('/Profile') ? '' : 'text-gray-700'}`}>
                                <span>
                                    <i className={`fa-solid fa-user w-8 group-hover:text-[#3948FF] ${isActive('/Profile') ? 'text-[#3948FF]' : ''}`}></i>
                                    Profile
                                </span>
                                {isActive('/Profile') && <span className='bg-[#3948FF] w-1 h-7 ml-auto rounded-md'></span>}
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/Admin" className={`flex items-center p-2 text-lg font-medium group ${isActive('/Admin') ? '' : 'text-gray-700'}`}>
                                <span>
                                    <i className={`fa-solid fa-lock w-8 group-hover:text-[#3948FF] ${isActive('/Admin') ? 'text-[#3948FF]' : ''}`}></i>
                                    Admin
                                </span>
                                {isActive('/Admin') && <span className='bg-[#3948FF] w-1 h-7 ml-auto rounded-md'></span>}
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
                        
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center" onClick={toggleDarkMode}>
                            <i className={`fa-solid fa-moon ${darkMode ? 'text-yellow-400' : 'text-gray-500'}`}></i>
                        </div>
                        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                            <button className=" text-white px-4 py-2" onClick={() => {
                                localStorage.removeItem('token');
                                window.location.href = '/logout';
                            }}>
                                <i className="fa-solid fa-sign-out-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid">
                    <div className="p-4 flex justify-between bg-white shadow-lg rounded-lg">
                        <div className='w-1/5'>
                            <h3 className="text-lg font-semibold">Date</h3>
                            <p className="text-gray-400 font-normal">Aujourd'hui, Mardi 24 Septembre, 2024</p>
                        </div>
                        <span className='bg-gray-300 w-px h-full rounded-full'></span>
                        <div className='w-1/2 flex items-center justify-between'>
                            <div className='flex items-center'>
                                <h3 className="text-2xl font-semibold">Matériel</h3>
                                <p className="font-extrabold text-xl m-3">-</p>
                                <p className="text-gray-500">DashBoard</p><i className="text-gray-500 fa-solid fa-angle-down ml-2"></i>
                            </div>
                            <div className="relative mr-4">
                                {/* Placeholder for additional UI elements */}
                            </div>
                        </div>
                        <span className='bg-gray-300 w-px h-full rounded-full'></span>
                        <div className='w-1/5'>
                        </div>
                    </div>
                </div>

                {/* Cards */}
                <Cards equipments={equipments} searchTerm={searchTerm} />
            </div>
        </div>
    );
};


export default DashBoard;

