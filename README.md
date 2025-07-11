# European Cybersecurity Skills Framework (ECSF)

A practical tool to support the identification and articulation of tasks, competences, skills and knowledge associated with the roles of European cybersecurity professionals, serving as the EU reference point for defining and assessing cybersecurity-related skills.

Related Links:
 - [ECSF's 12 Role Profiles publication](https://www.enisa.europa.eu/publications/european-cybersecurity-skills-framework-role-profiles)
 - [ECSF's User Manual publication](https://www.enisa.europa.eu/publications/european-cybersecurity-skills-framework-ecsf)
 - [ENISA's dedicated page for ECSF](https://www.enisa.europa.eu/topics/skills-and-competences/skills-development/european-cybersecurity-skills-framework-ecsf)

## ECSF Web Tool
A web tool to easily access and explore ENISA's [European Cybersecurity Skills Framework](https://www.enisa.europa.eu/topics/skills-and-competences/skills-development/european-cybersecurity-skills-framework-ecsf). Created by ENISA's [Ad-Hoc Working Group on the ECSF](https://www.enisa.europa.eu/topics/skills-and-competences/skills-development/european-cybersecurity-skills-framework-ecsf/ad-hoc-working-group-on-the-european-cybersecurity-skills-framework-2023-2025).

### Developer Notes

#### Deploy Locally
To start with, first install the appropriate NPM libraries:
```bash
npm install
```

The, the `start` script can be used to deploy the web tool locally for testing:
```bash
npm start
```

#### Building
To build the static files that can be used to deploy the web tool in production, the `build` script can be used:
```bash
npm run build
```

Following the successful execution of the script, the web tool's file will be available under `./build`.
