import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";
import { Sun, Moon } from "lucide-react";
// import test from "./assets/Games/cars/Image1.jpg";

const imageSets = {
   cars: [...Array(8).keys()].flatMap((i) => [
      `assets/Games/cars/Image${i + 1}.jpg`,
      `assets/Games/cars/Image${i + 1}.jpg`,
   ]),
   arts: [...Array(8).keys()].flatMap((i) => [
      `assets/Games/arts/Pic${i + 1}.jpg`,
      `assets/Games/arts/Pic${i + 1}.jpg`,
   ]),
};

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

function Card({ img, index, isFlipped, onClick }) {
   return (
      <motion.div
         className="w-24 h-24 bg-gray-300 dark:bg-gray-700 flex items-center justify-center cursor-pointer"
         onClick={() => onClick(index)}
         animate={{ rotateY: isFlipped ? 0 : 180 }}
         transition={{ duration: 0.5 }}>
         {isFlipped && (
            <img src={img} alt="" className="w-full h-full object-cover" />
         )}
      </motion.div>
   );
}

function MemoryGame() {
   const [gameType, setGameType] = useState("cars");
   const [cards, setCards] = useState(shuffleArray([...imageSets[gameType]]));
   const [selected, setSelected] = useState([]);
   const [matched, setMatched] = useState([]);
   const [timer, setTimer] = useState(30);
   const [level, setLevel] = useState("normal");
   const [darkMode, setDarkMode] = useState(false);

   useEffect(() => {
      if (selected.length === 2) {
         const [first, second] = selected;
         if (cards[first] === cards[second]) {
            setMatched([...matched, first, second]);
         }
         setTimeout(() => setSelected([]), 1000);
      }
   }, [selected]);

   useEffect(() => {
      if (timer > 0) {
         const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
         return () => clearInterval(interval);
      }
   }, [timer]);

   const handleClick = (index) => {
      if (!selected.includes(index) && selected.length < 2) {
         setSelected([...selected, index]);
      }
   };

   const handleReset = () => {
      setCards(shuffleArray([...imageSets[gameType]]));
      setSelected([]);
      setMatched([]);
      setTimer(level === "slow" ? 60 : level === "fast" ? 15 : 30);
   };

   const handleGameTypeChange = (e) => {
      setGameType(e.target.value);
      setCards(shuffleArray([...imageSets[e.target.value]]));
      handleReset();
   };

   return (
      <div
         className={`flex flex-col items-center space-y-4 p-4 ${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
         }`}>
         <h1 className="text-2xl font-bold">Memory Game</h1>
         <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-300 dark:bg-gray-700 transition-transform transform hover:scale-110">
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
         </button>
         <div className="flex space-x-4">
            <select
               onChange={handleGameTypeChange}
               value={gameType}
               className="border p-2 rounded bg-gray-200 dark:bg-gray-700">
               <option value="cars">Cars</option>
               <option value="arts">Arts</option>
            </select>
            <select
               onChange={(e) => setLevel(e.target.value)}
               value={level}
               className="border p-2 rounded bg-gray-200 dark:bg-gray-700">
               <option value="slow">Slow (60s)</option>
               <option value="normal">Normal (30s)</option>
               <option value="fast">Fast (15s)</option>
            </select>
         </div>
         <div className="grid grid-cols-4 gap-4">
            {cards.map((img, index) => (
               <Card
                  key={index}
                  img={img}
                  index={index}
                  isFlipped={
                     selected.includes(index) || matched.includes(index)
                  }
                  onClick={handleClick}
               />
            ))}
         </div>
         <p className="text-lg">Time Left: {timer}s</p>
         <button
            onClick={handleReset}
            className="bg-blue-500 text-white px-4 py-2 rounded">
            Reset
         </button>
      </div>
   );
}

export default MemoryGame;
