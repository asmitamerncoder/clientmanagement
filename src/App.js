import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Clientmanagement from "./Components/Clientmanagement";
import Clientform from "./Components/Clientform";
import Editclientform from "./Components/Editclientform";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/clientmanagement"
            element={<Clientmanagement />}
          ></Route>
          <Route path="/addnewclient" element={<Clientform />}></Route>
          <Route
            path="/editclient/:clientId"
            element={<Editclientform />}
          ></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
