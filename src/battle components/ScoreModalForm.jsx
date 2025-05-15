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
      <div className="relative bg-base-100 rounded-lg shadow-lg p-6 w-120">
        <h2 className="text-2xl font-semibold mb-4">
          You are gonna be the very best!
        </h2>
        <h2 className="text-lg mb-4">Log your score in the Leaderboard:</h2>
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
          <div className="w-[50%] flex justify-center items-center text-2xl font-semibold mb-4">
            {score}
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="btn btn-primary p-4 mx-auto text-xl font-semibold rounded-lg"
        >
          Submit!
        </button>
      </div>
    </div>
  );
};

export default ScoreModalForm;
