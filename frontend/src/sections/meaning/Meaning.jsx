import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './meaning.css';

const RiseAndRebuild = () => {
  const cards = [
    {
      id: 'rise',
      title: 'RISE',
      description: 'To believe that you can become more.',
      icon: (
        <svg viewBox="0 0 100 100" className="card-icon gold-ring">
          <circle cx="50" cy="50" r="42" stroke="#b08a4b" strokeWidth="2.5" fill="none" />
          <path d="M50 70 V32 M35 47 L50 32 L65 47" stroke="#b08a4b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      )
    },
    {
      id: 'rebuild',
      title: 'REBUILD',
      description: "To have the courage to change what isn't working.",
      icon: (
        <svg viewBox="0 0 100 100" className="card-icon black-ring">
          <circle cx="50" cy="50" r="42" stroke="#111111" strokeWidth="2.5" fill="none" />
          <path d="M50 18 A32 32 0 1 1 18 50" stroke="#111111" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M42 12 L52 18 L44 26" fill="#111111" />
          <path d="M24 58 L16 50 L10 60" fill="#111111" />
        </svg>
      )
    },
    {
      id: 'rise-rebuild',
      title: 'RISE & REBUILD',
      description: 'To consciously create the next version of yourself.',
      icon: (
        <svg viewBox="0 0 100 100" className="card-icon black-ring">
          <circle cx="50" cy="50" r="42" stroke="#111111" strokeWidth="2.5" fill="none" />
          <path d="M35 50 C35 43, 42 43, 50 50 C58 57, 65 57, 65 50 C65 43, 58 43, 50 50 C42 57, 35 57, 35 50 Z" stroke="#111111" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    }
  ];

  return (
    <section className="rr-full-width-section py-5">
      <div className="container-fluid px-0">
        <div className="rr-card-wrapper p-4 p-md-5">
          
          <div className="rr-top-header mb-4 mb-md-5">
            <span className="rr-number"></span>
            <span className="rr-title-gold">WHAT DOES RISE & REBUILD </span>
            <span className="rr-title-black">MEAN?</span>
          </div>

          <div className="row g-0 align-items-stretch rr-grid-border">
            {cards.map((item, index) => (
              <div key={item.id} className={`col-12 col-md-4 text-center px-3 py-4 rr-col-divider ${index === 0 ? 'ps-md-0' : ''} ${index === cards.length - 1 ? 'pe-md-0' : ''}`}>
                <div className="icon-container mb-3 d-flex justify-content-center align-items-center">
                  {item.icon}
                </div>
                <h3 className="rr-card-title mb-2">{item.title}</h3>
                <p className="rr-card-desc mb-0 mx-auto">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="rr-footer-text text-center mt-5 pt-3">
            <p className="mb-1">Everyone reaches moments where something needs to change —</p>
            <p className="mb-1">a habit, a decision, a relationship, a mindset or a direction.</p>
            <p className="mb-1">Sometimes we don't need another answer.</p>
            <p className="mb-0">We need a moment to stop, reflect and rebuild.</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RiseAndRebuild;