import { useMemo, useState } from 'react';

const MODES = [
  { key: 'question', label: 'Ask Me A Question' },
  { key: 'situation', label: 'Analyze A Situation' },
  { key: 'explain', label: 'Explain or Describe An Issue' },
];

const mockAnalysisByMode = {
  question: {
    sentiment: 'mixed',
    emotion: 'curious',
    clarity: 74,
    confidence: 67,
    balance: 81,
    response: 'Pause first. The answer becomes clearer when urgency leaves the room.',
  },
  situation: {
    sentiment: 'neutral',
    emotion: 'reflective',
    clarity: 78,
    confidence: 72,
    balance: 69,
    response: 'Your message carries care and restraint. Align intent with one concrete ask.',
    nextStep: 'Send a short follow-up with one specific request and a clear timeline.',
  },
  explain: {
    sentiment: 'positive',
    emotion: 'focused',
    clarity: 88,
    confidence: 76,
    balance: 83,
    response: 'Think of it like signal vs noise: sentiment is the feeling signal, intent is the action signal.',
  },
};

function App() {
  const [mode, setMode] = useState('question');
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState(mockAnalysisByMode.question);

  const leftNav = ['Mind', 'Emotion', 'Insight', 'Awareness', 'Omnix'];

  const promptText = useMemo(() => {
    if (!input.trim()) return 'Trust thyself. Every heart vibrates to that iron string.';
    return analysis.response;
  }, [analysis.response, input]);

  const runMockAnalysis = () => {
    const base = mockAnalysisByMode[mode];
    setAnalysis(base);
  };

  return (
    <main className="min-h-screen bg-transparent px-6 py-8 text-zinc-200">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="text-center">
          <h1 className="text-6xl font-light tracking-widest text-zinc-100">Sentiment AI</h1>
          <p className="mt-2 text-xl tracking-[0.7em] text-zinc-400">OMNIX</p>
          <p className="mt-4 text-lg text-zinc-400">Minimalist. Insightful. Infinite.</p>
        </header>

        <section className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[140px_1fr_220px]">
          <nav className="flex flex-col gap-5 text-zinc-400">
            {leftNav.map((item) => (
              <div key={item} className="rounded-xl border border-zinc-800/80 bg-black/20 px-4 py-3 text-lg">
                {item}
              </div>
            ))}
          </nav>

          <div className="flex flex-col items-center justify-center gap-6">
            <div className="relative flex h-[430px] w-[430px] items-center justify-center rounded-full bg-gradient-to-b from-zinc-500 via-zinc-900 to-black shadow-orb">
              <div className="absolute h-[95%] w-[95%] rounded-full border border-zinc-700/50" />
              <div className="relative z-10 w-[56%] rounded-[28px] border border-blue-400/20 bg-black/70 px-8 py-12 text-center text-3xl leading-snug text-blue-300 shadow-lg shadow-blue-900/30">
                {promptText}
              </div>
            </div>
            <p className="max-w-xl text-center text-sm text-zinc-400">
              Mode: <span className="capitalize text-zinc-200">{mode}</span> · Sentiment:{' '}
              <span className="capitalize text-zinc-200">{analysis.sentiment}</span> · Emotion:{' '}
              <span className="capitalize text-zinc-200">{analysis.emotion}</span>
            </p>
          </div>

          <aside className="space-y-4">
            {[
              ['Clarity', analysis.clarity],
              ['Confidence', analysis.confidence],
              ['Balance', analysis.balance],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-zinc-700 bg-black/40 p-4">
                <p className="text-sm uppercase tracking-wider text-zinc-400">{label}</p>
                <p className="mt-1 text-3xl text-zinc-100">{value}%</p>
              </div>
            ))}
            {analysis.nextStep ? (
              <div className="rounded-2xl border border-blue-700/40 bg-blue-950/20 p-4">
                <p className="text-sm uppercase tracking-wider text-blue-300">Recommended next step</p>
                <p className="mt-2 text-sm text-zinc-200">{analysis.nextStep}</p>
              </div>
            ) : null}
          </aside>
        </section>

        <section className="rounded-[2rem] border border-zinc-700/70 bg-black/30 p-4">
          <div className="mb-4 flex flex-wrap gap-2">
            {MODES.map((item) => (
              <button
                key={item.key}
                className={`rounded-full px-5 py-2 text-sm transition ${
                  mode === item.key
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                    : 'bg-zinc-900/70 text-zinc-300 hover:bg-zinc-800'
                }`}
                onClick={() => setMode(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your question, situation, or issue..."
              className="flex-1 rounded-xl border border-zinc-700 bg-black/50 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={runMockAnalysis}
              className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500"
            >
              Generate Insight
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
