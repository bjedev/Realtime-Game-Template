import { onValue, ref } from "firebase/database";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { globalPlayer, isInGame } from "../../global/recoilState";
import { database } from "../../libs/realtime";

export default function GameDirectorPage() {
  const [isInGameState, _] = useRecoilState(isInGame);
  const [player, setPlayer] = useRecoilState(globalPlayer);
  const [gameState, setGameState] = useState();

  const router = useRouter();

  useEffect(() => {
    if (!isInGameState || !player) {
      router.push("/join/enter");
    }

    const dbRef = ref(database, `games/${player.gameId}/state`);
    onValue(dbRef, (snapshot) => {
      setGameState(snapshot.val());
    });
  }, []);

  console.log("GameState: " + gameState)

  if (gameState == "waiting") {
    return (
      <p>Yo it loaded</p>
    );
  } else if (gameState == "playing") {
    return (
      <p>You are not allowed to visit this page yet!</p>
    );
  }
}