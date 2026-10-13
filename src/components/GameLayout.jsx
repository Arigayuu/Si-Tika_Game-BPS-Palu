import React,{useLayoutEffect,useRef,useState} from 'react';
export default function GameLayout({children,page}){
 const ref=useRef(null);const [scale,setScale]=useState(1);
 useLayoutEffect(()=>{const observer=new ResizeObserver(([e])=>setScale(e.contentRect.width/393));observer.observe(ref.current);return()=>observer.disconnect();},[]);
 useLayoutEffect(()=>{window.scrollTo(0,0);},[page]);
 return <main ref={ref} className="game-shell" aria-label="Statistics Quiz"><div style={{height:852*scale}}><div key={page} className={'screen '+page} style={{transform:`scale(${scale})`}}>{children}</div></div></main>;
}
