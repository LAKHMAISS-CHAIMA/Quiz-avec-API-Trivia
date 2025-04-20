import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Results = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem('playerName');

  const [answers, setAnswers] = useState<any[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!name) {
      navigate('/');
      return;
    }

    const savedScore = localStorage.getItem(`${name}_score`);
    const savedAnswers = localStorage.getItem(`${name}_answers`);

    if (!savedScore || !savedAnswers) {
      navigate('/');
      return;
    }

    setScore(parseInt(savedScore));
    setAnswers(JSON.parse(savedAnswers));
  }, [name, navigate]);

  const totalQuestions = answers.length;
  const percentage = Math.round((score / totalQuestions) * 100);
  const circleColor = percentage >= 50 ? 'border-green-500' : 'border-red-500';
  const textColor = percentage >= 50 ? 'text-green-600' : 'text-red-600';

  const handleReplay = () => {
    if (name) {
      localStorage.removeItem(`${name}_score`);
      localStorage.removeItem(`${name}_answers`);
      localStorage.removeItem(`${name}_currentQuestion`);
      localStorage.removeItem('playerName');
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-pink-300 to-purple-400">
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-3xl p-6 pt-14 pb-8 relative mb-8 border-4 border-purple-500 shadow-lg">
          <div className={`absolute -top-10 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 ${circleColor}`}>
            <span className={`text-2xl font-bold ${textColor}`}>{percentage}%</span>
          </div>
          <p className="text-black text-center text-lg font-semibold mt-2">
            {name}, vous avez bien répondu<br />
            à {score} question{score !== 1 ? 's' : ''} sur {totalQuestions}.
          </p>
        </div>

       
<div className="bg-white p-4 rounded-3xl shadow-xl space-y-4 text-sm border-4 border-purple-400 mt-4">
  <h2 className="text-center text-lg font-bold text-purple-800 mb-4">Détails de vos réponses</h2>
  {answers.map((item, index) => {
    const isCorrect = item.selected === item.correct;
    return (
      <div
        key={index}
        className={`p-4 rounded-2xl transition border-2 ${
          isCorrect
            ? 'border-green-400 bg-green-50'
            : 'border-red-400 bg-red-50'
        }`}
      >
        <p className="font-semibold text-purple-800 mb-2">
          {index + 1}. {item.question}
        </p>
        <p className="text-sm text-gray-800 mb-1">
          <span className="font-medium">Votre réponse :</span>{' '}
          <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>
            {item.selected}
          </span>
        </p>
        {!isCorrect && (
          <p className="text-sm text-gray-800">
            <span className="font-medium">Bonne réponse :</span>{' '}
            <span className="text-green-700">{item.correct}</span>
          </p>
        )}
      </div>
    );
  })}
</div>


        <div className="flex justify-center mt-6">
          <button
            onClick={handleReplay}
            className="bg-pink-500 text-white font-semibold rounded-full py-2 px-6 hover:bg-pink-600 transition border-2 border-purple-700 shadow-md"
          >
            Rejouer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
