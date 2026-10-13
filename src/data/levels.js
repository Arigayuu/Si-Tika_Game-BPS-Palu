import {getQuestion} from './questions.js';
export const TOTAL_LEVELS=50;
export const levels=Array.from({length:TOTAL_LEVELS},(_,i)=>({level:i+1,available:!!getQuestion(i+1)}));
