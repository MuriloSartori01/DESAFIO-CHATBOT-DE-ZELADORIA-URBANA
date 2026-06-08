import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
      
      <header className="max-w-6xl w-full mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-xl text-blue-900">
          <span className="text-2xl">💬</span> Zeladoria Diadema
        </div>
        <Link 
          href="/admin" 
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
        >
          Acesso Admin
        </Link>
      </header>

      <main className="max-w-4xl w-full mx-auto px-6 py-12 flex flex-col items-center text-center my-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Atendimento Rápido e Eficiente
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mb-10 leading-relaxed">
          Abra chamados de zeladoria em segundos. Nossa plataforma facilita a comunicação entre você e a prefeitura para cuidar da nossa cidade.
        </p>

        <Link 
          href="/chat" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition duration-200 flex items-center gap-2 transform hover:-translate-y-0.5"
        >
          <span>💬</span> Abrir Chamado
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-16">
          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xl mb-4">
              🕒
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Resposta Rápida</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Receba um número de protocolo instantaneamente e acompanhe seu chamado.
            </p>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xl mb-4">
              🛡️
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Seguro e Confiável</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Seus dados são protegidos e seu atendimento é prioridade.
            </p>
          </div>

          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xl mb-4">
              ✅
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Fácil de Usar</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Interface intuitiva com chat guiado para facilitar seu atendimento.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-400">
        &copy; 2026 Zeladoria Diadema. Todos os direitos reservados.
      </footer>

    </div>
  );
}