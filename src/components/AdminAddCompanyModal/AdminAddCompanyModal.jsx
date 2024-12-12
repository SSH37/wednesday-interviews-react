import "./AdminAddCompanyModal.css";
const AdminAddCompanyModal = ( { setOpen } ) => {
  return (
    <div className="companyAddModal" onClick={() => setOpen(false)}>
      <div
        className="companyAddContent"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="companyAddTop">
          <button className="closeButton" onClick={() => setOpen(false)}>
            x
          </button>
        </div>
        <p className="companyAddText">{
            
        }</p>
      </div>
    </div>
  );
};

export default AdminAddCompanyModal;
