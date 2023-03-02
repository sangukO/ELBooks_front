import axios from "axios";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import noPhoto from "../static/no-photos.png";
import { AutoComplete, Input, Layout, Select, FloatButton, Col, Row, Table, Checkbox } from 'antd';
import { Content } from "antd/es/layout/layout";
import MenuBar from "./Menu";

function Advsearch() {
  const [searchText, setSearchText] = useState("");
  const [from, setFrom] = useState(0);
  const [selected, setSelected] = useState(10);
  const [listOptions, setListOptions] = useState([]);
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

  const handleSelect = (value) => {
    setSelected(value);
  };

  const handleImgError = (e) => {
    e.target.src = noPhoto;
  }

  const onAutoSearch = async(searchText) => {
    console.log(searchText);
    var titleOption = []; //자동완성 담을 배열 만들고 초기화
    titleOption = titleOption.splice(0);

    const result = await axios.get('/api/search', //값 받아오기
      { params: {query : searchText, from : from, size : selected} }
    );
    const arr = result.data.data;
    const count = result.data.count;
    var oriArr = Array.from(arr); //map 함수를 쓰기 위해 유사 배열 > 배열로 변환
    var bookListOpt = [];

    oriArr.map((e, i) => {
      bookListOpt[i] = 
      { value: e._source.ISBN_THIRTEEN_NO,
        label:(
          <div style={{display:"flex"}} key={e._source.ISBN_THIRTEEN_NO} title={e._source.TITLE_NM}>
            <img id="autoImg" src={e._source.IMAGE_URL} height="115px" width="82px"  onError={handleImgError} alt="profile"></img>
            &emsp;
            <div>
              <span id="bookTitle" dangerouslySetInnerHTML={{ __html: e.highlight["TITLE_NM.ngram"] }}></span>
              <span style={{color:"#595959"}}>
                {(e._source.AUTHR_NM.length >= 58) ? e._source.AUTHR_NM.substring(58,-1)+"..." : e._source.AUTHR_NM}<br/>
                {e._source.PUBLISHER_NM}
              </span>
            </div>
          </div>
        )
      }
    })

    titleOption.push(
      {
        label: 
        // <span style={{color:"#BFBFBF"}} key={count}><span style={{color:"#eb2f96"}}>{count}</span>개의 검색 결과</span>
        count ? <span style={{color:"#BFBFBF"}} key={count}><span style={{color:"#eb2f96"}}>{count}</span>개의 검색 결과</span> : 
               searchText ? <span style={{color:"#BFBFBF"}} key={count}>Not found!</span> :
               <span style={{color:"#BFBFBF"}} key={count}>Enter title!</span>
        ,
        options: bookListOpt
      }
    );
    setListOptions(titleOption);
    console.log(bookListOpt);
  };

  const advMovePage = async(e) => {
    console.log(e);
    const result = await axios.get('/api/single',
      { params: {query : e} }
    );
    const tmp = result.data.data;
    console.log(tmp[1]);
    axios.get('api/transfer', { params: tmp[1] })
  }

  return (
    <div className="App">
      <header className="App-header">
      </header>
        <Layout style={{backgroundColor:"white", minHeight:"95vh"}}>
          <MenuBar/>
          <Content>
            <div style={{display:"flex", justifyContent:"center"}}>
              <p id="font_large">
                상세 검색
              </p>
              &emsp;
              <div>
                <AutoComplete
                  popupClassName="certain-category-search-dropdown"
                  defaultActiveFirstOption={false}
                  listHeight={(selected*76)+32}
                  options={listOptions}
                  onSearch={onAutoSearch}
                  onSelect={(e) => advMovePage(e)}
                  notFoundContent={<>{searchText===""||searchText===null?"Enter title!":"Not found!"}</>}
                  backfill={true}
                >
                  <Input.Search size="large" className="input" style={{ width: '50vw' }} onChange={onChange} placeholder="제목을 입력해주세요." />
                </AutoComplete>
              </div>
              &emsp;
              <div id="font_large">
                <Select
                  id="font_large" style={{marginTop:"4%", width:"65px"}}
                  onChange={handleSelect} defaultValue={{ value: selected, label: selected }}
                  options={[{ value: 5, label: 5}, 
                    { value: 10, label: 10}, 
                    { value: 25, label: 25}, 
                    { value: 50, label: 50}, 
                    { value: 100, label: 100}]}
                >
                </Select>개 보기<Emoji symbol="🍒"/>
              </div>
            </div>
            <div>
              <div className="row">
                <Row style={{ padding: '8px 0'}}>
                  <Col span={1}/>
                  <Col span={4} style={{}}>
                    <p style={{textAlign:"center"}}>
                      상세 검색 조건
                    </p>
                  <Col span={19}/>
                    <Row style={{}}>
                      
                      <Col span={6}/>
                      <Col span={12} className="center">
                        가격
                      </Col>
                      <Col span={6}/>

                      <Col span={6}/>
                      <Col span={12} className="center">
                        -
                      </Col>
                      <Col span={6}>
                        <Checkbox></Checkbox>
                      </Col>
                      
                      <Col span={6}/>
                      <Col span={12} className="center">
                        ~ 1000
                      </Col>
                      <Col span={6}>
                        <Checkbox></Checkbox>
                      </Col>

                      <Col span={6}/>
                      <Col span={12} className="center">
                        ~ 5000
                      </Col>
                      <Col span={6}>
                        <Checkbox></Checkbox>
                      </Col>

                      <Col span={6}/>
                      <Col span={12} className="center">
                        ~ 10000
                      </Col>
                      <Col span={6}>
                        <Checkbox></Checkbox>
                      </Col>
                      
                      <Col span={6}/>
                      <Col span={12} className="center">
                        ~ 50000
                      </Col>
                      <Col span={6}>
                        <Checkbox></Checkbox>
                      </Col>
                      
                      <Col span={6}/>
                      <Col span={12} className="center">
                        ~ 100000
                      </Col>
                      <Col span={6}>
                        <Checkbox></Checkbox>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </div>
          </Content>
        </Layout>
        <FloatButton.BackTop />
    </div>
  );
}

export default Advsearch;
