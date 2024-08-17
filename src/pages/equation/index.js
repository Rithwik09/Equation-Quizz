import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const Users = () => {
  const [equation, setEquation] = useState('');
  const [answer, setAnswer] = useState('');
  const [answerError, setAnswerError] = useState('');
  const [answerResponse, setAnswerResponse] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [equationGenerated, setEquationGenerated] = useState(false);

  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const getRandomOperator = () => {
    const operators = ["+", "-", "*", "/", "^"];
    return operators[Math.floor(Math.random() * operators.length)];
  };

  const generateRandomEquation = (termsCount) => {
    let equation = getRandomInt(1, 10).toString();
    for (let i = 1; i < termsCount; i++) {
      const operator = getRandomOperator();
      const operand = getRandomInt(1, 10);
      equation += ` ${operator} ${operand}`;
    }
    return equation;
  };

  const infixToPostfix = (infix) => {
    const precedence = { "^": 4, "*": 3, "/": 3, "+": 2, "-": 2, "(": 1 };
    const operators = [];
    const postfix = [];
    const tokens = infix.match(/\d+|\+|\-|\*|\/|\^|\(|\)/g);

    for (let token of tokens) {
      if (/\d/.test(token)) {
        postfix.push(token);
      } else if (token === "(") {
        operators.push(token);
      } else if (token === ")") {
        while (operators.length && operators[operators.length - 1] !== "(") {
          postfix.push(operators.pop());
        }
        operators.pop();
      } else {
        while (
          operators.length &&
          precedence[operators[operators.length - 1]] >= precedence[token]
        ) {
          postfix.push(operators.pop());
        }
        operators.push(token);
      }
    }
    while (operators.length) {
      postfix.push(operators.pop());
    }
    return postfix;
  };

  const evaluatePostfix = (postfix) => {
    const stack = [];
    for (let token of postfix) {
      if (/\d/.test(token)) {
        stack.push(parseFloat(token));
      } else {
        const b = stack.pop();
        const a = stack.pop();
        let result;
        switch (token) {
          case "+":
            result = a + b;
            break;
          case "-":
            result = a - b;
            break;
          case "*":
            result = a * b;
            break;
          case "/":
            result = a / b;
            break;
          case "^":
            result = Math.pow(a, b);
            break;
          default:
            throw new Error("Unsupported operator");
        }
        stack.push(result);
      }
    }
    return stack.pop();
  };

  const generateAndEvaluateRandomEquation = (termsCount) => {
    const equation = generateRandomEquation(termsCount);
    const postfix = infixToPostfix(equation);
    const answer = evaluatePostfix(postfix);
    return { equation, answer };
  };

  const handleGenerateEquation = () => {
    const { equation, answer } = generateAndEvaluateRandomEquation(4);
    setEquation(equation);
    setCorrectAnswer(answer);
    setAnswer('');
    setAnswerError('');
    setAnswerResponse('');
    setShowCorrectAnswer(false);
    setEquationGenerated(true);
  };

  const handleSubmit = () => {
    if (!answer.trim()) {
      setAnswerError('Enter Answer');
      return;
    }
    if (parseFloat(answer) === correctAnswer) {
      setAnswerResponse('Correct');
      setAnswerError('');
    } else {
      setAnswerResponse('');
      setAnswerError('Incorrect');
    }
  };

  const handleNextEquation = () => {
    handleGenerateEquation();
    setAnswerResponse('');
  };

  const handleCheckAnswer = () => {
    setShowCorrectAnswer(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-blue-100 p-6 rounded-lg shadow-lg mt-2">
        <div className="border-b mb-1">
          <h2 className="text-lg font-bold">Equation</h2>
        </div>
        <p>{equation || 'Click "Generate" to get a new equation'}</p>
        {showCorrectAnswer && <p className="text-blue-500">Correct Answer: {correctAnswer}</p>}
        <div className="grid gap-2 justify-items-start">
          <input
            className="rounded border-solid border-2 border-indigo-600"
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          {answerError && <p className="text-red-500">{answerError}</p>}
          {answerResponse && <p className="text-green-500">{answerResponse}</p>}
          <div className="flex gap-3 justify-items-start">
            {!equationGenerated && (
              <button
                className="text-white bg-green-700 hover:bg-green-800 rounded-lg text-sm px-2 py-1.5"
                onClick={handleGenerateEquation}
              >
                Generate Equation
              </button>
            )}
            {equationGenerated && (
              <>
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-2 py-1.5"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  className="text-white bg-yellow-700 hover:bg-yellow-800 rounded-lg text-sm px-2 py-1.5"
                  onClick={handleCheckAnswer}
                >
                  Check Answer
                </button>
                <button
                  className="text-white bg-gray-700 hover:bg-gray-800 rounded-lg text-sm px-2 py-1.5"
                  onClick={handleNextEquation}
                >
                  Next
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
