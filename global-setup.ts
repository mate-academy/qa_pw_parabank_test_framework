import fs from 'fs';
import path from 'path';

function deleteFolderRecursive(folderPath: string) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach(file => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folderPath);
    process.stdout.write('\n ✅ Deleted allure-results folder ✅ \n');
  }
}

async function globalSetup() {
  const allureDir = path.join(__dirname, 'allure-results');
  deleteFolderRecursive(allureDir);
}

export default globalSetup;
