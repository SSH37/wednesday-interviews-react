import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { loginCtx } from "../../contexts/contexts";
import { urlCompanies } from "../../constants/constants";
import "./AdminCompanyEditModal.css";

const AdminCompanyEditModal = ({ data, setData, setCompanies, setRefresh }) => {
  const [initData] = useState({
    name: `${data.name}`,
    email: `${data.email}`,
  });
  const [formData, setFormData] = useState({
    name: `${data.name}`,
    email: `${data.email}`,
  });
  const nav = useNavigate();
  const { loggedIn } = useContext(loginCtx);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (JSON.stringify(initData) != JSON.stringify(formData)) {
      try {
        const response = await fetch(`${urlCompanies}/${data.id}`, {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + loggedIn,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }
        setCompanies((prev) => {
          prev = prev.filter((el) => el.id != data.id);
          return [...prev, formData];
        });
        setData(null);
        setRefresh((prev) => !prev);
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    }
  };

  return (
    <div className="companyEditModal" onClick={() => setData(null)}>
      <div
        className="companyEditContent"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="companyEditTop">
          <h2>Edit Company</h2>
          <button className="closeButton" onClick={() => setData(null)}>
            x
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <button className="submitButton" type="submit">
            Edit Company
          </button>
        </form>
        {/* <p className="companyEditText"></p> */}
      </div>
    </div>
  );
};

export default AdminCompanyEditModal;
