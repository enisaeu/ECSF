import React from 'react';
import Framework from '../framework/Framework';
import Scroll from 'react-scroll';

import ECSFLogo from '../ecsf-logo-dark.svg';
import { PersonBoundingBox, Search, Eyeglasses, FileEarmarkTextFill, Robot, FileEarmarkCode, FiletypeJson, FiletypeXml } from 'react-bootstrap-icons';


const Profiles = () => {
  const framework = Framework('v1');

  return (
    <>
      <div className="px-4 pt-5 mt-5 text-center">
        <img src={ECSFLogo} alt="European Cybersecurity Skills Framework (ECSF)" className="d-block mx-auto mb-4" width="380" height="214" style={{ maxWidth: '100%' }}/>
        <h1 className="d-none fw-bold text-body-emphasis">European Cybersecurity Skills Framework</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Meet ECSF's 12 Cybersecurity Professional Role Profiles.
          </p>
        </div>
      </div>

      <div className="container px-4 pb-5">
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          {framework.roleProfiles.map(function(roleProfile){
            return (
              <div className="col text-center" key={ roleProfile.id }>
                <div className="d-inline-flex align-items-center justify-content-center fs-2 mb-3">
                  <Scroll.Link to={ 'full-profile-' + roleProfile.id } delay={0} style={{ cursor: 'pointer' }}>
                    <img src={ roleProfile.icon } alt={roleProfile.title.text} style={{ maxWidth: '80px', maxHeight: '80px' }}/>
                  </Scroll.Link>
                </div>
                <Scroll.Link to={ 'full-profile-' + roleProfile.id } delay={0} style={{ cursor: 'pointer' }}>
                  <h3 className="fs-2" style={{ color: roleProfile.color }}>
                    {roleProfile.title.text}
                  </h3>
                </Scroll.Link>
                <p>
                  { roleProfile.summaryStatement }{' '}
                  <Scroll.Link to={ 'full-profile-' + roleProfile.id } delay={0} className="icon-link" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                    [more]
                  </Scroll.Link>
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-3 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-4 text-center">
              <div className="fs-1 pb-2">
                <PersonBoundingBox/>{' '}
                <Search/>
              </div>
              <p className="lead mb-4">
                Dive into the structure of each of the<br/>
                12 Cybersecurity Professional Role Profiles<br/>
                presented by the ECSF.
              </p>
            </div>
            <div className="col-12 col-lg-4 text-center">
              <div className="fs-1 pb-2">
                <Eyeglasses/>{' '}
                <FileEarmarkTextFill/>
              </div>
              <p className="lead mb-4">
                Grab a copy of the<br/>
                ECSF Framework document on<br/>
                <a href="https://www.enisa.europa.eu/publications/european-cybersecurity-skills-framework-role-profiles" target="_blank" rel="noreferrer" style={{textDecoration: 'none'}}>
                  ENISA's website
                </a>.
              </p>
            </div>
            <div className="col-12 col-lg-4 text-center">
              <div className="fs-1 pb-2">
                <Robot/>{' '}
                <FileEarmarkCode/>
              </div>
              <p className="lead mb-4">
                The framework is also available<br/>
                in machine readable formats<br/>
                <a href="./framework/ECSF-v1.json" download style={{textDecoration: 'none'}}>
                  <FiletypeJson/> JSON
                </a>,{' '}
                <a href="./framework/ECSF-v1.xml" download style={{textDecoration: 'none'}}>
                  <FiletypeXml/> XML
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="px-4 py-5">

          {framework.roleProfiles.map(function(roleProfile){
            return (
              <Scroll.Element name={ 'full-profile-' + roleProfile.id } key={ roleProfile.id }>
                <div className="row">
                  <div className="col-12 py-4">
                    <img src={ roleProfile.icon } alt={roleProfile.title.text} className="float-left" style={{ maxWidth: '48px', maxHeight: '48px', verticalAlign: 'middle' }}/>
                    <span className="h5 text-uppercase ms-1" style={{ color: roleProfile.color }}>
                      {roleProfile.title.text}
                    </span>
                  </div>
                  <div className="col-12">
                    <div class="table-responsive">
                      <table className="ecsf-profile">
                        <thead>
                          <tr>
                            <th>Profile Title</th>
                            <td style={{ minWidth: '300px' }}>{roleProfile.title.text}</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th title="Lists titles under the same profile.">
                              Alternative Title(s)
                            </th>
                            <td>
                              <ul className="mb-0">
                                {roleProfile.titles.map(function(title, i){
                                  return (
                                    <li key={ i }>{ title.text }</li>
                                  );
                                })}
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <th title="Indicates the main purpose of the profile.">
                              Summary statement
                            </th>
                            <td>{ roleProfile.summaryStatement }</td>
                          </tr>
                          <tr>
                            <th title="Describes the rationale of the profile.">
                              Mission
                            </th>
                            <td>{ roleProfile.mission }</td>
                          </tr>
                          <tr>
                            <th>
                              Deliverables(s)
                            </th>
                            <td>
                              <ul className="mb-0">
                                {roleProfile.deliverables.map(function(deliverable, i){
                                  return (
                                    <li key={ i }>{ deliverable.text }</li>
                                  );
                                })}
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <th title="A list of typical tasks performed by the profile.">
                              Main task(s)
                            </th>
                            <td>
                              <ul className="mb-0">
                                {roleProfile.mainTasks.map(function(task, i){
                                  return (
                                    <li key={ i }>{ task.text }</li>
                                  );
                                })}
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <th title="A list of abilities to perform work functions and duties by the profile.">
                              Key skill(s)
                            </th>
                            <td>
                              <ul className="mb-0">
                                {roleProfile.keySkills.map(function(skill, i){
                                  return (
                                    <li key={ i }>{ skill.text }</li>
                                  );
                                })}
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <th title="A list of essential knowledge required to perform work functions and duties by the profile.">
                              Key knowledge
                            </th>
                            <td>
                              <ul className="mb-0">
                                {roleProfile.keyKnowledge.map(function(knowledge, i){
                                  return (
                                    <li key={ i }>{ knowledge.text }</li>
                                  );
                                })}
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <th>e-Competences (from e-CF)</th>
                            <td>
                              {roleProfile.eCompetences.map(function(eCompetence, i){
                                return (
                                  <div key={ i }>{ `${eCompetence.id} ${eCompetence.text} (Level ${eCompetence.level})` }</div>
                                );
                              })}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Scroll.Element>
            );
          })}
          

        </div>
      </div>
    </>
  );
};

export default Profiles;
