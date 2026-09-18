import React, { useState } from "react";
import { Container, Button, Modal, Form } from "react-bootstrap";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Lock,
  Edit2,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  X,
  Camera,
} from "lucide-react";
import "./Profile.css";

// Initial Profile State
const initialProfileData = {
  name: "Tamilmaran",
  memberSince: "2026",
  email: "example@gmail.com",
  mobile: "+91 98765 43210",
  city: "Coimbatore",
  ageGroup: "25 - 34",
  avatarInitial: "T",
};

export default function Profile() {
  const [profile, setProfile] = useState(initialProfileData);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState(profile);

  // Modals & Toast State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [passwordFields, setPasswordFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Profile Edit Handlers
  const handleEditOpen = () => {
    setEditFormData(profile);
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile(editFormData);
    setIsEditing(false);
    triggerToast("Profile information updated successfully!");
  };

  // Password Change Handler
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordFields.newPassword !== passwordFields.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    setShowPasswordModal(false);
    setPasswordFields({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    triggerToast("Password changed successfully!");
  };

  return (
    <div className="profile-page">
      {/* Dynamic Toast Feedback */}
      {toastMessage && (
        <div className="profile-toast">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      <Container fluid className="profile-container">
        {/* Header (No Search, Notifications, or Top Profile Avatar) */}
        <div className="profile-header mb-4">
          <div>
            <h1 className="profile-title">Profile</h1>
            <p className="profile-subtitle">
              Manage your personal information and account settings.
            </p>
          </div>
        </div>

        {/* Main Personal Info Card */}
        <div className="profile-card main-info-card mb-4">
          {/* Top Banner Row: Avatar, Name & Edit Action */}
          <div className="profile-card-header">
            <div className="profile-user-identity">
              <div className="avatar-wrapper">
                <div className="profile-avatar">
                  {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
                </div>
                <button
                  className="avatar-change-btn"
                  title="Change avatar"
                  onClick={() => triggerToast("Avatar update feature coming soon!")}
                >
                  <Camera size={13} />
                </button>
              </div>

              <div className="user-text-info">
                <div className="name-badge-row">
                  <h2 className="user-name">{profile.name}</h2>
                  <span className="verified-badge">
                    <ShieldCheck size={13} /> Verified
                  </span>
                </div>
                <p className="member-since">
                  Member since {profile.memberSince}
                </p>
              </div>
            </div>

            {!isEditing ? (
              <Button className="edit-profile-btn" onClick={handleEditOpen}>
                <Edit2 size={16} />
                <span>Edit Profile</span>
              </Button>
            ) : (
              <div className="edit-action-btns">
                <Button
                  className="cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="save-btn"
                  onClick={handleSaveProfile}
                >
                  Save Changes
                </Button>
              </div>
            )}
          </div>

          {/* Details Table / Form Grid */}
          <div className="profile-details-section">
            {!isEditing ? (
              <div className="info-list">
                <div className="info-row">
                  <div className="info-label">
                    <Mail size={16} />
                    <span>Email</span>
                  </div>
                  <div className="info-value">{profile.email}</div>
                </div>

                <div className="info-row">
                  <div className="info-label">
                    <Phone size={16} />
                    <span>Mobile</span>
                  </div>
                  <div className="info-value">{profile.mobile}</div>
                </div>

                <div className="info-row">
                  <div className="info-label">
                    <MapPin size={16} />
                    <span>City</span>
                  </div>
                  <div className="info-value">{profile.city}</div>
                </div>

                <div className="info-row">
                  <div className="info-label">
                    <Calendar size={16} />
                    <span>Age Group</span>
                  </div>
                  <div className="info-value">{profile.ageGroup}</div>
                </div>
              </div>
            ) : (
              <Form onSubmit={handleSaveProfile} className="edit-profile-form">
                <div className="form-grid">
                  <Form.Group className="mb-3">
                    <Form.Label className="field-label">Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="field-label">Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="field-label">Mobile Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="mobile"
                      value={editFormData.mobile}
                      onChange={handleEditChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="field-label">City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={editFormData.city}
                      onChange={handleEditChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="field-label">Age Group</Form.Label>
                    <Form.Select
                      name="ageGroup"
                      value={editFormData.ageGroup}
                      onChange={handleEditChange}
                    >
                      <option value="18 - 24">18 - 24</option>
                      <option value="25 - 34">25 - 34</option>
                      <option value="35 - 44">35 - 44</option>
                      <option value="45+">45+</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </Form>
            )}
          </div>
        </div>

        {/* Security Card */}
        <div className="profile-card security-card">
          <div className="security-card-content">
            <div className="security-left">
              <div className="security-icon-wrap">
                <Lock size={20} />
              </div>
              <div className="security-text">
                <h3 className="security-title">Security</h3>
                <div className="password-masked-row">
                  <span className="password-label">Password</span>
                  <span className="masked-dots">••••••••••</span>
                </div>
              </div>
            </div>

            <Button
              className="change-password-btn"
              onClick={() => setShowPasswordModal(true)}
            >
              <KeyRound size={16} />
              <span>Change Password</span>
            </Button>
          </div>
        </div>
      </Container>

      {/* Change Password Modal */}
      <Modal
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
        centered
        className="premium-modal"
      >
        <Modal.Header>
          <Modal.Title className="d-flex align-items-center gap-2">
            <Lock size={20} className="text-primary-violet" /> Change Password
          </Modal.Title>
          <button
            className="close-modal-btn"
            onClick={() => setShowPasswordModal(false)}
          >
            <X size={18} />
          </button>
        </Modal.Header>
        <Form onSubmit={handlePasswordSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="field-label">Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter current password"
                value={passwordFields.currentPassword}
                onChange={(e) =>
                  setPasswordFields((p) => ({
                    ...p,
                    currentPassword: e.target.value,
                  }))
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="field-label">New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={passwordFields.newPassword}
                onChange={(e) =>
                  setPasswordFields((p) => ({
                    ...p,
                    newPassword: e.target.value,
                  }))
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="field-label">Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-enter new password"
                value={passwordFields.confirmPassword}
                onChange={(e) =>
                  setPasswordFields((p) => ({
                    ...p,
                    confirmPassword: e.target.value,
                  }))
                }
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="light"
              className="cancel-btn"
              onClick={() => setShowPasswordModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="save-btn">
              Update Password
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}