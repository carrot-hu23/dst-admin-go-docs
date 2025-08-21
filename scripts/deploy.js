const fs = require('fs');
const path = require('path');

// 定义源目录和目标目录
const sourceDir = path.join(__dirname, '../docs/.vitepress/dist');
const targetDir = path.join(__dirname, '../');

// 要排除的文件/目录列表
const excludeList = ['.git', '.gitignore', 'node_modules', 'docs', 'scripts', 'package.json', 'package-lock.json'];

console.log('正在部署文件...');

// 递归复制文件的函数
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    // 创建目标目录
    fs.mkdirSync(dest, { recursive: true });
    
    // 读取源目录内容
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    // 复制文件
    fs.copyFileSync(src, dest);
  }
}

// 清理目标目录的函数（只删除之前部署的文件）
function cleanTargetDir() {
  console.log('清理旧文件...');
  
  if (!fs.existsSync(sourceDir)) {
    console.error('源目录不存在，请先构建项目: npm run docs:build');
    process.exit(1);
  }
  
  const sourceFiles = fs.readdirSync(sourceDir);
  
  sourceFiles.forEach(function(itemName) {
    // 跳过排除列表中的项目
    if (excludeList.includes(itemName)) {
      return;
    }
    
    const targetItemPath = path.join(targetDir, itemName);
    if (fs.existsSync(targetItemPath)) {
      // 删除文件或目录
      const stats = fs.statSync(targetItemPath);
      if (stats.isDirectory()) {
        fs.rmSync(targetItemPath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(targetItemPath);
      }
      console.log(`已删除: ${itemName}`);
    }
  });
}

// 部署新文件的函数
function deployFiles() {
  console.log('部署新文件...');
  
  if (!fs.existsSync(sourceDir)) {
    console.error('源目录不存在，请先构建项目: npm run docs:build');
    process.exit(1);
  }
  
  // 复制所有文件
  fs.readdirSync(sourceDir).forEach(function(itemName) {
    // 跳过排除列表中的项目
    if (excludeList.includes(itemName)) {
      return;
    }
    
    const sourceItemPath = path.join(sourceDir, itemName);
    const targetItemPath = path.join(targetDir, itemName);
    
    copyRecursiveSync(sourceItemPath, targetItemPath);
    console.log(`已部署: ${itemName}`);
  });
}

// 执行清理和部署
try {
  cleanTargetDir();
  deployFiles();
  console.log('部署完成!');
} catch (error) {
  console.error('部署失败:', error);
  process.exit(1);
}