import { useEffect, useState } from 'react';

export type Question = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export const trivia = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedQuestions = localStorage.getItem('triviaQuestions');

    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
      setLoading(false);
      return;
    }

    const fetchTrivia = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://opentdb.com/api.php?amount=10&category=32&type=multiple');
        if (!res.ok) throw new Error("Erreur de l'API Trivia");

        const data = await res.json();
        setQuestions(data.results);

        localStorage.setItem('triviaQuestions', JSON.stringify(data.results));
      } catch (err) {
        setError("Impossible de charger les questions. Réessaie plus tard.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrivia();
  }, []);

  return { questions, loading, error };
};
