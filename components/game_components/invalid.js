import { useRouter } from "next/router";
import { useState } from "react";
import { readGameState } from "../../libs/highLevelGameLib";

export default function GameState_Invalid({ game, player }) {

  const [gameState, setGameState] = useState();

  //get the game state from the game ref in the parameter

  readGameState(player.gameId).then((state) => {
    setGameState(state);
  });

  return (
    <div>
      <div class="grid h-screen place-items-center bg-red-600 font-bold text-black">
        <p className="text-center">It appears the game has entered and invalid game state! This is a <u>SEVERE</u> error! <div class="divider" /> <br/> If this is occuring whilst you are developing, make sure the director.js file has an &quot;if&quot; statement for the specified game state.</p>

        <ul class="menu w-100 p-2 rounded-box bg-red-400 text-black font-bold font-mono">
          <p className="p-3">Debug Data</p>
          <li><a>GameId: {player.gameId}</a></li>
          <li><a>Username: {player.username}</a></li>
          <li><a>Game State: {gameState}</a></li>
          <li><a>Valid Database ref: {game ? "Yes" : "No"}</a></li>
        </ul>
      </div>
    </div>
  );
}