'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Chamado {
  id: number;
  created_at: string;
  nome: string;
  telefone: string;
  descricao: string;
  categoria: string;
  protocolo: string;
  status: string;
  imagem: string;
}

export default function AdminPage() {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchChamados() {
    try {
      const { data, error } = await supabase
        .from('chamados')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        console.error('--- ERRO DETALHADO DO SUPABASE ---');
        console.error('Mensagem:', error.message);
        console.error('Detalhes:', error.details);
        console.error('Dica (Hint):', error.hint);
        console.error('---------------------------------');
        throw error;
      }
      if (data) setChamados(data);
    } catch (err) {
      console.error('Erro capturado na execução:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id: number, newStatus: string) {
    try {
      const { error } = await supabase
        .from('chamados')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      setChamados((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
      alert('Status atualizado com sucesso!');
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
    }
  }

  useEffect(() => {
    fetchChamados();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-6 text-slate-800">
      <header className="max-w-7xl mx-auto mb-8 flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Painel de Zeladoria Urbana</h1>
          <p className="text-slate-500 text-sm">Gerenciamento e monitoramento de chamados abertos pelos cidadãos</p>
        </div>
        <button 
          onClick={fetchChamados}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-xl transition text-sm shadow-sm"
        >
          🔄 Atualizar Dados
        </button>
      </header>

      <main className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 font-medium">Carregando chamados...</div>
        ) : chamados.length === 0 ? (
          <div className="p-12 text-center text-slate-500 font-medium">
           
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-sm">
                  <th className="p-4">Protocolo</th>
                  <th className="p-4">Cidadão</th>
                  <th className="p-4">Descrição</th>
                  <th className="p-4">Categoria</th>
                  <th className="p-4">Evidência</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {chamados.map((chamado) => (
                  <tr key={chamado.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4 font-mono font-bold text-blue-700">{chamado.protocolo}</td>
                    <td className="p-4">
                      <div className="font-medium text-slate-900">{chamado.nome}</div>
                      <div className="text-xs text-slate-400">{chamado.telefone}</div>
                    </td>
                    <td className="p-4 max-w-xs truncate" title={chamado.descricao}>
                      {chamado.descricao}
                    </td>
                    <td className="p-4">
                      <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs font-medium">
                        {chamado.categoria || 'Outros'}
                      </span>
                    </td>
                    <td className="p-4">
                      {chamado.imagem && chamado.imagem.startsWith('http') ? (
                        <a 
                          href={chamado.imagem} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block bg-blue-50 hover:bg-blue-100 text-blue-600 px-2.5 py-1 rounded-lg text-xs font-semibold border border-blue-200 transition"
                        >
                          🖼️ Ver Foto
                        </a>
                      ) : (
                        <span className="text-slate-400 italic text-xs">Sem foto</span>
                      )}
                    </td>
                    <td className="p-4">
                      <select
                        value={chamado.status}
                        onChange={(e) => handleStatusChange(chamado.id, e.target.value)}
                        className={`font-semibold text-xs px-2.5 py-1.5 rounded-lg border focus:outline-none transition cursor-pointer ${
                          chamado.status === 'Aberto' 
                            ? 'bg-amber-50 text-amber-700 border-amber-200' 
                            : chamado.status === 'Em andamento'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        <option value="Aberto">Aberto</option>
                        <option value="Em andamento">Em andamento</option>
                        <option value="Resolvido">Resolvido</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}