import PropTypes from 'prop-types';

const Card = ({ 
  name, 
  category_id, 
  stock_quantity, 
  available_quantity, 
  description, 
  location, 
  purchase_date, 
  reference, 
  photo 
}) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg h-fit transition-transform transform hover:scale-105">
      {photo ? (
        <img className="w-full h-48 object-cover" src={photo} alt={`${name} - Image`} />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Image non disponible</span>
        </div>
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{description}</p>
        <p className="text-gray-600 text-sm">Catégorie ID: {category_id}</p>
        <p className="text-gray-600 text-sm">Quantité en stock: {stock_quantity}</p>
        <p className="text-gray-600 text-sm">Quantité disponible: {available_quantity}</p>
        <p className="text-gray-600 text-sm">Emplacement: {location}</p>
        <p className="text-gray-600 text-sm">Date d'achat: {new Date(purchase_date).toLocaleDateString()}</p>
        <p className="text-gray-600 text-sm">Référence: {reference}</p>
      </div>
    </div>
  );
};

// PropTypes pour validation des props
Card.propTypes = {
  name: PropTypes.string.isRequired,
  category_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Permettre une chaîne ou un nombre
  stock_quantity: PropTypes.number.isRequired,
  available_quantity: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  purchase_date: PropTypes.string.isRequired,
  reference: PropTypes.string.isRequired,
  photo: PropTypes.string,
};

export default Card;