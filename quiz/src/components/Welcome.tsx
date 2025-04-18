import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (name.trim() !== '') {
      localStorage.setItem('playerName', name);
      navigate('/quiz');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-pink-300 to-purple-400 px-4">
      <div className="relative bg-white rounded-3xl shadow-lg w-96 max-w-sm py-10 px-6 border-8 border-fuchsia-500 text-center">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-fuchsia-300 rounded-full flex items-center justify-center border-8 border-fuchsia-500 shadow-md">
          <span className="text-4xl text-white font-bold">?</span>
        </div>

        <p className="text-gray-700 font-semibold text-lg mb-4 mt-4">
          Entrez votre nom
        </p>
        <input
          className="w-full py-3 px-4 text-white border-4 bg-fuchsia-300 border-fuchsia-500 rounded-full shadow-md text-center placeholder-white
           placeholder-opacity-90 mb-10 focus:outline-none"
          type="text"
          placeholder="je m'appelle ..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />


        <button
          onClick={handleStart}
          className="bg-fuchsia-700 hover:bg-fuchsia-800 text-black font-semibold rounded-full py-2 px-6 transition duration-300"
        >
          Commencer
        </button>
      </div>
    </div>
  );
};

export default Welcome;
