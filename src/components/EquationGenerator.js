import React, { useState } from 'react';

const EquationGenerator = () => {
  const [equation, setEquation] = useState('');
  const [answer, setAnswer] = useState('');

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomOperator() {
    const operators = ["+", "-", "*", "/", "^"];
    return operators[Math.floor(Math.random() * operators.length)];
  }

  function generateRandomEquation(termsCount) {
    let equation = getRandomInt(1, 10).toString();
    for (let i = 1; i < termsCount; i++) {
      const operator = getRandomOperator();
      const operand = getRandomInt(1, 10);
      equation += ` ${operator} ${operand}`;
    }
    return equation;
  }

  function infixToPostfix(infix) {
    const precedence = {
      "^": 4,
      "*": 3,
      "/": 3,
      "+": 2,
      "-": 2,
      "(": 1,
    };

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
  }

  function evaluatePostfix(postfix) {
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
  }

  function generateAndEvaluateRandomEquation(termsCount) {
    const equation = generateRandomEquation(termsCount);
    const answer = evaluateEquation(equation);
    return { equation, answer };
  }

  const handleGenerateEquation = () => {
    const { equation, answer } = generateAndEvaluateRandomEquation(4);
    setEquation(equation);
    setAnswer(answer);
  };

  return (
    <div>
      <button
        onClick={handleGenerateEquation}
        className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-2 py-1.5"
      >
        Generate Equation
      </button>
      {equation && (
        <div>
          <p>Equation: {equation}</p>
          <p>Answer: {answer}</p>
        </div>
      )}
    </div>
  );
};

export default EquationGenerator;
