'use client';

import { useEffect, useMemo, useState } from 'react';

const levelTitles = [
  'What is Securitization?','SPV Mechanics & True Sale','Tranches, Ratings & Pay Rules','Waterfalls & Triggers','Collateral Performance','Build a Mini Waterfall','Read a Presale','Pricing, Spreads, WAL & Yield','Surveillance & KPIs','Presale-to-Price Capstone','Prime vs Subprime','Scenario & Sensitivity Lab','Legal Documents','Advanced Waterfalls','Counterparties & Hedging','Static Pools & Roll Rates','Data Tape & Stratification','Investor Memo & Credit Pitch','Regulation & Risk Retention','Macro Drivers','Servicing & Recoveries','Deal Lifecycle','Relative Value & Comps','ESG, EVs & Future Trends','Secondary Trading & Downgrades','Grand Capstone','Ratings & CE Backsolve','Structuring Lab','Excel Model','Final Exam','Funding & Pool Management','Multi-Multi Encumbrance'
];

const lessonSections = [
  { id:'mission', label:'Mission', title:'What securitization does' },
  { id:'why', label:'Why it exists', title:'Why originators use it' },
  { id:'players', label:'Players', title:'Meet the deal team' },
  { id:'protection', label:'Protection', title:'How the structure absorbs risk' },
  { id:'example', label:'Example', title:'A tiny $100 million deal' },
];

const cards = [
  { front:'Securitization', back:'Turning a pool of contractual cash flows, such as auto loans, into securities that investors can buy.' },
  { front:'SPV / Issuer', back:'A separate, limited-purpose entity that owns the loans and issues the notes.' },
  { front:'Waterfall', back:'The contractual priority that determines who gets paid first from available collections.' },
  { front:'Credit enhancement', back:'Protection for noteholders through subordination, overcollateralization, excess spread, or reserves.' },
  { front:'Sequential amortization', back:'Principal pays the senior notes first, reducing their outstanding balance and risk before junior notes.' },
];

const quiz = [
  { q:'What is the primary role of the SPV?', options:['Originate new auto loans','Hold the loan pool and issue notes','Set borrower interest rates','Guarantee every investor payment'], answer:1, explain:'The SPV owns the transferred assets and issues the securities; its separation helps make the structure bankruptcy-remote.' },
  { q:'Which order best describes the basic transaction?', options:['Investors → borrowers → SPV','Borrowers → servicer/SPV → investors','SPV → borrowers → originator','Rating agency → SPV → borrowers'], answer:1, explain:'Borrowers make payments, the servicer collects them for the SPV, and the waterfall distributes available cash to investors.' },
  { q:'Who benefits most from sequential amortization during stress?', options:['Senior noteholders','The residual holder','New borrowers','The vehicle dealer'], answer:0, explain:'Senior notes receive principal first, shrinking their exposure before more junior claims are paid.' },
  { q:'Which item is NOT a common form of credit enhancement?', options:['Subordination','Overcollateralization','Excess spread','A higher borrower mileage'], answer:3, explain:'Mileage may affect collateral risk, but it is not structural credit enhancement.' },
  { q:'What usually happens after a performance trigger fails?', options:['All debt is forgiven','Cash may be trapped or redirected to seniors','The SPV originates more loans','Junior investors are paid first'], answer:1, explain:'Triggers protect senior investors by restricting junior distributions and redirecting cash to build protection or pay seniors faster.' },
];

const mapNodes = [
  { day:1, name:'Core idea', detail:'See the complete borrower-to-investor flow.', state:'current' },
  { day:2, name:'The SPV', detail:'Learn why the issuer is legally separate.', state:'next' },
  { day:3, name:'Tranches', detail:'Split the deal into different risk and return profiles.', state:'future' },
  { day:4, name:'Waterfall', detail:'Follow each dollar through the priority of payments.', state:'future' },
  { day:6, name:'Build it', detail:'Apply the foundation in a mini waterfall.', state:'milestone' },
];

type StudioTool = 'map'|'cards'|'quiz';

export default function Home(){
  const [section,setSection]=useState(0);
  const [completed,setCompleted]=useState<string[]>([]);
  const [tool,setTool]=useState<StudioTool>('map');
  const [expanded,setExpanded]=useState(false);
  const [notice,setNotice]=useState('');
  const [mapNode,setMapNode]=useState(0);
  const [cardIndex,setCardIndex]=useState(0);
  const [flipped,setFlipped]=useState(false);
  const [mastered,setMastered]=useState<number[]>([]);
  const [answers,setAnswers]=useState<Record<number,number>>({});
  const [submitted,setSubmitted]=useState(false);
  const [presenting,setPresenting]=useState(false);

  useEffect(()=>{
    try {
      const saved=localStorage.getItem('sa-day1-progress');
      if(saved){const data=JSON.parse(saved);setCompleted(data.completed||[]);setMastered(data.mastered||[]);setAnswers(data.answers||{});setSubmitted(!!data.submitted);}
    } catch {}
  },[]);
  useEffect(()=>{
    localStorage.setItem('sa-day1-progress',JSON.stringify({completed,mastered,answers,submitted}));
  },[completed,mastered,answers,submitted]);

  const score=useMemo(()=>quiz.reduce((sum,item,i)=>sum+(answers[i]===item.answer?1:0),0),[answers]);
  const xp=completed.length*20+mastered.length*5+(submitted?score*10:0);
  const progress=Math.round(((completed.length+mastered.length/5+(submitted?1:0))/7)*100);

  function finishSection(){
    const id=lessonSections[section].id;
    if(!completed.includes(id))setCompleted([...completed,id]);
    if(section<lessonSections.length-1)setSection(section+1);else{setTool('quiz');setNotice('Lesson complete — your final mission is the quiz!');}
  }
  function chooseLevel(index:number){
    if(index===0){setSection(0);setNotice('Welcome back to Day 1.');return;}
    setNotice(`Day ${index+1} is on the roadmap. We’re polishing Day 1 first.`);
  }
  function resetDay(){
    if(!confirm('Reset all Day 1 progress on this device?'))return;
    setCompleted([]);setMastered([]);setAnswers({});setSubmitted(false);setSection(0);setCardIndex(0);setFlipped(false);setNotice('Day 1 progress reset.');
  }

  return <main className="app-shell">
    <header className="topbar">
      <div className="brand-mark">SA</div><div className="brand-copy"><strong>Securitization Arcade</strong><span>From Loans to Bonds in 30 Days</span></div>
      <div className="header-progress" aria-label={`${progress}% complete`}><span>DAY 1 · {progress}% COMPLETE</span><div><i style={{width:`${Math.max(progress,3)}%`}} /></div></div>
      <button className="present-button" onClick={()=>setPresenting(true)}>▶ Present</button><button className="icon-button" onClick={resetDay} aria-label="Reset Day 1 progress" title="Reset progress">↺</button><div className="avatar">PM</div>
    </header>

    {notice&&<button className="toast" onClick={()=>setNotice('')} aria-label="Dismiss message">{notice}<span>×</span></button>}

    <section className="workspace">
      <aside className="panel journey-panel">
        <div className="panel-heading"><div><span className="eyebrow">YOUR JOURNEY</span><h2>32 learning levels</h2></div><span className="journey-score">{progress}%</span></div>
        <div className="phase-card"><span>PHASE 1</span><strong>Build the foundation</strong><div className="phase-meter"><i style={{width:`${Math.max(progress/7,2)}%`}} /></div><small>Day 1 in progress · 7 levels in this phase</small></div>
        <nav className="level-list" aria-label="Course levels">{levelTitles.slice(0,expanded?32:8).map((title,index)=><button onClick={()=>chooseLevel(index)} className={index===0?'level active':'level'} key={title}><span className="level-number">{index===0?'▶':index+1}</span><span><b>{index<30?`Day ${index+1}`:`Bonus ${index-29}`}</b>{title}</span>{index===0?<em>NOW</em>:<span className="roadmap-dot">○</span>}</button>)}</nav>
        <button className="all-levels" onClick={()=>setExpanded(!expanded)}>{expanded?'Show core levels':'View all 32 levels'} <span>{expanded?'↑':'→'}</span></button>
        <div className="bonus-note"><span>★</span><p><b>2 bonus levels await</b>Advanced funding and controls unlock after graduation.</p></div>
      </aside>

      <article className="panel lesson-panel">
        <div className="lesson-toolbar"><span className="level-pill">LEVEL 01 · FOUNDATION</span><div className="section-tabs" role="tablist">{lessonSections.map((item,i)=><button key={item.id} className={i===section?'current':completed.includes(item.id)?'done':''} onClick={()=>setSection(i)} aria-label={`Open ${item.label}`}>{completed.includes(item.id)?'✓ ':''}{i+1}</button>)}</div><span>⏱ 45–60 min</span></div>
        <div className="lesson-scroll" key={lessonSections[section].id}>
          {section===0&&<MissionSection/>}
          {section===1&&<WhySection/>}
          {section===2&&<PlayersSection/>}
          {section===3&&<ProtectionSection/>}
          {section===4&&<ExampleSection/>}
        </div>
        <footer className="lesson-footer"><div><span>DAY 1 PROGRESS · {completed.length}/5 SECTIONS</span><div className="footer-meter"><i style={{width:`${completed.length*20}%`}} /></div></div><button onClick={finishSection}>{section===4?'Finish lesson':'Complete & continue'} <span>→</span></button></footer>
      </article>

      <aside className="panel studio-panel">
        <div className="panel-heading"><div><span className="eyebrow">PRACTICE STUDIO</span><h2>Learn by doing</h2></div><span className="xp">{xp} XP</span></div>
        <div className="studio-callout"><span>✨</span><p><b>Your Day 1 toolkit</b>Map the idea, practise recall, then prove it.</p></div>
        <div className="studio-tabs" role="tablist">
          <button onClick={()=>setTool('map')} className={tool==='map'?'active':''}>◇ Map</button>
          <button onClick={()=>setTool('cards')} className={tool==='cards'?'active':''}>▣ Cards</button>
          <button onClick={()=>setTool('quiz')} className={tool==='quiz'?'active':''}>? Quiz</button>
        </div>
        {tool==='map'&&<MapTool selected={mapNode} setSelected={setMapNode}/>} 
        {tool==='cards'&&<CardTool index={cardIndex} setIndex={setCardIndex} flipped={flipped} setFlipped={setFlipped} mastered={mastered} setMastered={setMastered}/>} 
        {tool==='quiz'&&<QuizTool answers={answers} setAnswers={setAnswers} submitted={submitted} setSubmitted={setSubmitted} score={score}/>} 
        <div className="streak"><span>{progress===100?'🏆':'🔥'}</span><p><b>{progress===100?'Day 1 mastered':'Start your streak'}</b>{progress===100?'You cleared the first level.':'Complete the lesson and quiz to light it up.'}</p><strong>{progress===100?'100 XP':'Day 1'}</strong></div>
      </aside>
    </section>

    <div className="mobile-tools" aria-label="Practice tools"><button onClick={()=>{setTool('map');setNotice('Open on desktop to use the full Practice Studio.')}}>◇ Map</button><button onClick={()=>{setTool('cards');setNotice('Open on desktop to use flashcards.')}}>▣ Cards</button><button onClick={()=>{setTool('quiz');setNotice('Open on desktop to take the quiz.')}}>? Quiz</button></div>

    {presenting&&<Presentation section={section} setSection={setSection} close={()=>setPresenting(false)}/>} 
  </main>;
}

function MissionSection(){return <><div className="lesson-hero"><div className="pixel-art"><span>●</span><span>→</span><span>▰</span><span>→</span><span>▱</span></div><p className="comic-kicker">INSERT COIN: one auto loan, many investors.</p><h1>What is Securitization?</h1><p>Follow a pool of auto loans as it becomes a stack of tradable bonds—and meet every player along the way.</p></div><LearningThread/><section className="content-section"><span className="section-label">MISSION BRIEFING</span><h2>Turn thousands of loans into investable bonds</h2><p>Securitization gathers many small contractual cash flows—like monthly auto-loan payments—and finances them by issuing securities to investors.</p><div className="flow-card"><div><span>🚗</span><b>Borrowers</b><small>make payments</small></div><i>→</i><div><span>🏦</span><b>Originator</b><small>pools loans</small></div><i>→</i><div className="highlight"><span>📦</span><b>SPV / Trust</b><small>issues notes</small></div><i>→</i><div><span>📊</span><b>Investors</b><small>fund the deal</small></div></div><div className="plain-english"><b>💬 In plain English</b><p>The lender turns future borrower payments into funding today. Investors receive those payments according to a strict queue called the waterfall.</p></div></section></>}
function LearningThread(){return <div className="learning-thread"><div><span>PREVIOUSLY</span><b>Your finance intuition</b></div><i>→</i><div className="today"><span>TODAY</span><b>See the complete deal flow</b></div><i>→</i><div><span>LATER</span><b>Build an actual waterfall</b></div></div>}
function WhySection(){return <section className="deep-section"><span className="section-label">WHY IT EXISTS</span><p className="comic-kicker">POWER-UP: funding today from payments tomorrow.</p><h1>Why would a lender securitize?</h1><p className="lead">The transaction is a funding and risk-management tool—not financial magic. It changes how loans are financed and who bears different slices of risk.</p><div className="learning-grid"><InfoCard icon="↻" title="Recycle capital" text="Convert a pool of loans into cash that can fund new lending."/><InfoCard icon="$" title="Lower funding cost" text="Highly protected senior bonds may price more cheaply than unsecured borrowing."/><InfoCard icon="⇄" title="Transfer risk" text="Junior notes, overcollateralization, and the residual absorb losses before seniors."/><InfoCard icon="≋" title="Match cash flows" text="Finance long-lived assets with liabilities designed around their expected collections."/></div><div className="challenge"><b>Quick thought experiment</b><p>If a lender must wait five years for every borrower to repay, how many new loans can it make today? Securitization helps turn that future cash into current funding.</p></div></section>}
function PlayersSection(){const players=[['Originator / Sponsor','Makes the loans, selects the pool, and sells it to the SPV.'],['SPV / Issuer','Holds the loans and issues the securities.'],['Servicer','Collects borrower payments and manages delinquent accounts.'],['Trustee / Paying Agent','Applies the documents, runs the waterfall, and pays investors.'],['Investors','Choose tranches based on risk, return, and maturity.'],['Rating Agencies','Analyze credit protection under stress assumptions.']];return <section className="deep-section"><span className="section-label">MEET THE DEAL TEAM</span><p className="comic-kicker">MULTIPLAYER MODE: everyone has a different job.</p><h1>Who makes the machine run?</h1><p className="lead">The structure works because responsibilities are separated. Click through these roles mentally from borrower payment to investor receipt.</p><div className="player-list">{players.map(([name,text],i)=><div key={name}><span>{i+1}</span><p><b>{name}</b>{text}</p></div>)}</div><div className="plain-english"><b>🎯 Product Manager lens</b><p>Think of the transaction as a service blueprint: each party owns a step, produces evidence, and creates an operational dependency.</p></div></section>}
function ProtectionSection(){return <section className="deep-section"><span className="section-label">CREDIT ENHANCEMENT</span><p className="comic-kicker">SHIELD UP: losses need somewhere to land.</p><h1>How are senior investors protected?</h1><p className="lead">Credit enhancement creates cushions between collateral losses and promised payments to the rated notes.</p><div className="shield-stack"><div className="senior"><b>Class A · Senior</b><span>Paid first · losses last</span></div><div className="mezz"><b>Class B · Mezzanine</b><span>More yield · more risk</span></div><div className="equity"><b>Residual / OC</b><span>Paid last · losses first</span></div></div><div className="learning-grid compact"><InfoCard icon="↓" title="Subordination" text="Junior claims absorb losses before senior claims."/><InfoCard icon="+" title="Overcollateralization" text="The asset balance exceeds rated note balances."/><InfoCard icon="%" title="Excess spread" text="Asset yield left after fees and bond interest creates a recurring cushion."/><InfoCard icon="▣" title="Reserve" text="Cash is set aside to cover shortfalls when collections are weak."/></div></section>}
function ExampleSection(){return <section className="deep-section"><span className="section-label">WORKED EXAMPLE</span><p className="comic-kicker">BOSS ROUND: follow the money.</p><h1>A tiny $100 million Auto ABS deal</h1><p className="lead">The asset pool earns 8%, while the transaction funds itself with senior and mezzanine notes plus a $10 million residual cushion.</p><div className="deal-grid"><div><span>COLLATERAL</span><b>$100mm</b><small>Auto loans · 8% WA APR</small></div><div><span>CLASS A</span><b>$70mm</b><small>Senior notes · 5%</small></div><div><span>CLASS B</span><b>$20mm</b><small>Mezz notes · 7%</small></div><div><span>RESIDUAL</span><b>$10mm</b><small>First-loss position</small></div></div><div className="math-card"><span>Monthly asset interest</span><b>$666,667</b><i>−</i><span>Fees + note interest</span><b>$501,667</b><i>=</i><span>Rough excess spread</span><b className="positive">$165,000</b></div><div className="challenge"><b>Your check</b><p>OC amount = $100mm collateral − $90mm rated notes = <strong>$10mm</strong>. OC ratio = $100mm ÷ $90mm = <strong>1.111x</strong>.</p></div></section>}
function InfoCard({icon,title,text}:{icon:string,title:string,text:string}){return <div className="info-card"><span>{icon}</span><b>{title}</b><p>{text}</p></div>}

function MapTool({selected,setSelected}:{selected:number,setSelected:(n:number)=>void}){return <div className="interactive-tool"><div className="tool-head"><span>KNOWLEDGE MAP</span><b>You are at the foundation</b></div><div className="vertical-map">{mapNodes.map((node,i)=><button key={node.day} onClick={()=>setSelected(i)} className={`${node.state} ${selected===i?'selected':''}`}><span>{node.day}</span><p><b>{node.name}</b><small>{node.state==='current'?'NOW':node.state==='milestone'?'LAB':'NEXT'}</small></p></button>)}</div><div className="map-detail"><span>DAY {mapNodes[selected].day}</span><b>{mapNodes[selected].name}</b><p>{mapNodes[selected].detail}</p></div></div>}
function CardTool({index,setIndex,flipped,setFlipped,mastered,setMastered}:{index:number,setIndex:(n:number)=>void,flipped:boolean,setFlipped:(b:boolean)=>void,mastered:number[],setMastered:(n:number[])=>void}){const card=cards[index];const known=mastered.includes(index);function move(delta:number){setIndex((index+delta+cards.length)%cards.length);setFlipped(false)}return <div className="interactive-tool"><div className="tool-head"><span>FLASHCARDS · {index+1}/{cards.length}</span><b>{mastered.length} mastered</b></div><button className={`flashcard ${flipped?'flipped':''}`} onClick={()=>setFlipped(!flipped)}><small>{flipped?'ANSWER':'TAP TO FLIP'}</small><strong>{flipped?card.back:card.front}</strong></button><div className="card-actions"><button onClick={()=>move(-1)} aria-label="Previous card">←</button><button className={known?'known':''} onClick={()=>setMastered(known?mastered.filter(n=>n!==index):[...mastered,index])}>{known?'✓ Mastered':'Mark mastered'}</button><button onClick={()=>move(1)} aria-label="Next card">→</button></div></div>}
function QuizTool({answers,setAnswers,submitted,setSubmitted,score}:{answers:Record<number,number>,setAnswers:(a:Record<number,number>)=>void,submitted:boolean,setSubmitted:(b:boolean)=>void,score:number}){const next=Object.keys(answers).length;return <div className="interactive-tool quiz-tool"><div className="tool-head"><span>QUICK QUIZ</span><b>{submitted?`${score}/5 correct`:`${next}/5 answered`}</b></div>{quiz.map((item,i)=><div className="question" key={item.q}><p><b>{i+1}.</b> {item.q}</p><div>{item.options.map((option,j)=><button disabled={submitted} onClick={()=>setAnswers({...answers,[i]:j})} className={`${answers[i]===j?'chosen':''} ${submitted&&j===item.answer?'correct':''} ${submitted&&answers[i]===j&&j!==item.answer?'wrong':''}`} key={option}>{option}</button>)}</div>{submitted&&<small>{item.explain}</small>}</div>)}{!submitted?<button className="submit-quiz" disabled={Object.keys(answers).length<quiz.length} onClick={()=>setSubmitted(true)}>Submit answers</button>:<div className="result-box"><strong>{score>=4?'🏆 Level cleared!':'↺ Good first run'}</strong><p>{score>=4?'You reached the 80% mastery target.':'Review the explanations, then try again.'}</p>{score<5&&<button onClick={()=>{setAnswers({});setSubmitted(false)}}>Retry quiz</button>}</div>}</div>}

function Presentation({section,setSection,close}:{section:number,setSection:(n:number)=>void,close:()=>void}){return <div className="presentation" role="dialog" aria-modal="true"><header><div className="brand-mark">SA</div><b>DAY 1 · {lessonSections[section].label}</b><button onClick={close}>Exit presentation ×</button></header><main><span>SECURITIZATION ARCADE</span><h1>{lessonSections[section].title}</h1>{section===0&&<div className="presentation-flow"><b>🚗 Borrowers</b><i>→</i><b>🏦 Originator</b><i>→</i><b>📦 SPV</b><i>→</i><b>📊 Investors</b></div>}{section===1&&<p>Recycle capital · Lower funding cost · Transfer risk · Match cash flows</p>}{section===2&&<p>Originator · SPV · Servicer · Trustee · Investors · Rating agencies</p>}{section===3&&<p>Subordination · Overcollateralization · Excess spread · Reserve account</p>}{section===4&&<p>$100mm collateral → $90mm rated notes → $10mm first-loss cushion</p>}</main><footer><button disabled={section===0} onClick={()=>setSection(section-1)}>← Previous</button><span>{section+1} / {lessonSections.length}</span><button disabled={section===lessonSections.length-1} onClick={()=>setSection(section+1)}>Next →</button></footer></div>}
