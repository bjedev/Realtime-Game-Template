import { Toaster } from 'react-hot-toast'
import { RecoilRoot } from 'recoil'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Toaster />
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default MyApp
