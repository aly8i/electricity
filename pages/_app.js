import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { UserContextProvider } from '../context/Usercontext';

function App({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
  );
}

export default App;