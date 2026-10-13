import {questions} from './questions.js';
export const bookPages=Array.from({length:Math.ceil(questions.length/4)},(_,i)=>questions.slice(i*4,i*4+4));
export function pageForLevel(level){const index=bookPages.findIndex(page=>page.some(q=>q.level===level));return index<0?bookPages.length-1:index;}
