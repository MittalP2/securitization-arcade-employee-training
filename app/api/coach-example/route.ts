type ExampleInput={day:number;concept:string;definition:string;quizExplanation:string;previousExamples:string[]};

function text(value:unknown,max:number){return typeof value==='string'?value.trim().slice(0,max):''}
function failure(stage:string){
  const incidentId=crypto.randomUUID();
  console.error(JSON.stringify({event:'coach_example_failed',incidentId,stage,recordedAt:new Date().toISOString()}));
  return Response.json({error:'Could not produce another example.',ownerFeedbackRecorded:true,incidentId},{status:503});
}

async function generate(apiKey:string,input:ExampleInput){
  const response=await fetch('https://api.fireworks.ai/inference/v1/chat/completions',{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},body:JSON.stringify({model:process.env.FIREWORKS_MODEL||'accounts/fireworks/models/kimi-k2p6',temperature:.2,max_tokens:260,response_format:{type:'json_object'},messages:[
    {role:'system',content:'You are Study Arcade’s bounded Learning Coach. Give one short, concrete teaching example for the supplied concept. Use only the supplied definition and approved quiz explanation. Make it different from previous examples. Do not provide deal-specific financial, legal, accounting, rating, or investment advice. Return JSON with one field: example.'},
    {role:'user',content:JSON.stringify(input)}
  ]})});
  if(!response.ok)throw new Error(`Provider ${response.status}`);
  const data=await response.json() as {choices?:Array<{message?:{content?:string}}>};
  const raw=JSON.parse(data.choices?.[0]?.message?.content||'{}') as {example?:unknown};
  const example=text(raw.example,700);if(!example)throw new Error('Empty example');return example;
}

export async function POST(request:Request){
  let raw:Partial<ExampleInput>;try{raw=await request.json() as Partial<ExampleInput>}catch{return Response.json({error:'Invalid request.'},{status:400})}
  const input:ExampleInput={day:Number(raw.day),concept:text(raw.concept,120),definition:text(raw.definition,700),quizExplanation:text(raw.quizExplanation,700),previousExamples:Array.isArray(raw.previousExamples)?raw.previousExamples.map(item=>text(item,700)).filter(Boolean).slice(-3):[]};
  if(!Number.isInteger(input.day)||input.day<1||input.day>32||!input.concept||!input.definition)return Response.json({error:'Invalid learning context.'},{status:400});
  const apiKey=process.env.FIREWORKS_API_KEY;if(!apiKey)return failure('configuration');
  try{return Response.json({example:await generate(apiKey,input)})}catch{try{return Response.json({example:await generate(apiKey,input)})}catch{return failure('generation')}}
}
