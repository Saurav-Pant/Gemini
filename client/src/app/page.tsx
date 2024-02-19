"use client"

import React, { useState } from 'react';

const Page = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      setResponse(data.response);
      console.log(data)
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Generative AI Page</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <label htmlFor="prompt" className="block mb-2">Enter your prompt:</label>
        <input
          type="text"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="border text-black px-4 py-2 rounded-md w-full mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Generate</button>
      </form>
      {response && (
        <div>
          <h2 className="text-xl font-bold mb-2">Generated Response:</h2>
          <p className="">{response}</p>
        </div>
      )}
    </div>
  );
};

export default Page;
