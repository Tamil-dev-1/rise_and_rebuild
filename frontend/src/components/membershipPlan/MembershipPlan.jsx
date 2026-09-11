
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MembershipPlan.css";
import { useNavigate } from "react-router-dom";

// ============================================================
// MembershipPlans
// ============================================================

const STATS = [
  {
    label: (
      <>
        <strong>12</strong> Completed Series
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="6"
          width="18"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M8 6V4.8A1.8 1.8 0 0 1 9.8 3h4.4A1.8 1.8 0 0 1 16 4.8V6"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
  {
    label: (
      <>
        <strong>150+</strong> Regular Participants
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="17" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M15.5 14.2c2.6.4 4.5 2.6 4.5 5.3"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
  {
    label: (
      <>
        Trusted by <strong>Changemakers</strong>
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6l7-3z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
];

const PLANS = [
  {
    id: "essential",
    name: "Essential",
    tag: "Low-friction entry",
    price: "499",
    period: "/ month",
    features: [
      "Live session",
      "Replay access",
      "Workbook",
      "Monthly challenge",
    ],
    featured: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M6 3h12l3 5-9 13L3 8l3-5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M3 8h18M9 3l3 5 3-5M12 8l-2.2 13M12 8l2.2 13"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "transformation",
    name: "Transformation",
    tag: "Main / most popular plan",
    price: "999",
    period: "/ month",
    features: [
      "Everything in Essential",
      "Private community",
      "Live Q&A",
      "Implementation / accountability",
      "Bonus content",
    ],
    featured: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3.5l2.55 5.62 6.05.66-4.55 4.13 1.24 6-5.29-3.13-5.29 3.13 1.24-6-4.55-4.13 6.05-.66L12 3.5z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "inner-circle",
    name: "Inner Circle",
    tag: "Limited premium tier",
    price: "2,499",
    period: "/ month",
    features: [
      "Everything in Transformation",
      "Small-group interaction",
      "Monthly accountability",
      "Priority Q&A",
    ],
    featured: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M4 10l3-6 5 3 5-3 3 6-2 8H6l-2-8z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "annual-pass",
    name: "Annual Pass",
    tag: "Commitment + upfront cash flow",
    price: "8,999",
    period: "/ year",
    features: [
      "12-month Season 2 journey",
      "Everything in Inner Circle",
    ],
    featured: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M8.5 12c0-2 1.5-3.5 3-3.5s2 1.5 2 3.5-1 3.5-2 3.5-3-1.5-3-3.5z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M5.5 12c0-2 1-3.5 2-3.5s1.5 1.5 1.5 3.5-.5 3.5-1.5 3.5-2-1.5-2-3.5zM18.5 12c0 2-1 3.5-2 3.5s-1.5-1.5-1.5-3.5.5-3.5 1.5-3.5 2 1.5 2 3.5z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
    ),
  },
];

const BENEFITS = [
  {
    title: "Live & Recorded Sessions",
    desc: "Learn at your own pace with replays.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="4"
          width="14"
          height="10"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M17 8.5l4-2v9l-4-2"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <circle cx="8" cy="18.5" r="1.2" fill="currentColor" />
        <circle cx="13" cy="18.5" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Practical Workbooks",
    desc: "Step-by-step guides to implement.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v18H6.5A2.5 2.5 0 0 1 4 18.5v-13z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v18h5.5a2.5 2.5 0 0 0 2.5-2.5v-13z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Community Support",
    desc: "Grow with like-minded achievers.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="16" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M2.8 19c.5-2.8 2.7-4.7 5.2-4.7s4.7 1.9 5.2 4.7M10.8 19c.5-2.8 2.7-4.7 5.2-4.7s4.7 1.9 5.2 4.7"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
    ),
  },
  {
    title: "Challenges & Accountability",
    desc: "Stay consistent and get results.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M12 7v5l3.2 1.9"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Real Transformation",
    desc: "Mindset, skills and life – upgraded.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M3 18l5-6 4 3 6-8 3 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 21h18"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const FAQS = [
  "Can I upgrade or downgrade my plan later?",
  "How do I access the community?",
  "Is there a refund policy?",
  "What payment methods are accepted?",
  "How are the live sessions conducted?",
  "Is the Annual Pass a one-time payment?",
];

export default function MembershipPlans() {
  const navigate = useNavigate();

  const [openFaq, setOpenFaq] = React.useState(null);
  const [loadingPlan, setLoadingPlan] = React.useState(null);

  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const handleChoosePlan = async (plan) => {
    const authToken = sessionStorage.getItem("authToken");
    const registrationToken = sessionStorage.getItem("registrationToken");

    const selectedPlan = {
      planId: plan.id,
      planName: plan.name,
      price: plan.price,
      period: plan.period,
    };

    // ============================================================
    // 1. LOGGED-IN USER
    // Update membership in MongoDB first
    // ============================================================

    if (authToken) {
      try {
        setLoadingPlan(plan.id);

        const response = await fetch(
          "http://localhost:5000/api/auth/membership",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(selectedPlan),
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to update membership plan."
          );
        }

        // ==========================================================
        // Update the logged-in user's membership in sessionStorage
        // ==========================================================

        const storedUser = sessionStorage.getItem("user");

        if (storedUser) {
          const user = JSON.parse(storedUser);

          user.membership = data.membership;

          sessionStorage.setItem("user", JSON.stringify(user));
        }

        // ==========================================================
        // Send the UPDATED membership to Payment page
        // ==========================================================

        navigate("/payment", {
          state: data.membership,
        });
      } catch (error) {
        console.error("Change Membership Error:", error);

        alert(
          error.message ||
            "Something went wrong while changing your membership plan."
        );
      } finally {
        setLoadingPlan(null);
      }

      return;
    }

    // ============================================================
    // 2. USER JUST COMPLETED PUBLIC REGISTRATION
    // ============================================================

    if (registrationToken) {
      navigate("/create-account", {
        state: selectedPlan,
      });

      return;
    }

    // ============================================================
    // 3. RETURNING USER WITHOUT TOKEN
    // ============================================================

    navigate("/login", {
      state: selectedPlan,
    });
  };

  return (
    <div className="mp-page">
      <div className="container py-5">

        {/* ============ PRICING ============ */}

        <div className="row g-4 mp-pricing">
          {PLANS.map((plan) => (
            <div
              className="col-12 col-sm-6 col-lg-3 d-flex"
              key={plan.id}
            >
              <div
                className={
                  "mp-plan card w-100 border-0 text-center" +
                  (plan.featured ? " mp-plan-featured" : "")
                }
              >
                {plan.featured && (
                  <span className="mp-plan-badge">
                    ★ Most Popular
                  </span>
                )}

                <div className="card-body d-flex flex-column">

                  <div className="mp-plan-icon">
                    {plan.icon}
                  </div>

                  <h3 className="mp-plan-name">
                    {plan.name}
                  </h3>

                  <p className="mp-plan-tag">
                    {plan.tag}
                  </p>

                  <p className="mp-plan-price">
                    <span className="mp-plan-currency">
                      ₹
                    </span>

                    {plan.price}

                    <span className="mp-plan-period">
                      {plan.period}
                    </span>
                  </p>

                  <ul className="mp-plan-features list-unstyled text-start flex-grow-1">
                    {plan.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className={
                      "btn w-100 mp-plan-cta" +
                      (plan.featured
                        ? " mp-plan-cta-filled"
                        : "")
                    }
                    onClick={() => handleChoosePlan(plan)}
                    disabled={loadingPlan !== null}
                  >
                    {loadingPlan === plan.id
                      ? "Updating..."
                      : "Choose Plan"}
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ============ BENEFITS STRIP ============ */}

        <div className="mp-benefits">
          <div className="row g-4 text-center">
            {BENEFITS.map((b, i) => (
              <div
                className="col-6 col-md-4 col-lg"
                key={i}
              >
                <div className="mp-benefit-icon mx-auto">
                  {b.icon}
                </div>

                <h4 className="mp-benefit-title">
                  {b.title}
                </h4>

                <p className="mp-benefit-desc">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ============ FAQ ============ */}

        <div className="mp-faq">

          <div className="d-flex flex-column flex-sm-row align-items-sm-end justify-content-between gap-3 mb-4">

            <h2 className="mp-faq-heading mb-0">
              Frequently Asked Questions
            </h2>

            <div className="d-flex align-items-center gap-3">

              <span className="mp-faq-contact-text">
                Have more questions?
              </span>

              <button
                type="button"
                className="btn mp-btn-outline"
              >
                Contact Us
              </button>

            </div>

          </div>

          <div className="row g-3">

            {FAQS.map((question, i) => (

              <div
                className="col-12 col-md-6"
                key={i}
              >

                <button
                  type="button"
                  className="mp-faq-item"
                  aria-expanded={openFaq === i}
                  onClick={() => toggleFaq(i)}
                >

                  <span>{question}</span>

                  <span className="mp-faq-plus">
                    +
                  </span>

                </button>

              </div>

            ))}

          </div>

        </div>

      </div>
    </div>
  );
}
