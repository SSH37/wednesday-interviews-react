import "./AdminReportEditModal.css";
const AdminReportEditModal = ({ data, setData }) => {

  return (
    <div className="reportEditModal" onClick={() => setData(null)}>
      <div
        className="reportEditContent"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="reportEditTop">
          <h1>{}</h1>
          <button className="closeButton" onClick={() => setData(null)}>
            x
          </button>
        </div>
        <div className="reportEditDateStatus">
          <div>
            <h3>
              {`${data.phase.toUpperCase()} ${data.status.toUpperCase()}`}
            </h3>
          </div>
        </div>
        <p className="reportEditText">{data.note}</p>
      </div>
    </div>
  );
};

export default AdminReportEditModal;
