import React, { useEffect, useState, useContext } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router";
import { urlCandidates } from "../../constants/constants";
import { loginCtx } from "../../contexts/contexts";
import "./AddCandidatePage.css";
import { imageURLFemale, imageURLMale } from "../../images/imageURLs";

const AddCandidatePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    birthday: "",
    email: "",
    education: "",
    avatar: "",
  });
  const [gender, setGender] = useState(null);
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
    let avatar = "";
    if (!formData.avatar) {
      if (gender === "male") {
        avatar = imageURLMale()[Math.floor(Math.random() * 95)];
      } else if (gender === "female") {
        avatar = imageURLFemale()[Math.floor(Math.random() * 95)];
      } else {
        avatar = [...imageURLFemale(), ...imageURLMale()][Math.floor(Math.random() * 189)];
      }
    }
    let formDataNew = { ...formData, ["avatar"] : avatar }
    try {
      const response = await fetch(urlCandidates, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + loggedIn,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataNew),
      });

      if (!response.ok) {
        throw new Error("Failed to add candidate");
      }
      alert("Candidate added successfully!");
      navigate("/admin");
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div>
      <Header />
      <div className="page">
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
            <label id="genderPicker">
              <div>
                <label htmlFor="rf">Female: </label>
                <input
                  type="radio"
                  name="gender"
                  id="rf"
                  onClick={() => {
                    setGender("female");
                  }}
                />
              </div>
              <div>
                <label htmlFor="rm">Male: </label>
                <input
                  type="radio"
                  name="gender"
                  id="rm"
                  onClick={() => {
                    setGender("male");
                  }}
                />
              </div>
            </label>
            <button type="submit">Add Candidate</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddCandidatePage;
