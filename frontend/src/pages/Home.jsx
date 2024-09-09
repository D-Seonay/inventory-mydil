import React from 'react';
import { useUser } from '../context/UserContext';

const Home = () => {
    return (
        <div>
            <h1>Bienvenue sur la page d'accueil {useUser().username}</h1>
            <p>Ceci est le contenu de la page d'accueil.</p>
        </div>
    );
};

export default Home;