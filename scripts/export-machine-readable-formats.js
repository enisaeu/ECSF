const fs = require('fs');
const path = require('path');

const versions = ['v1'];
const input_folder = path.join(__dirname, '..', 'src', 'framework');
const output_folder = path.join(__dirname, '..', 'build', 'framework');


// Helpful functions
function jsonToPrettyXml(obj, rootName = 'root') {
	let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
	const indentSize = 2;
	const indentChar = ' ';
	const indentSingle = indentChar.repeat(indentSize);

	function convert(obj, tagName, indentLevel) {
		const indentBase = indentSingle.repeat(indentLevel);

		if (typeof obj === 'object' && obj !== null) {
			if (Array.isArray(obj)) {
				let tags = parseListTags(tagName);
				xml += `${indentBase}<${tags.list}>\n`;
				obj.forEach(item => {
					convert(item, tags.item, indentLevel + 1);
				});
				xml += `${indentBase}</${tags.list}>\n`;
			}
			else {
				xml += `${indentBase}<${tagName}>\n`;
				for (let key in obj) {
					if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
					if (!isValidTagName(key)) {
						throw new Error(`Invalid XML tag name: ${key}`);
					}
					convert(obj[key], key, indentLevel + 1);
				}
				xml += `${indentBase}</${tagName}>\n`;
			}
		} else {
			xml += `${indentBase}<${tagName}>${escapeXml(obj)}</${tagName}>\n`;
		}
	}

	function escapeXml(value) {
		return String(value)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&apos;');
	}

	function isValidTagName(tag) {
		return /^[a-zA-Z_][\w\-.:]*$/.test(tag);
	}

	function parseListTags(tag) {
		if (tag.endsWith('s')) {
			return {
				'list': tag,
				'item': tag.slice(0, -1)
			};
		}
		return {
			'list': tag + '-list',
			'item': tag
		}
	}

	if (!isValidTagName(rootName)) {
		throw new Error(`Invalid root tag name: ${rootName}`);
	}

	convert(obj, rootName, 0);
	return xml;
}



// Prepare folder
if (!fs.existsSync(output_folder)){
    fs.mkdirSync(output_folder);
}

// Run for each framework
versions.forEach(version => {
	console.log(`Loading ECSF ${version} data ...`);
	const file_path = path.join(input_folder, `ecsf-${version}.json`);
	const framework_data = JSON.parse(fs.readFileSync(file_path, 'utf-8'));

	const now = new Date();

	const framework = {
		"metadata" : {
			"name": framework_data.metadata['name'],
			"short": framework_data.metadata['short'],
			"version": framework_data.metadata['version'],
			"date-released": framework_data.metadata['date-released'],
			"date-generated": now.getFullYear() + '-' + now.getMonth().toString().padStart(2,'0') + '-' + now.getDate().toString().padStart(2,'0')
		}
	};
	framework['role-profiles'] = framework_data['role-profiles'].map(profile_data => {
		return {
			"icon" : profile_data['icon'],
			"title" : framework_data['titles'].find(item => item.tags.includes(`role-profile-title${profile_data.id}`)).text,
			"alternative-titles" : framework_data['titles'].filter(item => item.tags.includes(`role-profile${profile_data.id}`)).map(item => item.text),
			"summary-statement" : profile_data['summary-statement'],
			"mission" : profile_data['mission'],
			"deliverables" : framework_data['deliverables'].filter(item => item.tags.includes(`role-profile${profile_data.id}`)).map(item => item.text),
			"main-tasks" : framework_data['main-tasks'].filter(item => item.tags.includes(`role-profile${profile_data.id}`)).map(item => item.text),
			"key-skills" : framework_data['key-skills'].filter(item => item.tags.includes(`role-profile${profile_data.id}`)).map(item => item.text),
			"key-knowledge" : framework_data['key-knowledge'].filter(item => item.tags.includes(`role-profile${profile_data.id}`)).map(item => item.text),
			//"e-competences" : profile_data['e-competences'].reduce((acc, curr) => {
			//	acc[curr.id] = {
			//		"name": framework_data["e-competences"][curr.id].text,
			//		"level": curr.level
			//	};
			//	return acc;
			//}, {})
			"e-competences" : profile_data['e-competences'].map((item) => {
				return {
					"name": item.id + ' ' + framework_data["e-competences"][item.id].text,
					"level": item.level
				};
			})
		}
	});

	let output_file, output_content;

	// Beautify and export data
	output_file = path.join(output_folder, `${framework.metadata.short}-${framework.metadata.version}.json`);
	output_content = JSON.stringify(framework, null, 2);
	fs.writeFileSync(output_file, output_content, 'utf-8');

	output_file = path.join(output_folder, `${framework.metadata.short}-${framework.metadata.version}.xml`);
	output_content = jsonToPrettyXml(framework);
	fs.writeFileSync(output_file, output_content, 'utf-8');

	console.log(`Processed ECSF ${version} data!`);
});
