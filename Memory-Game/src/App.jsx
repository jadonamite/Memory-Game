import React from "react";
import { useState } from "react";

import "./App.css";
import "./index.css";
import MemoryGame from "./Game";

function App() {
   const [count, setCount] = useState(0);

   return <MemoryGame />;
}

export default App;
