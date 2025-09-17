const { useEffect, useMemo, useRef, useState } = React;

const CHAT_ENDPOINT = window.EVAN_AI_CHAT_ENDPOINT || '/chat';

const initialAssistantMessage =
  "Hey, I'm EvanAI — Evan Parra's AI engineering copilot. Ask about his projects, consulting offers, or prompt coaching and I'll dive in.";

const EvanAIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: initialAssistantMessage },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    setError('');
  };

  const handleSubmit = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) {
      return;
    }

    const historyPayload = messages.map((message) => ({
      role: message.role,
      content: message.content,
    }));

    setMessages((prev) => [...prev, { role: 'user', content: trimmed }]);
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: trimmed,
          history: historyPayload,
        }),
      });

      if (!response.ok) {
        throw new Error('Assistant is unavailable.');
      }

      const data = await response.json();
      const reply = typeof data?.reply === 'string'
        ? data.reply
        : "I'm having trouble reaching Evan's knowledge base right now. Try again shortly.";

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: reply },
      ]);
    } catch (err) {
      console.error('EvanAI chat error', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "I couldn't connect to Evan's Genkit service. Check your network and try again in a moment.",
        },
      ]);
      setError('Connection issue — please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const bubbleLabel = useMemo(
    () => (isOpen ? 'Close EvanAI assistant' : 'Chat with EvanAI'),
    [isOpen]
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <button
        type="button"
        onClick={handleToggle}
        className="rounded-full bg-blue-700 text-white shadow-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-colors w-14 h-14 flex items-center justify-center"
        aria-label={bubbleLabel}
      >
        {isOpen ? (
          <span className="text-xl font-bold">×</span>
        ) : (
          <span className="text-lg font-semibold">AI</span>
        )}
      </button>

      {isOpen && (
        <div className="mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          <header className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white px-4 py-3">
            <h2 className="text-base font-semibold">Ask EvanAI</h2>
            <p className="text-xs text-blue-100">
              Built with Firebase Genkit + Gemini to surface Evan Parra&apos;s expertise.
            </p>
          </header>

          <div ref={scrollRef} className="max-h-96 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50">
            {messages.map((message, index) => (
              <div
                key={`message-${index}`}
                className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`text-sm leading-relaxed rounded-2xl px-4 py-3 max-w-[85%] shadow-sm ${
                    message.role === 'assistant'
                      ? 'bg-white text-slate-800 border border-slate-200'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-xs text-slate-500 animate-pulse">EvanAI is crafting a response…</div>
            )}
          </div>

          <div className="border-t border-slate-200 bg-white px-4 py-3 space-y-2">
            {error && <div className="text-xs text-red-500">{error}</div>}
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
              placeholder="Ask about consulting, projects, or prompt coaching…"
              className="w-full resize-none rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 p-2 text-sm text-slate-800"
            />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading || !input.trim()}
              className="w-full rounded-xl bg-blue-700 text-white text-sm font-semibold py-2.5 transition-colors disabled:opacity-60 disabled:cursor-not-allowed hover:bg-blue-800"
            >
              {isLoading ? 'Sending…' : 'Send to EvanAI'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const mountEvanAIWidget = () => {
  if (document.getElementById('evanai-chat-widget-root')) {
    return;
  }
  const container = document.createElement('div');
  container.id = 'evanai-chat-widget-root';
  document.body.appendChild(container);

  const root = ReactDOM.createRoot(container);
  root.render(<EvanAIChatWidget />);
};

document.addEventListener('DOMContentLoaded', mountEvanAIWidget);
