import React from 'react';
import { Link } from 'react-router-dom';

import ECSFLogo from '../ecsf-logo-dark.svg';
import { People, FiletypePdf } from 'react-bootstrap-icons';


const Home = () => {
  return (
    <>
      <div className="px-4 py-5 my-5 text-center">
        <img src={ECSFLogo} alt="European Cybersecurity Skills Framework (ECSF)" className="d-block mx-auto mb-4" width="380" height="214" style={{ maxWidth: '100%' }}/>
        <h1 className="d-none fw-bold text-body-emphasis">European Cybersecurity Skills Framework</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            A practical tool to support the identification and articulation of tasks, competences, skills and knowledge associated with the roles of European cybersecurity professionals, serving as the EU reference point for defining and assessing cybersecurity-related skills.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link role="button" to="/profiles" className="btn btn-primary btn-lg px-4 gap-3">
              <People/> Explore the Profiles
            </Link>
            <a href="https://www.enisa.europa.eu/publications/european-cybersecurity-skills-framework-ecsf" target="_blank" rel="noreferrer" className="btn btn-outline-secondary btn-lg px-4">
              <FiletypePdf/> Get the Manual
            </a>
          </div>
        </div>
      </div>

    </>
  );
};

export default Home;
