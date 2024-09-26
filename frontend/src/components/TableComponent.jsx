import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TableComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [actionError, setActionError] = useState(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token manquant');
                }
                const response = await axios.get('http://localhost:5001/reservation', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des réservations:', error);
                setError('Erreur lors de la récupération des réservations.');
                setLoading(false);
            }
        };
    
        fetchReservations();
    }, []);
    

    const handleAccept = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5001/reservation/${id}`, { status: 'approved' }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setData(prevData => prevData.map(item => item.id === id ? { ...item, status: 'approved' } : item));
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la réservation', error);
            setActionError('Erreur lors de la mise à jour de la réservation.');
        }
    };

    const handleDeny = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5001/reservation/${id}`, { status: 'cancelled' }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setData(prevData => prevData.map(item => item.id === id ? { ...item, status: 'cancelled' } : item));
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la réservation', error);
            setActionError('Erreur lors de la mise à jour de la réservation.');
        }
    };

    const pendingReservations = data.filter(item => item.status === 'pending');

    // Affichage pendant le chargement
    if (loading) {
        return <div>Chargement des réservations...</div>;
    }

    // Affichage en cas d'erreur
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='overflow-auto h-[70vh] mt-10'>
            <table className="min-w-full table-auto bg-none border-gray-100 scroll-pt-10">
                <thead className="bg-gray-200 text-gray-700">
                <tr>
                    <th className="px-4 py-2">Matériel</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Date de début</th>
                    <th className="px-4 py-2">Date de fin</th>
                    <th className="px-4 py-2">Statut</th>
                    <th className="px-4 py-2">Action</th>
                </tr>
                </thead>
                <tbody>
                {pendingReservations.length > 0 ? (
                    pendingReservations.map((item) => (
                        <tr key={item.id} className="border-b">
                            <td className="px-4 py-2 text-center">{item.object}</td>
                            <td className="px-4 py-2 text-center">{item.email}</td>
                            <td className="px-4 py-2 text-center">{new Date(item.start_date).toLocaleDateString()}</td>
                            <td className="px-4 py-2 text-center">{new Date(item.end_date).toLocaleDateString()}</td>
                            <td className="px-4 py-2 text-center">{item.status}</td>
                            <td className="px-4 py-2 text-center">
                                <button
                                    className="bg-white text-green-500 font-medium px-3 py-1 rounded-full mr-2 shadow-md"
                                    onClick={() => handleAccept(item.id)}
                                >
                                    Accept
                                </button>
                                <button
                                    className="bg-white text-red-500 font-medium px-3 py-1 rounded-full shadow-md"
                                    onClick={() => handleDeny(item.id)}
                                >
                                    Deny
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="text-center p-4">Aucune réservation en attente.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
