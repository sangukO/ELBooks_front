import axios from "axios";
import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/style.css";
import noPhoto from "../static/no-photos.png";
import { Layout, Menu } from 'antd';
import { Content } from "antd/es/layout/layout";
import {
  UploadOutlined,
  SearchOutlined,
  BookOutlined
} from '@ant-design/icons';
const { Sider } = Layout;

function List() {

  const Emoji = props => (
    <span
        className="emoji"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
    >
        {props.symbol}
    </span>
  );

  return (
    <div className="App">
      <header className="App-header">
      </header>
        <Layout style={{backgroundColor:"white", minHeight:"95vh"}}>
        <Sider
          theme="light"
        >
          <div className="logo" />
          <Menu
            id="menu_font"
            theme="light"
            defaultSelectedKeys={['/List']}
            style={{ height: '100%' }}
            items={[
              {
                key: '/',
                icon: <SearchOutlined />,
                label: <Link to={"/"}>도서 검색</Link>,
              },
              {
                key: '/List',
                // icon: <BookOutlined />,
                icon:<Emoji symbol="📋"/>,
                label: <Link to={"/List"}> 대시 보드</Link>
              },
              {
                key: '3',
                // icon: <UploadOutlined />,
                icon:<Emoji symbol="🚧"/>,
                label: " 도서 추가",
                disabled: true
              },
            ]}
          />
        </Sider>
        <Content>
          <div style={{display:"flex", justifyContent:"center"}}>
            <div style={{display:"inline-block"}}>
              <div style={{textAlign:"center"}}><h2>도서 목록 대시보드</h2>
              <span style={{ float: 'right', marginBottom:"5px" }}>*시계열 데이터가 아니라 그래프로 나타낼 수 없음</span>
              </div>
              <div>
                <iframe
                  src="http://localhost:5601/app/dashboards#/view/10cd0900-ac05-11ed-a4b6-a362b3c7b351?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!f%2Cvalue%3A10000)%2Ctime%3A(from%3A'2021-01-01T00%3A43%3A54.883Z'%2Cto%3Anow))&show-query-input=true&show-time-filter=true"
                  // csp="script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:5601/"
                  style={{width:"60vw", height:"55vh"}}>
                </iframe>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default List;
