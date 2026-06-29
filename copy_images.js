const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\Techbuild Hub\\.gemini\\antigravity-ide\\brain\\b0a26ba2-5888-44cb-a1bc-9381630d688c';
const destDir = 'c:\\Users\\Techbuild Hub\\Desktop\\Prajwal Doctor\\assets';

const files = [
  { src: 'insta_cover1_1782731702273.png', dest: 'insta_cover1.png' },
  { src: 'insta_cover2_1782731720000.png', dest: 'insta_cover2.png' },
  { src: 'insta_cover3_1782731737067.png', dest: 'insta_cover3.png' }
];

files.forEach(f => {
  const srcPath = path.join(srcDir, f.src);
  const destPath = path.join(destDir, f.dest);
  try {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${f.src} to ${f.dest}`);
  } catch (err) {
    console.error(`Error copying ${f.src}:`, err.message);
  }
});
