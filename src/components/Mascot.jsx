import React from 'react';
const poses={start:'2893b.png',thinking:'60ed3.png',friendly:'c4c99.png',win:'d6738.png',lose:'e102e.png'};
export default function Mascot({pose='start',style,className=''}){return <img src={'/assets/'+poses[pose]} alt={`Si Tika${pose==='lose'?' menyemangati untuk mencoba lagi':pose==='win'?' merayakan kemenangan':''}`} className={'mascot '+className} style={style}/>;}
