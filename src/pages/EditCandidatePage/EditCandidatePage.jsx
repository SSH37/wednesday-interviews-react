import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { loginCtx } from "../../contexts/contexts";
import AdminReportEditModal from "../../components/AdminReportEditModal/AdminReportEditModal";
import { urlCandidates, urlReports } from "../../constants/constants";
import "./EditCandidatePage.css";
import AdminAddReportModal from "../../components/AdminAddReportModal/AdminAddReportModal";

const EditCandidatePage = () => {
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddReportModal, setShowAddReportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const { loggedIn } = useContext(loginCtx);
  const nav = useNavigate()

  useEffect(() => {
    fetchCandidateData();
    fetchCandidateReports();
  }, [id]);

  const fetchCandidateData = async () => {
    try {
      const response = await fetch(`${urlCandidates}/${id}`);
      if (!response.ok) throw new Error("Failed to fetch candidate data");
      const data = await response.json();
      setCandidate(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveReport = async (report) => {
    try {
      const response = await fetch(`${urlReports}/${report.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${loggedIn}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(report),
      });
      if (!response.ok) throw new Error("Failed to save report");
      alert("Report saved successfully!");
      setReports((prev) => prev.map((r) => (r.id === report.id ? report : r)));
      setShowModal(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const newReport = async (report) => {
    const newReport = { ...report, candidateId: candidate.id };
    console.log(newReport)
    try {
      const response = await fetch(`${urlReports}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${loggedIn}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReport),
      });
      if (!response.ok) throw new Error("Failed to add report");
      alert("Report added successfully!");
      setShowAddReportModal(false);
      nav(0);
    } catch (err) {
      alert(err.message);
    }
  };

  const fetchCandidateReports = async () => {
    try {
      const response = await fetch(`${urlReports}?candidateId=${id}`);
      if (!response.ok) throw new Error("Failed to fetch reports");
      const data = await response.json();
      setReports(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSaveCandidate = async () => {
    try {
      const response = await fetch(`${urlCandidates}/${id}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + loggedIn,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(candidate),
      });
      if (!response.ok) throw new Error("Failed to save candidate data");
      alert("Candidate saved successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditReport = async (reportId) => {
    try {
      const response = await fetch(`${urlReports}/${reportId}`);
      if (!response.ok) throw new Error("Failed to fetch report data");
      const data = await response.json();
      setSelectedReport(data);
      setShowModal(true);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteReport = async (reportId) => {
    try {
      const response = await fetch(`${urlReports}/${reportId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${loggedIn}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete report");
      setReports((prev) => prev.filter((report) => report.id !== reportId));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  function formatDate(value) {
    let date = new Date(value);
    return date.toLocaleDateString();
  }
  return (
    <div>
      {showModal && selectedReport && (
        <AdminReportEditModal
          report={selectedReport}
          onSave={saveReport}
          onClose={() => setShowModal(false)}
        />
      )}
      {showAddReportModal && (
        <AdminAddReportModal
          onSave={newReport}
          onClose={() => setShowAddReportModal(false)}
        />
      )}
      <Header />
      <div className="All">
        {candidate && (
          <div className="edit-container">
            <h2>Edit Candidate</h2>
            <div className="edit-card">
              <label>Name:</label>
              <input
                type="text"
                value={candidate.name}
                onChange={(e) =>
                  setCandidate({ ...candidate, name: e.target.value })
                }
              />

              <label>Birthday:</label>
              <input
                type="text"
                value={candidate.birthday}
                onChange={(e) =>
                  setCandidate({ ...candidate, birthday: e.target.value })
                }
              />

              <label>Email:</label>
              <input
                type="text"
                value={candidate.email}
                onChange={(e) =>
                  setCandidate({ ...candidate, email: e.target.value })
                }
              />

              <label>Education:</label>
              <input
                type="text"
                value={candidate.education}
                onChange={(e) =>
                  setCandidate({ ...candidate, education: e.target.value })
                }
              />

              <button onClick={handleSaveCandidate} className="buttonSave">
                Save
              </button>
            </div>
          </div>
        )}

        <div className="reports-section">
          <h2>Reports</h2>
          <button
            onClick={() => {
              setShowAddReportModal(true);
            }}
            className="newReportButton"
          >
            Add new report
          </button>
          {reports.map((report) => (
            <div key={report.id}>
              <p>{report.note}</p>
              <p>{report.phase}</p>
              <p>{report.status}</p>
              <p>{formatDate(report.interviewDate)}</p>
              <button onClick={() => handleEditReport(report.id)}>Edit</button>
              <button
                onClick={() => handleDeleteReport(report.id)}
                className="delete"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditCandidatePage;
