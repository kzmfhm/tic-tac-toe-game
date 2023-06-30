const App = {
    $: {
      menu: document.querySelector('[data-id="menu"]'),
      menuItems: document.querySelector('[data-id="menu-items"]'),
      resetBtn: document.querySelector('[data-id="reset-btn"]'),
      newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
      squares: document.querySelectorAll('[data-id="square"]'),
      modal: document.querySelector('[data-id="modal"]'),
      modalText: document.querySelector('[data-id="modal-text"]'),
      modalBtn: document.querySelector('[data-id="modal-btn"]'),
      turn: document.querySelector('[data-id="turn"]'),
      player1Score: document.querySelector('[data-id="player1-score"]'),
      player2Score: document.querySelector('[data-id="player2-score"]'),
      tiesScore: document.querySelector('[data-id="ties-score"]'),
    },
  
    state: {
      moves: [],
      scores: {
        player1: 0,
        player2: 0,
        ties: 0,
      },
    },
  
    getGameStatus(moves) {
      const p1Moves = moves
        .filter(move => move.playerId === 1)
        .map(move => +move.squareId);
      const p2Moves = moves
        .filter(move => move.playerId === 2)
        .map(move => +move.squareId);
      const winningPatterns = [
        [1, 2, 3],
        [1, 5, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 5, 7],
        [3, 6, 9],
        [4, 5, 6],
        [7, 8, 9],
      ];
      let winner = null;
      winningPatterns.forEach(pattern => {
        const p1Wins = pattern.every(v => p1Moves.includes(v));
        const p2Wins = pattern.every(v => p2Moves.includes(v));
  
        if (p1Wins) {
          winner = 1;
        } else if (p2Wins) {
          winner = 2;
        }
      });
  
      // Determine the game status based on moves and winner
      let status = "in-progress";
      if (moves.length === 9 || winner !== null) {
        status = "complete";
      }
  
      return {
        status: status, // 'in-progress' or 'complete'
        winner: winner, // 1, 2, or null
      };
    },
  
    init() {
      App.registerEventListeners();
    },
  
    registerEventListeners() {
      App.$.menu.addEventListener("click", event => {
        App.$.menuItems.classList.toggle("hidden");
      });
  
      App.$.resetBtn.addEventListener("click", event => {
        App.resetGame();
      });
  
      App.$.newRoundBtn.addEventListener("click", event => {
        App.startNewRound();
      });
  
      App.$.modalBtn.addEventListener("click", event => {
        App.resetGame();
      });
  
      App.$.squares.forEach(square => {
        square.addEventListener("click", event => {
          const hasMove = squareId => {
            const existingMove = App.state.moves.find(
              move => move.squareId === squareId
            );
            return existingMove !== undefined;
          };
  
          if (hasMove(+square.id)) {
            return;
          }
  
          const lastMove = App.state.moves.at(-1);
          const getOppositePlayer = playerId => (playerId === 1 ? 2 : 1);
          const currentPlayer =
            App.state.moves.length === 0 ? 1 : getOppositePlayer(lastMove.playerId);
          const nextPlayer = getOppositePlayer(currentPlayer);
          const squareIcon = document.createElement("i");
          const turnIcon = document.createElement("i");
          const turnLabel = document.createElement("p");
          turnLabel.innerText = `Player ${nextPlayer}, it's your turn!`;
  
          if (currentPlayer === 1) {
            squareIcon.classList.add("fa-solid", "fa-x", "yellow");
            turnIcon.classList.add("fa-solid", "fa-o", "turquoise");
            turnLabel.classList = "turquoise";
          } else {
            squareIcon.classList.add("fa-solid", "fa-o", "turquoise");
            turnIcon.classList.add("fa-solid", "fa-x", "yellow");
            turnLabel.classList = "yellow";
          }
          App.$.turn.replaceChildren(turnIcon, turnLabel);
  
          App.state.moves.push({
            squareId: +square.id,
            playerId: currentPlayer,
          });
  
          square.replaceChildren(squareIcon);
          // check if there is a winner or tie game
          const game = App.getGameStatus(App.state.moves);
          if (game.status === "complete") {
            App.updateScores(game.winner);
            App.$.modal.classList.remove("hidden");
            let message = "";
            if (game.winner) {
              message = `Player ${game.winner} wins!`;
            } else {
              message = "Tie game!";
            }
            App.$.modalText.textContent = message;
          }
        });
      });
    },
  
    resetGame() {
      App.state.moves = [];
      App.$.squares.forEach(square => square.replaceChildren());
      App.$.modal.classList.add("hidden");
      App.$.turn.replaceChildren();
    },
  
    startNewRound() {
      App.resetGame();
      App.$.modalText.textContent = "";
      // Additional logic for starting a new round can be added here
    },
  
    updateScores(winner) {
      if (winner) {
        App.state.scores[`player${winner}`]++;
      } else {
        App.state.scores.ties++;
      }
  
      App.$.player1Score.textContent = App.state.scores.player1;
      App.$.player2Score.textContent = App.state.scores.player2;
      App.$.tiesScore.textContent = App.state.scores.ties;
    },
  };
  
  window.addEventListener("load", App.init);
  
  