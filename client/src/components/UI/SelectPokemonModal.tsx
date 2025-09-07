import React, { useState } from "react";

interface PokemonSelectModalProps {
  onSubmit: (selectedPokemon: string) => void;
}

const PokemonSelectModal: React.FC<PokemonSelectModalProps> = ({ onSubmit }) => {
  const [selectedPokemonType, setSelectedPokemon] = useState<string>("");

  const pokemonOptions = [
    { type: "Charmander", src: "/Charmander.png", alt: "Charmander" },
    { type: "Machop", src: "/Machop.png", alt: "Machop" },
    { type: "Squirtle", src: "/Squirtle.png", alt: "Squirtle" },
  ];

  const handleImageClick = (pokemonId: string) => {
    setSelectedPokemon(pokemonId);
  };

  const handleSubmit = () => {
    if (selectedPokemonType) {
      onSubmit(selectedPokemonType);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="bg-gray-900 rounded-xl shadow-2xl w-11/12 max-w-3xl p-8 border-4 border-[#75c3fe]">
        <h2 className="text-3xl font-[PressStart2P] text-center mb-8 text-[#75c3fe]">
          Select Your Pokemon
        </h2>
        <div className="flex justify-around items-center mb-8 gap-x-12">
          {pokemonOptions.map((pokemon) => (
            <div
              key={pokemon.type}
              onClick={() => handleImageClick(pokemon.type)}
              className={`w-48 h-48 md:w-64 md:h-64 flex items-center justify-center cursor-pointer border-4 transition-all duration-300 transform hover:scale-125 ${
                selectedPokemonType === pokemon.type ? "border-yellow-400 shadow-lg" : "border-transparent"
              }`}
            >
              <img
                src={pokemon.src}
                alt={pokemon.alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-4">
          <button className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition-all duration-300">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedPokemonType}
            className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonSelectModal;
