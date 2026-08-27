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

const phases = [
  { name:'Build the foundation', days:'1–7', tone:'foundation', concepts:'Flow · SPV · Tranches · Waterfalls · Credit' },
  { name:'Analyze a deal', days:'8–12', tone:'analyze', concepts:'Pricing · Surveillance · Scenarios' },
  { name:'Open the machine', days:'13–18', tone:'machine', concepts:'Documents · Data · Advanced structure' },
  { name:'See the whole market', days:'19–25', tone:'market', concepts:'Regulation · Macro · Trading' },
  { name:'Demonstrate mastery', days:'26–30', tone:'mastery', concepts:'Capstone · Ratings · Model · Exam' },
  { name:'Advanced bonus levels', days:'31–32', tone:'bonus', concepts:'Funding · Pool controls · Encumbrance' },
];

const tourSteps = [
  { target:'[data-tour="brand"]', eyebrow:'WELCOME', title:'Your securitization learning arcade', text:'This is a 30-day core journey with two advanced bonus levels. Let’s see how the experience turns a dense subject into a visible path.' },
  { target:'[data-tour="journey"]', eyebrow:'THE ROADMAP', title:'Always know where you are', text:'The Journey panel keeps all 32 levels visible, marks your current position, and lets you preview what comes next.' },
  { target:'[data-tour="learning-map"]', eyebrow:'THE MENTAL MODEL', title:'See phases and prerequisites together', text:'The Learning Map is both the course index and the conceptual map. It shows which earlier ideas unlock advanced lessons.' },
  { target:'[data-tour="lesson"]', eyebrow:'DAILY MISSION', title:'Learn in small, connected sections', text:'Every day moves from plain-English intuition into mechanics, examples, and application without losing the bigger picture.' },
  { target:'[data-tour="context"]', eyebrow:'CONNECTIONS', title:'Previously → Today → Later', text:'This thread explains what today depends on and where you will apply it later, so lessons never feel isolated.' },
  { target:'[data-tour="practice"]', eyebrow:'ACTIVE RECALL', title:'Practise instead of only reading', text:'The Practice Studio combines concept connections, flashcards, and quizzes with immediate feedback.' },
  { target:'[data-tour="tool-body"]', eyebrow:'FLASHCARDS', title:'Turn concepts into recall', text:'Flip each card, judge whether you know it, and build a review deck around concepts that need more practice.', tool:'cards' as StudioTool },
  { target:'[data-tour="tool-body"]', eyebrow:'KNOWLEDGE CHECK', title:'Prove and improve understanding', text:'The quiz explains every answer and uses an 80% target for mastery—not just completion.', tool:'quiz' as StudioTool },
  { target:'[data-tour="progress"]', eyebrow:'YOUR PROGRESS', title:'Pick up where you left off', text:'Sections, mastered cards, quiz results, XP, and progress are saved on this device. You are ready to start Day 1.' },
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
  const [tourStep,setTourStep]=useState(-1);
  const [presenting,setPresenting]=useState(false);
  const [mapOpen,setMapOpen]=useState(false);

  useEffect(()=>{
    try {
      const saved=localStorage.getItem('sa-day1-progress');
      if(saved){const data=JSON.parse(saved);setCompleted(data.completed||[]);setMastered(data.mastered||[]);setAnswers(data.answers||{});setSubmitted(!!data.submitted);}
    } catch {}
  },[]);
  useEffect(()=>{
    localStorage.setItem('sa-day1-progress',JSON.stringify({completed,mastered,answers,submitted}));
  },[completed,mastered,answers,submitted]);
  useEffect(()=>{
    if(tourStep>=0){const requested=tourSteps[tourStep]?.tool;if(requested)setTool(requested);}
  },[tourStep]);

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
      <div className="brand-mark" data-tour="brand">SA</div><div className="brand-copy"><strong>Securitization Arcade</strong><span>From Loans to Bonds in 30 Days</span></div>
      <div className="header-progress" data-tour="progress" aria-label={`${progress}% complete`}><span>DAY 1 · {progress}% COMPLETE</span><div><i style={{width:`${Math.max(progress,3)}%`}} /></div></div>
      <button className="tour-button" onClick={()=>setTourStep(0)}>✦ Take a tour</button><button className="present-secondary" onClick={()=>setPresenting(true)}>▶ Present Day 1</button><button className="icon-button" onClick={resetDay} aria-label="Reset Day 1 progress" title="Reset progress">↺</button><div className="avatar">PM</div>
    </header>

    {notice&&<button className="toast" onClick={()=>setNotice('')} aria-label="Dismiss message">{notice}<span>×</span></button>}

    <section className="workspace">
      <aside className="panel journey-panel" data-tour="journey">
        <div className="panel-heading"><div><span className="eyebrow">YOUR JOURNEY</span><h2>32 learning levels</h2></div><span className="journey-score">{progress}%</span></div>
        <button className="learning-map-entry" data-tour="learning-map" onClick={()=>setMapOpen(true)}><span>◇</span><p><b>Learning Map</b>All phases, concepts & prerequisites</p><i>↗</i></button>
        <div className="phase-card"><span>PHASE 1 OF 5 · CURRENT</span><strong>Build the foundation</strong><div className="phase-meter"><i style={{width:`${Math.max(progress/7,2)}%`}} /></div><small>Days 1–7 · Flow, structure, credit and waterfalls</small></div>
        <nav className="level-list" aria-label="Course levels">{levelTitles.slice(0,expanded?32:8).map((title,index)=><button onClick={()=>chooseLevel(index)} className={index===0?'level active':'level'} key={title}><span className="level-number">{index===0?'▶':index+1}</span><span><b>{index<30?`Day ${index+1}`:`Bonus ${index-29}`}</b>{title}</span>{index===0?<em>NOW</em>:<span className="roadmap-dot">○</span>}</button>)}</nav>
        <button className="all-levels" onClick={()=>setExpanded(!expanded)}>{expanded?'Show core levels':'View all 32 levels'} <span>{expanded?'↑':'→'}</span></button>
        <div className="bonus-note"><span>★</span><p><b>2 bonus levels await</b>Advanced funding and controls unlock after graduation.</p></div>
      </aside>

      <article className="panel lesson-panel" data-tour="lesson">
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

      <aside className="panel studio-panel" data-tour="practice">
        <div className="panel-heading"><div><span className="eyebrow">PRACTICE STUDIO</span><h2>Learn by doing</h2></div><span className="xp">{xp} XP</span></div>
        <div className="studio-callout"><span>✨</span><p><b>Your Day 1 toolkit</b>Map the idea, practise recall, then prove it.</p></div>
        <div className="studio-tabs" role="tablist">
          <button onClick={()=>setTool('map')} className={tool==='map'?'active':''}>◇ Map</button>
          <button onClick={()=>setTool('cards')} className={tool==='cards'?'active':''}>▣ Cards</button>
          <button onClick={()=>setTool('quiz')} className={tool==='quiz'?'active':''}>? Quiz</button>
        </div>
        <div data-tour="tool-body">{tool==='map'&&<MapTool selected={mapNode} setSelected={setMapNode} openFullMap={()=>setMapOpen(true)}/>} 
        {tool==='cards'&&<CardTool index={cardIndex} setIndex={setCardIndex} flipped={flipped} setFlipped={setFlipped} mastered={mastered} setMastered={setMastered}/>} 
        {tool==='quiz'&&<QuizTool answers={answers} setAnswers={setAnswers} submitted={submitted} setSubmitted={setSubmitted} score={score}/>}</div>
        <div className="streak"><span>{progress===100?'🏆':'🔥'}</span><p><b>{progress===100?'Day 1 mastered':'Start your streak'}</b>{progress===100?'You cleared the first level.':'Complete the lesson and quiz to light it up.'}</p><strong>{progress===100?'100 XP':'Day 1'}</strong></div>
      </aside>
    </section>

    <div className="mobile-tools" aria-label="Practice tools"><button onClick={()=>{setTool('map');setNotice('Open on desktop to use the full Practice Studio.')}}>◇ Map</button><button onClick={()=>{setTool('cards');setNotice('Open on desktop to use flashcards.')}}>▣ Cards</button><button onClick={()=>{setTool('quiz');setNotice('Open on desktop to take the quiz.')}}>? Quiz</button></div>

    {mapOpen&&<LearningMap close={()=>setMapOpen(false)} chooseDay={(day)=>{setMapOpen(false);chooseLevel(day-1)}}/>}
    {tourStep>=0&&<GuidedTour step={tourStep} setStep={setTourStep}/>} 
    {presenting&&<Presentation section={section} setSection={setSection} close={()=>setPresenting(false)}/>} 
  </main>;
}

function MissionSection(){return <><div className="lesson-hero"><div className="pixel-art"><span>●</span><span>→</span><span>▰</span><span>→</span><span>▱</span></div><p className="comic-kicker">INSERT COIN: one auto loan, many investors.</p><h1>What is Securitization?</h1><p>Follow a pool of auto loans as it becomes a stack of tradable bonds—and meet every player along the way.</p></div><LearningThread/><section className="content-section"><span className="section-label">MISSION BRIEFING</span><h2>Turn thousands of loans into investable bonds</h2><p>Securitization gathers many small contractual cash flows—like monthly auto-loan payments—and finances them by issuing securities to investors.</p><div className="flow-card"><div><span>🚗</span><b>Borrowers</b><small>make payments</small></div><i>→</i><div><span>🏦</span><b>Originator</b><small>pools loans</small></div><i>→</i><div className="highlight"><span>📦</span><b>SPV / Trust</b><small>issues notes</small></div><i>→</i><div><span>📊</span><b>Investors</b><small>fund the deal</small></div></div><div className="plain-english"><b>💬 In plain English</b><p>The lender turns future borrower payments into funding today. Investors receive those payments according to a strict queue called the waterfall.</p></div></section></>}
function LearningThread(){return <div className="learning-thread" data-tour="context"><div><span>PREVIOUSLY</span><b>Your finance intuition</b></div><i>→</i><div className="today"><span>TODAY</span><b>See the complete deal flow</b></div><i>→</i><div><span>LATER</span><b>Build an actual waterfall</b></div></div>}
function WhySection(){return <section className="deep-section"><span className="section-label">WHY IT EXISTS</span><p className="comic-kicker">POWER-UP: funding today from payments tomorrow.</p><h1>Why would a lender securitize?</h1><p className="lead">The transaction is a funding and risk-management tool—not financial magic. It changes how loans are financed and who bears different slices of risk.</p><div className="learning-grid"><InfoCard icon="↻" title="Recycle capital" text="Convert a pool of loans into cash that can fund new lending."/><InfoCard icon="$" title="Lower funding cost" text="Highly protected senior bonds may price more cheaply than unsecured borrowing."/><InfoCard icon="⇄" title="Transfer risk" text="Junior notes, overcollateralization, and the residual absorb losses before seniors."/><InfoCard icon="≋" title="Match cash flows" text="Finance long-lived assets with liabilities designed around their expected collections."/></div><div className="challenge"><b>Quick thought experiment</b><p>If a lender must wait five years for every borrower to repay, how many new loans can it make today? Securitization helps turn that future cash into current funding.</p></div></section>}
function PlayersSection(){const players=[['Originator / Sponsor','Makes the loans, selects the pool, and sells it to the SPV.'],['SPV / Issuer','Holds the loans and issues the securities.'],['Servicer','Collects borrower payments and manages delinquent accounts.'],['Trustee / Paying Agent','Applies the documents, runs the waterfall, and pays investors.'],['Investors','Choose tranches based on risk, return, and maturity.'],['Rating Agencies','Analyze credit protection under stress assumptions.']];return <section className="deep-section"><span className="section-label">MEET THE DEAL TEAM</span><p className="comic-kicker">MULTIPLAYER MODE: everyone has a different job.</p><h1>Who makes the machine run?</h1><p className="lead">The structure works because responsibilities are separated. Click through these roles mentally from borrower payment to investor receipt.</p><div className="player-list">{players.map(([name,text],i)=><div key={name}><span>{i+1}</span><p><b>{name}</b>{text}</p></div>)}</div><div className="plain-english"><b>🎯 Product Manager lens</b><p>Think of the transaction as a service blueprint: each party owns a step, produces evidence, and creates an operational dependency.</p></div></section>}
function ProtectionSection(){return <section className="deep-section"><span className="section-label">CREDIT ENHANCEMENT</span><p className="comic-kicker">SHIELD UP: losses need somewhere to land.</p><h1>How are senior investors protected?</h1><p className="lead">Credit enhancement creates cushions between collateral losses and promised payments to the rated notes.</p><div className="shield-stack"><div className="senior"><b>Class A · Senior</b><span>Paid first · losses last</span></div><div className="mezz"><b>Class B · Mezzanine</b><span>More yield · more risk</span></div><div className="equity"><b>Residual / OC</b><span>Paid last · losses first</span></div></div><div className="learning-grid compact"><InfoCard icon="↓" title="Subordination" text="Junior claims absorb losses before senior claims."/><InfoCard icon="+" title="Overcollateralization" text="The asset balance exceeds rated note balances."/><InfoCard icon="%" title="Excess spread" text="Asset yield left after fees and bond interest creates a recurring cushion."/><InfoCard icon="▣" title="Reserve" text="Cash is set aside to cover shortfalls when collections are weak."/></div></section>}
function ExampleSection(){return <section className="deep-section"><span className="section-label">WORKED EXAMPLE</span><p className="comic-kicker">BOSS ROUND: follow the money.</p><h1>A tiny $100 million Auto ABS deal</h1><p className="lead">The asset pool earns 8%, while the transaction funds itself with senior and mezzanine notes plus a $10 million residual cushion.</p><div className="deal-grid"><div><span>COLLATERAL</span><b>$100mm</b><small>Auto loans · 8% WA APR</small></div><div><span>CLASS A</span><b>$70mm</b><small>Senior notes · 5%</small></div><div><span>CLASS B</span><b>$20mm</b><small>Mezz notes · 7%</small></div><div><span>RESIDUAL</span><b>$10mm</b><small>First-loss position</small></div></div><div className="math-card"><span>Monthly asset interest</span><b>$666,667</b><i>−</i><span>Fees + note interest</span><b>$501,667</b><i>=</i><span>Rough excess spread</span><b className="positive">$165,000</b></div><div className="challenge"><b>Your check</b><p>OC amount = $100mm collateral − $90mm rated notes = <strong>$10mm</strong>. OC ratio = $100mm ÷ $90mm = <strong>1.111x</strong>.</p></div></section>}
function InfoCard({icon,title,text}:{icon:string,title:string,text:string}){return <div className="info-card"><span>{icon}</span><b>{title}</b><p>{text}</p></div>}

function MapTool({selected,setSelected,openFullMap}:{selected:number,setSelected:(n:number)=>void,openFullMap:()=>void}){return <div className="interactive-tool"><div className="tool-head"><span>DAY 1 CONNECTIONS</span><b>You are at the foundation</b></div><div className="vertical-map">{mapNodes.map((node,i)=><button key={node.day} onClick={()=>setSelected(i)} className={`${node.state} ${selected===i?'selected':''}`}><span>{node.day}</span><p><b>{node.name}</b><small>{node.state==='current'?'NOW':node.state==='milestone'?'LAB':'NEXT'}</small></p></button>)}</div><div className="map-detail"><span>DAY {mapNodes[selected].day}</span><b>{mapNodes[selected].name}</b><p>{mapNodes[selected].detail}</p></div><button className="open-full-map" onClick={openFullMap}>Open full Learning Map <span>↗</span></button></div>}
function CardTool({index,setIndex,flipped,setFlipped,mastered,setMastered}:{index:number,setIndex:(n:number)=>void,flipped:boolean,setFlipped:(b:boolean)=>void,mastered:number[],setMastered:(n:number[])=>void}){const card=cards[index];const known=mastered.includes(index);function move(delta:number){setIndex((index+delta+cards.length)%cards.length);setFlipped(false)}return <div className="interactive-tool"><div className="tool-head"><span>FLASHCARDS · {index+1}/{cards.length}</span><b>{mastered.length} mastered</b></div><button className={`flashcard ${flipped?'flipped':''}`} onClick={()=>setFlipped(!flipped)}><small>{flipped?'ANSWER':'TAP TO FLIP'}</small><strong>{flipped?card.back:card.front}</strong></button><div className="card-actions"><button onClick={()=>move(-1)} aria-label="Previous card">←</button><button className={known?'known':''} onClick={()=>setMastered(known?mastered.filter(n=>n!==index):[...mastered,index])}>{known?'✓ Mastered':'Mark mastered'}</button><button onClick={()=>move(1)} aria-label="Next card">→</button></div></div>}
function QuizTool({answers,setAnswers,submitted,setSubmitted,score}:{answers:Record<number,number>,setAnswers:(a:Record<number,number>)=>void,submitted:boolean,setSubmitted:(b:boolean)=>void,score:number}){const next=Object.keys(answers).length;return <div className="interactive-tool quiz-tool"><div className="tool-head"><span>QUICK QUIZ</span><b>{submitted?`${score}/5 correct`:`${next}/5 answered`}</b></div>{quiz.map((item,i)=><div className="question" key={item.q}><p><b>{i+1}.</b> {item.q}</p><div>{item.options.map((option,j)=><button disabled={submitted} onClick={()=>setAnswers({...answers,[i]:j})} className={`${answers[i]===j?'chosen':''} ${submitted&&j===item.answer?'correct':''} ${submitted&&answers[i]===j&&j!==item.answer?'wrong':''}`} key={option}>{option}</button>)}</div>{submitted&&<small>{item.explain}</small>}</div>)}{!submitted?<button className="submit-quiz" disabled={Object.keys(answers).length<quiz.length} onClick={()=>setSubmitted(true)}>Submit answers</button>:<div className="result-box"><strong>{score>=4?'🏆 Level cleared!':'↺ Good first run'}</strong><p>{score>=4?'You reached the 80% mastery target.':'Review the explanations, then try again.'}</p>{score<5&&<button onClick={()=>{setAnswers({});setSubmitted(false)}}>Retry quiz</button>}</div>}</div>}

function GuidedTour({step,setStep}:{step:number,setStep:(n:number)=>void}){const [rect,setRect]=useState<{top:number,left:number,width:number,height:number}|null>(null);const item=tourSteps[step];useEffect(()=>{let timer:number;function locate(){const el=document.querySelector(item.target) as HTMLElement|null;if(!el){setRect(null);return;}el.scrollIntoView({behavior:'smooth',block:'center',inline:'center'});timer=window.setTimeout(()=>{const r=el.getBoundingClientRect();setRect({top:r.top-7,left:r.left-7,width:r.width+14,height:r.height+14});},250)}locate();window.addEventListener('resize',locate);return()=>{window.clearTimeout(timer);window.removeEventListener('resize',locate)}},[step,item.target]);const tooltipTop=rect?Math.min(window.innerHeight-250,Math.max(18,rect.top+rect.height+14)):window.innerHeight/2-110;const tooltipLeft=rect?Math.min(window.innerWidth-365,Math.max(18,rect.left)):window.innerWidth/2-175;return <div className="tour-layer" role="dialog" aria-modal="true" aria-label="Product tour"><div className="tour-scrim"/><div className="tour-highlight" style={rect||{top:'50%',left:'50%',width:0,height:0}}/><section className="tour-tip" style={{top:tooltipTop,left:tooltipLeft}}><div className="tour-step"><span>{item.eyebrow}</span><small>{step+1} / {tourSteps.length}</small></div><h2>{item.title}</h2><p>{item.text}</p><div><button className="tour-skip" onClick={()=>setStep(-1)}>Skip tour</button>{step>0&&<button onClick={()=>setStep(step-1)}>Back</button>}<button className="tour-next" onClick={()=>setStep(step===tourSteps.length-1?-1:step+1)}>{step===tourSteps.length-1?'Start Day 1':'Next'} →</button></div></section></div>}

function Presentation({section,setSection,close}:{section:number,setSection:(n:number)=>void,close:()=>void}){return <div className="presentation" role="dialog" aria-modal="true"><header><div className="brand-mark">SA</div><b>DAY 1 · {lessonSections[section].label}</b><button onClick={close}>Exit presentation ×</button></header><main><span>SECURITIZATION ARCADE</span><h1>{lessonSections[section].title}</h1>{section===0&&<div className="presentation-flow"><b>🚗 Borrowers</b><i>→</i><b>🏦 Originator</b><i>→</i><b>📦 SPV</b><i>→</i><b>📊 Investors</b></div>}{section===1&&<p>Recycle capital · Lower funding cost · Transfer risk · Match cash flows</p>}{section===2&&<p>Originator · SPV · Servicer · Trustee · Investors · Rating agencies</p>}{section===3&&<p>Subordination · Overcollateralization · Excess spread · Reserve account</p>}{section===4&&<p>$100mm collateral → $90mm rated notes → $10mm first-loss cushion</p>}</main><footer><button disabled={section===0} onClick={()=>setSection(section-1)}>← Previous</button><span>{section+1} / {lessonSections.length}</span><button disabled={section===lessonSections.length-1} onClick={()=>setSection(section+1)}>Next →</button></footer></div>}

function LearningMap({close,chooseDay}:{close:()=>void,chooseDay:(day:number)=>void}){return <div className="learning-map-modal" role="dialog" aria-modal="true" aria-label="Course learning map"><header><div><span className="eyebrow">YOUR COURSE INDEX + MENTAL MODEL</span><h2>Learning Map</h2><p>Follow the main path, then use the dotted connections to see which earlier ideas unlock later concepts.</p></div><button onClick={close}>Close ×</button></header><div className="map-legend"><span><i className="legend-current"/> Current</span><span><i className="legend-phase"/> Learning phase</span><span><i className="legend-link"/> Prerequisite connection</span></div><div className="phase-map">{phases.map((phase,index)=><section className={`phase-lane ${phase.tone}`} key={phase.name}><div className="phase-identity"><span>{index<5?`PHASE ${index+1}`:'BONUS'}</span><b>{phase.name}</b><small>Days {phase.days}</small></div><div className="phase-concepts"><p>{phase.concepts}</p><div className="phase-nodes">{phase.days.split('–').length===2?Array.from({length:Number(phase.days.split('–')[1])-Number(phase.days.split('–')[0])+1},(_,i)=>Number(phase.days.split('–')[0])+i).map(day=><button className={day===1?'current':''} onClick={()=>chooseDay(day)} key={day}><span>{day}</span><small>{levelTitles[day-1]}</small></button>):null}</div></div>{index<phases.length-1&&<i className="phase-arrow">↓</i>}</section>)}</div><div className="prerequisite-links"><span>KEY PREREQUISITE LINKS</span><div><p><b>Day 3 Tranches</b> unlocks <strong>Day 14 Advanced Waterfalls</strong></p><p><b>Day 4 Triggers</b> is tested in <strong>Day 12 Scenarios</strong></p><p><b>Day 5 Losses</b> is measured through <strong>Day 16 Vintage Analysis</strong></p><p><b>Day 7 Presales</b> becomes <strong>Day 18 Investor Memo</strong></p><p><b>Day 17 Data Tape</b> feeds <strong>Day 29 Excel Model</strong></p><p><b>Day 27 CE Backsolve</b> is applied in <strong>Day 28 Structuring Lab</strong></p></div></div></div>}
