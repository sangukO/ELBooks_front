import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./component/Main";
import Detail from "./component/Detail";
import List from "./component/List";
import "./css/style.css";

function App() {

  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/book/:id" element={<Detail/>} />
            <Route path="/list" element={<List/>} />
        </Routes>
      </header>
    </div>
    </Router>
  );
}

export default App;
