// components/GameOver.jsx
import React from "react";
import { motion } from "framer-motion";
import { RefreshCcw } from "lucide-react";

const GameOver = ({ won, moves, resetGame, isDarkMode }) => {
   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
         <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className={`p-8 rounded-lg shadow-xl max-w-md w-full ${
               isDarkMode ? "bg-gray-800" : "bg-white"
            }`}>
            <h2 className="text-2xl font-bold text-center mb-4">
               {won ? "Congratulations! 🎉" : "Game Over! ⏱️"}
            </h2>

            <p className="text-center mb-6">
               {won
                  ? `You matched all pairs in ${moves} moves!`
                  : "Time ran out! Try again and see if you can match all pairs before the timer ends."}
            </p>

            <div className="flex justify-center">
               <button
                  onClick={resetGame}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                  <RefreshCcw size={18} />
                  Play Again
               </button>
            </div>
         </motion.div>
      </motion.div>
   );
};

export default GameOver;
