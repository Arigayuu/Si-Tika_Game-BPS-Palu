import {useState,useEffect} from 'react';
import {STORAGE_KEY,freshProgress,sanitizeProgress} from './progress.js';
export default function useGameProgress(){
 const [saveError,setSaveError]=useState(false);
 const [progress,setProgress]=useState(()=>{try{return sanitizeProgress(JSON.parse(localStorage.getItem(STORAGE_KEY)));}catch{return freshProgress();}});
 useEffect(()=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify(progress));setSaveError(false);}catch{setSaveError(true);}},[progress]);
 return {progress,setProgress,saveError};
}
