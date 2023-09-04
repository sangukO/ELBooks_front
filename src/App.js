import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./component/Main";
import Detail from "./component/Detail";
import Board from "./component/Board";
import "./css/style.css";
import { ConfigProvider } from 'antd';

function App() {

  return (
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#eb2f96',
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
            </Routes>
      </header>
    </div>
    </Router>
  </ConfigProvider>
  );
}

export default App;
