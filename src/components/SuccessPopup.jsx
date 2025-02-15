import React from "react";

const SuccessPopup = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <h3 className="text-xl font-bold text-red-600 dark:text-red-400">Berhasil!</h3>
        <p className="text-gray-700 dark:text-gray-300 mt-2">{message}</p>
        <button onClick={onClose} className="mt-4 px-6 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-green-600 transition">
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
