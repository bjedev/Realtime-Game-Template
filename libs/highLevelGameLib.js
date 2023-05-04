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

export const hostGame = () => {
  // Generate a random 6 digit number
  let gameId = Math.floor(100000 + Math.random() * 900000);

  // Check if game Id already exists
  const game = checkGameExists(gameId).then((exists) => {

    // If game Id exists, generate a new one
    if (exists) {
      return false;
    } else {
      createGame(gameId);
      updateState(gameId,"waiting")
    }
  });

  // Get the game Id and return it
  return gameId;
}

export const updateState = (gameId, state) => {
  const dbRef = ref(database, `games/${gameId}/state`);
  set(dbRef, state); 
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