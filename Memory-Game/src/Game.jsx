import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import GameBoard from "./components/GameBoard";
import GameControls from "./components/GameControls";
import ThemeToggle from "./components/ThemeToggle";
import Timer from "./components/Timer";
import GameOver from "./components/GameOver";
import LoadingPage from "./components/LoadingPage";
import "./App.css";

export default function Game() {
   const [gameType, setGameType] = useState("cars");
   const [difficulty, setDifficulty] = useState("Beginner");
   const [cards, setCards] = useState([]);
   const [flipped, setFlipped] = useState([]);
   const [matched, setMatched] = useState([]);
   const [moves, setMoves] = useState(0);
   const [gameOver, setGameOver] = useState(false);
   const [isPlaying, setIsPlaying] = useState(false);
   const [isDarkMode, setIsDarkMode] = useState(false);
   const [timeLeft, setTimeLeft] = useState(0);
   const [isLoading, setIsLoading] = useState(true);

   const timersettings = {
      Beginner: 120,
      Pro: 60,
      Legend: 30,
   };

   // Loading effect
   useEffect(() => {
      const timer = setTimeout(() => {
         setIsLoading(false);
      }, 5000);

      return () => clearTimeout(timer);
   }, []);

   // Game initialization effect
   useEffect(() => {
      if (!isLoading) {
         resetGame();
      }
   }, [gameType, isLoading]);

   // Reset Game
   const resetGame = () => {
      setCards(initializeCards());
      setFlipped([]);
      setMatched([]);
      setMoves(0);
      setGameOver(false);
      setIsPlaying(false);
      setTimeLeft(timersettings[difficulty]);
   };

   // Initialize Cards
   const initializeCards = () => {
      const cardImages = Array.from({ length: 8 }, (_, i) => ({
         id: i,
         image: `assets/Games/${gameType}/${
            gameType === "cars" ? "Image" : "Pic"
         }${i + 1}.jpg`,
         matched: false,
      }));

      const shuffledCards = [...cardImages, ...cardImages]
         .map((card) => ({ ...card, key: Math.random() }))
         .sort(() => Math.random() - 0.5);

      return shuffledCards;
   };

   // Handle Card Click
   const handleCardClick = (id, key) => {
      if (!isPlaying) {
         setIsPlaying(true);
      }

      if (flipped.length === 2) return;
      if (matched.includes(key)) return;
      if (flipped.length === 1 && flipped[0].key === key) return;

      setFlipped((flipped) => [...flipped, { id, key }]);

      if (flipped.length === 1) {
         setMoves(moves + 1);
         if (flipped[0].id === id) {
            setMatched((matched) => [...matched, flipped[0].key, key]);
         }

         setTimeout(() => {
            setFlipped([]);
         }, 1500);
      }
   };

   useEffect(() => {
      if (matched.length === cards.length) {
         setGameOver(true);
         setIsPlaying(false);
      }
   }, [matched, cards.length]);

   // Automate timer
   useEffect(() => {
      let timer;
      if (isPlaying && timeLeft > 0) {
         timer = setTimeout(() => {
            setTimeLeft((timeLeft) => timeLeft - 1);
         }, 1000);
      } else if (isPlaying && timeLeft === 0) {
         setGameOver(true);
         setIsPlaying(false);
      }

      return () => clearInterval(timer);
   }, [isPlaying, timeLeft]);

   // Toggle Theme
   const toggleTheme = () => {
      setIsDarkMode(!isDarkMode);
      document.documentElement.classList.toggle("dark");
   };

   // Effect to handle difficulty change
   useEffect(() => {
      if (!isLoading) {
         resetGame();
      }
   }, [difficulty, isLoading]);

   // Render method
   if (isLoading) {
      return <LoadingPage />;
   }

   return (
      <div
         className={`transition-colors duration-200 ${
            isDarkMode ? "layout-dark" : "layout-light"
         }`}>
         <div className="container mx-auto px-4 py-8">
            <header className="header">
               <h1 className="text-3xl font-bold">Memory Game</h1>
               <div className="svg" onClick={toggleTheme}>
                  <ThemeToggle
                     isDarkMode={isDarkMode}
                     toggleTheme={toggleTheme}
                  />
               </div>
            </header>

            <GameControls
               gameType={gameType}
               setGameType={setGameType}
               difficulty={difficulty}
               setDifficulty={setDifficulty}
               resetGame={resetGame}
               isPlaying={isPlaying}
               isDarkMode={isDarkMode}
            />

            <div className="underOptions">
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
