/**
 * Profile Renderer & Inspector for @DangDuyLe
 * Simple CLI tool to preview and verify GitHub profile assets.
 */

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const USERNAME = 'DangDuyLe';
const GITHUB_API_URL = `https://api.github.com/users/${USERNAME}`;

async function main() {
  console.log('\x1b[36m%s\x1b[0m', '═════════════════════════════════════════════════════════');
  console.log('\x1b[35m%s\x1b[0m', `  🚀 GitHub Profile Inspector - @${USERNAME}`);
  console.log('\x1b[36m%s\x1b[0m', '═════════════════════════════════════════════════════════\n');

  const readmePath = resolve(process.cwd(), 'README.md');
  if (!existsSync(readmePath)) {
    console.error('\x1b[31m%s\x1b[0m', '❌ README.md not found in current directory!');
    process.exit(1);
  }

  const content = readFileSync(readmePath, 'utf8');
  console.log('\x1b[32m%s\x1b[0m', `✔ README.md loaded successfully (${content.length} characters)`);

  try {
    console.log('\x1b[33m%s\x1b[0m', `Fetching live GitHub data for ${USERNAME}...`);
    const res = await fetch(GITHUB_API_URL);
    if (res.ok) {
      const data = await res.json();
      console.log('\x1b[32m%s\x1b[0m', '✔ GitHub API connection active!');
      console.log(`  • Name: ${data.name || 'N/A'}`);
      console.log(`  • Public Repos: ${data.public_repos}`);
      console.log(`  • Followers: ${data.followers}`);
      console.log(`  • Profile URL: ${data.html_url}`);
    } else {
      console.log('\x1b[33m%s\x1b[0m', `⚠ GitHub API returned status: ${res.status}`);
    }
  } catch (err) {
    console.log('\x1b[33m%s\x1b[0m', `⚠ Could not reach GitHub API: ${err.message}`);
  }

  console.log('\n\x1b[35m%s\x1b[0m', '📌 Quick Push Instructions:');
  console.log('  1. Create repository named "DangDuyLe" on https://github.com/new (Make it PUBLIC)');
  console.log(`  2. git remote add origin https://github.com/${USERNAME}/${USERNAME}.git`);
  console.log('  3. git push -u origin main');
  console.log('\n\x1b[36m%s\x1b[0m', '═════════════════════════════════════════════════════════\n');
}

main();
