import React, { useState, useEffect, useCallback, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import "./testimonial.css";

/* =========================================================
   FRAMER MOTION + REACT ROUTER LINK
   ========================================================= */

const MotionLink = motion(Link);

/* =========================================================
   DEFAULT TESTIMONIALS
   ========================================================= */

const defaultTestimonials = [
  {
    quote:
      "Rise & Rebuild has given me clarity when I needed it the most. It's more than a session, it's a reset button.",
    name: "Anitha R.",
    role: "Season 1 Participant",
    avatar: null,
  },
  {
    quote:
      "Every series leaves me thinking deeper and acting better. This community is pure motivation.",
    name: "Karthik S.",
    role: "Season 1 Participant",
    avatar: null,
  },
  {
    quote:
      "I've learned to pause, reflect and rebuild my life with intention. Thank you Ponsana!",
    name: "Divya K.",
    role: "Season 1 Participant",
    avatar: null,
  },
];

/* =========================================================
   DEFAULT VIDEO TESTIMONIALS
   ========================================================= */

const defaultVideoTestimonials = [
  {
    name: "Priya M.",
    role: "Season 1 Participant",
    poster: "/images/testimonials/priya-poster.jpg",
    videoUrl: "/videos/testimonials/priya.mp4",
    duration: "1:24",
  },
  {
    name: "Rahul V.",
    role: "Season 1 Participant",
    poster: "/images/testimonials/rahul-poster.jpg",
    videoUrl: "/videos/testimonials/rahul.mp4",
    duration: "0:58",
  },
  {
    name: "Meena T.",
    role: "Season 1 Participant",
    poster: "/images/testimonials/meena-poster.jpg",
    videoUrl: "/videos/testimonials/meena.mp4",
    duration: "1:47",
  },
];

/* =========================================================
   FRAMER MOTION VARIANTS
   ========================================================= */

const containerVariants = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 34,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const headingVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const videoCardVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.97,
  },

  show: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =========================================================
   GET INITIALS
   ========================================================= */

const getInitials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/* =========================================================
   PLAY ICON
   ========================================================= */

const PlayIcon = () => (
  <svg
    className="testi-play-icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M8 5.14v13.72c0 .8.87 1.29 1.55.87l10.9-6.86a1 1 0 0 0 0-1.74L9.55 4.27C8.87 3.85 8 4.34 8 5.14Z" fill="currentColor" />
  </svg>
);

/* =========================================================
   CLOSE ICON
   ========================================================= */

const CloseIcon = () => (
  <svg
    className="testi-close-icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      d="M6 6l12 12M18 6L6 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/* =========================================================
   VIDEO LIGHTBOX
   ========================================================= */

const VideoLightbox = ({ testimonial, onClose }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!testimonial) return null;

  return (
    <motion.div
      ref={overlayRef}
      className="testi-lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`${testimonial.name} video testimonial`}
      onClick={handleOverlayClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div
        className="testi-lightbox-frame"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          className="testi-lightbox-close"
          onClick={onClose}
          aria-label="Close video"
        >
          <CloseIcon />
        </button>

        <div className="testi-lightbox-video-wrap">
          <video
            className="testi-lightbox-video"
            src={testimonial.videoUrl}
            poster={testimonial.poster}
            controls
            autoPlay
            playsInline
          />
        </div>

        <div className="testi-lightbox-meta">
          <span className="testi-lightbox-name">{testimonial.name}</span>
          <span className="testi-lightbox-role">{testimonial.role}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* =========================================================
   VIDEO TESTIMONIAL CARD
   ========================================================= */

const VideoTestimonialCard = ({ testimonial, onPlay }) => {
  const { name, role, poster, duration } = testimonial;

  return (
    <motion.button
      type="button"
      className="testi-video-card"
      variants={videoCardVariants}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onClick={() => onPlay(testimonial)}
      aria-label={`Play video testimonial from ${name}`}
    >
      <div
        className="testi-video-thumb"
        style={poster ? { backgroundImage: `url(${poster})` } : undefined}
      >
        <div className="testi-video-scrim" />

        {duration && (
          <span className="testi-video-duration">{duration}</span>
        )}

        <span className="testi-video-play-btn">
          <PlayIcon />
        </span>

        <div className="testi-video-meta">
          <span className="testi-video-name">{name}</span>
          <span className="testi-video-role">{role}</span>
        </div>
      </div>
    </motion.button>
  );
};

/* =========================================================
   TESTIMONIAL COMPONENT
   ========================================================= */

const Testimonial = ({
  eyebrow = "PARTICIPANT EXPERIENCES",

  heading = "THE JOURNEY HAS ALREADY BEGUN.",

  videoEyebrow = "HEAR IT FROM THEM",

  videoHeading = "WATCH THEIR STORIES",

  videoTestimonials = defaultVideoTestimonials,

  testimonials = defaultTestimonials,

  ctaLabel = "NOW IT'S YOUR TURN",

  ctaAction = "REGISTER NOW",

  ctaHref = "/register",

  onCtaClick,
}) => {
  const [activeVideo, setActiveVideo] = useState(null);

  const handlePlay = useCallback((testimonial) => {
    setActiveVideo(testimonial);
  }, []);

  const handleClose = useCallback(() => {
    setActiveVideo(null);
  }, []);

  return (
    <section id="testimonials" className="testi-section">
      <Container className="testi-container">

        {/* =================================================
            EYEBROW
            ================================================= */}

        <motion.p
          className="testi-eyebrow"
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.6,
          }}
          variants={headingVariants}
        >
          {eyebrow}
        </motion.p>

        {/* =================================================
            HEADING
            ================================================= */}

        <motion.h2
          className="testi-heading"
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.6,
          }}
          variants={headingVariants}
        >
          {heading}
        </motion.h2>

        {/* =================================================
            VIDEO TESTIMONIALS
            ================================================= */}

        {videoTestimonials && videoTestimonials.length > 0 && (
          <div className="testi-video-block">

            <motion.p
              className="testi-video-eyebrow"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
              variants={headingVariants}
            >
              {videoEyebrow}
            </motion.p>

            <motion.h3
              className="testi-video-heading"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
              variants={headingVariants}
            >
              {videoHeading}
            </motion.h3>

            <motion.div
              className="testi-video-scroll"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={containerVariants}
            >
              {videoTestimonials.map((v, i) => (
                <VideoTestimonialCard
                  key={i}
                  testimonial={v}
                  onPlay={handlePlay}
                />
              ))}
            </motion.div>
          </div>
        )}

        {/* =================================================
            TESTIMONIAL CARDS
            ================================================= */}

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          variants={containerVariants}
        >
          <Row className="testi-row g-3 g-lg-4">

            {testimonials.map((t, i) => (
              <Col
                xs={12}
                md={6}
                lg={4}
                key={i}
              >
                <motion.div
                  className="testi-card"
                  variants={cardVariants}
                  whileHover={{
                    y: -8,
                    transition: {
                      duration: 0.25,
                      ease: "easeOut",
                    },
                  }}
                >

                  {/* =======================================
                      QUOTE ICON
                      ======================================= */}

                  <svg
                    className="testi-quote-icon"
                    viewBox="0 0 32 24"
                    aria-hidden="true"
                  >
                    <path
                      d="
                        M9.3 0
                        C4.2 2.9 0 8.4 0 14.6
                        C0 19.8 3.4 24 8.3 24
                        C12.3 24 15.2 20.9 15.2 17.1
                        C15.2 13.5 12.6 10.7 9.2 10.7
                        C8.6 10.7 8.1 10.8 7.7 10.9
                        C8.4 7 10.8 3.4 14.6 1.4
                        L9.3 0
                        Z

                        M26.7 0
                        C21.6 2.9 17.4 8.4 17.4 14.6
                        C17.4 19.8 20.8 24 25.7 24
                        C29.7 24 32.6 20.9 32.6 17.1
                        C32.6 13.5 30 10.7 26.6 10.7
                        C26 10.7 25.5 10.8 25.1 10.9
                        C25.8 7 28.2 3.4 32 1.4
                        L26.7 0
                        Z
                      "
                      fill="currentColor"
                    />
                  </svg>

                  {/* =======================================
                      AVATAR
                      ======================================= */}

                  <div className="testi-avatar-wrap">

                    {t.avatar ? (
                      <img
                        className="testi-avatar"
                        src={t.avatar}
                        alt={t.name}
                      />
                    ) : (
                      <div className="testi-avatar testi-avatar-fallback">
                        {getInitials(t.name)}
                      </div>
                    )}

                  </div>

                  {/* =======================================
                      QUOTE
                      ======================================= */}

                  <p className="testi-quote">
                    {t.quote}
                  </p>

                  {/* =======================================
                      META
                      ======================================= */}

                  <div className="testi-meta">

                    <span className="testi-name">
                      &ndash; {t.name}
                    </span>

                    <span className="testi-role">
                      {t.role}
                    </span>

                  </div>

                </motion.div>
              </Col>
            ))}

          </Row>
        </motion.div>

        {/* =================================================
            REGISTER CTA
            ================================================= */}

        <motion.div
          className="testi-cta-wrap"
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.8,
          }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.15,
          }}
        >

          {/* 
            IMPORTANT:
            motion(Link) gives us both:
            1. React Router navigation
            2. Framer Motion animation
          */}

          <MotionLink
            className="testi-cta"
            to={ctaHref}
            onClick={onCtaClick}
            whileHover={{
              scale: 1.03,

              boxShadow:
                "0 0 26px rgba(229, 171, 76, 0.35)",
            }}
            whileTap={{
              scale: 0.98,
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
          >

            <span>
              {ctaLabel}
            </span>

            {/* Arrow */}

            <svg
              className="testi-cta-arrow"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M4 12h16M14 6l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span>
              {ctaAction}
            </span>

          </MotionLink>

        </motion.div>

      </Container>

      {/* =================================================
          VIDEO LIGHTBOX (PORTAL-LESS, RENDERED IN FLOW)
          ================================================= */}

      <AnimatePresence>
        {activeVideo && (
          <VideoLightbox testimonial={activeVideo} onClose={handleClose} />
        )}
      </AnimatePresence>

    </section>
  );
};

export default Testimonial;
