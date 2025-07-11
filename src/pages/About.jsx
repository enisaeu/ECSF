import React from 'react';
import preval from 'preval.macro'

import ECSFLogo from '../ecsf-logo-dark.svg';
import { Heart } from 'react-bootstrap-icons';

const About = () => {
  const build_version = preval`module.exports = (new Date().getFullYear() + '' + (new Date().getMonth() + 1).toString().padStart(2,'0') + '' + new Date().getDate().toString().padStart(2,'0'));`;

  return (
    <div className="px-4 pt-5 mt-5 text-center">
      <img src={ECSFLogo} alt="European Cybersecurity Skills Framework (ECSF)" className="d-block mx-auto mb-4" width="380" height="214" style={{ maxWidth: '100%' }}/>
      <h1 className="d-none fw-bold text-body-emphasis">European Cybersecurity Skills Framework</h1>
      <div className="col-lg-6 mx-auto pb-4">
        <p className="lead mb-4">
          <strong>ECSF Web Tool</strong> | <small>b{build_version}</small><br/>
          A web tool to easily access and explore ENISA's ECSF.<br/>
          Created with <Heart/> by ENISA's Ad-Hoc Working Group on the ECSF!
        </p>
        <p className="lead mb-4">
          Find more about ENISA's activities at <a href="https://www.enisa.europa.eu/" style={{ textDecoration: 'none' }}>www.enisa.europa.eu</a> and<br/>
          discover ECSF-related content at ENISA's <a href="https://www.enisa.europa.eu/topics/skills-and-competences/skills-development/european-cybersecurity-skills-framework-ecsf" style={{ textDecoration: 'none' }}>dedicated page</a>.<br/>
        </p>
      </div>
    </div>
  );
};

export default About;
