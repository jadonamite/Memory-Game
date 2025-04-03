const { createFrame } = require("@framesjs/core");

let gameState = {
   cards: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
   ].sort(() => Math.random() - 0.5),
   flipped: Array(16).fill(false),
   matched: Array(16).fill(false),
   firstFlip: null,
   cursor: 0,
};

module.exports = async (req, res) => {
   if (req.method === "POST") {
      const { buttonIndex } = req.body.untrustedData; // 1-4

      if (buttonIndex === 1) gameState.cursor = (gameState.cursor + 1) % 16; // Right
      if (buttonIndex === 2)
         gameState.cursor = (gameState.cursor - 1 + 16) % 16; // Left
      if (buttonIndex === 3) gameState.cursor = (gameState.cursor + 4) % 16; // Down
      if (buttonIndex === 4 && !gameState.matched[gameState.cursor]) {
         // Flip
         if (gameState.firstFlip === null) {
            gameState.flipped[gameState.cursor] = true;
            gameState.firstFlip = gameState.cursor;
         } else {
            gameState.flipped[gameState.cursor] = true;
            const firstCard = gameState.cards[gameState.firstFlip];
            const secondCard = gameState.cards[gameState.cursor];
            if (firstCard === secondCard) {
               gameState.matched[gameState.firstFlip] = true;
               gameState.matched[gameState.cursor] = true;
            }
            gameState.flipped = gameState.matched.slice(); // Reset non-matched
            gameState.firstFlip = null;
         }
      }
   }

   // Render Frame
   const imageUrl = `https://memorygamebyweb3nova.vercel.app/memory-frame-image?state=${encodeURIComponent(
      JSON.stringify(gameState)
   )}`;
   res.status(200).send(
      createFrame({
         image: imageUrl,
         buttons: [
            { label: "Right" },
            { label: "Left" },
            { label: "Down" },
            { label: "Flip" },
         ],
         postUrl: "https://memorygamebyweb3nova.vercel.app/api/memory-frame",
      })
   );
};
