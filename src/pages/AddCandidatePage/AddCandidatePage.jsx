import React, { useEffect, useState, useContext } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router";
import { urlCandidates } from "../../constants/constants";
import { loginCtx } from "../../contexts/contexts";
import "./AddCandidatePage.css";

const AddCandidatePage = () => {
    
  const [formData, setFormData] = useState({
    name: "",
    birthday: "",
    email: "",
    education: "",
    avatar: "",
  });
  const navigate = useNavigate();
  const {loggedIn} = useContext(loginCtx);

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
      const response = await fetch(urlCandidates, {
        method: "POST",
        headers: {
            "Authorization": "Bearer "+loggedIn,
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
    <div>
    <Header/>
    <div className="add-candidate-page">
      <h2>Add Candidate</h2>
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
          Birthday:
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
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
        <label>
          Education:
          <input
            type="text"
            name="education"
            value={formData.education}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Avatar URL:
          <input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Candidate</button>
      </form>
    </div>
    <Footer/>
    </div>
  );
};

export default AddCandidatePage;
