import "./Report.css"
import { LuNewspaper } from "react-icons/lu";
const Report = ({data, setData}) => {
  // setData(null) in onClick

  console.log(data);
  return (
    <div className="reportModal">
      <div className="reportContent">
      <button className="closeButton" onClick={() => setData(null)}>×</button>
        <LuNewspaper style={{
          marginBottom:"15px"
        }}/>
        <p className="reportText">{data.note}</p></div>
    </div>
  )
}

export default Report