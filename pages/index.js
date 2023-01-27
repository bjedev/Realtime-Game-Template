import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import ParticlesComponent from '../components/Particles';

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <div className='hero min-h-screen bg-base-200'>
        <div className='hero-content text-center'>
          <div className='max-w-lg'>
            <h1 className='text-3xl font-bold'>Firebase Realtime Template Game</h1>
            <p className='py-6'>This is a template game made by Fluyd for easy development of multiplayer games using Firebase&apos;s RealtimeDB.</p>
            <div className='grid grid-cols-3 gap-x-2 max-w place-items-center'>
              <button className='btn btn-primary' onClick={() => router.push('/join/enter')}>Join Game</button>
              <div className='divider divider-horizontal' />
              <button className='btn btn-secondary' onClick={() => router.push('/host/waiting')}>Host</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
