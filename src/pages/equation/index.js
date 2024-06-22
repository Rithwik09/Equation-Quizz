import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

const Users = () => {
  const isMounted = useRef(false);
  const [data, setData] = useState('');
  const [answer, setAnswer] = useState('');
  const [answerError, setAnswerError] = useState('');
  const [answerResponse, setAnswerResponse] = useState('');
  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (!isMounted.current) {
      fetchSums();
      isMounted.current = true;
    }
  }, []);

  const fetchSums = async () => {
    try {
      const response = await axios.get(`${baseUrl}getequation`);
      setData(response.data.equation);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    setAnswer(e.target.value);
    if (e.target.value.trim() !== '') {
      setAnswerError('');
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!answer.trim()) {
      setAnswerError('Enter Answer');
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}checkequation`, {
        equation: data,
        answer: answer
      });
      if (response.data.result === 'Correct') {
        setAnswerResponse('Correct');
        setAnswerError(''); 
        fetchSums();
        setAnswer('');
        setTimeout(() => {
          setAnswerResponse('');
        }, 1500);
      } else if (response.data.result === 'Incorrect') {
        setAnswerError('Incorrect');
        setAnswerResponse(''); 
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNext = () => {
    setAnswerError('');
    setAnswerResponse('');
    fetchSums();
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-blue-100 p-6 rounded-lg shadow-lg mt-2">
        <div className="border-b mb-1">
          <h2 className="text-lg font-bold">Equation</h2>
        </div>
        <p>{data}</p>
        <div className="grid gap-2 justify-items-start">
          <input
            className="rounded border-solid border-2 border-indigo-600"
            type="text"
            value={answer}
            onChange={handleInputChange}
          />
          {answerError && <p className="text-red-500">{answerError}</p>}
          {answerResponse && <p className="text-green-500">{answerResponse}</p>}
          <div className="flex gap-3 justify-items-start">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-2 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={handleClick}
            >
              Submit
            </button>
            <button
            className="text-white bg-green-700 hover:bg-green-800 rounded-lg text-sm px-2 py-1.5 dark:bg-green-600 dark:hover:bg-green-700"
            onClick={handleNext}
            >
              Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
