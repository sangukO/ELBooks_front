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

  const [from, setFrom] = useState(0);
  const [titleQuery, setTitleQuery] = useState("");
  const [resultTitle, setresultTitle] = useState("");
  const [totCount, setTotCount] = useState("");
  const selectList = [5, 10, 25, 50, 100];
  const [selected, setSelected] = useState(10);
  const [size, setSize] = useState("");
  const [arr, setArr] = useState([]);
  const [options, setOptions] = useState([]);
  const movePage = useNavigate();

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

  const onSearch = async(method) => {
    if(method == "S") {
      setFrom(0);
    }
    const result = await axios.get('/api/search',
      { params: {query : titleQuery, from : from, size : selected} }
    );
    setresultTitle(titleQuery);
    setTotCount(result.data.count);
    setSize(result.data.size);
    parseJson(result.data.data);
    var d1 = document.getElementById("hideDiv");
    d1.style.display = "block";
  }

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const parseJson = (data) => {
    const tmp = data;
    setArr(tmp);
  }

  const onNext = () => {
    setFrom(from => from+selected)
    onSearch("N")
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
  }

  const handleImgError = (e) => {
    e.target.src = noPhoto;
  }

  const bookList = arr.map((book, i) => 
    <li key={i} name={book._source.ISBN_THIRTEEN_NO}>
      <Link to={`/book/${book._source.ISBN_THIRTEEN_NO}`}>
        <img src={book._source.IMAGE_URL} onError={handleImgError} alt="profile"></img><br/>
        <b>{book._source.TITLE_NM}</b> <br/> {book._source.AUTHR_NM.replace(" ;",", ")}
      </Link>
    </li>);

  const onAutoSearch = async(searchText) => {
    var titleOption = [];
    titleOption = titleOption.splice(0);
    const result = await axios.get('/api/search',
      { params: {query : searchText, from : from, size : selected} }
    );
    const arr = result.data.data;
    var oriArr = Array.from(arr);
    oriArr.map((element, i)=>{
      titleOption.push({
        key:element._source.ISBN_THIRTEEN_NO,
        value: [
        <div style={{display:"flex"}} key={element._source.ISBN_THIRTEEN_NO}>
        <img id="autoImg" src={element._source.IMAGE_URL} height="115px" width="82px"  onError={handleImgError} alt="profile"></img>
        &emsp;
        <div><b>{element._source.TITLE_NM}</b> {element._score}<br/><span style={{color:"#595959"}}>{element._source.AUTHR_NM}<br/>{element._source.PUBLISHER_NM}</span></div>
        </div>]
      })
    });
    setOptions(
      !searchText
        ? []
        : titleOption
    );
  };

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
        </Sider>
        <Content>
          <div style={{display:"flex", justifyContent:"center"}}>
            abcd
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default List;
