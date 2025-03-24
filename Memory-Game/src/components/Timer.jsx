// components/Timer.jsx
import React from "react";
import { Clock } from "lucide-react";

const Timer = ({ timeLeft, isPlaying }) => {
   // Format time as MM:SS
   const minutes = Math.floor(timeLeft / 60);
   const seconds = timeLeft % 60;
   const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

   return (
      <div
         className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            isPlaying
               ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
               : "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
         }`}>
         <Clock size={20} />
         <span className="font-mono text-lg font-bold">{formattedTime}</span>
      </div>
   );
};

export default Timer;
