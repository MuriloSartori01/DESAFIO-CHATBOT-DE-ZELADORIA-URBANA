'use client';

import { useState, useRef } from 'react';

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
    descricao: '',
    imagemUrl: ''
  });

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'bot', text: 'Olá! Sou o assistente de Zeladoria Urbana. Para começar, digite seu nome completo:' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = async (fileToUpload?: File) => {
    if (!input.trim() && !fileToUpload || loading) return;

    let userText = input;
    if (fileToUpload) {
      userText = `Anexo enviado: ${fileToUpload.name}`;
    }

    setInput('');
    setLoading(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText
    };

    setMessages((prev) => [...prev, userMessage]);

    let currentNome = userData.nome;
    let currentTelefone = userData.telefone;
    let currentDescricao = userData.descricao;
    let currentImagemUrl = userData.imagemUrl;

    if (step === 1) currentNome = userText;
    if (step === 2) currentTelefone = userText;
    if (step === 3) currentDescricao = userText;

    if (fileToUpload && step === 4) {
      try {
        const formData = new FormData();
        formData.append('file', fileToUpload);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        const uploadData = await uploadRes.json();
        if (uploadData.url) {
          currentImagemUrl = uploadData.url;
        }
      } catch (err) {
        console.error("Erro ao subir imagem:", err);
      }
    }

    setUserData({
      nome: currentNome,
      telefone: currentTelefone,
      descricao: currentDescricao,
      imagemUrl: currentImagemUrl
    });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: currentNome,
          telefone: currentTelefone,
          descricao: currentDescricao,
          imagemUrl: currentImagemUrl,
          step: fileToUpload ? 4 : step
        })
      });

      const data = await response.json();

      if (data.message) {
        setMessages((prev) => [
          ...prev,
          { id: (Date.now() + 1).toString(), sender: 'bot', text: data.message }
        ]);
        setStep((prev) => prev + 1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleSend(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
        <h1 className="text-xl font-bold text-blue-900 flex items-center gap-2">
          <span>💬</span> Assistente de Zeladoria
        </h1>
      </header>

      <main className="flex-1 overflow-y-auto p-6 max-w-3xl w-full mx-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm text-sm md:text-base ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </main>

      <footer className="bg-white border-t border-slate-200 p-4 shadow-lg">
        <div className="max-w-3xl mx-auto flex gap-2 items-center">
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            type="button"
            className="bg-slate-200 hover:bg-slate-300 text-slate-700 p-3 rounded-xl transition text-xl flex items-center justify-center"
            title="Enviar imagem"
          >
            📷
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={step === 4 ? "Clique na câmera para enviar a foto..." : "Digite sua mensagem aqui..."}
            className="flex-1 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 text-slate-900"
            disabled={loading || step === 4}
          />
          
          <button
            onClick={() => handleSend()}
            disabled={loading || step === 4}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium px-6 py-3 rounded-xl transition shadow-sm text-sm"
          >
            {loading ? '...' : 'Enviar'}
          </button>
        </div>
      </footer>
    </div>
  );
}