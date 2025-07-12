
import ECSFv1 from './ecsf-v1.json';

class eCompetence {
	constructor(id, data, level) {
		this.id = id;
		this.data = data;
		this.level = level;
	}
	// Getter
	get text() {
		return this.data.text;
	}
	get tags() {
		return this.data.tags;
	}
}

class RoleProfile {
	constructor(roleprofile_data, framework_data) {
		let id = roleprofile_data.id;
		this.id = id;

		this.icon = roleprofile_data.icon;
		this.color = roleprofile_data.color;
		this.summaryStatement = roleprofile_data['summary-statement'];
		this.mission = roleprofile_data['mission'];
		this.titles = framework_data['titles'].filter((title) => {
			return title.tags.includes('role-profile' + id);
		});

		this.title = this.titles.find((title) => {
			return title.tags.includes('role-profile-title' + id);
		});
		this.deliverables = framework_data['deliverables'].filter((deliverable) => {
			return deliverable.tags.includes('role-profile' + id);
		});
		this.mainTasks = framework_data['main-tasks'].filter((task) => {
			return task.tags.includes('role-profile' + id);
		});
		this.keySkills = framework_data['key-skills'].filter((skill) => {
			return skill.tags.includes('role-profile' + id);
		});
		this.keyKnowledge = framework_data['key-knowledge'].filter((knowledge) => {
			return knowledge.tags.includes('role-profile' + id);
		});
		this.eCompetences = roleprofile_data['e-competences'].map((e_competence_data) => {
			return new eCompetence(e_competence_data.id, framework_data['e-competences'][e_competence_data.id], e_competence_data.level);
		});
	}
}

class TagGroup {
	constructor(group) {
		this.prefix = group.prefix;
		this.name = group.name;
		//this.isFilter = group["is-filter"] ? true : false;
		this.isTasksFilter = group["is-tasks-filter"] ? true : false;
		this.isSkillsFilter = group["is-skills-filter"] ? true : false;
		this.isKnowledgeFilter = group["is-knowledge-filter"] ? true : false;
		this.isHidden = group["is-hidden"] ? true : false;
		this.prefix = group.prefix ? group.prefix : false;

		// Parse text
		this.text = {};
		if (group.text) {
			this.text = Object.fromEntries(
				Object.entries(group.text).map(
					([k, v], i) => [((this.prefix && k.startsWith(this.prefix)) ? k : this.prefix + k), v]
				)
			)
		}
		
		// Parse links
		this.links = {};
		if (group.links) {
			this.links = Object.fromEntries(
				Object.entries(group.links).map(
					([k, v], i) => [((this.prefix && k.startsWith(this.prefix)) ? k : this.prefix + k), v]
				)
			)
		}

		this.tags = this.text ? Object.keys(this.text) : [];
		this.color = group.color || '#888';
	}
	includes(tag) {
		if (typeof tag === 'string')
			return tag.startsWith(this.prefix);
		else if (typeof tag.key === 'string')
			return tag.key.startsWith(this.prefix);
		else
			return false;
	}
	getText(tag) {
		return this.text.hasOwnProperty(tag) ? this.text[tag] : tag.toString();
	}
	getLinks(tag) {
		return this.links.hasOwnProperty(tag) ? this.links[tag] : [];
	}
}

class Tag {
	constructor(tag, groups) {
		this.key = tag;
		this.group = groups ? groups.find(group => group.includes(tag)) : null;
	}
	get color() {
		return this.group ? this.group.color : '#888';
	}
	get text() {
		return this.group ? this.group.getText(this.key) : this.key;
	}
	toString() {
		return this.key;
	}
}

class ItemObject {
	constructor(item, framework) {
		this.text = item.text;
		this.tags = item.tags ? item.tags.map(tag => framework.getTag(tag)) : [];
	}
}

class FrameworkInstance {
	constructor(framework_data) {
		// Parse framework info
		this.name = framework_data.metadata.name;
		this.short = framework_data.metadata.short;
		this.version = framework_data.metadata.version;
		this.released = new Date(framework_data.metadata['date-released']);
		this.edited = new Date(framework_data.metadata['date-last-edit']);
		// Parse role profiles
		this.roleProfiles = framework_data['role-profiles'].map((roleprofile_data) => {
			return new RoleProfile(roleprofile_data, framework_data);
		});

		this._tags = {};
		this.tagGroups = framework_data['tag-groups'].map((group) => {
			return new TagGroup(group);
		});
		this.filters = {
			"forTasks": this.tagGroups.filter(group => group.isTasksFilter),
			"forSkills": this.tagGroups.filter(group => group.isSkillsFilter),
			"forKnowledge": this.tagGroups.filter(group => group.isKnowledgeFilter)
		};


		this.deliverables = framework_data['deliverables'].map((deliverable_data) => {
			return deliverable_data;
		});
		this.mainTasks = framework_data['main-tasks'].map((task_data) => {
			return new ItemObject(task_data, this);
		});
		this.keySkills = framework_data['key-skills'].map((skill_data) => {
			return new ItemObject(skill_data, this);
		});
		this.keyKnowledge = framework_data['key-knowledge'].map((knowledge_data) => {
			return new ItemObject(knowledge_data, this);
		});
	}

	getTag(tag) {
		if (tag instanceof Tag) {
			return tag;
		}
		if (!this._tags.hasOwnProperty(tag)) {
			this._tags[tag] = new Tag(tag, this.tagGroups);
		}
		return this._tags[tag];
	}

	getTagGroup(id) {
		id = id.toString().endsWith('@') ? id.toString() : id.toString() + '@';
		return this.tagGroups.find(group => group.prefix === id);
	}
}

const Versions = [
	'v1'
];

const Framework = (version) => {
	let source = null;
	switch(version.toString().trim().toLowerCase()){
	case '1':
	case 'v1':
		source = ECSFv1;
		break;
	default:
		source = ECSFv1;
		break;
	}

	if (!source) return null;
	return (new FrameworkInstance(source));
};

Framework.Versions = Versions;
export default Framework;
