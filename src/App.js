import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./component/Main";
import Detail from "./component/Detail";
import Board from "./component/Board";
import Advsearch from "./component/Advsearch";
import "./css/style.css";
import { ConfigProvider } from 'antd';

function App() {

  return (
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: 'black',
        colorPrimaryBg: '#f1f1f1'
      },
    }}
  >
    <Router>
    <div className="App">
      <header className="App-header">
        <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/book/:id" element={<Detail/>} />
            <Route path="/board" element={<Board/>} />
            <Route path="/advsearch" element={<Advsearch/>} />
        </Routes>
      </header>
    </div>
    </Router>
  </ConfigProvider>
  );
}

export default App;
