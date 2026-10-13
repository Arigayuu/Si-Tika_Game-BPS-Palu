import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,statSync,readFileSync} from 'node:fs';
import {questions,getQuestion,shuffleOptions,formatAnswer} from '../src/data/questions.js';
import {freshProgress,sanitizeProgress,finishAnswer} from '../src/hooks/progress.js';
import {levels} from '../src/data/levels.js';
import {bookPages,pageForLevel} from '../src/data/bookPages.js';
test('All forty PDF rows have unique images, four distinct options and a valid key',()=>{
 assert.equal(questions.length,40);assert.equal(new Set(questions.map(q=>q.image)).size,40);
 assert.deepEqual(questions.map(q=>q.sourceNumber),Array.from({length:41},(_,i)=>i+1).filter(n=>n!==7));
 for(const [i,q] of questions.entries()){assert.equal(q.level,i+1);assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.ok(q.options.includes(q.correctAnswer));assert.ok(statSync(new URL('../public'+q.image,import.meta.url)).size>1000);}
});
test('Wrong answers never unlock; correct answers unlock exactly the next level',()=>{
 let p=freshProgress();
 for(const q of questions){p={...p,currentLevel:q.level,selectedAnswer:q.options.find(x=>x!==q.correctAnswer)};const wrong=finishAnswer(p,q);assert.equal(wrong.page,'lose');assert.equal(wrong.highestUnlockedLevel,q.level);assert.equal(wrong.completedLevels.length,q.level-1);p=finishAnswer({...p,selectedAnswer:q.correctAnswer},q);assert.equal(p.page,'winner');assert.equal(p.highestUnlockedLevel,q.level+1);assert.equal(p.completedLevels.length,q.level);p=sanitizeProgress(JSON.parse(JSON.stringify(p)));}
 assert.equal(p.completedLevels.length,40);assert.equal(getQuestion(41),undefined);assert.equal(levels.filter(x=>x.available).length,40);
});
test('Text and decimal answers survive refresh; arithmetic correction is exact',()=>{
 for(const level of [25,32,38,40]){const q=getQuestion(level);const p={...freshProgress(),currentLevel:level,completedLevels:Array.from({length:level-1},(_,i)=>i+1),highestUnlockedLevel:level,page:'question',status:'evaluating',selectedAnswer:q.correctAnswer,options:shuffleOptions(q.options)};const restored=sanitizeProgress(JSON.parse(JSON.stringify(p)));assert.equal(restored.selectedAnswer,q.correctAnswer);assert.deepEqual(restored.options,p.options);assert.equal(finishAnswer(restored,q).page,'winner');}
 assert.equal(getQuestion(25).correctAnswer,(5+10+15+20)/4);assert.equal(formatAnswer(12.5),'12,5');
});
test('Replay, invalid state and level 50 do not skip levels or overflow',()=>{
 const p={...freshProgress(),highestUnlockedLevel:4,completedLevels:[1,2,3],currentLevel:1,selectedAnswer:getQuestion(1).correctAnswer};assert.equal(finishAnswer(p,getQuestion(1)).highestUnlockedLevel,4);assert.deepEqual(sanitizeProgress({version:1,completedLevels:[1,3,50]}).completedLevels,[1]);assert.equal(sanitizeProgress(null).page,'start');
 const last={...p,currentLevel:50,highestUnlockedLevel:50,completedLevels:Array.from({length:49},(_,i)=>i+1),selectedAnswer:4};assert.equal(finishAnswer(last,{level:50,options:[1,2,3,4],correctAnswer:4}).highestUnlockedLevel,50);assert.equal(finishAnswer(last,{level:49,options:[4],correctAnswer:4}),last);
});
test('Book contains all forty levels once, four per page, with correct return page',()=>{assert.equal(bookPages.length,10);assert.ok(bookPages.every(page=>page.length===4));assert.deepEqual(bookPages.flat().map(q=>q.level),Array.from({length:40},(_,i)=>i+1));for(let level=1;level<=40;level++)assert.equal(pageForLevel(level),Math.floor((level-1)/4));assert.equal(pageForLevel(41),9);});
test('Shuffling retains the original options without mutating them',()=>{for(const q of questions){const before=[...q.options];assert.deepEqual(new Set(shuffleOptions(q.options,()=>.33)),new Set(before));assert.deepEqual(q.options,before);}});

