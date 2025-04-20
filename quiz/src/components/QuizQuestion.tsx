import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { trivia } from '../server/trivia';

function decodeHtml(html: string): string {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

const QuizQuestion = () => {
  const { questions, loading, error } = trivia();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const playerName = localStorage.getItem('playerName');

  // ✅ استئناف التقدم عند العودة
  useEffect(() => {
    if (playerName) {
      const savedCurrent = localStorage.getItem(`${playerName}_currentQuestion`);
      const savedScore = localStorage.getItem(`${playerName}_score`);
      if (savedCurrent) setCurrent(parseInt(savedCurrent));
      if (savedScore) setScore(parseInt(savedScore));
    }
  }, [playerName]);

  const handleAnswer = (answer: string) => {
    if (questions.length === 0 || !playerName) return;

    const currentQuestion = questions[current];
    const isCorrect = answer === currentQuestion.correct_answer;
    const updatedScore = isCorrect ? score + 1 : score;
    setScore(updatedScore);

    // ✅ تخزين النتيجة الحالية
    localStorage.setItem(`${playerName}_score`, updatedScore.toString());

    // ✅ تخزين الجواب المُختار والجواب الصحيح
    const userAnswers = JSON.parse(localStorage.getItem(`${playerName}_answers`) || '[]');
    userAnswers.push({
      question: currentQuestion.question,
      selected: answer,
      correct: currentQuestion.correct_answer,
    });
    localStorage.setItem(`${playerName}_answers`, JSON.stringify(userAnswers));

    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
      localStorage.setItem(`${playerName}_currentQuestion`, next.toString());
    } else {
      localStorage.removeItem(`${playerName}_currentQuestion`);
      navigate('/results');
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-300 text-white text-xl">
        Chargement...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-300 text-white text-xl">
        {error}
      </div>
    );

  if (questions.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-300 text-white text-xl">
        Aucune question
      </div>
    );

  const currentQuestion = questions[current];
  const allAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
  const shuffled = allAnswers.sort(() => Math.random() - 0.5);

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-b from-pink-300 to-purple-400">
      {/* Progress Bar */}
      <div className="w-full max-w-md mb-4">
        <div className="w-full h-6 bg-black rounded-full flex items-center p-1">
          <div
            className="h-4 bg-pink-500 rounded-full"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-center text-white mt-2">
          Question {current + 1} sur {questions.length}
        </p>
      </div>

      {/* Question Card */}
      <div className="w-full max-w-md mt-8">
        <div className="bg-purple-100 rounded-3xl p-6 pt-12 pb-6 relative mb-8 border-4 border-purple-600">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center border-4 border-purple-600">
            <span className="text-4xl text-white font-bold">?</span>
          </div>
          <p className="text-center text-gray-700 font-medium text-base mt-2">
            {decodeHtml(currentQuestion.question)}
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4">
          {shuffled.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(answer)}
              className="relative flex items-center justify-start pl-6 pr-4 py-2 border-2 border-purple-600 bg-purple-200 text-black rounded-full hover:bg-purple-100 transition shadow-md"
            >
              <div className="absolute -left-3 w-4 h-4 bg-pink-500 rounded-full"></div>
              <span className="text-sm">{decodeHtml(answer)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
