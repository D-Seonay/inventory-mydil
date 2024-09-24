import { useState } from 'react';

const DropdownComponent = ({onOptionSelect}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Demande d'emprunt"); // Option par défaut

  const options = [
    "Demande d'emprunt",
    "Ajout de matériel",
    "Modifier l'inventaire",
    "Liste des utilisateurs"
  ];


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Ferme le dropdown après la sélection
    onOptionSelect(option);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Bouton du dropdown */}
      <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
        <h3 className="text-2xl font-semibold">{selectedOption}</h3>
        <i className={`text-gray-500 fa-solid fa-angle-${isOpen ? 'up' : 'down'} ml-2`}></i>
      </div>

      {/* Liste déroulante */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <div className="py-1">
            {options
              .filter(option => option !== selectedOption) // Filtrer l'option sélectionnée
              .map((option) => (
                <a
                  key={option}
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </a>
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownComponent;
