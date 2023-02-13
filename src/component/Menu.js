import { Menu } from 'antd';

const Menu = (url) => {
    return (
        <Menu
            theme="light"
            defaultSelectedKeys={[url]}
            style={{ height: '100%' }}
            items={[
              {
                key: '/',
                icon: <SearchOutlined />,
                label: <Link to={"/"}>도서 검색</Link>,
              },
              {
                key: '/List',
                icon: <BookOutlined />,
                label: <Link to={"/List"}>도서 목록</Link>,
              },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: 'nav 3',
              },
            ]}
        />
    );
};