const https = require('https');
const fs = require('fs');
const path = require('path');

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest);
      reject(err);
    });
  });
};

const assets = {
  projects: {
    'ecommerce.jpg': 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
    'dashboard.jpg': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    'ai.jpg': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
  },
  skills: {
    'react.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
    'typescript.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
    'nodejs.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg',
    'python.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
    'aws.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original.svg',
    'docker.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg',
  },
};

async function downloadAssets() {
  for (const [category, files] of Object.entries(assets)) {
    const dir = path.join('public', category);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    for (const [filename, url] of Object.entries(files)) {
      const dest = path.join(dir, filename);
      console.log(`Downloading ${filename}...`);
      await downloadFile(url, dest);
    }
  }

  // Download hero background
  const heroUrl = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80';
  await downloadFile(heroUrl, 'public/hero-bg.jpg');
}

downloadAssets().then(() => {
  console.log('All assets downloaded successfully!');
}).catch((err) => {
  console.error('Error downloading assets:', err);
}); 