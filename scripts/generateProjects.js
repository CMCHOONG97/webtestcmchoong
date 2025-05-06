const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, '../static/projects');
const outputPath = path.join(__dirname, '../projects.json');

const supportedImages = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

const output = [];

fs.readdirSync(projectsDir).forEach(folder => {
  const folderPath = path.join(projectsDir, folder);
  if (fs.statSync(folderPath).isDirectory()) {
    const title = folder.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    let image = null;

    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (supportedImages.includes(ext)) {
        image = `projects/${folder}/${file}`;
        break;
      }
    }

    const description = fs.existsSync(path.join(folderPath, 'description.txt'))
      ? fs.readFileSync(path.join(folderPath, 'description.txt'), 'utf8').trim()
      : null;

    const tech = fs.existsSync(path.join(folderPath, 'tech.txt'))
      ? fs.readFileSync(path.join(folderPath, 'tech.txt'), 'utf8').trim()
      : null;

    const github = fs.existsSync(path.join(folderPath, 'github.txt'))
      ? fs.readFileSync(path.join(folderPath, 'github.txt'), 'utf8').trim()
      : null;

    output.push({ title, description, tech, github, image });
  }
});

fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf8');
console.log(`✅ ${output.length} projects exported to ${outputPath}`);
