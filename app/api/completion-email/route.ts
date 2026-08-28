const dayTitles = [
  'What is Securitization?','SPV Mechanics & True Sale','Tranches, Ratings & Pay Rules','Waterfalls & Triggers','Collateral Performance','Build a Mini Waterfall','Read a Presale','Pricing, Spreads, WAL & Yield','Surveillance & KPIs','Presale-to-Price Capstone','Prime vs Subprime','Scenario & Sensitivity Lab','Legal Documents','Advanced Waterfalls','Counterparties & Hedging','Static Pools & Roll Rates','Data Tape & Stratification','Investor Memo & Credit Pitch','Regulation & Risk Retention','Macro Drivers','Servicing & Recoveries','Deal Lifecycle','Relative Value & Comps','ESG, EVs & Future Trends','Secondary Trading & Downgrades','Grand Capstone','Ratings & CE Backsolve','Structuring Lab','Excel Model','Final Exam','Funding & Pool Management','Multi-Multi Encumbrance'
];

export async function POST(request: Request) {
  const apiKey=process.env.RESEND_API_KEY;
  if(!apiKey)return Response.json({error:'Completion email is not configured.'},{status:503});

  let body:unknown;
  try{body=await request.json()}catch{return Response.json({error:'Invalid request.'},{status:400})}
  if(!body||typeof body!=='object')return Response.json({error:'Invalid request.'},{status:400});
  const {day,score,total,xp}=body as Record<string,unknown>;
  if(!Number.isInteger(day)||Number(day)<1||Number(day)>32||!Number.isInteger(score)||!Number.isInteger(total)||Number(total)<1||Number(score)<0||Number(score)>Number(total)||!Number.isFinite(xp)||Number(xp)<0){
    return Response.json({error:'Invalid completion details.'},{status:400});
  }

  const dayNumber=Number(day);
  const title=dayTitles[dayNumber-1];
  const next=dayNumber<32?`Day ${dayNumber+1}: ${dayTitles[dayNumber]}`:'You completed the full 32-level journey.';
  const recipient=process.env.COMPLETION_TO_EMAIL||'pulak261@gmail.com';
  const sender=process.env.COMPLETION_FROM_EMAIL||'Study Arcade <onboarding@resend.dev>';
  const siteUrl=process.env.NEXT_PUBLIC_SITE_URL||'https://securitization-arcade.pulak261.chatgpt.site';
  const response=await fetch('https://api.resend.com/emails',{
    method:'POST',
    headers:{'Authorization':`Bearer ${apiKey}`,'Content-Type':'application/json','Idempotency-Key':`study-arcade-day-${dayNumber}-pulak261`},
    body:JSON.stringify({
      from:sender,
      to:[recipient],
      subject:`🏆 Day ${dayNumber} complete — Study Arcade`,
      text:`Day ${dayNumber} mastered: ${title}\nQuiz: ${score}/${total}\nXP earned: ${xp}\nUp next: ${next}\n\nContinue learning: ${siteUrl}`,
      html:`<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#25263a"><p style="color:#6b63d9;font-weight:700">STUDY ARCADE · COMPLETION RECEIPT</p><h1 style="font-size:28px">🏆 Day ${dayNumber} mastered!</h1><p style="font-size:17px"><strong>${title}</strong></p><div style="background:#f3f1ff;border-radius:14px;padding:18px;margin:22px 0"><p style="margin:0 0 8px"><strong>Quiz score:</strong> ${score}/${total}</p><p style="margin:0"><strong>XP earned:</strong> ${xp}</p></div><p><strong>Up next:</strong> ${next}</p><p><a href="${siteUrl}" style="display:inline-block;background:#6558d9;color:white;text-decoration:none;padding:12px 18px;border-radius:9px;font-weight:700">Continue in Study Arcade →</a></p><p style="color:#777;font-size:13px;margin-top:28px">This learning signal supports reflection and coaching; it is not a standalone employee-performance score.</p></div>`
    })
  });
  if(!response.ok)return Response.json({error:'Email provider rejected the request.'},{status:502});
  return Response.json({sent:true});
}
