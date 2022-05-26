import logo from './logo.svg';
import './App.css';
import Login from "./components/Login"
import useToken from './components/useToken';
import Accounts from "./components/Accounts"

function App() {

  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <router>
      <Accounts />
    </router>
  )
}

export default App;
