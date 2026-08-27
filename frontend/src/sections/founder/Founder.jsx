import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import "./founder.css";


import FounderImg from '../../assets/images/hero/heroImg.png'

const Founder = ({
  eyebrow = "ABOUT PONSANA",
  name = "Ponsana David",
  roleLines = ["Host,", "Rise & Rebuild"],
  bio = "Rise & Rebuild was created from a belief that people don't always need someone to tell them what to do. Sometimes they need someone to ask the right question. And sometimes, they simply need a space where they can stop, think and begin again.",
  photoSrc = FounderImg,
  photoAlt = "Portrait of Ponsana David",
}) => {
  return (
    <section className="about-host-section">
      {/* Top Divider */}
      <div
        className="about-host-divider"
        aria-hidden="true"
      />

      <Container className="about-host-container">

        {/* Eyebrow */}
        <motion.p
          className="about-host-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          {eyebrow}
        </motion.p>


        <Row className="about-host-row align-items-center">

          {/* =================================================
              IMAGE
              ================================================= */}

          <Col
            xs={12}
            md={5}
            lg={5}
            className="about-host-photo-col"
          >
            <motion.div
              className="about-host-photo-wrap"
              initial={{
                opacity: 0,
                x: -50,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="about-host-photo-frame">

                <div
                  className="about-host-photo"
                  style={{
                    backgroundImage: `url(${photoSrc})`,
                  }}
                  role="img"
                  aria-label={photoAlt}
                />

              </div>
            </motion.div>
          </Col>


          {/* =================================================
              CONTENT
              ================================================= */}

          <Col
            xs={12}
            md={7}
            lg={7}
            className="about-host-copy-col"
          >
            <motion.div
              className="about-host-copy"
              initial={{
                opacity: 0,
                x: 50,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              <span className="about-host-label">
                THE HOST
              </span>

              <h2 className="about-host-name">
                {name}
              </h2>

              <p className="about-host-role">
                {roleLines.map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < roleLines.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>

              <span
                className="about-host-rule"
                aria-hidden="true"
              />

              <p className="about-host-bio">
                {bio}
              </p>

            </motion.div>
          </Col>

        </Row>
      </Container>
    </section>
  );
};

export default Founder;