import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar';
import TableComponent from '../components/TableComponent';
import DropdownComponent from '../components/DropdownComponent';
import CategoryPage from './CategoryPage';
import MaterialPage from './MaterialPage';

const Admin = () => {
    const location = useLocation();
    const [selectedOption, setSelectedOption] = useState("Demande d'emprunt");

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    }

    return (

        <div className="flex min-h-screen bg-gray-100 ">
        <Navbar />

            <div className="flex-1 p-6">
            {/* Top Bar */}
                <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold">Administration</h1>
                <div className="flex items-center space-x-4 bg-white p-2 rounded-full shadow-lg">
                    <i class="fa-solid fa-moon ml-3"></i>
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                </div>
            </div>
            <div className="grid">
                <div className="p-4 flex justify-between bg-white shadow-lg rounded-lg">
                    <div className='w-1/5'>
                        <h3 className="text-lg font-semibold">Date</h3>
                        <p className="text-gray-400 font-normal">Aujourd'hui, Mardi 24 Septembre, 2024</p>
                    </div>
                    <span className=' bg-gray-300 w-px h-full rounded-full'></span>
                    <div className='w-1/2 flex items-center justify-between'>
                        
                        <DropdownComponent onOptionSelect={handleOptionSelect} />

                    </div>
                    <span className=' w-px h-full rounded-full'></span>
                    <div className='w-1/5'>
                        
                    </div>
                </div>
                
            </div>

            {selectedOption === "Demande d'emprunt" && <TableComponent />}
            {selectedOption === "Ajout de matériel" && <div className='flex'><CategoryPage /> <MaterialPage /></div>}

            </div>

        </div>
        
    );
};

export default Admin;