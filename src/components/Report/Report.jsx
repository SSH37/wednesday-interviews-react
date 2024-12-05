import "./Report.css";
import { LuNewspaper } from "react-icons/lu";
const Report = ({ data, setData }) => {
  // setData(null) in onClick
  const reportDate = new Date(data.interviewDate);

  console.log(data);
  return (
    <div className="reportModal">
      <div className="reportContent">
        <button className="closeButton" onClick={() => setData(null)}>
          ×
        </button>
        <LuNewspaper className="reportIcon" />
        <p className="reportText">{data.note}</p>
        {`${reportDate.getUTCDay()}.${reportDate.getUTCMonth()}.${reportDate.getUTCFullYear()}`}
      </div>
    </div>
  );
};

export default Report;
