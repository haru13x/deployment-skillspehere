import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../Navigation/Topbar';
import './ProfilePage.css';
import user from '../../assets/user.png';
import { UseMethods } from '../../composable/UseMethods';

const ProfilePage = () => {
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [aboutTitle, setAboutTitle] = useState('');
  const [aboutDescription, setAboutDescription] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notificationRef = useRef(null);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchProfileData();
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClickOutside = (event) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      setShowNotifications(false);
    }
    if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
      setShowProfileMenu(false);
    }
  };

  const fetchProfileData = async () => {
    const response = await UseMethods("get", "get-profile", "", userData?.id);
    if (response?.status === 200) {
      const { profile, skills, experiences } = response.data;
      setAboutTitle(profile?.about_title || '');
      setAboutDescription(profile?.about_description || '');
      setBirthDate(profile?.birth_date || '');
      setProfilePhoto(profile?.profile_picture ? `http://127.0.0.1:8000/storage/${profile.profile_picture}` : null);
      setCoverPhoto(profile?.cover_photo ? `http://127.0.0.1:8000/storage/${profile.cover_photo}` : null);
      setSkills(skills || []);
      setExperiences(experiences || []);
    }
  };

  const saveProfileToDB = async (imageType, imageFile) => {
    const formData = new FormData();
    formData.append("user_id", userData?.id);
    formData.append(imageType, imageFile);

    const response = await UseMethods("post", "store-profile-pic", formData,"",true);
    if (response?.status === 200) {
      const url = URL.createObjectURL(imageFile);
      if (imageType === 'cover_photo') setCoverPhoto(url);
      else setProfilePhoto(url);
    }
  };

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) saveProfileToDB("cover_photo", file);
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) saveProfileToDB("profile_picture", file);
  };

  return (
    <div className="profile-page">
      <Topbar />

      <div className="profile-header">
        {coverPhoto ? (
          <img src={coverPhoto} alt="Cover" className="cover-photo" />
        ) : (
          <div className="add-cover-photo">
            <label htmlFor="coverPhotoInput" className="upload-button">
              Add cover photo
            </label>
            <input
              type="file"
              id="coverPhotoInput"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleCoverPhotoChange}
            />
          </div>
        )}
        <div className="profile-info">
          <label htmlFor="profilePhotoInput" className="profile-picture-label">
            <img
              src={profilePhoto || user}
              alt="Profile"
              className="profile-picture"
            />
            {!profilePhoto && <div className="add-profile-photo-text">Add profile photo</div>}
          </label>
          <input
            type="file"
            id="profilePhotoInput"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleProfilePhotoChange}
          />
        </div>
      </div>

      <div className="profile-content">
        <h2 className="profile-name">{userData?.username || "User"}</h2>

        <div className="about-section">
          <h3 className="section-title">About</h3>
          <p><strong>{aboutTitle}</strong></p>
          <p>{aboutDescription}</p>
          <p><em>Born on: {birthDate}</em></p>
        </div>

        <div className="skills-section">
          <h3 className="section-title">Skills</h3>
          <div className="skills-list">
            {skills.map((skill, idx) => (
              <span className="skill-tag" key={idx}>{skill.name || skill}</span>
            ))}
          </div>
        </div>

        <div className="experience-section">
          <h3 className="section-title">Experience</h3>
          <div className="experience-list">
            {experiences.map((exp, idx) => (
              <div className="experience-item" key={idx}>
                <div className="experience-role">{exp.title}</div>
                <div className="experience-year">
                  {exp.start_date} - {exp.end_date || "Present"}
                </div>
                <div className="experience-company">{exp.company}</div>
              </div>
            ))}
          </div>
          <button className="add-experience">+ Add experience</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
