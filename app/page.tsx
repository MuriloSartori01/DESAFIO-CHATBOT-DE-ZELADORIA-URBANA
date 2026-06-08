import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <main className="max-w-3xl w-full bg-white rounded-xl shadow-md p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Zeladoria Urbana
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Ajude a cuidar da nossa cidade. Reporte buracos, postes apagados, vazamentos e lixo acumulado de forma rápida através do nosso assistente virtual.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/chat" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
          >
            Acessar Chatbot
          </Link>
          <Link 
            href="/admin" 
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-300 border border-gray-300"
          >
            Painel Administrativo
          </Link>
        </div>
      </main>
    </div>
  );
}