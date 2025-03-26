import React, { useState, useEffect, use } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GameBoard from "./components/GameBoard";
import GameControls from "./components/GameControls";
import ThemeToggle from "./components/ThemeToggle";
import Timer from "./components/Timer";
import GameOver from "./components/GameOver";
import "./App.css";
import { image } from "framer-motion/client";
import { Shuffle } from "lucide-react";

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

   //Start game
   useEffect(() => {
      resetGame();
   },[gameType]);



   const initializeCards = () => {   

      // create an Array of each pair of cards
      const cardImages = Array.from({ length: 8 }, (_, i) => ({
         id :  i,
         image: `assets/Games/${gameType}/${
            gameType === "cars" ? "Image" : "Pic"
         }/${i + 1}.jpg`,
          matched: false,
   }));


   // Shuffle the created cards
   const shuffledCards = [...cardImages, ...cardImages].map ((card) => ({...card, key: Math.random()}))
   .sort(() => Math.random() - 0.5);

   return shuffledCards;

   // Reset Game

   const resetGame = () => {
      setCards(initializeCards());
      setFlipped([]);
      setMatched([]);
      setMoves(0);
      setGamesOver(false);
      setIsPlaying(false);
      setTimeLeft(timersettings[difficulty]);
      setIsPlaying(false);
   };

   // Handle Card Click

   const handleCardClick = (id, key) => {
      // Starts Timer when user clicks on the first card
      if (!isPlaying) {
         setIsPlaying(true);
      }

      // Doesn't allow more than two cards to be clicked 
      if (flipped.length === 2) return;
      // Doesnt allow matched cards to be clicked
      if (matched.includes(key))return;
      // Doesn't allow the same card to be clicked twice
      if (flipped.length === 1 && flipped[0].key=== key) return;

      // Add Cards to Flipped Array
      setFlipped(flipped => [...flipped, {id, key}]);

      //Check for matches when two cards are flipped
      if (flipped.length === 1){
         setMoves(moves + 1);
         // check if the clicked Images are the same 
         if (flipped[0].id === id){
            setMatched(matched => [...matched, flipped[0].key, key]);
         }

         //reset cards after 1.5 second

         setTimeout(() => {
            setFlipped([]);
         }, 1500);


         useEffect(() => {
            if (matched.length === cards.length) {
               setGamesOver(true);
               setIsPlaying(false);
            }
         }, [matched]);

         //Automate timer
         useEffect(() => {
            let timer;
            if (isPlaying && timeLeft > 0) {
            timer = setTimeout(() => {
                setTimeLeft((timeLeft) => timeLeft - 1)
         }, 1000);
            } else if (isPlaying && timeLeft === 0) {  
               setGamesOver(true);
               setIsPlaying(false);
            } 

  return () => clearInterval(timer);
         }, [isPlaying, timeLeft]);



      }









   }
}
