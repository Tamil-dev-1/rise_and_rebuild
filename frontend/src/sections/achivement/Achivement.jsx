

import './Achivement.css';

const Achievement = () => {
  const achievements = [
    {
      id: 'series',
      label: `SERIES `,
      icon: (
        <svg viewBox="0 0 100 100" className="achievement-icon">
          <circle cx="50" cy="50" r="42" stroke="#d4a340" strokeWidth="2" fill="none" />
          <rect x="30" y="30" width="40" height="40" rx="6" stroke="#d4a340" strokeWidth="2.5" fill="none" />
          <path d="M38 45 H62 M38 55 H54" stroke="#d4a340" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: 'conversations',
      label: 'CONVERSATIONS',
      icon: (
        <svg viewBox="0 0 100 100" className="achievement-icon">
          <circle cx="50" cy="50" r="42" stroke="#d4a340" strokeWidth="2" fill="none" />
          <path d="M30 38 H58 C62 38, 64 40, 64 44 V52 C64 56, 62 58, 58 58 H46 L36 66 V58 H30 C26 58, 24 56, 24 52 V44 C24 40, 26 38, 30 38 Z" stroke="#d4a340" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
          <circle cx="70" cy="42" r="6" fill="#d4a340" />
        </svg>
      )
    },
    {
      id: 'reflection',
      label: 'MOMENTS OF REFLECTION',
      icon: (
        <svg viewBox="0 0 100 100" className="achievement-icon">
          <circle cx="50" cy="50" r="42" stroke="#d4a340" strokeWidth="2" fill="none" />
          <path d="M50 30 C42 30, 36 38, 36 46 C36 56, 50 70, 50 70 C50 70, 64 56, 64 46 C64 38, 58 30, 50 30 Z" stroke="#d4a340" strokeWidth="2.5" fill="none" />
          <circle cx="50" cy="44" r="5" fill="#d4a340" />
        </svg>
      )
    },
    {
      id: 'growth',
      label: 'OPPORTUNITIES TO GROW',
      icon: (
        <svg viewBox="0 0 100 100" className="achievement-icon">
          <circle cx="50" cy="50" r="42" stroke="#d4a340" strokeWidth="2" fill="none" />
          <path d="M32 36 H68 V64 H32 Z" stroke="#d4a340" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
          <circle cx="50" cy="50" r="8" stroke="#d4a340" strokeWidth="2" fill="none" />
          <path d="M46 50 A4 4 0 0 1 54 50" stroke="#d4a340" strokeWidth="2" fill="none" />
        </svg>
      )
    }
  ];

  return (
    <section id='achivement' className="achievement-section py-5">
      <div className="container-fluid px-3 px-md-5">

        {/* Header */}
        <div className="achievement-header mb-5">
          <span className="gold-text"></span>
          <span className="gold-text">THE 12-SERIES ACHIEVEMENT</span>
        </div>

        {/* Stats Grid */}
        <div className="row g-0 align-items-center mb-5 border-divider-wrapper">
          {achievements.map((item, index) => (
            <div
              key={item.id}
              className={`col-12 col-sm-6 col-lg-3 achievement-col ${index !== achievements.length - 1 ? 'has-divider' : ''}`}
            >
              <div className="d-flex align-items-center justify-content-center gap-3 py-3 px-2">
                <div className="icon-box flex-shrink-0">
                  {item.icon}
                </div>
                <div className="text-box">
                  <div className="stat-number">12</div>
                  <div className="stat-label">{item.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <div className="achievement-footer text-center">
          <p className="mb-0">
            Every series has taken us one step closer to this moment.{' '}
            <span className="gold-bold">SEASON 2 — THE NEXT CHAPTER.</span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default Achievement;