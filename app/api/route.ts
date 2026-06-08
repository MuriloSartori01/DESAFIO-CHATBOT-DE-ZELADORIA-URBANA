import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, telefone, descricao, step } = body;

    // Se o fluxo chegou no final (conclusao do chamado), salvamos no Supabase
    if (step === 5) {
      const protocolo = 'PROTO' + Math.floor(100000 + Math.random() * 900000);

      // Chamada simplificada simulando a classificacao automatica de categorias
      let categoria = 'Outros';
      const descLower = descricao.toLowerCase();
      if (descLower.includes('buraco') || descLower.includes('asfalto') || descLower.includes('rua')) {
        categoria = 'Asfalto / Vias Públicas';
      } else if (descLower.includes('luz') || descLower.includes('poste') || descLower.includes('lampada')) {
        categoria = 'Iluminação Pública';
      } else if (descLower.includes('bueiro') || descLower.includes('lixo') || descLower.includes('entupido')) {
        categoria = 'Saneamento / Limpeza';
      }

      const { data, error } = await supabase
        .from('chamados')
        .insert([
          {
            nome,
            telefone,
            descricao,
            categoria,
            protocolo,
            status: 'Aberto'
          }
        ])
        .select();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        message: `Perfeito! Recebemos todos os dados. Seu chamado foi registrado com sucesso sob o protocolo: ${protocolo}.`,
        protocolo
      });
    }

    // Fluxo normal de perguntas textuais intermediarias
    let botReply = '';
    if (step === 1) {
      botReply = `Prazer, ${nome}! Agora, por favor, digite seu telefone com DDD:`;
    } else if (step === 2) {
      botReply = 'Obrigado. Agora descreva brevemente o problema que voce encontrou (ex: buraco na rua, poste apagado):';
    } else if (step === 3) {
      botReply = 'Por favor, envie uma foto ou imagem do problema para anexarmos ao chamado:';
    }

    return NextResponse.json({ message: botReply });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}