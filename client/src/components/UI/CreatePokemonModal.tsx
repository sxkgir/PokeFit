import React, { useState } from 'react';

interface ModalProps {
  onSubmit: (pokemonName: string) => void;
}

const PokemonNameModal: React.FC<ModalProps> = ({ onSubmit }) => {
  const [pokemonName, setPokemonName] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(pokemonName);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r">
      <div className="bg-gray-900 rounded-xl shadow-2xl w-11/12 max-w-md p-8 border-4 border-[#75c3fe]">
        <h2 className="text-3xl font-[PressStart2P] text-center mb-8 text-[#75c3fe  ]">
          Enter Pokemon Name
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Pokemon Name"
            className="w-full p-3 mb-6 border-2 border-gray-700 rounded-lg bg-gray-800 text-white font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
            value={pokemonName}
            required
            onChange={(e) => setPokemonName(e.target.value)}
          />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PokemonNameModal;
