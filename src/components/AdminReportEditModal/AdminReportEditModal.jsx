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

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("http://localhost:3333/api/companies");
        if (!response.ok) throw new Error("Failed to fetch companies data");
        const data = await response.json();
        setCompanies(data);
      } catch (err) {
        alert(err.message);
      }
    };

    fetchCompanies();
  }, []);

  const ReportModal = ({ report, onSave, onClose }) => {
    const [editedReport, setEditedReport] = useState(report);

    const handleSave = () => {
      onSave(editedReport);
    };
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Edit Report</h3>
        <label>Candidate Name:</label>
        <input type="text" value={editedReport.candidateName} disabled />

        <label>Interview Date:</label>
        <input
          type="date"
          value={new Date(editedReport.interviewDate)
            .toISOString()
            .substr(0, 10)}
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
