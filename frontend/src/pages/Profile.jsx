import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';


const Profile = () => {
    
    const [filter, setFilter] = useState('current');
    const [reservations, setReservations] = useState([]);
    const [isHovered, setIsHovered] = useState(false); // Pour gérer l'affichage de l'icône d'édition
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Appel à l'API pour récupérer les réservations de l'utilisateur
        const fetchReservations = async () => {
          try {
            const token = sessionStorage.getItem('token'); // Remplacer sessionStorage par localStorage si besoin
            const userId = 2; // Vérifiez si l'userId est correct dans votre back-end

            console.log("Token récupéré:", token);
            console.log("UserID récupéré:", userId);

            // Vérifier si le token ou l'userId sont manquants
            if (!token || !userId) {
                throw new Error("Token ou userId manquant");
            }

            const response = await fetch(`http://localhost:5001/userReservations/:?userId=${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Vérification du statut de la réponse
            if (!response.ok) {
                console.log("Erreur lors de la requête:", response.status, response.statusText);
                if (response.status === 403) {
                    throw new Error("Accès interdit. Vous n'avez pas les autorisations nécessaires.");
                } else {
                    throw new Error(`Erreur ${response.status}: ${response.statusText}`);
                }
            }

            const data = await response.json();
            console.log("Réservations récupérées:", data); // Log pour vérifier les données
            setReservations(data);
          } catch (error) {
            console.error('Erreur lors de la récupération des réservations:', error.message);
            setErrorMessage(error.message); // Stocker l'erreur pour l'afficher dans l'UI
          }
        };

        fetchReservations();
    }, []);

    const filterReservations = () => {
        const currentDate = new Date();

        return reservations.filter(reservation => {
            const startDate = new Date(reservation.start_date);
            const endDate = new Date(reservation.end_date);

            if (filter === 'current') {
                return startDate <= currentDate && endDate >= currentDate; // Réservations en cours
            } else if (filter === 'pending') {
                return reservation.status === 'pending'; // Réservations en attente
            } else if (filter === 'past') {
                return endDate < currentDate; // Réservations passées
            } else {
                return true;
            }
        });
    };

    return (
        
        <div className='flex min-h-screen bg-gray-100'>
            <Navbar />
                <div className='flex-1 p-6'>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-semibold">Profil</h1>
                        <div className="flex items-center space-x-4 bg-white p-2 rounded-full shadow-lg">
                            <i className="fa-solid fa-moon ml-3"></i>
                            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                        </div>
                    </div>
                    <div className='flex'>
                        <div class='Profile' className='w-1/5 p-4 justify-center align-middle text-center flex-wrap bg-white shadow-lg rounded-lg h-[85svh]'>

                            <div
                                className="relative m-auto w-40 h-40 pt-10 bg-gray-300 rounded-full"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                >
                                {/* Icone d'édition */}
                                {isHovered && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                                    <i class="text-6xl fa-regular fa-pen-to-square"></i>
                                    </div>
                                )}
                            </div>

                            <h1 className='text-2xl mt-5 font-bold'>Mathéo</h1>
                            <p className='font-semibold text-gray-500'>Delaunay</p>
                            <hr className='m-5'/>
                            <h4 className='font-medium'>Réservations actuelles : </h4>
                            <h4 className='font-medium'>En attente de Réservation : </h4>

                        </div>
                        <div className='w-full ml-7 p-4 flex bg-white shadow-lg rounded-lg'>
                            <div className='w-full h-fit justify-between'>
                                <div className='flex justify-between w-full h-fit'>
                                    <h1 className='text-2xl m-5 font-bold'>Mes réservations</h1>
                                    <div className='flex items-center'>
                                        <p className='text-gray-500 m-auto font-semibold'>Filtrer</p>
                                        <select 
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                        className="ml-2 border border-gray-300 rounded-lg p-2"
                                        >
                                        <option value="current">Actuelles</option>
                                        <option value="pending">En attente</option>
                                        <option value="past">Passées</option>
                                        </select>
                                    </div> 
                                </div>
                                <div className='w-full h-full p-6'>
                                    {filterReservations().length > 0 ? (
                                        <ul className='mt-4'>
                                        {filterReservations().map((reservation) => (
                                            <li key={reservation.id} className='p-4 mb-4 border border-gray-300 rounded-lg'>
                                            <h2 className='text-xl font-bold'>Équipement: {reservation.equipment_id}</h2>
                                            <p>Date de début: {new Date(reservation.start_date).toLocaleDateString()}</p>
                                            <p>Date de fin: {new Date(reservation.end_date).toLocaleDateString()}</p>
                                            <p>Status: {reservation.status}</p>
                                            </li>
                                        ))}
                                        </ul>
                                    ) : (
                                        <p className='mt-4 text-gray-500'>Aucune réservation trouvée pour ce filtre.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
    )
}

export default Profile;