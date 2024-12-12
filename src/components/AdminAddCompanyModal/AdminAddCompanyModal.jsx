import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { loginCtx } from "../../contexts/contexts";
import { urlCompanies } from "../../constants/constants";
import "./AdminAddCompanyModal.css";

const AdminAddCompanyModal = ({ setOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    birthday: "",
    email: "",
    education: "",
    avatar: "",
  });
  const navigate = useNavigate();
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
    try {
      const response = await fetch(urlCompanies, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + loggedIn,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add candidate");
      }
      alert("Candidate added successfully!");
      navigate("/admin"); // Navigate back to admin page
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="companyAddModal" onClick={() => setOpen(false)}>
      <div
        className="companyAddContent"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="companyAddTop">
          <h2>Add Company</h2>
          <button className="closeButton" onClick={() => setOpen(false)}>
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
          <button className="submitButton" type="submit">Add Company</button>
        </form>
        <p className="companyAddText"></p>
      </div>
    </div>
  );
};

export default AdminAddCompanyModal;
