// components/GameBoard.jsx
import React from "react";
import { motion } from "framer-motion";

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
                  className={`aspect-square cursor-pointer rounded-lg overflow-hidden ${
                     isDarkMode ? "shadow-blue-500/30" : "shadow-blue-500/20"
                  } shadow-lg`}
                  whileHover={{ scale: isFlipped || isMatched ? 1 : 1.05 }}
                  onClick={() => handleCardClick(card.id, card.key)}>
                  <div className="relative w-full h-full">
                     <motion.div
                        className="absolute w-full h-full backface-hidden bg-red-500"
                        animate={{ rotateY: isFlipped || isMatched ? 180 : 0 }}
                        transition={{
                           duration: 0.6,
                           type: "spring",
                           stiffness: 300,
                           damping: 20,
                        }}
                        style={{ transformStyle: "preserve-3d" }}>
                        <div
                           className={`w-full h-full ${
                              isDarkMode ? "bg-[#021d11]" : "bg-[#69ccb6]"
                           } rounded-lg flex items-center justify-center`}>
                           <span className="text-white text-4xl">?</span>
                        </div>
                     </motion.div>

                     <motion.div
                        className="absolute w-full h-full backface-hidden"
                        initial={{ rotateY: 180 }}
                        animate={{ rotateY: isFlipped || isMatched ? 0 : 180 }}
                        transition={{
                           duration: 0.6,
                           type: "spring",
                           stiffness: 300,
                           damping: 20,
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
