const fs = require('fs');
const path = require('path');

function writeDataFile(file, value, envName) {
  const filePath = path.join(process.cwd(), file);
  if (value) {
    try {
      JSON.parse(value);
    } catch (e) {
      console.error(`[prebuild] Invalid JSON in ${envName}: ${e.message}`);
      process.exit(1);
    }
    fs.writeFileSync(filePath, value, 'utf-8');
    console.log(`[prebuild] Wrote ${file} from ${envName}`);
  } else if (!fs.existsSync(filePath)) {
    console.error(`[prebuild] Missing ${envName} and ${file} does not exist. Copy data/*.example.json to data/*.json for local dev.`);
    process.exit(1);
  } else {
    console.log(`[prebuild] ${file} already exists locally, skipping`);
  }
}

// Main resume
writeDataFile('data/data.json', process.env.RESUME_DATA, 'RESUME_DATA');

// Company-specific resumes: RESUME_DATA_<SLUG> → data/<slug>.json
// e.g. RESUME_DATA_ANTHROPIC → data/anthropic.json
for (const [key, value] of Object.entries(process.env)) {
  const match = key.match(/^RESUME_DATA_(.+)$/);
  if (match) {
    const slug = match[1].toLowerCase();
    writeDataFile(`data/${slug}.json`, value, key);
  }
}
