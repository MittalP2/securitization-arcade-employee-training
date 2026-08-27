'use client';

import { useState } from 'react';

const levels = ['What is Securitization?','SPV Mechanics & True Sale','Tranches, Ratings & Pay Rules','Waterfalls & Triggers','Collateral Performance','Build a Mini Waterfall','Read a Presale','Pricing, Spreads, WAL & Yield'];
const tools = [['◇','Knowledge Map','See how today connects to all 32 levels'],['▣','Flashcards','5 cards · 0 mastered'],['?','Quick Quiz','5 questions · earn up to 100 XP']];

export default function Home() {
  const [activeTool, setActiveTool] = useState('Knowledge Map');
  return <main className="app-shell">
    <header className="topbar">
      <div className="brand-mark">SA</div><div className="brand-copy"><strong>Securitization Arcade</strong><span>From Loans to Bonds in 30 Days</span></div>
      <div className="header-progress" aria-label="Course progress"><span>LEVEL 1 OF 30</span><div><i /></div></div>
      <button className="present-button">▶ Present</button><button className="icon-button" aria-label="Settings">⚙</button><div className="avatar">PM</div>
    </header>
    <section className="workspace">
      <aside className="panel journey-panel">
        <div className="panel-heading"><div><span className="eyebrow">YOUR JOURNEY</span><h2>32 learning levels</h2></div><button className="icon-button" aria-label="Collapse journey">‹</button></div>
        <div className="phase-card"><span>PHASE 1</span><strong>Build the foundation</strong><div className="phase-meter"><i /></div><small>1 of 7 complete</small></div>
        <nav className="level-list" aria-label="Course levels">{levels.map((level,index)=><button className={index===0?'level active':'level'} key={level}><span className="level-number">{index===0?'▶':index+1}</span><span><b>Day {index+1}</b>{level}</span>{index===0&&<em>NOW</em>}</button>)}</nav>
        <button className="all-levels">View all 32 levels <span>→</span></button>
        <div className="bonus-note"><span>★</span><p><b>2 bonus levels await</b>Advanced funding and controls unlock after graduation.</p></div>
      </aside>
      <article className="panel lesson-panel">
        <div className="lesson-toolbar"><span className="level-pill">LEVEL 01 · FOUNDATION</span><span>⏱ 45–60 min</span><button aria-label="More lesson options">•••</button></div>
        <div className="lesson-scroll">
          <div className="lesson-hero"><div className="pixel-art"><span>●</span><span>→</span><span>▰</span><span>→</span><span>▱</span></div><p className="comic-kicker">INSERT COIN: one auto loan, many investors.</p><h1>What is Securitization?</h1><p>Follow a pool of auto loans as it becomes a stack of tradable bonds—and meet every player along the way.</p></div>
          <div className="learning-thread"><div><span>PREVIOUSLY</span><b>Your existing finance intuition</b></div><i>→</i><div className="today"><span>TODAY</span><b>See the complete deal flow</b></div><i>→</i><div><span>LATER</span><b>Build an actual waterfall</b></div></div>
          <section className="content-section"><span className="section-label">MISSION BRIEFING</span><h2>Turn thousands of loans into investable bonds</h2><p>Securitization gathers many small contractual cash flows—like monthly auto-loan payments—and finances them by issuing securities to investors.</p>
            <div className="flow-card" aria-label="Securitization flow"><div><span>🚗</span><b>Borrowers</b><small>make payments</small></div><i>→</i><div><span>🏦</span><b>Originator</b><small>pools loans</small></div><i>→</i><div className="highlight"><span>📦</span><b>SPV / Trust</b><small>issues notes</small></div><i>→</i><div><span>📊</span><b>Investors</b><small>fund the deal</small></div></div>
            <div className="plain-english"><b>💬 In plain English</b><p>The lender turns future borrower payments into funding today. Investors receive those payments according to a strict queue called the waterfall.</p></div>
          </section>
        </div>
        <footer className="lesson-footer"><div><span>DAY 1 PROGRESS</span><div className="footer-meter"><i /></div></div><button>Continue mission <span>→</span></button></footer>
      </article>
      <aside className="panel studio-panel">
        <div className="panel-heading"><div><span className="eyebrow">PRACTICE STUDIO</span><h2>Learn by doing</h2></div><span className="xp">0 XP</span></div>
        <div className="studio-callout"><span>✨</span><p><b>Your learning toolkit</b>Everything here updates as you move through the course.</p></div>
        <div className="tool-list">{tools.map(([icon,title,desc])=><button key={title} onClick={()=>setActiveTool(title)} className={activeTool===title?'tool-card selected':'tool-card'}><span className="tool-icon">{icon}</span><span><b>{title}</b><small>{desc}</small></span><i>›</i></button>)}</div>
        <div className="map-preview"><div className="map-title"><span>YOU ARE HERE</span><b>{activeTool}</b></div><div className="map-track"><div className="map-node current"><span>1</span><small>Core idea</small></div><i/><div className="map-node"><span>2</span><small>The SPV</small></div><i/><div className="map-node"><span>3</span><small>Tranches</small></div></div><button>Open {activeTool.toLowerCase()} <span>↗</span></button></div>
        <div className="streak"><span>🔥</span><p><b>Start your streak</b>Complete today’s mission to light it up.</p><strong>0 days</strong></div>
      </aside>
    </section>
  </main>;
}
