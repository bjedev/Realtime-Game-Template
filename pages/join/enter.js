import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Particles from "react-tsparticles";
import { useRecoilState } from 'recoil';
import { loadFull } from "tsparticles";
import ParticlesComponent from '../../components/Particles';
import { globalGameId, globalPlayer, isInGame } from '../../global/recoilState';
import { checkGameExists } from '../../libs/gameLib';
import { joinGame } from '../../libs/highLevelGameLib';

export default function JoinEnter() {
  const [gameId, setGameId] = useState();

  return (
    <div>
      <div className='hero min-h-screen'>
        <div className='hero-content text-center'>
          <div className='max-w-lg'>
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                  <h2 className="card-title">{gameId ? "Username" : "Join"}</h2>

                  <JoinCard />
                  
              </div>
            </div>
          </div>
        </div>
      </div>
      <ParticlesComponent />
    </div>
  )
}

function checkGameID(gameId) {
  const exists = checkGameExists(gameId).then((exists) => {
    if (exists) {
      return true;
    } else {
      toast.error("That game does not exist!")
      return false;
    }
  }).catch((error) => {
    console.error(error);
  });

  return exists;
}

function JoinCard() {
  const [gameId, setGameId] = useState();
  const [gameExists, setGameExists] = useState(false);

  return (
    <div className='grid gap-x-4 grid-cols-2'>
      {!gameExists ? (
        <>
          <input onChange={(e) => setGameId(e.target.value)} className='input bg-base-200' placeholder='Game ID' maxLength={6}/>
          <button disabled={!gameId || gameId.length != 6} className='btn btn-primary' onClick={() => {checkGameID(gameId).then((e) => {setGameExists(e)})}}>Join</button>
        </>
      ) : (
        <Username gameId={gameId} />
      )}
    </div>
  );
}

function Username({ gameId }) {
  const [username, setUsername] = useState();
  const [_, setIsInGame] = useRecoilState(isInGame);
  const [player, setGlobalPlayer] = useRecoilState(globalPlayer);

  const router = useRouter();

  return (
    <>
      <input onChange={(e) => setUsername(e.target.value)} className='input bg-base-200' placeholder='Username' type="text" maxLength={13}/>
      <button className='btn btn-primary' onClick={() => {joinGame(gameId, username); setGlobalPlayer({username: username, gameId: gameId}); setIsInGame(true); router.push('/join/director');}}>Join Game</button>
    </>
  );
}
