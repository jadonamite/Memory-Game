# Memory Game

A classic card-matching memory game built with React, Tailwind CSS, and Framer Motion. Test your memory by matching pairs of cards before the timer runs out!

## Features

-  **Card Matching**: Flip cards and find matching pairs to win
-  **Multiple Themes**: Choose between "Cars" and "Art" card sets
-  **Difficulty Levels**: Three timer settings (Slow, Normal, Fast)
-  **Dark Mode**: Toggle between light and dark themes
-  **Responsive Design**: Play on any device
-  **Animations**: Smooth card flipping and UI transitions

## Demo

[Live Demo](#) - Coming soon!

## Table of Contents

-  [Installation](#installation)
-  [Usage](#usage)
-  [Game Rules](#game-rules)
-  [Project Structure](#project-structure)
-  [Technologies Used](#technologies-used)
-  [Customization](#customization)
-  [Contributing](#contributing)
-  [License](#license)

## Installation

### Prerequisites

-  Node.js (v14.0.0 or higher)
-  npm (v6.0.0 or higher)

### Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/memory-game.git
cd memory-game
```

2. Install dependencies:

```bash
npm install
```

3. Add your card images to:

   -  `/public/assets/Games/cars/Image1.jpeg` through `Image8.jpeg`
   -  `/public/assets/Games/art/Pics1.jpeg` through `Pics8.jpeg`

4. Start the development server:

```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

The game is intuitive and easy to play:

1. Select your preferred game type (Cars or Art)
2. Choose a difficulty level:
   -  Slow: 2 minutes
   -  Normal: 1 minute
   -  Fast: 30 seconds
3. Click "Reset" to start a new game
4. Click cards to reveal their images
5. Try to find all matching pairs before time runs out
6. Toggle between light and dark mode using the sun/moon icon

## Game Rules

1. The game consists of 16 cards (8 matching pairs)
2. Cards are placed face down
3. Turn over two cards at a time
4. If the cards match, they remain face up
5. If the cards don't match, they turn face down again
6. The game ends when all pairs are matched or time runs out
7. Try to complete the game in as few moves as possible

## Project Structure

```
memory-game/
├── public/
│   ├── assets/
│   │   └── Games/
│   │       ├── cars/
│   │       │   └── Image1.jpeg ... Image8.jpeg
│   │       └── art/
│   │           └── Pics1.jpeg ... Pics8.jpeg
│   └── index.html
├── .
├── App.css
├── App.jsx
├── components
│   ├── GameBoard.jsx
│   ├── GameControls.jsx
│   ├── GameOver.jsx
│   ├── LoadingPage.css
│   ├── LoadingPage.jsx
│   ├── ThemeToggle.jsx
│   └── Timer.jsx
├── edit.jsx
├── Game.jsx
├── index.css
├── main.jsx
└── projectStructure

2 directories, 14 files

├── package.json
├── tailwind.config.js
└── README.md
```

## Technologies Used

-  **React**: UI library for building the game interface
-  **Tailwind CSS**: Utility-first CSS framework for styling
-  **Framer Motion**: Animation library for smooth card flipping and UI transitions
-  **Lucide React**: SVG icon library for UI elements

## Customization

### Adding New Card Sets

1. Create a new folder in `public/assets/Games/`
2. Add 8 image files (named consistently, e.g., `Image1.jpeg` through `Image8.jpeg`)
3. Update the `GameControls.jsx` component to include your new card set option
4. Modify the image path logic in `App.jsx` if your naming convention differs

### Modifying Difficulty Levels

Adjust the timer settings in `App.jsx`:

```javascript
const timerSettings = {
   slow: 120, // 2 minutes in seconds
   normal: 60, // 1 minute in seconds
   fast: 30, // 30 seconds
};
```

### Changing Grid Size

To change the grid size (e.g., from 4x4 to 6x4):

1. Update the grid layout in `GameBoard.jsx`:

```jsx
<div className="grid grid-cols-6 gap-4">
```

2. Adjust the card generation logic in `App.jsx` to account for more cards

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Created by [Jadonamite] - [jadonamite@gmail.com](twitter:@jadonamite)
