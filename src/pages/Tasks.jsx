import React from 'react';
import { useEffect, useState } from "react";
import Framework from '../framework/Framework';

import ECSFLogo from '../ecsf-logo-dark.svg';
import { Funnel, CircleFill, XLg, ListTask } from 'react-bootstrap-icons';

import Card from 'react-bootstrap/Card';


const Tasks = () => {
  const [loading, setLoading] = useState(true);
  const [framework, setFramework] = useState(null);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    // Load framework data
    const f = Framework('v1');
    setFramework(f);

    // Disable loading
    setLoading(false);
  }, []);

  const handleNewFilter = (e) => {
    let tag = framework.getTag(e.target.value);
    if (!tag) return;

    let group = framework.filters.forTasks.find(group => group.includes(tag));
    if (!group) return;

    if (!filters.includes(tag.key)) {
      setFilters([...filters, tag]);
    }
  }

  const handleRemoveFilter = (e) => {
    let tag = framework.getTag(e.target.dataset.tag);
    if (!tag) return;

    let index = filters.indexOf(tag);
    if (index > -1) {
      filters.splice(index, 1);
      setFilters([...filters]);
    }
  }

  const items2display = framework ? framework.mainTasks.filter(function(item, i){
    for (let i = filters.length - 1; i >= 0; i--) {
      if (!item.tags.includes(filters[i])) return false;
    }
    return true;
  }) : [];

  return (
    <>
      <div className="px-4 pt-5 mt-5 text-center">
        <img src={ECSFLogo} alt="European Cybersecurity Skills Framework (ECSF)" className="d-block mx-auto mb-4" width="380" style={{ maxWidth: '100%' }}/>
        <h1 className="d-none fw-bold text-body-emphasis">European Cybersecurity Skills Framework</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Analyse the <strong>main <ListTask/> Tasks</strong> defined by the ECSF.<br/>
            <em>An ECSF main task is a typical task carried out by a role profile.</em>
          </p>
        </div>
      </div>

      <div className="container">
        <div className="px-4 py-5">

          <div className="row">
            <div className="col-12">
              { loading ? (
                <p>Loading ...</p>
              ) : (
                <>
                  <div className="row mb-3">

                    {/* Filters */}
                    <div className="col-12">
                      <Card>
                        <Card.Body className="pb-2">
                          <div className="row align-items-center">
                            <div className="col-auto mb-2">
                              <Funnel/> Filters:
                            </div>
                            { framework.filters.forTasks.map(function(group, i) {
                              return (
                                <div className="col-auto mb-2" key={ 'filter-group-' + i }>
                                  <div className="input-group">
                                    <span className="input-group-text px-2" style={{ color: group.color }}>
                                      <CircleFill/>
                                    </span>
                                    <select className="form-select form-select-sm" onChange={ handleNewFilter } style={{ width: '160px' }}>
                                      <option defaultValue>{ group.name }</option>
                                      { group.tags.map(function(tag_key, j) {
                                        let tag = framework.getTag(tag_key);
                                        if (!filters.includes(tag)) {
                                          return (
                                            <option value={ tag.key } key={ 'filter-group-item-' + j }>{ group.getText(tag) }</option>
                                          );
                                        }
                                        return (
                                          <></>
                                        );
                                      })}
                                    </select>
                                  </div>
                                </div>
                              );
                            }) }
                          </div>

                          { (filters.length > 0) ? (
                            <div className="pb-2 pt-1">
                              { filters.map(function(tag, i){
                                return (
                                  <React.Fragment key={ i }>{' '}
                                    <span className="badge rounded-pill" style={{ backgroundColor: tag.color, cursor: 'pointer' }} data-tag={ tag.key } onClick={ handleRemoveFilter } title="Click to remove">
                                      { tag.text }{' '}<XLg style={{ pointerEvents: 'none' }}/>
                                    </span>
                                  </React.Fragment>
                                );
                              }) }
                            </div>
                          ) : '' }

                        </Card.Body>
                      </Card>
                    </div>

                  </div>
                  <table className="ecsf-tasks">
                    <tbody>
                      {items2display.length > 0 ? items2display.map(function(item, i){
                        return (
                          <tr key={ i }>
                            <td>
                              { item.text }
                              <div>
                                { item.tags.map(function(tag, i){
                                  return (
                                    <React.Fragment key={ i }>{' '}
                                      <span className="badge rounded-pill" style={{ backgroundColor: tag.color }}>{ tag.text }</span>
                                    </React.Fragment>
                                  );
                                }) }
                              </div>
                            </td>
                          </tr>
                        );
                      }) : (
                        <tr>
                          <td className="text-center py-4">
                            No items were found matching your filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <div className="text-end text-muted">
                    <small>Showing {items2display.length} item{(items2display.length > 1 ? 's' : '')}.</small>
                  </div>
                </>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Tasks;
