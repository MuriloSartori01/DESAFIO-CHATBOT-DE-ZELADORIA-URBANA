import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, telefone, descricao, imagemUrl, step } = body;

    if (step === 4) {
      const protocolo = 'PROTO' + Math.floor(100000 + Math.random() * 900000);

      let categoria = 'Outros';
      const descLower = descricao ? descricao.toLowerCase() : '';
      if (descLower.includes('buraco') || descLower.includes('asfalto') || descLower.includes('rua')) {
        categoria = 'Asfalto / Vias Públicas';
      } else if (descLower.includes('luz') || descLower.includes('poste') || descLower.includes('lampada')) {
        categoria = 'Iluminação Pública';
      } else if (descLower.includes('bueiro') || descLower.includes('lixo') || descLower.includes('entupido')) {
        categoria = 'Saneamento / Limpeza';
      }

      const urlFinal = imagemUrl || 'Sem imagem anexada';

      const { data, error } = await supabase
        .from('chamados')
        .insert([
          {
            nome,
            telefone,
            descricao,
            categoria,
            protocolo,
            imagem: urlFinal,
            status: 'Aberto'
          }
        ])
        .select();

      if (error) {
        const { error: secondError } = await supabase
          .from('chamados')
          .insert([
            {
              nome,
              telefone,
              descricao,
              categoria,
              protocolo,
              imagem_url: urlFinal,
              status: 'Aberto'
            }
          ])
          .select();

        if (secondError) {
          return NextResponse.json({ error: secondError.message }, { status: 500 });
        }
      }

      return NextResponse.json({
        message: `Perfeito! Recebemos todos os dados. Seu chamado foi registrado com sucesso sob o protocolo: ${protocolo}.`,
        protocolo
      });
    }

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