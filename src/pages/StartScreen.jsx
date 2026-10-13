import React from 'react';
import StartDesign from '../design/StartDesign.jsx';
import GameButton from '../components/GameButton.jsx';
export default function StartScreen({onPlay}){return <StartDesign rules={{'2012:1930':()=> <GameButton style={{left:42,top:702,width:310,height:75}} className="play-button" onClick={onPlay}>Play</GameButton>}}/>;}
