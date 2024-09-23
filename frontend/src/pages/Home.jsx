import React from 'react';
import { useUser } from '../context/UserContext';

const Home = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Accueil</h1>
            <p>Ceci est le contenu de la page d'accueil.</p>
        </div>
    );
};

export default Home;