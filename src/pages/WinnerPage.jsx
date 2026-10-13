import React from 'react';
import WinnerDesign from '../design/WinnerDesign.jsx';
import GameButton from '../components/GameButton.jsx';
import {backRule} from './QuestionPage.jsx';
export default function WinnerPage({level,nextAvailable,onNext,onBack}){return <WinnerDesign rules={{'2016:4702':backRule(onBack),'2016:4360':node=>React.cloneElement(node,{},`Level ${level}`),'2016:4346':node=>React.cloneElement(node,{},<div className="result-message">{level===50?'Selamat! Semua 50 level selesai!':nextAvailable?'Selamat kamu lanjut ke level selanjutnya':'Hebat! Semua soal yang tersedia sudah selesai.'}</div>),'2016:4371':()=> <GameButton variant="gold" style={{left:44,top:423,width:296,height:65}} onClick={nextAvailable?onNext:onBack}>{nextAvailable?'next level':'Pilih Level'}</GameButton>}}/>;}
