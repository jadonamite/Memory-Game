import React from "react";
import { RefreshCcw } from "lucide-react";

const GameControls = ({
   gameType,
   setGameType,
   difficulty,
   setDifficulty,
   resetGame,
   isPlaying,
}) => {
   const handleTypeChange = (e) => {
      if (!isPlaying) {
         setGameType(e.target.value);
      }
   };

   const handleDifficultyChange = (e) => {
      if (!isPlaying) {
         setDifficulty(e.target.value);
      }
   };

   return (
      <div className="flex flex-wrap gap-4 mb-6">
         <div className="flex items-center">
            <label htmlFor="gameType" className="mr-2 font-medium">
               Game Type:
            </label>
            <select
               id="gameType"
               value={gameType}
               onChange={handleTypeChange}
               disabled={isPlaying}
               className={`px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${
                  isPlaying ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
               }`}>
               <option value="cars">Cars</option>
               <option value="arts">Art</option>
            </select>
         </div>

         <div className="flex items-center">
            <label htmlFor="difficulty" className="mr-2 font-medium">
               Difficulty:
            </label>
            <select
               id="difficulty"
               value={difficulty}
               onChange={handleDifficultyChange}
               disabled={isPlaying}
               className={`px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${
                  isPlaying ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
               }`}>
               <option value="Beginner">Beginner (2:00)</option>
               <option value="Pro">Pro (1:00)</option>
               <option value="Legend">Legends (0:30)</option>
            </select>
         </div>

         <button
            onClick={resetGame}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors">
            <RefreshCcw size={18} />
            Reset
         </button>
      </div>
   );
};

export default GameControls;
