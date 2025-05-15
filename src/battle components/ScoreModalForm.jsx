import React, { useState } from "react";

const ScoreModalForm = ({ isOpen, onClose, onSubmit, score }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = () => {
    if (!username.trim()) return;
    onSubmit(username.trim());
    setUsername("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative bg-base-100 rounded-lg shadow-lg p-6 w-100">
        <h2 className="text-2xl font-semibold mb-4">Good battle!</h2>
        <h2 className="text-lg font-semibold mb-4">
          Log your score in the Leaderboard:
        </h2>
        <div className="absolute top-2 right-4 flex justify-between items-center">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            &times;
          </button>
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-[50%] border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="w-[50%] justify-between items-center">{score}</div>
        </div>
        <button
          onClick={handleSubmit}
          className="w-[90px] bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ScoreModalForm;
