import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUserContext } from "../Contexts/UserContext";
import { API } from "../global";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, userId, setUser, userToken } = useUserContext();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState(user);
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setUserData((prevData) => ({
          ...prevData,
          profilePic: reader.result,
        }));
      };

      reader.readAsDataURL(file);
    }
  };
  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
    handleSubmit(userData);
    setUser(userData, userToken);
    // You can add logic to save the updated data to your backend here
  };

  const handleSubmit = (data) => {
    console.log(data);
    fetch(`${API}/users/editUser/${userId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => navigate("/"));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h3>Profile</h3>
            </div>
            <div className="card-body">
              <div className="profile-pic-container text-center">
                <img
                  src={userData.profilePic || "path/to/default/profile-pic.jpg"}
                  alt="Profile"
                  className="img-fluid profile-pic"
                />
                {editMode && (
                  <div className="mb-3">
                    <label htmlFor="profilePic" className="form-label">
                      Edit Profile Picture
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="profilePic"
                      name="profilePic"
                      onChange={handleProfilePicChange}
                    />
                  </div>
                )}
              </div>
              <form>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleInputChange}
                    readOnly={!editMode}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleInputChange}
                    readOnly={!editMode}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={userData.phoneNumber}
                    onChange={handleInputChange}
                    readOnly={!editMode}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    value={userData.emailId}
                    onChange={handleInputChange}
                    readOnly={!editMode}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={userData.address}
                    onChange={handleInputChange}
                    readOnly={!editMode}
                  />
                </div>
              </form>
            </div>
            <div className="card-footer">
              {editMode ? (
                <button
                  className="btn btn-primary me-2"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-secondary me-2"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
