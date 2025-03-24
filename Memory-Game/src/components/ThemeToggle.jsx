import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
   return (
      <motion.button
         className={`p-2 rounded-full ${
            isDarkMode ? "bg-blue-800" : "bg-blue-200"
         } flex items-center justify-center`}
         onClick={toggleTheme}
         whileTap={{ scale: 0.9 }}
         animate={{ rotate: isDarkMode ? 180 : 0 }}
         transition={{ duration: 0.5 }}>
         <motion.div
            initial={false}
            animate={{ opacity: isDarkMode ? 0 : 1, y: isDarkMode ? 10 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute">
            <Sun size={24} className="text-yellow-600" />
         </motion.div>

         <motion.div
            initial={false}
            animate={{ opacity: isDarkMode ? 1 : 0, y: isDarkMode ? 0 : -10 }}
            transition={{ duration: 0.2 }}
            className="absolute">
            <Moon size={24} className="text-yellow-300" />
         </motion.div>
      </motion.button>
   );
};

export default ThemeToggle;
