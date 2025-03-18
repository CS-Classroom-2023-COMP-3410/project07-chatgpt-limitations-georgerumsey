document.addEventListener("DOMContentLoaded", () => {
  const gameGrid = document.getElementById("game-grid");
  const moveCounter = document.getElementById("move-counter");
  const timer = document.getElementById("timer");
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  const cards = [
    "🍎", "🍎", "🍌", "🍌", "🍇", "🍇", "🍓", "🍓",
    "🍒", "🍒", "🍍", "🍍", "🥝", "🥝", "🍉", "🍉"
  ];

  let flippedCards = [];
  let matchedPairs = 0;
  let moves = 0;
  let gameTimer = null;
  let secondsElapsed = 0;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function initializeGame() {
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    secondsElapsed = 0;
    moveCounter.textContent = moves;
    timer.textContent = "0:00"; // Reset timer display
    clearInterval(gameTimer); // Stop any previous timer
    gameGrid.innerHTML = "";

    shuffle(cards).forEach(card => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");

      const cardInner = document.createElement("div");
      cardInner.classList.add("card-inner");

      const cardFront = document.createElement("div");
      cardFront.classList.add("card-front");

      const cardBack = document.createElement("div");
      cardBack.classList.add("card-back");
      cardBack.textContent = card;

      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      cardElement.appendChild(cardInner);

      cardElement.addEventListener("click", flipCard);
      gameGrid.appendChild(cardElement);
    });

    startTimer();
  }

  function startTimer() {
    clearInterval(gameTimer);
    secondsElapsed = 0;
    gameTimer = setInterval(() => {
      secondsElapsed++;
      const minutes = Math.floor(secondsElapsed / 60);
      const seconds = secondsElapsed % 60;
      timer.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }, 1000);
  }

  function flipCard() {
    if (flippedCards.length === 2) return;

    const card = this.querySelector(".card-inner");
    if (!this.classList.contains("flip")) {
      this.classList.add("flip");
      flippedCards.push(this);

      if (flippedCards.length === 2) {
        moves++;
        moveCounter.textContent = moves;
        checkForMatch();
      }
    }
  }

  function checkForMatch() {
    const [card1, card2] = flippedCards;
    const cardBack1 = card1.querySelector(".card-back");
    const cardBack2 = card2.querySelector(".card-back");

    if (cardBack1.textContent === cardBack2.textContent) {
      card1.classList.add("match");
      card2.classList.add("match");
      matchedPairs++;

      flippedCards = [];

      if (matchedPairs === cards.length / 2) {
        clearInterval(gameTimer);
        setTimeout(() => {
          alert(`🎉 Congratulations! You completed the game in ${moves} moves and ${timer.textContent}.`);
        }, 500);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove("flip");
        card2.classList.remove("flip");
        flippedCards = [];
      }, 1000);
    }
  }

  startButton.addEventListener("click", () => {
    initializeGame();
    restartButton.disabled = false;
    startButton.disabled = true;
  });

  restartButton.addEventListener("click", initializeGame);
});

document.addEventListener("DOMContentLoaded", () => {
  const fruitBorderContainer = document.createElement("div");
  fruitBorderContainer.classList.add("fruit-border");
  document.body.appendChild(fruitBorderContainer);

  const fruitOptions = ["🍎", "🍌", "🍇", "🍓", "🍒", "🍍", "🥝", "🍉"];
  const fruitSize = 40;
  let screenWidth = window.innerWidth;
  let screenHeight = window.innerHeight;

  function createFruit(x, y) {
      const fruitItem = document.createElement("div");
      fruitItem.classList.add("fruit-item");
      fruitItem.textContent = fruitOptions[Math.floor(Math.random() * fruitOptions.length)];
      fruitItem.style.position = "absolute";
      fruitItem.style.left = `${x}px`;
      fruitItem.style.top = `${y}px`;

      const animations = ["rotateDance", "bounceDance", "wiggleDance"];
      fruitItem.style.animation = `${animations[Math.floor(Math.random() * animations.length)]} 3s infinite`;

      fruitBorderContainer.appendChild(fruitItem);
  }

  function generateFruitBorder() {
      fruitBorderContainer.innerHTML = "";
      screenWidth = window.innerWidth;
      screenHeight = window.innerHeight;

      const borderPadding = 20; // Ensure space around game area

      for (let x = 0; x < screenWidth; x += fruitSize) {
          createFruit(x, 0); // Top row
          createFruit(x, screenHeight - fruitSize); // Bottom row
      }

      for (let y = 0; y < screenHeight; y += fruitSize) {
          createFruit(0, y); // Left column
          createFruit(screenWidth - fruitSize, y); // Right column
      }
  }

  generateFruitBorder();
  window.addEventListener("resize", generateFruitBorder);

  const gameContainer = document.querySelector(".game-container");
  const gameGrid = document.getElementById("game-grid");

  startButton.addEventListener("click", () => {
      gameContainer.style.width = "min(80vw, 600px)"; /* Expand Game */
      gameContainer.style.top = "calc(50% + 20px)"; /* Move Down */
      gameGrid.style.display = "grid"; /* Show Grid */
      generateFruitBorder(); /* Adjust Border */
  });

  startButton.addEventListener("click", () => {
      gameContainer.style.width = "min(80vw, 600px)";
      gameContainer.style.height = "min(80vh, 600px)";
      gameContainer.style.top = "50%";
      gameContainer.style.left = "50%";
      gameContainer.style.transform = "translate(-50%, -50%)";
      gameContainer.style.position = "absolute";
      gameContainer.style.transition = "all 0.5s ease"; // Smooth transition
  });

  startButton.addEventListener("click", () => {
      gameContainer.style.width = "80%";
      gameContainer.style.maxWidth = "600px";
      gameContainer.style.height = "80%";
      gameContainer.style.maxHeight = "600px";
      gameContainer.style.padding = "20px";
      gameContainer.style.display = "flex";
      gameContainer.style.flexDirection = "column";
      gameContainer.style.justifyContent = "space-between";
      gameContainer.style.alignItems = "center";
      gameContainer.style.transition = "all 0.5s ease"; // Smooth resizing
      adjustGridLayout(); // Adjust grid layout on game start
  });

  function adjustGridSize() {
      const containerWidth = gameContainer.offsetWidth;
      const containerHeight = gameContainer.offsetHeight;
      const gridSize = Math.min(containerWidth, containerHeight) - 40; // Account for padding
      gameGrid.style.width = `${gridSize}px`;
      gameGrid.style.height = `${gridSize}px`;
  }

  function adjustGridLayout() {
      const containerWidth = gameContainer.offsetWidth;
      const containerHeight = gameContainer.offsetHeight - 100; // Account for header and buttons
      const columns = Math.floor(Math.sqrt(cards.length)); // Calculate number of columns
      gameGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`; // Set fixed number of columns
      gameGrid.style.gridAutoRows = `auto`; // Allow rows to adjust height automatically
  }

  window.addEventListener("resize", adjustGridLayout);
  startButton.addEventListener("click", () => {
      adjustGridLayout(); // Adjust grid layout on game start
  });

  window.addEventListener("resize", adjustGridSize);
  startButton.addEventListener("click", () => {
      adjustGridSize(); // Adjust grid size on game start
  });
});
