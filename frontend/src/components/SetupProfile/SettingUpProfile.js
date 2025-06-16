import React, { useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./default.css";
import { UseMethods } from "../../composable/UseMethods";
import working from "../../assets/working.png";
import talent from "../../assets/talent.png";
import graphicDesign from "../../assets/graphic-design.png";
import writing from "../../assets/writing.png";
import translation from "../../assets/translation.png";
import logodesign from "../../assets/logodesign.png";
import tshirtdesign from "../../assets/tshirt.png";
import infographicdesign from "../../assets/infographics.png";
import blog from "../../assets/blog.png";
import GraphicandDesign from "../../assets/Graphic and Design.jpg";

const categories = [
  {
    name: "Graphic Design",
    icon: graphicDesign,
    submenu: ["Logo design", "T-shirt design", "Infographic design"],
  },
  {
    name: "Writing",
    icon: writing,
    submenu: ["Blog Writer", "Scriptwriter", "Copywriter"],
  },
  { name: "Logo Design", icon: logodesign },
  { name: "T-shirt Design", icon: tshirtdesign },
  { name: "Infographic Design", icon: infographicdesign },
  { name: "Blog Writer", icon: blog },
  { name: "Script Writer", icon: translation },
  { name: "Copywriter", icon: translation },
  { name: "Translation & Editing", icon: translation },
];

const SettingUpProfile = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [birthDate, setBirthDate] = useState("");
  const [whatIDo, setWhatIDo] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [selected, setSelected] = useState([]);
  const [experiences, setExperiences] = useState([
    { title: "", company: "", startDate: "", endDate: "" },
  ]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const scrollRef = useRef(null);
  const itemsPerPage = 7;
  const itemWidth = 120;
  const maxPage = Math.floor(categories.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const visibleCategories = categories.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const scrollToPage = (page) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: page * itemsPerPage * itemWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    const newPage = Math.max(currentPage - 1, 0);
    setCurrentPage(newPage);
    scrollToPage(newPage);
  };

  const scrollRight = () => {
    const newPage = Math.min(currentPage + 1, maxPage);
    setCurrentPage(newPage);
    scrollToPage(newPage);
  };

  const handleChange = (index, field, value) => {
    const newExperiences = [...experiences];
    newExperiences[index][field] = value;
    setExperiences(newExperiences);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { title: "", company: "", startDate: "", endDate: "" },
    ]);
  };

  const removeExperience = (indexToRemove) => {
    const updated = experiences.filter((_, index) => index !== indexToRemove);
    setExperiences(updated);
  };

  const toggleSkill = (skill) => {
    setSelected((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("profile_picture", profilePicture); // this is a File object
  formData.append("about_title", whatIDo);
  formData.append("about_description", aboutMe);
  formData.append("birth_date", birthDate);
  formData.append("skills", JSON.stringify(selected)); // it's an array
  formData.append("experiences", JSON.stringify(experiences)); // array of objects

  try {
    const response = await UseMethods("post", "setting-up/profile", formData, "", true); // `true` here likely sets headers

    if (response?.status === 200 || response?.status === 201) {
      alert("Profile saved!");
      navigate("/dashboard");
    } else {
      alert("Something went wrong.");
    }
  } catch (error) {
    console.error("Error saving profile:", error);
    alert("An error occurred while saving your profile.");
  }
};


  return (
    <div className="account-container">
      {step === 1 && (
        <div className="joinas-content">
          <h2 className="joinas-title">Join as</h2>
          <div className="joinas-card-group">
            <div className="joinas-card" onClick={() => setStep(2)}>
              <div className="joinas-card-content">
                <img src={working} alt="Find Work" className="joinas-icon" />
                <span className="joinas-text">Find Work</span>
              </div>
              <ArrowRight className="joinas-arrow" />
            </div>
            <div className="joinas-card" onClick={() => setStep(6)}>
              <div className="joinas-card-content">
                <img src={talent} alt="Find Talent" className="joinas-icon" />
                <span className="joinas-text">Find Talent</span>
              </div>
              <ArrowRight className="joinas-arrow" />
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="about-container" style={{ height: "auto" }}>
          <h2 className="form-title">Upload your profile picture</h2>
          <div className="profile-picture-upload">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="profile-preview"
              />
            ) : (
              <div className="profile-placeholder">No image selected</div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="profile-upload-input"
            />
          </div>

          <label className="form-label">What do you do?</label>
          <textarea
            className="form-textarea"
            placeholder="e.g. Data Scientist"
            rows={2}
            value={whatIDo}
            onChange={(e) => setWhatIDo(e.target.value)}
          />

          <label className="form-label">Describe yourself</label>
          <textarea
            className="form-textarea1"
            placeholder="Describe your top skills, strengths, and experiences"
            rows={4}
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
          />

          <h2 className="birth-header">When were you born?</h2>
          <p className="birth-description">
            To use Freelancer, you must be 16 years of age or older...
          </p>
          <div className="input-wrapper">
            <input
              type="date"
              className="birth-input"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>

          <h2>Tell us your skills</h2>
          <p className="subtitle">This helps us recommend jobs for you.</p>
          <div className="category-box-container">
            <div className="category-box">
              <h3 className="category-title">Category</h3>
              <div className="category-scroll-wrapper">
                <div className="category-items-wrapper">
                  {visibleCategories.map((cat) => (
                    <div
                      key={cat.name}
                      className={`category-item ${
                        selected.includes(cat.name) ? "selected" : ""
                      }`}
                      onClick={() => toggleSkill(cat.name)}
                    >
                      <div className="icon">
                        <img src={cat.icon} alt={cat.name} />
                      </div>
                      <div className="label">{cat.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="selected-skills-box">
            <div className="skills-selected-count">
              {selected.length} skills selected
            </div>
            {selected.length > 0 ? (
              <div className="selected-skills-list">
                {selected.map((skill) => (
                  <div key={skill} className="selected-skill-pill">
                    {skill}
                    <span
                      className="remove-skill"
                      onClick={() => toggleSkill(skill)}
                    >
                      ×
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="add-skill-icon">+</div>
            )}
          </div>

          <h2 className="experience-header">Add Experience</h2>
          <p className="experience-subtitle">Add Work Experience</p>
          <div className="experience-list">
            {experiences.map((exp, index) => (
              <div key={index}>
                <div className="experience-row">
                  <input
                    type="text"
                    placeholder="Enter position title"
                    value={exp.title}
                    onChange={(e) =>
                      handleChange(index, "title", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Enter company name"
                    value={exp.company}
                    onChange={(e) =>
                      handleChange(index, "company", e.target.value)
                    }
                  />
                  <div className="date-wrapper">
                    <label className="date-label">Start Date</label>
                    <input
                      type="date"
                      value={exp.startDate}
                      onChange={(e) =>
                        handleChange(index, "startDate", e.target.value)
                      }
                    />
                  </div>
                  <div className="date-wrapper">
                    <label className="date-label">End Date</label>
                    <input
                      type="date"
                      value={exp.endDate}
                      onChange={(e) =>
                        handleChange(index, "endDate", e.target.value)
                      }
                    />
                  </div>
                </div>
                {experiences.length > 1 && (
                  <p
                    className="remove-button"
                    onClick={() => removeExperience(index)}
                  >
                    <span className="minus-icon">−</span> Remove experience
                  </p>
                )}
              </div>
            ))}
            <p className="add-more" onClick={addExperience}>
              <span className="plus-icon">＋</span> Add another experience
            </p>
          </div>

          <div className="buttons">
            <button className="bck-button" onClick={() => setStep(1)}>
              Back
            </button>
            <button className="nxt-button" onClick={() => setStep(6)}>
              Next
            </button>
          </div>
        </div>
      )}

      {step === 6 && (
        <div className="skill-sphere-container">
          <div className="left-picture">
            <img src={GraphicandDesign} alt="SkillSphere Showcase" />
          </div>
          <div className="right-content">
            <h1>SkillSphere</h1>
            <p>
              Welcome to the world's largest freelancing marketplace.
              <br />
              Turning dreams into reality.
            </p>
            <button className="nxt-bttn" onClick={handleSubmit}>
              Save and Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingUpProfile;
