import React from "react";
import { Container, Button } from "react-bootstrap";
import { Trophy } from "lucide-react";
import "./Certificate.css";

const steps = [
  {
    number: 1,
    label: "Complete Episodes",
    color: "step-purple",
  },
  {
    number: 2,
    label: "Complete Challenges",
    color: "step-blue",
  },
  {
    number: 3,
    label: "Earn Certificate",
    color: "step-green",
  },
];

export default function Certificates() {
  return (
    <div className="certificates-page">
      <Container fluid className="certificates-container">
        {/* Header */}
        <div className="certificates-header mb-4">
          <h1 className="certificates-title">Certificates</h1>
          <p className="certificates-subtitle">Milestones worth remembering.</p>
        </div>

        {/* Empty state */}
        <div className="certificate-empty-state">
          <div className="trophy-ring">
            <span className="sparkle sparkle-1">✦</span>
            <span className="sparkle sparkle-2">✦</span>
            <div className="trophy-circle">
              <Trophy size={34} strokeWidth={2} />
            </div>
          </div>

          <h2 className="empty-title">Your first certificate is waiting for you.</h2>
          <p className="empty-subtext">
            Complete your Season 2 milestones to unlock certificates.
          </p>

          <Button className="view-journey-btn">View Journey</Button>
        </div>

        {/* How it works */}
        <div className="how-it-works">
          <h3 className="how-it-works-title">How it works</h3>

          <div className="steps-card">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="step-item">
                  <div className={`step-badge ${step.color}`}>{step.number}</div>
                  <span className="step-label">{step.label}</span>
                </div>
                {index < steps.length - 1 && <div className="step-divider" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
