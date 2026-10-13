import React from 'react';
import QuestionDesign from '../design/QuestionDesign.jsx';
import GameButton from '../components/GameButton.jsx';
import QuestionPanel from '../components/QuestionPanel.jsx';
import {formatAnswer} from '../data/questions.js';
export const backRule=onBack=>node=>React.createElement('button',{...node.props,type:'button','aria-label':'Kembali ke peta level',onClick:onBack,className:node.props.className+' back-button'},node.props.children);
export default function QuestionPage({question,options,selected,status,onAnswer,onBack}){
 const ids=['2016:4186','2016:4202','2016:4219','2016:4220'];
 const rules={'2015:4167':backRule(onBack),'2013:2888':()=>null,'2016:4184':()=> <QuestionPanel key={question.id} question={question}/>,'2016:4268':node=>React.cloneElement(node,{},<p className="hint-text">{question.hint}</p>),'2016:4185':()=>null};
 ids.forEach((id,i)=>{rules[id]=()=> <GameButton style={{left:i%2?204:47,top:i<2?523:596,width:147,height:55}} onClick={()=>onAnswer(options[i])} disabled={status==='evaluating'} className={'answer-button '+(selected===options[i]?(selected===question.correctAnswer?'chosen answer-correct':'chosen answer-wrong'):'')} aria-label={`Jawaban ${formatAnswer(options[i])}`}>{formatAnswer(options[i])}</GameButton>;});
 return <><QuestionDesign rules={rules}/><span className="sr-only" role="status">{status==='evaluating'?'Jawaban sedang diperiksa.':`Level ${question.level}`}</span></>;
}
