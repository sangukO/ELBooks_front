import "../css/style.css";
import { Layout, Progress, Rate } from 'antd';
import { Content } from "antd/es/layout/layout";
import MenuBar from "./Menu";
import { useEffect, useState } from "react";
import {
  HeartFilled,
} from '@ant-design/icons';

function Board() {

  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if(percent === 100) {
      var prog = document.getElementById("prog");
      var dsbd = document.getElementById("dashboard");
      setTimeout(() => prog.style.display = "none", 500);
      setTimeout(() => dsbd.style.visibility = "visible", 500);
    }
    else {
      setTimeout(() => setPercent(percent+1), 1);
    }
  },[percent]);

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Layout style={{backgroundColor:"white", minHeight:"95vh"}}>
        <MenuBar/>
        <Content>
          <div style={{display:"flex", justifyContent:"center"}}>
            <div style={{display:"inline-block"}}>
              <Progress id="prog" percent={percent} status="active" strokeColor={{ from: '#d3adf7', to: '#ffadd2' }} showInfo={true} />
              <div id="dashboard" style={{visibility:"hidden"}}>
                <div style={{textAlign:"center"}}><h2>도서 목록 대시보드</h2>
                  <span style={{ float: 'right', marginBottom:"5px" }}>*시계열 데이터가 아니라 그래프로 나타낼 수 없음</span>
                </div>
                <div>
                  <iframe
                    title="dashboard"
                    src="http://localhost:5601/app/dashboards#/view/10cd0900-ac05-11ed-a4b6-a362b3c7b351?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!f%2Cvalue%3A10000)%2Ctime%3A(from%3A'2021-01-01T00%3A43%3A54.883Z'%2Cto%3Anow))&show-query-input=true&show-time-filter=true"
                    style={{width:"60vw", height:"55vh"}}>
                  </iframe>
                </div>
                <div id="rate" style={{ float: 'right'}}>
                  <Rate style={{ color: '#ffadd2' }} character={<HeartFilled />} allowHalf />
                </div>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default Board;
