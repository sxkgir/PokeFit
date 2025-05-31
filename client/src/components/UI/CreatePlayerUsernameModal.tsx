import React, { useState } from 'react';

interface ModalProps {
  onSubmit: (username: string) => void;
}

const PlayerUsernameModal: React.FC<ModalProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(username);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r ">
      <div className="bg-gray-900 rounded-xl shadow-2xl w-11/12 max-w-md p-8 border-4 border-[#75c3fe]">
        <h2 className="text-3xl font-[PressStart2P] text-center mb-8 text-[#75c3fe]">
          Enter Player Username
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 mb-6 border-2 border-gray-700 rounded-lg bg-gray-800 text-white font-bold placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
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

export default PlayerUsernameModal;
