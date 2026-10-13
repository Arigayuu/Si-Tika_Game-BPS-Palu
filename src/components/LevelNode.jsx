import React from 'react';
export default function LevelNode({level,x,y,locked,available,completed,current,onClick}){
 return <button type="button" className={`level-node ${locked?'locked':''} ${current?'current':''}`} style={{left:x,top:y}} onClick={onClick} aria-label={`Level ${level}${!available?', belum tersedia':locked?', terkunci':completed?', selesai':''}`} aria-disabled={locked||!available}>
 <img className="stone-platform" src="/assets/stone-platform.png" alt=""/><img className="node-base" src="/assets/de1aa.svg" alt=""/><img className="node-face" src="/assets/10b15.svg" alt=""/><span>{level}</span>{(locked||!available)&&<i className="lock" aria-hidden="true"/>}{!available&&<small>Segera</small>}{completed&&<b className="completed" aria-hidden="true">✓</b>}
 </button>;
}
