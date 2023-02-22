import { Menu as MenuBar} from 'antd';
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  SearchOutlined,
} from '@ant-design/icons';

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
      <MenuBar 
      id="menu_font"
      theme="light"
      defaultSelectedKeys={path}
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
  );
};

export default Menu;