export const STORAGE_KEY='statistics-quiz-si-tika-v1';
export const freshProgress=()=>({version:1,bankVersion:2,currentLevel:1,highestUnlockedLevel:1,completedLevels:[],page:'start',status:'idle',selectedAnswer:null,options:[]});
export function sanitizeProgress(input){
 const p=freshProgress(); if(!input||input.version!==1)return p;
 const completed=new Set(Array.isArray(input.completedLevels)?input.completedLevels.filter(n=>Number.isInteger(n)&&n>=1&&n<=50):[]);
 for(let i=1;i<=50&&completed.has(i);i++)p.completedLevels.push(i);
 p.highestUnlockedLevel=Math.min(50,p.completedLevels.length+1);
 p.currentLevel=Number.isInteger(input.currentLevel)?Math.max(1,Math.min(p.highestUnlockedLevel,input.currentLevel)):1;
 p.page=['start','levels','question','winner','lose'].includes(input.page)?input.page:'start';
 p.status=['idle','answering','evaluating','won','lost'].includes(input.status)?input.status:'idle';
 const valid=value=>Number.isFinite(value)||(typeof value==='string'&&value.length<100);
 p.selectedAnswer=valid(input.selectedAnswer)?input.selectedAnswer:null;
 p.options=Array.isArray(input.options)?input.options.filter(valid):[];
 if(input.bankVersion!==2){p.page=p.page==='start'?'start':'levels';p.status='idle';p.selectedAnswer=null;p.options=[];}
 if(p.page==='winner'&&!p.completedLevels.includes(p.currentLevel)){p.page='levels';p.status='idle';}
 return p;
}
export function finishAnswer(progress,question){
 if(!question||question.level!==progress.currentLevel||progress.currentLevel>progress.highestUnlockedLevel||!question.options.includes(progress.selectedAnswer))return progress;
 const won=progress.selectedAnswer===question.correctAnswer;
 const completed=won?[...new Set([...progress.completedLevels,progress.currentLevel])].sort((a,b)=>a-b):progress.completedLevels;
 return {...progress,completedLevels:completed,highestUnlockedLevel:won?Math.min(50,Math.max(progress.highestUnlockedLevel,progress.currentLevel+1)):progress.highestUnlockedLevel,page:won?'winner':'lose',status:won?'won':'lost'};
}
