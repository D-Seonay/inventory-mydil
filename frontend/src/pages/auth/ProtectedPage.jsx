// src/pages/ProtectedPage.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProtectedPage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/protected', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMessage(response.data.message);
      } catch (err) {
        setMessage('Erreur d\'authentification ou accès refusé');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Page Protégée</h2>
      <p>{message}</p>
    </div>
  );
};

export default ProtectedPage;