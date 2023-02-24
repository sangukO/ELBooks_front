import { Menu as MenuBar, Layout} from 'antd';
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  SearchOutlined,
  FileSearchOutlined
} from '@ant-design/icons';
const { Sider } = Layout;

const Menu = () => {
  
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
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);

  useEffect(() => {
    setPath(location.pathname);
  }, [ location ])

  return (
      <Sider theme="light">
        <div className="logo" style={{textAlign:"center"}}>
          <Link id="logo" to={"/"}><div style={{width:"100%", height:"100%",paddingTop:"5%", paddingBottom:"5%"}}>ES 도서검색</div></Link>
        </div>
        <MenuBar 
        id="menu_font"
        theme="light"
        defaultSelectedKeys={path}
        style={{ height: '100%' }}
        mode="inline"
        defaultOpenKeys={['sub']}
        items={[
          {
            key:'sub',
            icon: <FileSearchOutlined />,
            label: "도서 검색",
            children:[
              {
                key: '/',
                label: <Link to={"/"}>제목 검색</Link>,
              },
              {
                key: '/Advsearch',
                label: <Link to={"/Advsearch"}>상세 검색</Link>,
              }
            ]
          },
          {
            key: '/Board',
            // icon: <BookOutlined />,
            icon:<Emoji symbol="📋"/>,
            label: <Link to={"/Board"}> 대시 보드</Link>
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
  );
};

export default Menu;