import {useEffect,useRef,useState} from 'react';
const KEY='statistics-quiz-sound';
export default function useGameAudio(){
 const [enabled,setEnabled]=useState(()=>{try{return localStorage.getItem(KEY)!=='off';}catch{return true;}});
 const enabledRef=useRef(enabled),tracks=useRef(null),started=useRef(false);
 const getTracks=()=>{
  if(!tracks.current){tracks.current=Object.fromEntries(['background','tap','correct','wrong'].map(name=>{const audio=new Audio(`/audio/${name}.mp3`);audio.preload='auto';audio.volume=name==='background'?.22:.7;audio.loop=name==='background';return [name,audio];}));}
  return tracks.current;
 };
 const safePlay=audio=>{const result=audio.play();result?.catch(()=>{});};
 const resume=()=>{if(enabledRef.current&&started.current&&!document.hidden){const bg=getTracks().background;if(bg.paused)safePlay(bg);}};
 const play=name=>{if(!enabledRef.current||document.hidden)return;const audio=getTracks()[name];if(!audio)return;audio.currentTime=0;safePlay(audio);};
 const toggle=()=>{const next=!enabledRef.current;enabledRef.current=next;setEnabled(next);try{localStorage.setItem(KEY,next?'on':'off');}catch{}if(next){started.current=true;resume();play('tap');}else if(tracks.current){Object.values(tracks.current).forEach(a=>a.pause());}};
 useEffect(()=>{
  const click=e=>{const button=e.target.closest?.('button');if(!button||!button.closest('.game-shell')||button.disabled||button.dataset.audioToggle!==undefined)return;started.current=true;resume();if(button.getAttribute('aria-disabled')!=='true'&&!button.classList.contains('answer-button'))play('tap');};
  const visibility=()=>{if(document.hidden){if(tracks.current)Object.values(tracks.current).forEach(a=>a.pause());}else resume();};
  document.addEventListener('click',click,true);document.addEventListener('visibilitychange',visibility);
  return()=>{document.removeEventListener('click',click,true);document.removeEventListener('visibilitychange',visibility);if(tracks.current)Object.values(tracks.current).forEach(a=>{a.pause();a.removeAttribute('src');a.load();});tracks.current=null;};
 },[]);
 return {enabled,toggle,play};
}
