import React from 'react';
import { useUser } from '../context/UserContext';


const Home = () => {
    return (

        <body class='bg-home-page'>    
        <section class='inset-0 bg-black/30 backdrop-blur-md'>
        

        {/* <!-- Container principal --> */}
        <div class="flex justify-center items-center h-screen">
            <div class="relative bg-white shadow-lg rounded-xl w-full max-w-4xl">
            
            {/* <!-- Titre du header --> */}
            <div class="text-center bg-blue-900 text-white py-2 rounded-t-lg">
                <h1 class="text-lg font-bold tracking-wide">STOCK MYDIL</h1>
            </div>

            {/* <!-- Contenu principal --> */}
            <div class="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8 p-8">
                
                {/* <!-- Texte à gauche --> */}
                <div class="lg:w-1/2">
                <h2 class="text-6xl font-bold text-gray-900">
                    MY DIL <br />
                    <span class="block text-3xl leading-6">DIGITAL <br /> INNOVATION <br /> LAB</span>
                </h2>
                <p class="text-gray-600 mt-6 w-4/5 text-justify font-normal">
                    Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.
                </p>
                
                {/* <!-- Boutons de réservation --> */}
                <div class="mt-6 flex space-x-4">
                    <button class="bg-orange-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-orange-600">
                    Réserver
                    </button>
                    <button class="bg-blue-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-700">
                    Retourner
                    </button>
                </div>
                </div>

                
            </div>
        
        </div>

        </section>

        </body>

    );
};

export default Home;                