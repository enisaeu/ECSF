![ECSF Logo](public/ecsf.png)

# European Cybersecurity Skills Framework (ECSF)

A practical tool to support the identification and articulation of tasks, competences, skills and knowledge associated with the roles of European cybersecurity professionals, serving as the EU reference point for defining and assessing cybersecurity-related skills.

Related Links:
 - [ECSF's 12 Role Profiles publication](https://www.enisa.europa.eu/publications/european-cybersecurity-skills-framework-role-profiles)
 - [ECSF's User Manual publication](https://www.enisa.europa.eu/publications/european-cybersecurity-skills-framework-ecsf)
 - [ENISA's dedicated page for ECSF](https://www.enisa.europa.eu/topics/skills-and-competences/skills-development/european-cybersecurity-skills-framework-ecsf)


## ECSF Web Tool
A web tool to easily access and explore ENISA's [European Cybersecurity Skills Framework](https://www.enisa.europa.eu/topics/skills-and-competences/skills-development/european-cybersecurity-skills-framework-ecsf). Created by ENISA's [Ad-Hoc Working Group on the ECSF](https://www.enisa.europa.eu/topics/skills-and-competences/skills-development/european-cybersecurity-skills-framework-ecsf/ad-hoc-working-group-on-the-european-cybersecurity-skills-framework-2023-2025).

This repository provides open access to the ECSF Web Tool's code, allowing anyone to clone it and customize the ECSF to suit their specific needs. A good starting point for making edits is the file located at `src/framework/ecsf-v1.json`.


### Developer Notes

This section is for developers who want to contribute to the ECSF Web Tool or deploy it in their own environment.

#### Installing Requirments

To get started, install the required NPM packages:
```bash
npm install
```

#### Deploy Locally

Once the dependencies are installed, you can start a local development server using:
```bash
npm start
```
This will launch the tool in your browser, allowing you to test and make changes in real time.


#### Building

To generate static files for production deployment, run the following build script:
```bash
npm run build
```

After the build completes, the production-ready files will be available in the `./build` directory.
