import axios from "axios";
import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/style.css";
import noPhoto from "../static/no-photos.png";
import { AutoComplete, Input } from 'antd';

function Main() {

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

  const onTitleChange = (event) => {
    setTitleQuery(event.target.value);
  }

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

  const bookList = arr.map((book, i) => <li key={i} name={book._source.ISBN_THIRTEEN_NO}><Link to={`/book/${book._source.ISBN_THIRTEEN_NO}`}><img src={book._source.IMAGE_URL} onError={handleImgError} alt="profile"></img><br/><b>{book._source.TITLE_NM}</b> <br/> {book._source.AUTHR_NM.replace(" ;",", ")}</Link></li>);

  const renderTitle = (title) => (
    <span>
      {title}
      <a
        style={{ float: 'right' }}
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer"
      >
        more
      </a>
    </span>
  );
  
  const renderItem = (title, count) => ({
    value: title,
    label: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {title}
        <span>
          <img src="https://cdn-icons-png.flaticon.com/512/41/41790.png" alt="f"></img> {count}
        </span>
      </div>
    ),
  });

  const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat)
  });

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
        {/* <input name="input" type="text" value={titleQuery} onChange={onTitleChange} placeholder="제목을 입력해주세요."></input>&emsp;
        <button type="button" onClick={() => onSearch("S")}>검색</button>&emsp;
        <br></br> */}
        <div style={{display:"flex", justifyContent:"center"}}>
          <div>
          <AutoComplete
            popupClassName="certain-category-search-dropdown"
            listHeight={selected*76}
            options={options}
            onSearch={onAutoSearch}
            onSelect={(e) => movePage("/book/"+e[0].key)}
            notFoundContent="결과가 없습니다!"
          >
            <Input.Search size="large"  style={{ width: '1000px' }} placeholder="제목을 입력해주세요." />
          </AutoComplete>
          </div>
          &emsp;
          <div>
            <select onChange={handleSelect} value={selected} style={{marginTop:"10%"}}>
              {selectList.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>개 보기<Emoji symbol="🤔"/>
          </div>
        </div>
        <br></br>
        <div id="hideDiv" name="hideDiv" style={{display:"none"}}>
          <div id="resultTextDiv"><b>{totCount}개의 검색 결과 중 {size}개까지의 '{resultTitle}' 검색 결과</b></div>
          <button>이전</button>
          <button type="button" onClick={() => onNext()}>다음</button>
          <ul>{bookList}</ul>
          <button>이전</button>
          <button type="button" onClick={() => onNext()}>다음</button>
        </div>
      </header>
    </div>
  );
}

export default Main;
