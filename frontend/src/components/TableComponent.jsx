import React from 'react';

const TableComponent = () => {
    const data = [
        {
            id: 1,
            object: 'Arduino',
            profile: <div className="w-10 h-10 bg-gray-300 rounded-full"></div>,
            email: 'ninja@example.com',
            quantity: 5,
            
        },
        {
            id: 2,
            object: 'Product',
            profile: <div className="w-10 h-10 bg-gray-300 rounded-full"></div>,
            email: 'john@example.com',
            quantity: 3,
            
        },
        {
            id: 2,
            object: 'Product',
            profile: <div className="w-10 h-10 bg-gray-300 rounded-full"></div>,
            email: 'john@example.com',
            quantity: 3,
            
        },
        {
            id: 2,
            object: 'Product',
            profile: <div className="w-10 h-10 bg-gray-300 rounded-full"></div>,
            email: 'john@example.com',
            quantity: 3,
            
        },
        {
            id: 2,
            object: 'Product',
            profile: <div className="w-10 h-10 bg-gray-300 rounded-full"></div>,
            email: 'john@example.com',
            quantity: 3,
            
        },
        {
            id: 2,
            object: 'Product',
            profile: <div className="w-10 h-10 bg-gray-300 rounded-full"></div>,
            email: 'john@example.com',
            quantity: 3,
            
        },
        {
            id: 2,
            object: 'Product',
            profile: <div className="w-10 h-10 bg-gray-300 rounded-full"></div>,
            email: 'john@example.com',
            quantity: 3,
            
        },
        {
            id: 2,
            object: 'Product',
            profile: <div className="w-10 h-10 bg-gray-300 rounded-full"></div>,
            email: 'john@example.com',
            quantity: 3,
            
        },
        {
            id: 2,
            object: 'Product',
            profile: <div className="w-10 h-10 bg-gray-300 rounded-full"></div>,
            email: 'john@example.com',
            quantity: 3,
            
        },
        {
            id: 2,
            object: 'Product',
            profile: <div className="w-10 h-10 bg-gray-300 rounded-full"></div>,
            email: 'john@example.com',
            quantity: 3,
            
        },
        {
            id: 2,
            object: 'Product',
            profile: <div className="w-10 h-10 bg-gray-300 rounded-full"></div>,
            email: 'john@example.com',
            quantity: 3,
            
        },
        {
            id: 2,
            object: 'Product',
            profile: <div className="w-10 h-10 bg-gray-300 rounded-full"></div>,
            email: 'john@example.com',
            quantity: 3,
            
        },
        {
            id: 2,
            object: 'Product',
            profile: <div className="w-10 h-10 bg-gray-300 rounded-full"></div>,
            email: 'john@example.com',
            quantity: 3,
            
        },
        {
            id: 2,
            object: 'Product',
            profile: <div className="w-10 h-10 bg-gray-300 rounded-full"></div>,
            email: 'john@example.com',
            quantity: 3,
            
        },
        {
            id: 2,
            object: 'Product',
            profile: <div className="w-10 h-10 bg-gray-300 rounded-full"></div>,
            email: 'john@example.com',
            quantity: 3,
            
        },
        {
            id: 2,
            object: 'Product',
            profile: <div className="w-10 h-10 bg-gray-300 rounded-full"></div>,
            email: 'john@example.com',
            quantity: 3,
            
        }
    ];
    
    const handleAccept = (id) => {
        console.log(`Accepted item with id: ${id}`);
    };

    const handleDeny = (id) => {
        console.log('Denied item with id: £{id}')
    }

    return (
        <div className='overflow-auto h-[70vh] mt-10'>
            <table className="min-w-full table-auto bg-none border-gray-100 scroll-pt-10">
                <thead className="bg-gray-200 text-gray-700">
                <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Objet</th>
                    <th className="px-4 py-2">Profil</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Quantité</th>
                    <th className="px-4 py-2">Action</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <tr key={item.id} className="border-b">
                    <td className="px-4 py-2 text-center">{item.id}</td>
                    <td className="px-4 py-2 text-center">{item.object}</td>
                    <td className="px-4 py-2 justify-center flex">{item.profile}</td>
                    <td className="px-4 py-2 text-center">{item.email}</td>
                    <td className="px-4 py-2 text-center">{item.quantity}</td>
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
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableComponent