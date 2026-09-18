import React, { useState } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { Crown, Check } from "lucide-react";
import "./MyMembership.css";

// ---- Data Configuration ----
const currentPlanData = {
  name: "Transformation",
  status: "Active",
  price: "₹999",
  billingCycle: "/ month",
  nextRenewal: "16 Oct 2026",
};

const planFeaturesData = [
  "Live Sessions",
  "Replay Access",
  "Workbook",
  "Monthly Challenge",
  "Private Community",
  "Live Q&A",
  "Accountability",
  "Bonus Content",
];

const paymentHistoryData = [
  {
    id: "tx-1",
    date: "16 Sep 2026",
    plan: "Transformation",
    amount: "₹999",
    status: "Paid",
  },
  {
    id: "tx-2",
    date: "16 Aug 2026",
    plan: "Transformation",
    amount: "₹999",
    status: "Paid",
  },
  {
    id: "tx-3",
    date: "16 Jul 2026",
    plan: "Transformation",
    amount: "₹999",
    status: "Paid",
  },
];

export default function MyMembership() {
  const [paymentHistory] = useState(paymentHistoryData);

  return (
    <div className="membership-page">
      <Container fluid className="membership-container">
        {/* Header Section (Removed search bar, profile picture, & notifications) */}
        <div className="membership-header mb-4">
          <h1 className="membership-title">My Membership</h1>
          <p className="membership-subtitle">
            Your current plan and payment details.
          </p>
        </div>

        {/* 3 Column Grid Section matching screenshot */}
        <Row className="g-3 g-xl-4">
          {/* Card 1: Current Active Plan */}
          <Col xs={12} lg={4}>
            <div className="membership-card current-plan-card">
              <div className="card-top-row">
                <div className="plan-title-wrap">
                  <div className="crown-icon-wrap">
                    <Crown size={20} />
                  </div>
                  <h3 className="plan-name">{currentPlanData.name}</h3>
                </div>
                <span className="status-badge active-badge">
                  {currentPlanData.status}
                </span>
              </div>

              <div className="plan-price-wrap">
                <span className="price-amount">{currentPlanData.price}</span>
                <span className="price-cycle">
                  {currentPlanData.billingCycle}
                </span>
              </div>

              <div className="next-renewal-pill">
                <span className="renewal-label">Next Renewal</span>
                <span className="renewal-date">{currentPlanData.nextRenewal}</span>
              </div>

              <Button className="change-plan-btn">Change Plan</Button>
            </div>
          </Col>

          {/* Card 2: Plan Features */}
          <Col xs={12} md={5} lg={3}>
            <div className="membership-card plan-features-card">
              <h3 className="card-section-title">Plan Features</h3>
              <ul className="features-list">
                {planFeaturesData.map((feature, idx) => (
                  <li key={idx} className="feature-item">
                    <div className="check-icon-wrap">
                      <Check size={14} />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Col>

          {/* Card 3: Payment History Table */}
          <Col xs={12} md={7} lg={5}>
            <div className="membership-card payment-history-card">
              <div className="history-header">
                <h3 className="card-section-title">Payment History</h3>
                <button className="view-all-link">View All</button>
              </div>

              <div className="history-table-wrapper">
                <Table borderless responsive className="history-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Plan</th>
                      <th>Amount</th>
                      <th className="text-end">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.map((item) => (
                      <tr key={item.id}>
                        <td className="date-cell">{item.date}</td>
                        <td className="plan-cell">{item.plan}</td>
                        <td className="amount-cell">{item.amount}</td>
                        <td className="text-end">
                          <span className="status-badge paid-badge">
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}