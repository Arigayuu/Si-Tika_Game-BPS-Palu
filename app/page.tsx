"use client"

import { useState } from "react"
import { ArrowLeft, Check, LockKeyhole, Heart, Trophy, RotateCcw } from "lucide-react"

type Question = { question: string; options: string[]; answer: number }
type Level = { id: number; title: string; subtitle: string; questions: Question[] }

const makeQuestions = (topic: string): Question[] => [
  { question: `Apa yang paling tepat menggambarkan ${topic}?`, options: ["Data yang bermanfaat", "Cerita fiksi", "Permainan olahraga", "Resep masakan"], answer: 0 },
  { question: "Apa fungsi utama data dalam kehidupan sehari-hari?", options: ["Membingungkan", "Membantu mengambil keputusan", "Menghapus informasi", "Mengganti semua pekerjaan"], answer: 1 },
  { question: "Sikap yang baik saat membaca data adalah...", options: ["Terburu-buru", "Mengabaikan sumber", "Teliti dan kritis", "Menebak saja"], answer: 2 },
  { question: "Data yang disajikan dalam bentuk gambar disebut...", options: ["Grafik", "Novel", "Kamus", "Surat"], answer: 0 },
  { question: "Mengapa data perlu diperbarui?", options: ["Agar tetap relevan", "Agar semakin panjang", "Agar sulit dibaca", "Tidak perlu diperbarui"], answer: 0 },
]

const levels: Level[] = ["Pemanasan", "Mulai Seru", "Tantangan", "Jago BPS", "Master Si Tika"].map((title, index) => ({ id:index + 1, title, subtitle:["Kenalan dengan data", "Makin paham", "Uji ketelitianmu", "Hampir juara", "Buktikan jagoanmu"][index], questions:makeQuestions(["data di sekitar kita", "statistik sederhana", "fakta Kota Palu", "dunia statistik", "pengetahuan BPS"][index]) }))

function Mascot() { return <div className="mascot" aria-label="Maskot Si Tika"><div className="bird"><i className="eye left"/><i className="eye right"/><i className="beak"/><i className="feet"/></div></div> }
function Brand() { return <div className="brand"><span className="brand-mark"><img src="/logo-ps.png" alt="Logo BPS Kota Palu" onError={(event) => { event.currentTarget.style.display = "none" }} /><span>BPS<br/>PALU</span></span><span>BADAN PUSAT STATISTIK<br/>KOTA PALU</span></div> }

export default function Home() {
  const [screen, setScreen] = useState<"home"|"levels"|"quiz"|"result">("home")
  const [levelId, setLevelId] = useState(1)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [completed, setCompleted] = useState<number[]>(() => {
    if (typeof window === "undefined") return []
    try {
      return JSON.parse(window.localStorage.getItem("si-tika-progress") ?? "{}").completed ?? []
    } catch {
      return []
    }
  })
  const [selected, setSelected] = useState<number | null>(null)
  const [feedback, setFeedback] = useState("")
  const [bestScore, setBestScore] = useState(() => {
    if (typeof window === "undefined") return 0
    try {
      return JSON.parse(window.localStorage.getItem("si-tika-progress") ?? "{}").bestScore ?? 0
    } catch {
      return 0
    }
  })
  const level = levels[levelId - 1]
  const question = level.questions[questionIndex]
  const unlocked = Math.min(levels.length, Math.max(1, ...completed, 0) + 1)
  const saveProgress = (nextCompleted: number[], nextScore: number) => { window.localStorage.setItem("si-tika-progress", JSON.stringify({ completed:nextCompleted, bestScore:Math.max(bestScore, nextScore) })); setBestScore(Math.max(bestScore, nextScore)) }
  const startLevel = (id: number) => { setLevelId(id); setQuestionIndex(0); setScore(0); setLives(3); setSelected(null); setFeedback(""); setScreen("quiz") }
  const answer = (index: number) => { if (selected !== null) return; setSelected(index); const correct = index === question.answer; if (correct) { setScore(s => s + 1); setFeedback("✓ Benar! Mantap!") } else { setLives(l => l - 1); setFeedback("✕ Belum tepat, tetap semangat!") } }
  const nextQuestion = () => { if (lives <= 0) { setSelected(null); setFeedback(""); setQuestionIndex(0); setLives(3); setScore(0); return } if (questionIndex === level.questions.length - 1) { const next = completed.includes(levelId) ? completed : [...completed, levelId]; setCompleted(next); saveProgress(next, score); setScreen(levelId === 5 ? "result" : "levels"); return } setQuestionIndex(i => i + 1); setSelected(null); setFeedback("") }
  const progress = ((questionIndex + (selected !== null ? 1 : 0)) / level.questions.length) * 100

  if (screen === "home") return <main className="game-shell"><div className="page"><Brand/><section className="hero"><div className="hero-card"><Mascot/><div className="eyebrow">Mini Quiz BPS Kota Palu</div><h1 className="heading">Kenalan dengan<br/><span style={{color:"var(--green)"}}>Si Tika</span></h1><p className="subtle">Temani waktu menunggumu dengan quiz singkat bersama Si Tika.</p><button className="primary-btn" onClick={() => setScreen("levels")}>MULAI</button></div></section><p className="subtle" style={{fontSize:12,textAlign:"center"}}>Main santai • 5 level • Bisa dimainkan tanpa internet</p></div></main>

  if (screen === "levels") return <main className="game-shell"><div className="page"><Brand/><div style={{marginTop:32}}><button className="icon-btn" onClick={() => setScreen("home")} aria-label="Kembali"><ArrowLeft/></button><div className="eyebrow" style={{marginTop:25}}>Perjalanan Si Tika</div><h1 className="heading" style={{fontSize:36}}>Pilih Level</h1><p className="subtle">Selesaikan satu per satu dan buka perjalanan berikutnya.</p></div><div className="journey" aria-label="Peta perjalanan level">{levels.map(item => { const isUnlocked = item.id <= unlocked || completed.includes(item.id); return <button key={item.id} disabled={!isUnlocked} className={`level-card ${item.id % 2 === 0 ? "offset" : ""} ${item.id === unlocked ? "current" : ""} ${completed.includes(item.id) ? "done" : ""}`} onClick={() => startLevel(item.id)}><span className="level-number">{completed.includes(item.id) ? <Check/> : item.id}</span><span className="level-copy"><strong>Level {item.id} · {item.title}</strong><span>{item.subtitle}</span></span>{completed.includes(item.id) ? <Check color="var(--green)"/> : isUnlocked ? <span className="start-label">Mulai</span> : <LockKeyhole size={18}/>}</button> })}</div><div className="subtle" style={{fontSize:12,marginTop:"auto",textAlign:"center"}}>Skor terbaik: <strong style={{color:"var(--blue)"}}>{bestScore}</strong></div></div></main>

  if (screen === "result") return <main className="game-shell"><div className="page"><Brand/><div className="result-card"><Mascot/><div className="stars">★ ★ ★ ★ ★</div><div className="eyebrow">Perjalanan selesai</div><h2>Hebat sekali!</h2><p className="subtle">Kamu menaklukkan semua level Si Tika.</p><div className="score">{Math.round((bestScore / (levels.length * 5)) * 100)}%</div><div className="actions"><button className="primary-btn" onClick={() => { setScreen("levels"); setCompleted([]) }}>MAIN LAGI</button><button className="secondary-btn" onClick={() => setScreen("home")}>BERANDA</button></div></div></div></main>

  return <main className="game-shell"><div className="page"><div className="quiz-top"><button className="icon-btn" onClick={() => setScreen("levels")} aria-label="Kembali ke level"><ArrowLeft/></button><div style={{textAlign:"center"}}><div className="eyebrow">Level {level.id}</div><strong>{level.title}</strong></div><div className="lives" aria-label={`${lives} nyawa tersisa`}>{[0,1,2].map(i => <Heart key={i} className={`heart ${i >= lives ? "off" : ""}`} fill={i < lives ? "currentColor" : "none"}/>)}</div></div><div className="quiz-card"><Mascot/><h1 className="question">{question.question}</h1><div className="answers">{question.options.map((option,index) => <button key={option} className={`answer-btn ${selected !== null && index === question.answer ? "correct" : ""} ${selected === index && index !== question.answer ? "wrong" : ""}`} onClick={() => answer(index)}>{String.fromCharCode(65 + index)}. {option}</button>)}</div><div className={`feedback ${selected === question.answer ? "good" : selected !== null ? "bad" : ""}`}>{feedback}</div>{selected !== null && <div className="actions"><button className="primary-btn" onClick={nextQuestion}>{lives <= 0 ? "COBA LAGI" : questionIndex === level.questions.length - 1 ? "SELESAI" : "LANJUT"}</button></div>}</div><div className="progress-wrap"><div className="progress-label"><span>Progress</span><span>Soal {questionIndex + 1} / {level.questions.length}</span></div><div className="progress"><span style={{width:`${Math.max(progress, 8)}%`}}/></div></div></div></main>
}
