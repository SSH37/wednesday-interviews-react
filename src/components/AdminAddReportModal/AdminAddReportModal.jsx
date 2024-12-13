import { useState, useEffect } from "react";
import "./AdminAddReportModal.css";

const AdminAddReportModal = ({ onSave, onClose }) => {
  const [report, setReport] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState(null);

  // new Date()
  // .toISOString()
  // .slice(0, 10)

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

  return (
    <div className="addReportModal">
      <div className="addReportModalContent">
        <h3>Add Report</h3>
        <label htmlFor="addReportCompanySelect">Company Name:</label>
        <select
          id="addReportCompanySelect"
        >
          {companies.map((el) => {
            return (
              <option
                key={el.id}
                onClick={() => {
                  setReport({
                    ...report,
                    companyId: el.id,
                    companyName: el.name
                  });
                }}
              >
                {el.name}
              </option>
            );
          })}
        </select>
        <label>Interview Date:</label>
        <input
          type="date"
          required
          onChange={(e) => {
            if (new Date(e.target.value) > Date.now) {
              setReport({
                ...report,
                interviewDate: new Date().toISOString(),
              });
            } else {
              setReport({
                ...report,
                interviewDate: new Date(e.target.value).toISOString(),
              });
            }
          }}
        />

        <label>Phase:</label>
        <input
          type="text"
          onChange={(e) => {
            setReport({ ...report, phase: e.target.value });
          }}
        />

        <label>Status:</label>
        <input
          type="text"
          onChange={(e) => setReport({ ...report, status: e.target.value })}
        />

        <label>Note:</label>
        <textarea
          onChange={(e) => setReport({ ...report, note: e.target.value })}
        ></textarea>

        <button
          onClick={() => {
            onSave(report);
          }}
        >
          Save
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AdminAddReportModal;
