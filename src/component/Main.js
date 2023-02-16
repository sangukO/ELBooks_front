import axios from "axios";
import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import noPhoto from "../static/no-photos.png";
import { AutoComplete, Input, Layout, Menu } from 'antd';
import { Content } from "antd/es/layout/layout";
import {
  SearchOutlined,
} from '@ant-design/icons';
const { Sider } = Layout;

function Main() {

  const [searchText, setSearchText] = useState("");
  const [from, setFrom] = useState(0);
  const selectList = [5, 10, 25, 50, 100];
  const [selected, setSelected] = useState(10);
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

  const onChange = (e) => {
    setSearchText(e.target.value);
  }

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const handleImgError = (e) => {
    e.target.src = noPhoto;
  }

  const onAutoSearch = async(searchText) => {

    var titleOption = []; //자동완성 담을 배열 만들고 초기화
    titleOption = titleOption.splice(0);

    const result = await axios.get('/api/search', //값 받아오기
      { params: {query : searchText, from : from, size : selected} }
    );
    const arr = result.data.data;
    const count = result.data.count;
    var oriArr = Array.from(arr); //map 함수를 쓰기 위해 유사 배열 > 배열로 변환

    titleOption.push({
      key:count,
      value: [<span style={{color:"#595959"}}><span style={{color:"#1677ff"}}>{count}</span>개의 검색 결과</span>],
      disabled:true,
    });

    oriArr.map((element, i)=>{
      titleOption.push({
        key:element._source.ISBN_THIRTEEN_NO,
        value: [
        <div style={{display:"flex"}} key={element._source.ISBN_THIRTEEN_NO} title={element._source.TITLE_NM}>
          <img id="autoImg" src={element._source.IMAGE_URL} height="115px" width="82px"  onError={handleImgError} alt="profile"></img>
          &emsp;
          <div>
            {(element.highlight["TITLE_NM.ngram"].length >= 31) ? element.highlight["TITLE_NM.ngram"].substring(30,-1)+"..." : <span dangerouslySetInnerHTML={{ __html: element.highlight["TITLE_NM.ngram"] }}></span>}<br/>
            <span style={{color:"#595959"}}>
              {(element._source.AUTHR_NM.length >= 58) ? element._source.AUTHR_NM.substring(58,-1)+"..." : element._source.AUTHR_NM}<br/>
              {element._source.PUBLISHER_NM}
            </span>
          </div>
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
        <Sider theme="light">
          <div className="logo" />
          <Menu 
            id="menu_font"
            theme="light"
            defaultSelectedKeys={['/']}
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
            <div>
            <AutoComplete
              popupClassName="certain-category-search-dropdown"
              defaultActiveFirstOption={false}
              listHeight={selected*76}
              options={options}
              onSearch={onAutoSearch}
              onSelect={(e) => movePage("/book/"+e[0].key)}
              notFoundContent={<>{searchText?"Not found!":"Enter title!"}</>}
            >
              <Input.Search size="large" className="input" style={{ width: '50vw' }} onChange={onChange} placeholder="제목을 입력해주세요." />
            </AutoComplete>
            </div>
            &emsp;
            <div id="font_large">
              <select onChange={handleSelect} value={selected} style={{marginTop:"6.5%"}} id="font_large">
                {selectList.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>개 보기<Emoji symbol="🤔"/>
            </div>
          </div>
         </Content>
        </Layout>
    </div>
  );
}

export default Main;
