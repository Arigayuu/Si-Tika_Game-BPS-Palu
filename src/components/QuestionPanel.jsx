import React,{useEffect,useRef,useState} from 'react';
export default function QuestionPanel({question}){
 const [expanded,setExpanded]=useState(false);const close=useRef(null);const trigger=useRef(null);
 useEffect(()=>{if(expanded)close.current?.focus();},[expanded]);
 const dismiss=()=>{setExpanded(false);trigger.current?.focus();};
 return <>
 <section className="question-panel" aria-label={`Level ${question.level}: ${question.topic}`}>
 <img className="panel-frame" src="/assets/76d39.png" alt=""/>
 <div className="question-meta">Level {question.level}</div><div className="question-panel-content"><h1>{question.instruction}</h1><button ref={trigger} className="question-picture" onClick={()=>setExpanded(true)} aria-label="Perbesar gambar soal"><img src={question.image} alt={question.imageAlt}/><span>Lihat lebih besar</span></button></div>
 </section>
 {expanded&&<div className="image-modal" role="dialog" aria-modal="true" aria-label="Gambar soal diperbesar" onKeyDown={e=>{if(e.key==='Escape')dismiss();if(e.key==='Tab'){e.preventDefault();close.current?.focus();}}} onClick={e=>{if(e.target===e.currentTarget)dismiss();}}><div><button ref={close} onClick={dismiss} className="close-image" aria-label="Tutup gambar">×</button><p>{question.instruction}</p><img src={question.image} alt={question.imageAlt}/></div></div>}
 </>;
}

