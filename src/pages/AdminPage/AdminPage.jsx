import "./AdminPage.css";
import React, { useContext, useEffect, useState } from "react";
import SidebarAdmin from "../../components/SidebarAdmin/SidebarAdmin";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AddCandidatePage from "../AddCandidatePage/AddCandidatePage";
import { urlCompanies, urlCandidates } from "../../constants/constants";
import { loginCtx } from "../../contexts/contexts";
import AdminCompanyEditModal from "../../components/AdminCompanyEditModal/AdminCompanyEditModal";
import AdminReportEditModal from "../../components/AdminReportEditModal/AdminReportEditModal";
import { useNavigate } from "react-router";
import AdminAddCompanyModal from "../../components/AdminAddCompanyModal/AdminAddCompanyModal";

const AdminPage = () => {
  const [page, setPage] = useState("companies");
  const [candidates, setCandidates] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { loggedIn } = useContext(loginCtx);
  const [companyEditModal, setCompanyEditModal] = useState(null);
  const [companyAddModal, setCompanyAddModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (page === "candidates") {
      fetchCandidates();
    } else if (page === "companies") {
      fetchCompanies();
    }
  }, [page, refresh]);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const response = await fetch(urlCandidates);
      if (!response.ok) {
        throw new Error("Failed to fetch candidates");
      }
      const data = await response.json();
      setCandidates(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const response = await fetch(urlCompanies);
      if (!response.ok) {
        throw new Error("Failed to fetch companies");
      }
      const data = await response.json();
      setCompanies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCompany = async (id) => {
    try {
      const response = await fetch(`${urlCompanies}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${loggedIn}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete company");
      }
      setCompanies((prev) => prev.filter((company) => company.id !== id));
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleDeleteCandidate = async (id) => {
    try {
      const response = await fetch(`${urlCandidates}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${loggedIn}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete company");
      }
      setCandidates((prev) => prev.filter((candidate) => candidate.id !== id));
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleEditCompany = async (id) => {
    try {
      const response = await fetch(`${urlCompanies}/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch company");
      }
      const data = await response.json();
      setCompanyEditModal(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditCandidate = (id) => {
    navigate(`/edit-candidate/${id}`);
  };

  const handleAddCompany = async () => {
    const newCompany = {
      name: "New Company",
      email: "company@company.rs",
    };

    try {
      const response = await fetch(urlCompanies, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${loggedIn}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCompany),
      });
      if (!response.ok) {
        throw new Error("Failed to add company");
      }
      const addedCompany = await response.json();
      setCompanies((prev) => [...prev, addedCompany]);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      {companyEditModal ? (
        <AdminCompanyEditModal
          data={companyEditModal}
          setData={setCompanyEditModal}
          setCompanies={setCompanies}
          setRefresh={setRefresh}
        />
      ) : null}
      {companyAddModal ? (
        <AdminAddCompanyModal
          setOpen={setCompanyAddModal}
          setCompanies={setCompanies}
          setRefresh={setRefresh}
        />
      ) : null}
      {/* <AdminReportEditModal /> */}
      <Header />
      <div className="admin-content">
        <SidebarAdmin setPage={setPage} />
        {page === "companies" && (
          <div className="companies-page">
            <h2 className="title">Companies</h2>
            <button
              onClick={() => {
                setCompanyAddModal(true);
              }}
            >
              Add Company
            </button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
              <table className="companies-table">
                <thead>
                  <tr>
                    <th>Company Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map((company) => (
                    <tr key={company.id}>
                      <td>{company.name}</td>
                      <td>{company.email}</td>
                      <td className="td-buttons">
                        <button onClick={() => handleEditCompany(company.id)}>
                          Edit
                        </button>
                        <button onClick={() => handleDeleteCompany(company.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
        {page === "candidates" && (
          <div className="candidates-page">
            <h2 className="title">Candidates</h2>
            <button
              onClick={() => {
                navigate("/add-candidate");
              }}
            >
              Add Candidate
            </button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
              <table className="candidates-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((candidate) => (
                    <tr key={candidate.id}>
                      <td>{candidate.name}</td>
                      <td>{candidate.email}</td>
                      <td className="td-buttons">
                        <button
                          onClick={() => handleEditCandidate(candidate.id)}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCandidate(candidate.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;
