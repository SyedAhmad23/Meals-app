import './App.css'
import { useGlobalContext } from "./context";
import Favourite from './components/Favourite'
import Meals from './components/Meals'
import Modal from './components/Modal'
import Search from './components/Search'

function App() {
  const { showModal, favourites } = useGlobalContext()
  return (
    <>
      <Search />
      {favourites.length > 0 && <Favourite />}
      <Meals />
      {showModal && <Modal />}
    </>
  )
}

export default App
