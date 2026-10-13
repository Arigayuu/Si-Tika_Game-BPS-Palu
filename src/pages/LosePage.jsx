import React from 'react';
import LoseDesign from '../design/LoseDesign.jsx';
import GameButton from '../components/GameButton.jsx';
import {backRule} from './QuestionPage.jsx';
export default function LosePage({onRetry,onBack}){return <LoseDesign rules={{'2016:5149':backRule(onBack),'2016:5185':()=> <GameButton variant="gold" style={{left:42,top:410,width:151,height:59}} onClick={onRetry}>Main Lagi</GameButton>,'2016:5192':()=> <GameButton variant="gold" style={{left:196,top:410,width:151,height:59}} onClick={onBack}>Pilih Level</GameButton>}}/>;}
