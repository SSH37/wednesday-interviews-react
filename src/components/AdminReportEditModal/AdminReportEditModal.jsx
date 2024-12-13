import { useState, useContext, useEffect } from "react";
import "./AdminReportEditModal.css";
import { urlReports } from "../../constants/constants";
import { loginCtx } from "../../contexts/contexts";

const AdminReportEditModal = ({ report, onSave, onClose }) => {
  const [editedReport, setEditedReport] = useState(report);
  const { loggedIn } = useContext(loginCtx);
  const handleSave = () => {
    onSave(editedReport);
  };

  const [company, setCompany] = useState([]);

  useEffect(() => {
    console.log(report);
    const fetchCompanies = async () => {
      try {
        const response = await fetch(`http://localhost:3333/api/companies/${report.companyId}`);
        if (!response.ok) throw new Error("Failed to fetch companies data");
        const data = await response.json();
        setCompany(data);
      } catch (err) {
        alert(err.message);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Edit Report</h3>
        <label>Company Name: {company.name}</label>

        <label>Interview Date:</label>
        <input
          type="date"
          value={new Date(editedReport.interviewDate)
            .toISOString()
            .slice(0, 10)}
          onChange={(e) =>
            setEditedReport({
              ...editedReport,
              interviewDate: new Date(e.target.value).toISOString(),
            })
          }
        />

        <label>Phase:</label>
        <input
          type="text"
          value={editedReport.phase}
          onChange={(e) =>
            setEditedReport({ ...editedReport, phase: e.target.value })
          }
        />

        <label>Status:</label>
        <input
          type="text"
          value={editedReport.status}
          onChange={(e) =>
            setEditedReport({ ...editedReport, status: e.target.value })
          }
        />

        <label>Note:</label>
        <textarea
          value={editedReport.note}
          onChange={(e) =>
            setEditedReport({ ...editedReport, note: e.target.value })
          }
        ></textarea>

        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AdminReportEditModal;
