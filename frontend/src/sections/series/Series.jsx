import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./series.css";

const Series = () => {
  const steps = [
    { id: "01", label: "SERIES 01" },
    { id: "02", label: "SERIES 02" },
    { id: "03", label: "SERIES 03" },
    { id: "04", label: "SERIES 04" },
    { id: "05", label: "SERIES 05" },
    { id: "06", label: "SERIES 06" },
    { id: "07", label: "SERIES 07" },
    { id: "08", label: "SERIES 08" },
    { id: "09", label: "SERIES 09" },
    { id: "10", label: "SERIES 10" },
    { id: "11", label: "SERIES 11" },
    { id: "12", label: "SERIES 12" },
  ];

  return (
    <section id="season2" className="tracker-wrapper">
      <div className="container-fluid series-container">

        {/* Top Label */}
        <div className="top-label">
           12 SERIES. ONE YEAR.
        </div>

        {/* Timeline */}
        <div className="timeline-scroll">
          <div className="tracker-timeline">

            <div className="timeline-line"></div>

            {steps.map((step) => (
              <div
                key={step.id}
                className="timeline-item text-center position-relative"
              >
                <div className="circle-node d-flex align-items-center justify-content-center mx-auto">
                  <span className="node-number">
                    {step.id}
                  </span>
                </div>

                <span className="node-label">
                  {step.label}
                </span>
              </div>
            ))}

            {/* Season 2 */}
            <div className="timeline-item text-center position-relative">
              <div className="circle-node active-node d-flex align-items-center justify-content-center mx-auto">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#0e0e0e"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.887 3.556-3.467c.316-.309.142-.849-.297-.912l-4.907-.715L8.49.492c-.198-.402-.78-.402-.978 0L5.328 4.869l-4.907.715c-.439.063-.613.603-.297.912l3.556 3.467-.83 4.887z" />
                </svg>

              </div>

              <span className="node-label highlight-label">
                SEASON 2
              </span>
            </div>

          </div>
        </div>

        {/* Heading */}
        <h2 className="heading-text text-center">
          ONE YEAR COMPLETED.{" "}
          <span className="highlight-text">
            SEASON 2
          </span>{" "}
          BEGINS NEXT.
        </h2>

      </div>
    </section>
  );
};

export default Series;