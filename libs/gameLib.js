import { get, getDatabase, onDisconnect, ref, set } from "firebase/database";
import { database } from "./realtime"; 
import { updateState } from "./highLevelGameLib";

// Create game from Id

export const createGame = (gameId) => {
  // Create game in database
  const dbRef = ref(database,`games/${gameId}/`);

  // When we disconnect, remove the game from the database
  onDisconnect(dbRef).remove();

  set(dbRef, {
    players: [],
    state: "",
    data: [],
  });
  updateState(gameId,"waiting")
}

// Read game from Id

export const readGameData = (gameId, path) => {
  const dbRef = ref(database, `games/${gameId}/${path}`);
  return dbRef;
}

// Check if game exists from Id

export const checkGameExists = async (gameId) => {
  const dbRef = ref(database, `games/${gameId}`);

  try {
    const snapshot = await get(dbRef);
    return snapshot.exists();
  } catch (error) {
    console.error(error);
    return false;
  }
};


// Fetch whole game from Id

export const fetchGame = (gameId) => {
  const dbRef = ref(database, `games/${gameId}`);
  return dbRef;
}

// Update game from Id

export const updatePathData = (gameId, path, data) => {
  const dbRef = ref(database, `games/${gameId}/${path}`);
  set(dbRef, data);
}

// Delete game from Id

export const deleteGame = (gameId) => {
  const dbRef = ref(database, `games/${gameId}`);
  set(dbRef, null);
}