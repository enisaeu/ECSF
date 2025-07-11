import React from 'react';
import { useRef, useEffect, useState } from "react";
import Framework from '../framework/Framework';

import ECSFLogo from '../ecsf-logo-dark.svg';
import { Funnel, CircleFill, XLg, Gear, Journals } from 'react-bootstrap-icons';

import Card from 'react-bootstrap/Card';

// React Chart Component using D3 for Sankey Graph with Labels and Colors
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal, sankeyLeft } from "d3-sankey";

const SankeyChart = ({data, height, translateTitle, translateLabel}) => {
  const svgRef = useRef();
  //if (!data | !data.nodes || !data.links)
  //  return <svg ref={svgRef}></svg>;
  if (!height) height = 450;
  if (!translateTitle) translateTitle = (text) => text;
  if (!translateLabel) translateLabel = (text) => text;

  useEffect(() => {
    if (!data | !data.nodes || !data.links) return;
    const _data = {
      nodes: data.nodes,
      links: data.links,
    };

    const container = d3.select(svgRef.current.parentNode);
    const width = container.node().getBoundingClientRect().width;
    //const height = 450;

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 -10 ${width} ${height-20}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const { nodes, links } = sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .size([width, height - 40])
      .nodeAlign(sankeyLeft)(_data);

    // Clear previous content
    svg.selectAll("*").remove();

    // Draw nodes
    svg.selectAll(".node")
      .data(nodes)
      .enter()
      .append("rect")
      .attr("class", "node")
      .attr("x", d => d.x0)
      .attr("y", d => d.y0)
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0)
      .attr("fill", d => colorScale(d.name))
      .append("title")
      .text(d => `${translateTitle(d.name)}\n${d.value}`);

    // Add node labels
    svg.selectAll(".node-label")
      .data(nodes)
      .enter()
      .append("text")
      .attr("class", "node-label")
      .attr("x", d => d.x0 - 6)
      .attr("y", d => (d.y0 + d.y1) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .text(d => translateLabel(d.name))
      .attr("fill", "#000")
      .filter(d => d.x0 < width / 2)
      .attr("x", d => d.x1 + 6)
      .attr("text-anchor", "start");

    // Draw links
    svg.selectAll(".link")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", sankeyLinkHorizontal())
      .attr("stroke", "#2c3e50")
      .attr("stroke-width", d => Math.max(1, d.width))
      .attr("fill", "none")
      .attr("stroke-opacity", 0.25)
      .append("title")
      .text(d => `${translateTitle(d.source.name)} → ${translateTitle(d.target.name)}\n${d.value}`);
  }, [data.nodes, data.links]);

  return <svg ref={svgRef}></svg>;
};

const RewireCategoriesGraph = ({ framework }) => {
  if (!framework) return <></>;
  
  let groups = framework.getTagGroup('rewire-over-group');
  let categories = framework.getTagGroup('rewire-group');
  let skills = framework.keySkills.map((skill, i) => ({id: `S${i+1}`, text: skill.text, tags: skill.tags}));

  let nodes = [
    ... groups.tags.map(tag => groups.getText(tag)),
    ... categories.tags.map(tag => categories.getText(tag)),
    ... skills.map((skill) => skill.id)
  ];

  let links = [];
  categories.tags.forEach(target => {
    let targetIndex = nodes.indexOf(categories.getText(target));
    if (targetIndex < 0) return;

    let linkedSkills = skills.filter(skill => {
      return skill.tags.some(tag => tag.key == target);
    });

    categories.getLinks(target).forEach(source => {
      let sourceIndex = nodes.indexOf(groups.getText(source));
      if (sourceIndex < 0) return;
      links.push({
        target: targetIndex,
        source: sourceIndex,
        value: (linkedSkills.length > 0 ? linkedSkills.length : 1)
      });
    });

    linkedSkills.forEach(node => {
      let nodeIndex = nodes.indexOf(node.id);
      if (nodeIndex < 0) return;
      links.push({ target: nodeIndex, source: targetIndex, value: 1 });
    });
  });

  return SankeyChart({
    data: {
      nodes: nodes.map(name => ({ name: name })),
      links: links
    },
    height: (skills.length * 16),
    translateTitle: (text) => {
      let skill = skills.find(skill => skill.id == text);
      if (skill) return `${skill.id}: ${skill.text}`;
      return text;
    },
  });
};


const SkillsGraphs = () => {
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

    let group = framework.filters.forSkills.find(group => group.includes(tag));
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

  //const items2display = framework ? framework.keySkills.filter(function(item, i){
  //  for (let i = filters.length - 1; i >= 0; i--) {
  //    if (!item.tags.includes(filters[i])) return false;
  //  }
  //  return true;
  //}) : [];

  return (
    <>
      <div className="px-4 pt-5 mt-5 text-center">
        <img src={ECSFLogo} alt="European Cybersecurity Skills Framework (ECSF)" className="d-block mx-auto mb-4" width="380" style={{ maxWidth: '100%' }}/>
        <h1 className="d-none fw-bold text-body-emphasis">European Cybersecurity Skills Framework</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Analyse the <strong>key <Gear/> Skills</strong> defined by the ECSF.
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
                    <h3>Rewire Categories</h3>
                    <RewireCategoriesGraph framework={framework} />
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

export default SkillsGraphs;
