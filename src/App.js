import React from "react";
import Navbar from "./Components/NavBar/NavBar";
import {action,originals,trending,romance,horror,documentry,comedy} from './url'
import "./App.css"
import Banner from "./Components/Banner/Banner";
import RowPost from "./Components/RowPost/RowPost";


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Banner/>
      <RowPost url={originals} title='Netflix Originals'/>
      <RowPost url={trending} title='Trending' isSmall/>
      <RowPost url={comedy} title='Comedy' isSmall/>
      <RowPost url={action} title='Action' isSmall/>
      <RowPost url={romance} title='Romance' isSmall/>
      <RowPost url={horror} title='Horror' isSmall/>
      <RowPost url={documentry} title='Documentry' isSmall/>
    </div>
  );
}

export default App;
