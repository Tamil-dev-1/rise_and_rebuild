
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import "./finalCTA.css";

const FinalCTA = ({
  eyebrow = "",

  heading = "READY TO REBUILD?",

  description =
    "Your next chapter doesn't begin someday. It begins with a decision.",

  buttonLabel = "REGISTER NOW",

  registrationText =
    "Registration is free. Season 2 details will be shared with registered participants.",

  onRegister,
}) => {
  return (
    <section className="final-cta-section">

      {/* =====================================================
          TOP GOLD DIVIDER
      ====================================================== */}
      <div
        className="final-cta-divider"
        aria-hidden="true"
      />


      <Container className="final-cta-container">

        <motion.div
          className="final-cta-content"

          initial="hidden"

          whileInView="visible"

          viewport={{
            once: true,
            amount: 0.25,
          }}

          variants={{
            hidden: {},

            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
        >

          {/* =================================================
              EYEBROW
          ================================================= */}
          <motion.p
            className="final-cta-eyebrow"

            variants={{
              hidden: {
                opacity: 0,
                y: 12,
              },

              visible: {
                opacity: 1,
                y: 0,

                transition: {
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {eyebrow}
          </motion.p>


          {/* =================================================
              HEADING
          ================================================= */}
          <motion.h2
            className="final-cta-heading"

            variants={{
              hidden: {
                opacity: 0,
                y: 18,
              },

              visible: {
                opacity: 1,
                y: 0,

                transition: {
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {heading}
          </motion.h2>


          {/* =================================================
              SMALL GOLD LINE
          ================================================= */}
          <motion.span
            className="final-cta-heading-line"
            aria-hidden="true"

            variants={{
              hidden: {
                opacity: 0,
                scaleX: 0,
              },

              visible: {
                opacity: 1,
                scaleX: 1,

                transition: {
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          />


          {/* =================================================
              MAIN DESCRIPTION
          ================================================= */}
          <motion.p
            className="final-cta-description"

            variants={{
              hidden: {
                opacity: 0,
                y: 15,
              },

              visible: {
                opacity: 1,
                y: 0,

                transition: {
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {description}
          </motion.p>


          {/* =================================================
              REGISTER BUTTON
          ================================================= */}
          <motion.button
            type="button"

            className="final-cta-button"

            onClick={onRegister}

            whileHover={{
              y: -2,
              scale: 1.02,
            }}

            whileTap={{
              scale: 0.97,
            }}

            variants={{
              hidden: {
                opacity: 0,
                y: 15,
              },

              visible: {
                opacity: 1,
                y: 0,

                transition: {
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            <span>{buttonLabel}</span>

            <span
              className="final-cta-arrow"
              aria-hidden="true"
            >
              →
            </span>
          </motion.button>


          {/* =================================================
              REGISTRATION MESSAGE
          ================================================= */}
          <motion.p
            className="final-cta-registration"

            variants={{
              hidden: {
                opacity: 0,
                y: 10,
              },

              visible: {
                opacity: 1,
                y: 0,

                transition: {
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {registrationText}
          </motion.p>

        </motion.div>

      </Container>
    </section>
  );
};

export default FinalCTA;