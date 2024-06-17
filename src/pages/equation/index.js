import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

const Users = () => {
  const isMounted = useRef(false);
  const [data, setData] = useState('');

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  useEffect(() => {
    if (!isMounted.current) {
      fetchSums();
      isMounted.current = true;
    }
  }, []);

  const fetchSums = async () => {
    try {
      const response = await axios.post(`${baseUrl}getequation`);
      setData(response.data.equation); 
      console.log(response.data.equation);
      } catch (error) {
        console.error("Error fetching data:", error);
        }
  };
  const handleClick = () => {
   
  };
  return (              
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-blue-100 p-6 rounded-lg shadow-lg mt-2">
        <div className="border-b mb-1">
          <h2 className="text-lg font-bold">Equation</h2>
        </div>
          {data}
        <div className="grid gap-2 justify-items-start">
          <input className="rounded border-solid border-2 border-indigo-600" type="text"/>
          <div>
          <button 
          type="button" 
          class="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-2 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700"
          onClick={handleClick} 
          >
          Submit
        </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;

