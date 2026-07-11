const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'src/sections/About');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

const replacements = {
  'bg-[#fcfaf5]': 'bg-[#0a0908]',
  'bg-[#f2efe6]': 'bg-[#1a1816]',
  'bg-[#ebe7dc]': 'bg-[#242220]',
  'border-[#e0dcd0]': 'border-[#242220]',
  'text-[#1a1816]': 'text-[#f5f0eb]',
  'text-[#5c5549]': 'text-[#b8ad9e]',
  'text-[#7a7167]': 'text-[#7a7167]',
  'text-[#8a8376]': 'text-[#7a7167]',
  'stroke=\"#1a1816\"': 'stroke=\"#f5f0eb\"',
  'fill=\"#1a1816\"': 'fill=\"#f5f0eb\"',
  'hover:bg-[#ebe7dc]': 'hover:bg-[#242220]',
  'bg-white': 'bg-[#1a1816]'
};

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  for (const [key, value] of Object.entries(replacements)) {
    content = content.split(key).join(value);
  }
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Updated ' + file);
});
