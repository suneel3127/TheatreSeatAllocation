
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Details from './Components/Movies/Details';
import Header from './Components/Header/Header';
import Seats from './Components/Movies/Seats';
import store from './Redux/store';
import { Provider } from 'react-redux';
import {UserAuthContextProvider } from "./Components/Login/UserAuthContext"
import Login from "./Components/Login/Login";
import Signup from "./Components/Login/Signup";
import MovieListing from "./Components/Movies/MovieListing"

function App() {
  return (
    <>
    <UserAuthContextProvider>
      <Provider store = {store}>
        <Header/>
          <Routes>
            <Route path="/" element={<MovieListing />} />
            <Route path="/moviedetails/:id" element = {<Details />} />
            <Route path="/moviedetails/:id/seats" element = {<Seats />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
      </Provider>
    </UserAuthContextProvider>
    </>
  );
}

export default App;
