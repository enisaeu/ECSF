import React from 'react';
//import { Link } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';



const Footer = () => {
  return (
    <footer className="pt-3 pb-5">
      <div className="container text-muted text-center">
        <small>
          &copy; {new Date().getFullYear()} by the{' '}
          <a className="text-muted" href="https://www.enisa.europa.eu/topics/skills-and-competences/skills-development/european-cybersecurity-skills-framework-ecsf/ad-hoc-working-group-on-the-european-cybersecurity-skills-framework-2023-2025" target="_blank" style={{textDecoration: 'none'}}>
            Ad-Hoc Working Group on the European Cybersecurity Skills Framework
          </a>, working under the guidance of{' '}
          <a className="text-muted" href="https://www.enisa.europa.eu/" target="_blank" style={{textDecoration: 'none'}}>
            ENISA
          </a>.
        </small>
      </div>
      <div style={{ height: '80px' }}></div>
      <div style={{ position: 'fixed', bottom: '15px', right: '15px', zIndex: '1' }}>
        <Alert className="mb-0 text-center" key="warning" variant="warning" style={{ width: '300px' }}>
          <strong><ExclamationTriangleFill/> Warning</strong><br/>
          This web app is work in progress!<br/>
        </Alert>
      </div>
    </footer>
  );
};

export default Footer;
