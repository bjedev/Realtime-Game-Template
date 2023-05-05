import { get, ref, set } from "firebase/database";
import { useRecoilState } from "recoil";
import { isInGame } from "../global/recoilState";
import { checkGameExists, createGame } from "./gameLib";
import { database } from "./realtime";


// Join game using Id

export const joinGame = (gameId, playerName) => {
  const dbRef = ref(database, `games/${gameId}/players`);
  
  // Get current players
  get(dbRef).then((snapshot) => {
    if (snapshot.exists()) {
      // Add player to current players
      const players = snapshot.val();
      players.push(playerName);
      set(dbRef, players);

      // Update isInGame recoil state

    } else {
      // Create new player
      set(dbRef, [playerName]);
      
      // Update the isInGame recoil state
    }
  }).catch((error) => {
    console.error(error);
  });
}

export const updateState = (gameId, state) => {
  const dbRef = ref(database, `games/${gameId}/state`);
  set(dbRef, state); 
  console.log(`state updated to ` + state)
}

export const readGameState = (gameId) => {
  const dbRef = ref(database, `games/${gameId}/state`);
  const data = get(dbRef).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return false;
    }
  }).catch((error) => {
    console.error(error);
  });

  return data;
}