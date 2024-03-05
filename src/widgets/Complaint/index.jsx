import React, { useState, useEffect } from "react";
import Spring from '@components/Spring';
import { useWindowSize } from 'react-use';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { Tabs } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBullseye, faCode, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './AboutUs.css';   
const AboutUs = () => {
  // Ajoutez des styles CSS ici selon vos besoins

  return (
    <form className="d-flex flex-column g-20">
      <Spring className="card d-flex flex-column card-padded">
        <div className="d-flex flex-column justify-content-between flex-1">
          <Tabs
            style={{ width: '100%', backgroundColor: '#FDCA40', color: 'black', justifyContent: 'center' }}
          >
            <h3 style={{ paddingTop: '10px', marginLeft: '320px', color: 'black' }}>About Us</h3>
          </Tabs>

          <br />

          <section className="about-section">
            <h2>Our Mission <FontAwesomeIcon icon={faBullseye} /></h2>
            <p>
              Describe the mission and goals of LinkUpTournament. Explain what your project aims to achieve and its significance.
            </p>
          </section>
          <br />
          <section className="about-section">
            <h2>Team Members <FontAwesomeIcon icon={faUsers} /></h2>
            <p>
              Introduce the key members of your team who are working on LinkUpTournament. You can include brief bios and roles.
            </p>
          </section>
          <br />
          <section className="about-section">
            <h2>Technology Stack <FontAwesomeIcon icon={faCode} /></h2>
            <p>
              Provide information about the technologies and tools used in the development of LinkUpTournament.
            </p>
          </section>
          <br />
          <section className="about-section">
            <h2>Contact Us <FontAwesomeIcon icon={faEnvelope} /></h2>
            <p>
            <strong><a>support@linkupTournament.com</a></strong></p>
          </section>
        </div>
      </Spring>
    </form>
  );
};

export default AboutUs;
