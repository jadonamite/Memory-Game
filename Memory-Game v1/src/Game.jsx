import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GameBoard from "./components/GameBoard";
import GameControls from "./components/GameControls";
import ThemeToggle from "./components/ThemeToggle";
import Timer from "./components/Timer";
import GameOver from "./components/GameOver";
import "./App.css";

function Game() {
   const [gameType, setGameType] = useState("cars");
   const [difficulty, setDifficulty] = useState(slow);
   const [cards, setCards] = useState([]);
   const [flipped, setFlipped] = useState([]);
   const [matched, setMatched] = useState([]);
   const [moves, setMoves] = useState(0);
   const [gameOver, setGameOver] = useState(false);
   const [isPlaying, setIsPlaying] = useState(false);
   const [timeLeft, setTimeLeft] = useState(0);
   const [isDarkMode, setIsDarkMode] = useState(false);

   // Timer settings based on difficulty
   const timerSettings = {
      slow: 120,
      normal: 60,
      fast: 30,
   };

   // Initialize game
   useEffect(() => {
      resetGame();
   }, [gameType]);

   // Create and shuffle cards
   const initializeCards = () => {
      // Create array of 8 pairs of cards (16 total)
      const cardImages = Array.from({ length: 8 }, (_, i) => ({
         id: i,
         image: `assets/Games/${gameType}/${
            gameType === "cars" ? "Image" : "Pic"
         }${i + 1}.jpg`,
         matched: false,
      }));

      // Duplicate and shuffle
      const shuffledCards = [...cardImages, ...cardImages]
         .map((card) => ({ ...card, key: Math.random() }))
         .sort(() => Math.random() - 0.5);

      return shuffledCards;
   };

   // Reset game
   const resetGame = () => {
      setCards(initializeCards());
      setFlipped([]);
      setMatched([]);
      setMoves(0);
      setGameOver(false);
      setTimeLeft(timerSettings[difficulty]);
      setIsPlaying(false);
   };

   // Handle card click
   const handleCardClick = (id, key) => {
      // Start timer on first move
      if (!isPlaying) {
         setIsPlaying(true);
      }

      // Don't allow more than 2 cards flipped at once
      if (flipped.length === 2) return;

      // Don't allow already matched cards to be clicked
      if (matched.includes(key)) return;

      // Don't allow the same card to be clicked twice
      if (flipped.length === 1 && flipped[0].key === key) return;

      // Add card to flipped array
      setFlipped([...flipped, { id, key }]);

      // Check for matches when 2 cards are flipped
      if (flipped.length === 1) {
         setMoves(moves + 1);

         // Check if ids match (same image)
         if (flipped[0].id === id) {
            // Match found
            setMatched([...matched, flipped[0].key, key]);
         }

         // Reset flipped after delay
         setTimeout(() => {
            setFlipped([]);
         }, 1000);
      }
   };

   // Check for game over
   useEffect(() => {
      if (matched.length === 16) {
         setGameOver(true);
         setIsPlaying(false);
      }
   }, [matched]);

   // Timer countdown
   useEffect(() => {
      let timer;
      if (isPlaying && timeLeft > 0) {
         timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
         }, 1000);
      } else if (isPlaying && timeLeft === 0) {
         setGameOver(true);
         setIsPlaying(false);
      }

      return () => clearTimeout(timer);
   }, [isPlaying, timeLeft]);

   // Toggle theme
   const toggleTheme = () => {
      setIsDarkMode(!isDarkMode);
      document.documentElement.classList.toggle("dark");
   };

   return (
      <div
         className={`min-h-screen transition-colors duration-300 ${
            isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
         }`}>
         <div className="container mx-auto px-4 py-8">
            <header className="flex justify-between items-center mb-8">
               <h1 className="text-3xl font-bold">Memory Game</h1>
               <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            </header>

            <GameControls
               gameType={gameType}
               setGameType={setGameType}
               difficulty={difficulty}
               setDifficulty={setDifficulty}
               resetGame={resetGame}
               isPlaying={isPlaying}
            />

            <div className="flex justify-between items-center mb-4">
               <div className="text-lg font-medium">Moves: {moves}</div>
               <Timer timeLeft={timeLeft} isPlaying={isPlaying} />
            </div>

            <GameBoard
               cards={cards}
               flipped={flipped}
               matched={matched}
               handleCardClick={handleCardClick}
               isDarkMode={isDarkMode}
            />

            <AnimatePresence>
               {gameOver && (
                  <GameOver
                     won={matched.length === 16}
                     moves={moves}
                     resetGame={resetGame}
                     isDarkMode={isDarkMode}
                  />
               )}
            </AnimatePresence>
         </div>
      </div>
   );
}

export default Game;
