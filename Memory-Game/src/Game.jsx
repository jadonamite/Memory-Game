import React, { useState, useEffect, use } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GameBoard from "./components/GameBoard";
import GameControls from "./components/GameControls";
import ThemeToggle from "./components/ThemeToggle";
import Timer from "./components/Timer";
import GameOver from "./components/GameOver";
import "./App.css";
import { image } from "framer-motion/client";

export default function Game() {


   const [gameType, setGameType] = useState("Cars");
   const [difficulty, setDifficulty] = useState("Pro");
   const [cards, setCards] = useState([]);
   const [flipped, setFlipped] = useState([]);
   const [matched, setMatched] = useState([]);
   const [moves, setMoves] = useState(0);
   const [gamesOver, setGamesOver] = useState(false);
   const [isPlaying, setIsPlaying] = useState(false);
   const [isDarkMode, setIsDarkMode] = useState(false);
   const [timeLeft, setTimeLeft] = useState(0);

   const timersettings ={
      Beginner : 120,
      Pro : 60,
      Legend : 30
   }
   useEffect(() => {
      resetGame();
   },[gameType]);

   const initializeCards = () => {   
      const cardImages = Array.from({ length: 8 }, (_, i) => ({
         id :  i,
         image: `assets/Games/${gameType}/${
            gameType === "cars" ? "Image" : "Pics"
         }/${i + 1}.jpg`,
          matched: false,
   }));
}
