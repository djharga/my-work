#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting optimized build process...');

// Clean previous build
if (fs.existsSync('dist')) {
  console.log('🧹 Cleaning previous build...');
  execSync('rm -rf dist', { stdio: 'inherit' });
}

// Set production environment
process.env.NODE_ENV = 'production';

// Run build with optimizations
console.log('📦 Building with optimizations...');
try {
  execSync('npm run build', { stdio: 'inherit', env: { ...process.env, NODE_ENV: 'production' } });
  
  // Analyze bundle size
  console.log('📊 Analyzing bundle size...');
  
  const distPath = path.join(__dirname, '../dist');
  if (fs.existsSync(distPath)) {
    const files = fs.readdirSync(path.join(distPath, 'assets'));
    const jsFiles = files.filter(f => f.endsWith('.js'));
    const cssFiles = files.filter(f => f.endsWith('.css'));
    
    console.log('\n📈 Bundle Analysis:');
    console.log('JavaScript files:', jsFiles.length);
    console.log('CSS files:', cssFiles.length);
    
    // Calculate total size
    let totalSize = 0;
    files.forEach(file => {
      const filePath = path.join(distPath, 'assets', file);
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
    });
    
    console.log(`Total bundle size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
    
    // Check for large chunks
    const largeFiles = files.filter(file => {
      const filePath = path.join(distPath, 'assets', file);
      const stats = fs.statSync(filePath);
      return stats.size > 500 * 1024; // Files larger than 500KB
    });
    
    if (largeFiles.length > 0) {
      console.log('\n⚠️  Large files detected:');
      largeFiles.forEach(file => {
        const filePath = path.join(distPath, 'assets', file);
        const stats = fs.statSync(filePath);
        console.log(`  - ${file}: ${(stats.size / 1024).toFixed(2)} KB`);
      });
    }
  }
  
  console.log('\n✅ Build completed successfully!');
  console.log('📊 Check dist/stats.html for detailed bundle analysis');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}