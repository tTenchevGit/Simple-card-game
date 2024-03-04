function solve() {
   const playerOneCardsDiv = document.getElementById("player1Div");
   const playerTwoCardsDiv = document.getElementById("player2Div");
   const playedCardOne = document.querySelector('#result > span:first-child');
   const playedCardTwo = document.querySelector('#result > span:nth-child(3)');
   const history = document.getElementById("history");
   let playerOneCardName = '';
   let playerTwoCardName = '';
   let firstClickedImage = null;

   // Function to disable event listener for player one and enable it for player two
   function switchToPlayerTwo() {
       playerOneCardsDiv.removeEventListener('click', playerOneClickHandler);
       playerTwoCardsDiv.addEventListener('click', playerTwoClickHandler);
   }

   // Function to disable event listener for player two and enable it for player one
   function switchToPlayerOne() {
       playerTwoCardsDiv.removeEventListener('click', playerTwoClickHandler);
       playerOneCardsDiv.addEventListener('click', playerOneClickHandler);
   }

   // Event handler for player one's click
   function playerOneClickHandler(e) {
       if (e.target.tagName === 'IMG') {
           const clickedImage = e.target;
           // Check if the card is already played
           if (clickedImage.classList.contains('played')) {
               return; // Card has been played, do nothing
           }
           clickedImage.src = 'images/whiteCard.jpg';
           playerOneCardName = clickedImage.getAttribute('name');
           playedCardOne.textContent = playerOneCardName;
           firstClickedImage = clickedImage; // Store the first clicked image
           clickedImage.classList.add('played'); // Mark the card as played
           switchToPlayerTwo(); // Disable player one and enable player two
       }
   }

   // Event handler for player two's click
   function playerTwoClickHandler(e) {
       if (e.target.tagName === 'IMG' && firstClickedImage !== null) {
           const secondClickedImage = e.target;
           // Check if the card is already played
           if (secondClickedImage.classList.contains('played')) {
               return; // Card has been played, do nothing
           }
           secondClickedImage.src = 'images/whiteCard.jpg';
           playerTwoCardName = secondClickedImage.getAttribute('name');
           playedCardTwo.textContent = playerTwoCardName;
           secondClickedImage.classList.add('played'); // Mark the card as played

           // Update borders only if both players have selected a card
           if (playerOneCardName && playerTwoCardName) {
               if (Number(playerOneCardName) > Number(playerTwoCardName)) {
                   firstClickedImage.style.border = '5px solid green'; // Set border of player one's card to green
                   secondClickedImage.style.border = '5px  solid red'; // Set border of player two's card to red
               } else if (Number(playerOneCardName) < Number(playerTwoCardName)) {
                   firstClickedImage.style.border = '5px  solid red'; // Set border of player one's card to red
                   secondClickedImage.style.border = '5px  solid green'; // Set border of player two's card to green
               } else {
                   firstClickedImage.style.border = '5px  solid red'; // Set border of both cards to red
                   secondClickedImage.style.border = '5px  solid red';
               }

               history.textContent += `[${playerOneCardName} vs ${playerTwoCardName}] `;
               playedCardOne.textContent = '';
               playedCardTwo.textContent = '';
               playerOneCardName = '';
               playerTwoCardName = '';
               firstClickedImage = null; // Reset the first clicked image
               switchToPlayerOne(); // Disable player two and enable player one
           }
       }
   }

   playerOneCardsDiv.addEventListener('click', playerOneClickHandler);
   // Initially, player two's cards should not be clickable until player one has played
   // playerTwoCardsDiv.addEventListener('click', playerTwoClickHandler); 
}