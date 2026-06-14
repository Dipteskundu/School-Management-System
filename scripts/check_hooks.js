const fs = require('fs');
const path = require('path');

function walk(dir){
  let results = [];
  fs.readdirSync(dir,{withFileTypes:true}).forEach(d=>{
    const res = path.resolve(dir,d.name);
    if(d.isDirectory()){
      results = results.concat(walk(res));
    } else if(/\.jsx?$/.test(d.name)){
      results.push(res);
    }
  });
  return results;
}

const src = path.resolve(__dirname,'..','src');
const files = walk(src);
const bad = [];
for(const f of files){
  const txt = fs.readFileSync(f,'utf8');
  if(/useState\(/.test(txt) || /useEffect\(/.test(txt) || /useRef\(/.test(txt)){
    const first = txt.split(/\r?\n/)[0] || '';
    if(!/^\s*"use client"/.test(first)){
      bad.push(f);
    }
  }
}
if(bad.length===0){
  console.log('No client-hook files missing "use client"');
}else{
  console.log('Files using hooks but missing "use client":');
  bad.forEach(f=>console.log(f));
}
