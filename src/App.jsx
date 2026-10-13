import React,{useEffect,useRef,useState} from 'react';
import GameLayout from './components/GameLayout.jsx';
import StartScreen from './pages/StartScreen.jsx';
import LevelSelection from './pages/LevelSelection.jsx';
import QuestionPage from './pages/QuestionPage.jsx';
import WinnerPage from './pages/WinnerPage.jsx';
import LosePage from './pages/LosePage.jsx';
import useGameProgress from './hooks/useGameProgress.js';
import useGameAudio from './hooks/useGameAudio.js';
import {finishAnswer} from './hooks/progress.js';
import {getQuestion,shuffleOptions} from './data/questions.js';
export default function App(){
 const audio=useGameAudio();
 const {progress:p,setProgress,saveError}=useGameProgress();const [notice,setNotice]=useState('');const answering=useRef(false);
 const question=getQuestion(p.currentLevel);
 const go=page=>{answering.current=false;setProgress(prev=>({...prev,page,status:'idle',selectedAnswer:null}));};
 const start=level=>{const q=getQuestion(level);if(!q||level>p.highestUnlockedLevel)return;answering.current=false;setProgress(prev=>({...prev,currentLevel:level,page:'question',status:'answering',selectedAnswer:null,options:shuffleOptions(q.options)}));};
 useEffect(()=>{if(!notice)return;const timer=setTimeout(()=>setNotice(''),3200);return()=>clearTimeout(timer);},[notice]);
 useEffect(()=>{
  if(p.page!=='question'||p.status!=='evaluating'||!question)return;
  const timer=setTimeout(()=>{setProgress(prev=>finishAnswer(prev,question));answering.current=false;},450);
  return()=>clearTimeout(timer);
 },[p.page,p.status,question,setProgress]);
 useEffect(()=>{if(['question','winner','lose'].includes(p.page)&&!question)go('levels');},[p.page,question]);
 const options=question&&p.options.length===4&&new Set(p.options).size===4&&p.options.every(n=>question.options.includes(n))?p.options:question?.options||[];
 const answer=value=>{if(answering.current||p.status==='evaluating'||!question||!options.includes(value))return;answering.current=true;audio.play(value===question.correctAnswer?'correct':'wrong');setProgress(prev=>({...prev,selectedAnswer:value,status:'evaluating'}));};
 return <GameLayout page={p.page}>
 {p.page==='start'&&<StartScreen onPlay={()=>go('levels')}/>}
 {p.page==='levels'&&<LevelSelection progress={p} onSelect={start} onBack={()=>go('start')} onNotice={setNotice}/>}
 {p.page==='question'&&question&&<QuestionPage question={question} options={options} selected={p.selectedAnswer} status={p.status} onAnswer={answer} onBack={()=>go('levels')}/>}
 {p.page==='winner'&&<><WinnerPage level={p.currentLevel} nextAvailable={!!getQuestion(p.currentLevel+1)} onNext={()=>start(p.currentLevel+1)} onBack={()=>go('levels')}/><div className="celebration" aria-hidden="true">{Array.from({length:18},(_,i)=><i key={i} style={{'--x':`${8+i*5}%`,'--drift':`${(i%5-2)*20}px`,'--delay':`${i%4*.08}s`,'--color':['#ff9c26','#00cdaa','#ffe56c'][i%3]}}/>)}</div></>}
 {p.page==='lose'&&<LosePage onRetry={()=>start(p.currentLevel)} onBack={()=>go('levels')}/>}
 <button className="sound-toggle" data-audio-toggle aria-label={audio.enabled?'Matikan suara':'Aktifkan suara'} aria-pressed={audio.enabled} onClick={audio.toggle} title={audio.enabled?'Matikan suara':'Aktifkan suara'}>{audio.enabled?'♪':'♪̸'}</button>
 {(notice||saveError)&&<div className="notice" role="status">{notice||'Penyimpanan browser tidak tersedia. Progres hanya tersimpan selama sesi ini.'}</div>}
 </GameLayout>;
}
