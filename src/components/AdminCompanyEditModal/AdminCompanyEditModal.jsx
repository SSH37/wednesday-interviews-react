import "./AdminCompanyEditModal.css";
const AdminCompanyEditModal = ({ data, setData }) => {
  return (
    <div className="companyEditModal" onClick={() => setData(null)}>
      <div
        className="companyEditContent"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="companyEditTop">
          <button className="closeButton" onClick={() => setData(null)}>
            x
          </button>
        </div>
        <p>{data.name}</p>
        <p>{data.email}</p>
        <p className="companyEditText">{
            
        }</p>
      </div>
    </div>
  );
};

export default AdminCompanyEditModal;
