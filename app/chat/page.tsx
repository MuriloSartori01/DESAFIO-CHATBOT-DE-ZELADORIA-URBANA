'use client';

import { useState } from 'react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

export default function ChatPage() {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    nome: '',
    telefone: '',
    descricao: ''
  });

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'bot', text: 'Olá! Sou o assistente de Zeladoria Urbana. Para comecar, digite seu nome completo:' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput('');
    setLoading(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText
    };

    setMessages((prev) => [...prev, userMessage]);

    let updatedData = { ...userData };

    if (step === 1) updatedData.nome = userText;
    if (step === 2) updatedData.telefone = userText;
    if (step === 3) updatedData.descricao = userText;

    setUserData(updatedData);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...updatedData,
          step: step
        })
      });

      const data = await response.json();

      setMessages((prev) => [...prev, {
        id: Date.now().toString(),
        sender: 'bot',
        text: data.message
      }]);

      setStep((prev) => prev + 1);

    } catch (err) {
      setMessages((prev) => [...prev, {
        id: Date.now().toString(),
        sender: 'bot',
        text: 'Ops, tive um problema ao processar. Tente novamente.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col h-screen font-sans">
      <header className="bg-white border-b border-slate-200 text-slate-800 p-4 shadow-sm flex justify-between items-center">
        <h1 className="text-lg font-bold text-blue-900">💬 Assistente de Zeladoria</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4 max-w-2xl w-full mx-auto">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3.5 rounded-2xl text-sm ${
              msg.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-white text-slate-800 border border-slate-100 shadow-sm rounded-bl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 p-3 rounded-2xl text-xs text-slate-400 shadow-sm">
              Digitando...
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 p-4 max-w-2xl w-full mx-auto rounded-t-xl shadow-md">
        {step <= 4 ? (
          <div className="flex gap-2 w-full">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite aqui..."
              disabled={loading}
              className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 disabled:bg-slate-50"
            />
            <button 
              onClick={handleSend} 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition"
            >
              Enviar
            </button>
          </div>
        ) : (
          <p className="text-center text-sm text-green-600 font-semibold py-1">✓ Chamado enviado com sucesso!</p>
        )}
      </footer>
    </div>
  );
}