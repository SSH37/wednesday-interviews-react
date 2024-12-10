import "./Report.css";
import { LuNewspaper } from "react-icons/lu";
const Report = ({ data, setData }) => {
  const reportDate = new Date(data.interviewDate).toLocaleDateString();

  console.log(data);
  return (
    <div className="reportModal" onClick={() => setData(null)}>
      <div
        className="reportContent"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="reportTop">
          <LuNewspaper className="reportIcon" />
          <h1>{data.companyName}</h1>
          <button className="closeButton" onClick={() => setData(null)}>
            x
          </button>
        </div>
        <div className="reportDateStatus">
          <h3>{reportDate}</h3>
          <div>
            <h3>
              {`${data.phase.toUpperCase()} ${data.status.toUpperCase()}`}
            </h3>
          </div>
        </div>
        <p className="reportText">{data.note}</p>
      </div>
    </div>
  );
};

export default Report;
