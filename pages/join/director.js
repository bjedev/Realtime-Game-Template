import { onValue, ref } from "firebase/database";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { globalPlayer, isInGame } from "../../global/recoilState";
import { database } from "../../libs/realtime";

import GameState_Playing from "../../components/game_components/playing";
import GameState_Waiting from "../../components/game_components/waiting";
import GameState_Invalid from "../../components/game_components/invalid";

export default function GameDirectorPage() {
  const [isInGameState, _] = useRecoilState(isInGame);
  const [player, setPlayer] = useRecoilState(globalPlayer);
  const [gameState, setGameState] = useState();
  const [gameRef, setGameRef] = useState();

  const router = useRouter();

  useEffect(() => {
    if (!isInGameState || !player || !player.gameId) {
      router.push("/join/enter");
    }

    if (player) {
      const dbRef = ref(database, `games/${player.gameId}/state`);
      onValue(dbRef, (snapshot) => {
        setGameState(snapshot.val());
      });

      setGameRef(ref(database, `games/${player.gameId}`));
    }
  
  }, []);

  console.log("GameState: " + gameState)

  if (gameState == "waiting") {
    return <GameState_Waiting game={gameRef} player={player} />
  } else if (gameState == "playing") {
    return <GameState_Playing game={gameRef} player={player} />
  } else {
    return <GameState_Invalid game={gameRef} player={player} />
  }
}