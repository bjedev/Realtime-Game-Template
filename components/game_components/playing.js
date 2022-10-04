import { useState } from "react";
import { readGameState } from "../../libs/highLevelGameLib";

export default function GameState_Playing({ game, player }) {

  const [gameState, setGameState] = useState();

  //get the game state from the game ref in the parameter
  readGameState(player.gameId).then((state) => {
    setGameState(state);
  });

  return (
    <div>
      <div class="grid h-screen place-items-center">
        <p>The game has started!</p>
        <div className="divider divider-horizontal" />
        <p>Build your amazing game from here! :)</p>

        <ul class="menu bg-base-200 w-100 p-2 rounded-box">
          <p className="p-3">Heres some debug data if you want it:</p>
          <li><a>GameId: {player.gameId}</a></li>
          <li><a>Username: {player.username}</a></li>
          <li><a>Game State: {gameState}</a></li>
          <li><a>Valid Database ref: {game ? 'Yes' : 'No'}</a></li>
        </ul>
      </div>
    </div>
  );
}