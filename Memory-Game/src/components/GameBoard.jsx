// components/GameBoard.jsx
import React from "react";
import { motion } from "framer-motion";
import "./../App.css";

const GameBoard = ({
   cards,
   flipped,
   matched,
   handleCardClick,
   isDarkMode,
}) => {
   return (
      <div className="tiles-container">
         {cards.map((card) => {
            const isFlipped = flipped.some((item) => item.key === card.key);
            const isMatched = matched.includes(card.key);

            return (
               <motion.div
                  key={card.key}
                  className="board"
                  whileHover={{ scale: isFlipped || isMatched ? 1 : 1.05 }}
                  onClick={() => handleCardClick(card.id, card.key)}>
                  <div className="contained">
                     <motion.div
                        className="maintain backface-hidden "
                        animate={{ rotateY: isFlipped || isMatched ? 180 : 0 }}
                        transition={{
                           duration: 0.3,
                           type: "spring",
                           stiffness: 200,
                           damping: 15,
                        }}
                        style={{ transformStyle: "preserve-3d" }}>
                        <div
                           className={`card ${
                              isDarkMode ? "card-dark" : "card-light"
                           }`}>
                           <span className="text-white text-4xl">?</span>
                        </div>
                     </motion.div>

                     <motion.div
                        className="maintain backface-hidden"
                        initial={{ rotateY: 180 }}
                        animate={{ rotateY: isFlipped || isMatched ? 0 : 180 }}
                        transition={{
                           duration: 0.3,
                           type: "spring",
                           stiffness: 200,
                           damping: 15,
                        }}
                        style={{ transformStyle: "preserve-3d" }}>
                        <img
                           src={card.image}
                           alt="Card"
                           className="w-full h-full object-cover"
                        />
                     </motion.div>
                  </div>
               </motion.div>
            );
         })}
      </div>
   );
};

export default GameBoard;
