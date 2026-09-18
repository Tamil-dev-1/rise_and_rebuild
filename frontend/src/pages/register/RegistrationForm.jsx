
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RegistrationForm.css";
import { useNavigate } from "react-router-dom";

const initialFormData = {
  fullName: "",
  mobileNumber: "",
  whatsappNumber: "",
  email: "",
  city: "",
  ageGroup: "",
  interest: "",
};

const RegistrationForm = () => {
  const navigate = useNavigate();

  // Loading state
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState(initialFormData);

  // ============================================================
  // Handle input changes
  // ============================================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================================================
  // Submit registration form
  // ============================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/leads/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      console.log("Backend Response:", data);

      // ========================================================
      // Backend registration failed
      // ========================================================
      if (!response.ok || !data.success) {
        alert(data.message || "Registration failed.");
        return;
      }

      // ========================================================
      // Check required backend response data
      // ========================================================
      if (!data.token || !data.leadId) {
        console.error("Missing registration data:", data);

        alert(
          "Registration successful, but required registration information was not received."
        );

        return;
      }

      // ========================================================
      // IMPORTANT:
      // Save registration token
      // This is for the newly registered user.
      // It is NOT the same as authToken.
      // ========================================================
      sessionStorage.setItem(
        "registrationToken",
        data.token
      );

      // ========================================================
      // Save lead ID
      // ========================================================
      sessionStorage.setItem(
        "leadId",
        data.leadId
      );

      // ========================================================
      // Save registered user information
      // ========================================================
      sessionStorage.setItem(
        "registeredUser",
        JSON.stringify(formData)
      );

      // ========================================================
      // Debug - check what was saved
      // ========================================================
      console.log(
        "registrationToken:",
        sessionStorage.getItem("registrationToken")
      );

      console.log(
        "leadId:",
        sessionStorage.getItem("leadId")
      );

      console.log(
        "registeredUser:",
        sessionStorage.getItem("registeredUser")
      );

      // ========================================================
      // Clear form
      // ========================================================
      setFormData(initialFormData);

      // ========================================================
      // Registration success
      // ========================================================
      alert("Registration successful!");

      // ========================================================
      // Go to Membership page
      // ========================================================
      navigate("/membership", {
        replace: true,
      });

    } catch (error) {
      console.error(
        "Registration Error:",
        error
      );

      alert(
        "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="registration-section">
      <div className="container">
        <div className="registration-wrapper">

          {/* Header */}
          <div className="registration-header text-center">
            <span className="registration-small-title">
              JOIN THE JOURNEY
            </span>

            <h1>Registration Form</h1>

            <p>
              Take the first step toward meaningful personal growth.
              Join our priority list and be the first to know when we launch.
            </p>
          </div>

          {/* Form Card */}
          <div className="registration-card">

            <form onSubmit={handleSubmit}>

              {/* Full Name */}
              <div className="form-group-custom">
                <label htmlFor="fullName">
                  Full Name <span>*</span>
                </label>

                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="form-control custom-input"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Mobile + WhatsApp */}
              <div className="row">

                {/* Mobile */}
                <div className="col-md-6">
                  <div className="form-group-custom">

                    <label htmlFor="mobileNumber">
                      Mobile Number <span>*</span>
                    </label>

                    <input
                      type="tel"
                      id="mobileNumber"
                      name="mobileNumber"
                      className="form-control custom-input"
                      placeholder="Enter mobile number"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      required
                    />

                  </div>
                </div>

                {/* WhatsApp */}
                <div className="col-md-6">
                  <div className="form-group-custom">

                    <label htmlFor="whatsappNumber">
                      WhatsApp Number <span>*</span>
                    </label>

                    <input
                      type="tel"
                      id="whatsappNumber"
                      name="whatsappNumber"
                      className="form-control custom-input"
                      placeholder="Enter WhatsApp number"
                      value={formData.whatsappNumber}
                      onChange={handleChange}
                    />

                  </div>
                </div>

              </div>

              {/* Email + City */}
              <div className="row">

                {/* Email */}
                <div className="col-md-6">
                  <div className="form-group-custom">

                    <label htmlFor="email">
                      Email Address <span>*</span>
                    </label>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control custom-input"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />

                  </div>
                </div>

                {/* City */}
                <div className="col-md-6">
                  <div className="form-group-custom">

                    <label htmlFor="city">
                      City <span>*</span>
                    </label>

                    <input
                      type="text"
                      id="city"
                      name="city"
                      className="form-control custom-input"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={handleChange}
                    />

                  </div>
                </div>

              </div>

              {/* Age Group */}
              <div className="form-group-custom">

                <label htmlFor="ageGroup">
                  Age Group <span>*</span>
                </label>

                <select
                  id="ageGroup"
                  name="ageGroup"
                  className="form-select custom-input"
                  value={formData.ageGroup}
                  onChange={handleChange}
                >
                  <option value="">
                    Select your age group
                  </option>

                  <option value="18-25">
                    18–25
                  </option>

                  <option value="26-35">
                    26–35
                  </option>

                  <option value="36-45">
                    36–45
                  </option>

                  <option value="46-55">
                    46–55
                  </option>

                  <option value="56+">
                    56+
                  </option>
                </select>

              </div>

              {/* Interest */}
              <div className="form-group-custom">

                <label htmlFor="interest">
                  What would you most like to work on? <span>*</span>
                </label>

                <select
                  id="interest"
                  name="interest"
                  className="form-select custom-input"
                  value={formData.interest}
                  onChange={handleChange}
                >
                  <option value="">
                    Select an area
                  </option>

                  <option value="confidence">
                    Confidence
                  </option>

                  <option value="discipline">
                    Discipline
                  </option>

                  <option value="money">
                    Money
                  </option>

                  <option value="career-business">
                    Career & Business
                  </option>

                  <option value="relationships">
                    Relationships
                  </option>

                  <option value="communication">
                    Communication
                  </option>

                  <option value="leadership">
                    Leadership
                  </option>

                  <option value="personal-growth">
                    Personal Growth
                  </option>

                  <option value="other">
                    Other
                  </option>
                </select>

              </div>

              {/* Submit */}
              <div className="submit-wrapper">

                <button
                  type="submit"
                  className="register-submit-btn"
                  disabled={loading}
                >
                  {loading
                    ? "REDIRECTING..."
                    : "SUBMIT & JOIN THE PRIORITY LIST"}
                </button>

              </div>

              <p className="form-note">
                By submitting this form, you agree to receive updates
                related to the program.
              </p>

            </form>

          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;


