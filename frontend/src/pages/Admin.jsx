import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TableComponent from '../components/TableComponent';
import DropdownComponent from '../components/DropdownComponent';
import CategoryPage from './CategoryPage';
import MaterialPage from './MaterialPage';
import UsersPage from './UsersPage';

const Admin = () => {
    const location = useLocation();
    const [selectedOption, setSelectedOption] = useState("Demande d'emprunt");
    const [darkMode, setDarkMode] = useState(false); // État pour le mode sombre

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    }

    // Fonction pour basculer le mode sombre
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    return (
        <div className={`flex min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
            <Navbar darkMode={darkMode}/>

            <div className="flex-1 p-6">
                {/* Top Bar */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold">Administration</h1>
                    <div className="flex items-center space-x-4 p-2 rounded-full shadow-lg cursor-pointer" onClick={toggleDarkMode}>
                        <i className={`fa-solid fa-${darkMode ? 'sun' : 'moon'} ml-3`}></i>
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

                <div className="grid">
                    <div className={`p-4 flex justify-between shadow-lg rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <div className='w-1/5'>
                            <h3 className="text-lg font-semibold">Date</h3>
                            <p className="text-gray-400 font-normal">Aujourd'hui, Mardi 24 Septembre, 2024</p>
                        </div>
                        <span className={`${darkMode ? 'bg-gray-600' : 'bg-gray-300'} w-px h-full rounded-full`}></span>
                        <div className='w-1/2 flex items-center justify-between'>
                            <DropdownComponent onOptionSelect={handleOptionSelect} />
                        </div>
                        <span className={`${darkMode ? 'bg-gray-600' : 'bg-gray-300'} w-px h-full rounded-full`}></span>
                        <div className='w-1/5'>
                            {/* Autres contenus ici */}
                        </div>
                    </div>
                </div>

                {selectedOption === "Demande d'emprunt" && <TableComponent />}
                {selectedOption === "Ajout de matériel" && (
                    <div className='flex'>
                        <CategoryPage />
                        <MaterialPage />
                    </div>
                )}
                {selectedOption === "Liste des utilisateurs" && <UsersPage />}
            </div>
        </div>
    );
};

export default Admin;