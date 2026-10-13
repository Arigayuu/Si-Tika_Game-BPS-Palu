import React,{useState} from 'react';
import {questions} from '../data/questions.js';
import {bookPages,pageForLevel} from '../data/bookPages.js';
import '../styles/book-map.css';

const positions=[{x:123,y:294},{x:270,y:279},{x:115,y:493},{x:262,y:474}];
export default function LevelSelection({progress,onSelect,onBack,onNotice}){
 const [page,setPage]=useState(()=>pageForLevel(progress.currentLevel));
 const [direction,setDirection]=useState('next');
 const turn=delta=>{setDirection(delta>0?'next':'previous');setPage(p=>Math.max(0,Math.min(bookPages.length-1,p+delta)));};
 return <section className="book-map" aria-label="Buku petualangan statistika">
  <img className="book-background" src="/assets/book/background.png" alt=""/>
  <header className="book-toolbar"><button onClick={onBack} aria-label="Kembali ke beranda">⌂</button><span>{progress.completedLevels.filter(n=>questions.some(q=>q.level===n)).length} / {questions.length} selesai</span><button onClick={()=>onNotice('Pilih level yang terbuka. Jawaban benar membuka level berikutnya. Gunakan panah untuk membalik halaman.')} aria-label="Petunjuk permainan">?</button></header>
  <div className={`book-leaf ${direction}`} key={page}>
   <div className="book-heading"><p>BUKU PETUALANGAN</p><h1>Jelajah Statistika</h1><span>Level {bookPages[page][0].level}–{bookPages[page].at(-1).level}</span></div>
   <svg className="book-route" viewBox="0 0 393 852" aria-hidden="true"><path d="M 70 307 C 65 340 137 358 123 294 C 100 183 248 186 270 279 C 317 353 222 365 179 410 S 70 454 115 493 C 150 577 235 592 262 474 C 283 425 315 474 304 565"/></svg>
   {bookPages[page].map((q,i)=>{const locked=q.level>progress.highestUnlockedLevel,done=progress.completedLevels.includes(q.level),current=!locked&&!done;return <div className="book-stop" key={q.level} style={{left:positions[i].x-48,top:positions[i].y-48}}>
    <div className={`book-stars ${done?'earned':''}`} aria-label={done?'Selesai':'Belum selesai'}><span>★</span><span>★</span><span>★</span></div>
    <button className={`book-level ${locked?'is-locked':''} ${current?'is-current':''}`} aria-label={`Level ${q.level}${locked?', terkunci':done?', selesai':''}`} aria-disabled={locked} onClick={()=>locked?onNotice('Selesaikan level sebelumnya terlebih dahulu.'):onSelect(q.level)}>
     <img src={`/assets/book/level-${i+1}.png`} alt=""/>{q.level>4&&<span className={`book-number slot-${i+1}`}>{q.level}</span>}{locked&&<span className="book-lock" aria-hidden="true">●</span>}
    </button><p className="book-topic">{q.topic}</p><span className="book-status">{done?'Selesai':locked?'Terkunci':'Ayo main!'}</span>
   </div>;})}
   <img className="book-trail-flourish" src="/assets/book/trail.png" alt=""/>
   <p className="book-encouragement">Satu langkah lagi,<br/>satu pengetahuan baru.</p>
  </div>
  <nav className="book-navigation" aria-label="Halaman buku"><button disabled={page===0} onClick={()=>turn(-1)} aria-label="Halaman sebelumnya"><img src="/assets/book/arrow.png" alt=""/></button><span role="status" aria-live="polite">Halaman {page+1} / {bookPages.length}</span><button disabled={page===bookPages.length-1} onClick={()=>turn(1)} aria-label="Halaman berikutnya"><img src="/assets/book/arrow.png" alt=""/></button></nav>
 </section>;
}
