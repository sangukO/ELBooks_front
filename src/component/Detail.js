import axios from "axios";
import {useEffect, useState} from "react";
import { useParams } from "react-router-dom"
import "../css/style.css";
import noPhoto from "../static/no-photos.png";

function Detail() {

  const {id} = useParams();
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async() => {
    const result = await axios.get('/api/single',
      { params: {query : id} }
    );
    const tmp = result.data.data;
    setInfo(tmp);
    setLoading(false);
  }

  const handleImgError = (e) => {
    e.target.src = noPhoto;
  }
  
  useEffect(() => {
    getData()
  },[]);

  return (
    <div className="App">
      <header className="App-header">
      {loading ? (
        <div></div>
      ) : (
        <div style={{display:"flex"}}>
          <div style={{marginLeft:"35px", marginTop:"35px"}}>
            <img src={info[0]._source.IMAGE_URL} alt="profile" onError={handleImgError}></img><br/>
          </div>
          <div style={{width:"50px"}}></div>
          <div>
            <div style={{height:"30px"}}></div>
            <b>{info[0]._source.TITLE_NM}</b> <br/>
            <div style={{height:"5px"}}></div>
            {info[0]._source.AUTHR_NM.replace(" ;",", ")} <br/><br/>
            <div style={{width:"500px"}}>
              {info[0]._source.BOOK_INTRCN_CN
              .replace(/&#x0D;/g,"\t").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,"\"").replace("||^","\’")}
            </div>
          </div>
        </div>
      )}
      </header>
    </div>
  );
}

export default Detail;