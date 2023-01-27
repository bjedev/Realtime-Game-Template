import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { fetchGame } from "../../libs/gameLib";
import { hostGame, updateState } from "../../libs/highLevelGameLib";
import { BsFillPersonFill } from "react-icons/bs";
import { get, onValue } from "firebase/database";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import HostPlayerBubble from "../../components/HostPlayer";

export async function getServerSideProps(context) {
  let game = hostGame()

  return {
    props: {gameId: game}, // will be passed to the page component as props
  }
}


export default function HostWaiting({ gameId }) {

  const [game, setGame] = useState(null);
  const [players, setPlayers] = useState([])

  // Set the game state to the database reference
  useEffect(() => {if (gameId !== undefined) setGame(fetchGame(gameId))}, [gameId]);

  useEffect(() => {
    console.log("Game: " + game);
    if (game) {
      onValue(game, (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val().players;

          console.log(data)
          
          setPlayers(data)
        }
      });      
    }
  }, [game]);

  return (
    <div>
      {/* Game Bar */ }

      <div className="navbar bg-base-200">
        <div className="navbar-start">
          <p className="text-2xl">Go to <b>example.com/play</b> and enter the Game ID</p>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-5xl" onClick={() => {navigator.clipboard.writeText(gameId); toast.success("Coppied to clipboard!")}}>{gameId}</a>
        </div>
        <div className="navbar-end"></div>
      </div>

      {/* Start Button */}
      {/* <div className="flex content-end">
        <button className="btn btn-primary ">Start</button>
      </div> */}

      <div className="flex flex-row items-center justify-evenly w-90 m-3">
        <div className="w-14 h-5 text-center flex flex-row justify-center items-center gap-x-3">
          <p className="text-2xl font-bold">{players ? players.length : 0}</p>
          <BsFillPersonFill className="text-5xl" />
        </div>
        
        <p className="text-5xl font-bold">Firebase Template</p>
        <button className="btn btn-primary" onClick={() => updateState(gameId, "playing")}>Start</button>

      </div>

      <div className="grid grid-cols-8 p-12">
        {players?.map((player) =>
          <HostPlayerBubble player={player} pageType="hostWaiting" key={player} />
        )}
      </div>
    </div>
  );
}