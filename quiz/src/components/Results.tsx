import { useNavigate } from 'react-router-dom';

const Results = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem('playerName') || 'Joueur';

  const score = parseInt(localStorage.getItem(`${name}_score`) || '0');
  const totalQuestions = 10;
  const percentage = Math.round((score / totalQuestions) * 100);

  const circleColor = percentage >= 50 ? 'border-green-500' : 'border-red-500';
  const textColor = percentage >= 50 ? 'text-green-600' : 'text-red-600';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-pink-300 to-purple-400">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl p-6 pt-14 pb-8 w-full relative mb-8 border-4 border-purple-500 shadow-lg">
          <div className={`absolute -top-10 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 ${circleColor}`}>
            <span className={`text-2xl font-bold ${textColor}`}>{percentage}%</span>
          </div>

          <p className="text-black text-center text-lg font-semibold mt-2">
            {name}, vous avez bien répondu<br />
            à {score} questions sur {totalQuestions}.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => navigate('/')}
            className="bg-pink-500 text-white font-semibold rounded-full py-2 px-6 hover:bg-pink-600 transition shadow-md"
          >
            Rejouer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
