const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, '../public');

const jpgFiles = ['bg-main.jpg', 'mars-1.jpg', 'jupiter-1.jpg'];

async function convertToWebp() {
  for (const file of jpgFiles) {
    const inputPath = path.join(publicDir, file);
    const outputPath = path.join(publicDir, file.replace('.jpg', '.webp'));
    
    if (!fs.existsSync(inputPath)) {
      console.log(`跳过 ${file} - 文件不存在`);
      continue;
    }
    
    try {
      await sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(outputPath);
      
      const originalSize = fs.statSync(inputPath).size;
      const newSize = fs.statSync(outputPath).size;
      const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
      
      console.log(`✓ ${file} -> ${file.replace('.jpg', '.webp')}`);
      console.log(`  原始: ${(originalSize / 1024).toFixed(1)}KB -> 新: ${(newSize / 1024).toFixed(1)}KB (节省 ${savings}%)`);
    } catch (err) {
      console.error(`✗ 转换 ${file} 失败:`, err.message);
    }
  }
}

convertToWebp().then(() => {
  console.log('\n图片转换完成！');
});
