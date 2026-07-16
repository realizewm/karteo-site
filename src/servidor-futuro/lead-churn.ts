import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

interface LeadPayload {
  nome: string;
  email: string;
  perfil: string;
  aumTotal: string;
  clientes: string;
  roa: string;
  churn: string;
  repasse: string;
  reducao: string;
  diagnostico: {
    perda: string;
    protegida: string;
    sobra: string;
  };
  capturadoEm: string;
}

const FROM_EMAIL = import.meta.env.RESEND_FROM_EMAIL ?? 'Karteo <onboarding@resend.dev>';
const NOTIFY_EMAIL = import.meta.env.RESEND_NOTIFY_EMAIL ?? '';
const RESEND_API_KEY = import.meta.env.RESEND_API_KEY ?? '';

const buildLeadEmail = (p: LeadPayload) => {
  const subject = `Seu diagnóstico de churn — sobra ${p.diagnostico.sobra}/ano`;

  const html = `
  <!DOCTYPE html>
  <html lang="pt-BR">
  <body style="margin:0;padding:24px;background:#F9FAFB;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1E1E2E;">
    <div style="max-width:560px;margin:0 auto;background:#FFFFFF;border-radius:16px;border:1px solid #E5E7EB;padding:32px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.15em;color:#0D9488;text-transform:uppercase;">AXION · DIAGNÓSTICO</div>
      <h1 style="margin:8px 0 16px;font-size:22px;font-weight:700;line-height:1.3;color:#1A1A2E;">
        Oi ${p.nome}, aqui está o seu cenário de churn
      </h1>
      <p style="margin:0 0 24px;color:#6B7280;font-size:14px;line-height:1.6;">
        Baseado nos números que você inseriu (AUM ${p.aumTotal}, ${p.clientes} clientes, ROA ${p.roa}%, churn ${p.churn}%, repasse ${p.repasse}%, redução esperada ${p.reducao}%):
      </p>

      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr>
          <td style="padding:12px 16px;background:#FEF2F2;border-radius:8px 8px 0 0;border:1px solid #FECACA;">
            <div style="font-size:11px;font-weight:600;color:#B91C1C;text-transform:uppercase;letter-spacing:0.05em;">1 · Você perde por churn hoje</div>
            <div style="font-size:24px;font-weight:700;color:#B91C1C;margin-top:4px;">${p.diagnostico.perda} / ano</div>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 16px;background:#F0FDFA;border-left:1px solid #99F6E4;border-right:1px solid #99F6E4;">
            <div style="font-size:11px;font-weight:600;color:#0F766E;text-transform:uppercase;letter-spacing:0.05em;">2 · Sua premissa: ${p.reducao}% menos churn com planejamento</div>
            <div style="font-size:20px;font-weight:700;color:#0F766E;margin-top:4px;">${p.diagnostico.protegida} / ano protegidos</div>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 16px;background:#F9FAFB;border-left:1px solid #E5E7EB;border-right:1px solid #E5E7EB;">
            <div style="font-size:11px;font-weight:600;color:#6B7280;text-transform:uppercase;letter-spacing:0.05em;">3 · Investimento Karteo Pro</div>
            <div style="font-size:20px;font-weight:700;color:#1A1A2E;margin-top:4px;">R$ 5.964,00 / ano <span style="font-weight:400;font-size:14px;color:#6B7280;">(R$ 497/mês)</span></div>
          </td>
        </tr>
        <tr>
          <td style="padding:16px;background:#0D9488;border-radius:0 0 8px 8px;color:#FFFFFF;">
            <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;opacity:0.85;">4 · Sobra no seu bolso</div>
            <div style="font-size:32px;font-weight:700;margin-top:4px;line-height:1.1;">${p.diagnostico.sobra} / ano</div>
            <div style="font-size:13px;opacity:0.9;margin-top:8px;">Cliente que fica paga sua mensalidade do Karteo <strong>e ainda sobra ${p.diagnostico.sobra} no seu bolso.</strong></div>
          </td>
        </tr>
      </table>

      <h2 style="font-size:15px;font-weight:700;color:#1A1A2E;margin:24px 0 12px;">Por que retenção via planejamento vale tanto?</h2>
      <p style="margin:0 0 12px;font-size:13px;color:#6B7280;line-height:1.6;">
        A premissa de redução de churn parte de algo bem documentado: <strong>captar novo cliente custa muito mais que reter um existente</strong>. O estudo de referência sobre isso, que sustenta toda essa lógica:
      </p>

      <div style="margin-bottom:0;padding:12px 16px;background:#F9FAFB;border-radius:8px;border:1px solid #E5E7EB;">
        <div style="font-weight:600;color:#1A1A2E;font-size:14px;">📊 Frederick Reichheld (Bain &amp; Company) · Harvard Business Review</div>
        <div style="font-size:13px;color:#6B7280;margin-top:4px;line-height:1.5;">"The Value of Keeping the Right Customers" (2014). Documenta o custo de aquisição vs retenção em diferentes setores e mostra por que reter o cliente certo é bem mais lucrativo que captar novo.</div>
        <a href="https://hbr.org/2014/10/the-value-of-keeping-the-right-customers" style="font-size:12px;color:#0D9488;text-decoration:underline;margin-top:6px;display:inline-block;">→ Ler o artigo no Harvard Business Review</a>
      </div>

      <div style="margin-top:32px;padding:20px;background:#F0FDFA;border-radius:12px;border:1px solid #99F6E4;">
        <div style="font-weight:700;color:#0F766E;font-size:15px;">Quer testar 30 dias com garantia?</div>
        <p style="margin:8px 0 0;font-size:13px;color:#1E1E2E;line-height:1.6;">
          Responda esse email com a sua agenda. Em 30 dias, se você não fechar pelo menos 1 caso usando o Karteo como ancoragem, devolvemos 100% — sem perguntas.
        </p>
      </div>

      <hr style="margin:32px 0 16px;border:0;border-top:1px solid #E5E7EB;" />
      <p style="font-size:11px;color:#9CA3AF;line-height:1.6;margin:0;">
        Você recebeu esse email porque preencheu a calculadora de churn no site do Karteo. Se não fez isso, ignore.<br>
        — Time Karteo
      </p>
    </div>
  </body>
  </html>`.trim();

  const text = `
Oi ${p.nome}, aqui está o seu diagnóstico:

1 · Você perde por churn hoje: ${p.diagnostico.perda}/ano
2 · Sua premissa (${p.reducao}% menos churn com planejamento): ${p.diagnostico.protegida}/ano protegidos
3 · Investimento Karteo Pro: R$ 5.964,00/ano (R$ 497/mês)
4 · Sobra no seu bolso: ${p.diagnostico.sobra}/ano

Cliente que fica paga sua mensalidade do Karteo e ainda sobra ${p.diagnostico.sobra} no seu bolso.

Por que retenção via planejamento vale tanto?

Captar novo cliente custa muito mais que reter um existente — e isso vale pra qualquer setor. O estudo de referência:

→ Frederick Reichheld (Bain & Company) · "The Value of Keeping the Right Customers" (Harvard Business Review, 2014).
  https://hbr.org/2014/10/the-value-of-keeping-the-right-customers

Quer testar 30 dias com garantia? Responda esse email.

— Time Karteo
  `.trim();

  return { subject, html, text };
};

export const POST: APIRoute = async ({ request }) => {
  if (!RESEND_API_KEY) {
    return new Response(
      JSON.stringify({ ok: false, error: 'RESEND_API_KEY não configurada' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let payload: LeadPayload;
  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: 'JSON inválido' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (!payload.nome || !payload.email || !payload.email.includes('@')) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Nome e email são obrigatórios' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const resend = new Resend(RESEND_API_KEY);
  const { subject, html, text } = buildLeadEmail(payload);

  try {
    const sendResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: payload.email,
      subject,
      html,
      text,
      replyTo: NOTIFY_EMAIL || undefined,
    });

    if (sendResult.error) {
      console.error('[lead-churn] Resend rejeitou:', sendResult.error);
      return new Response(
        JSON.stringify({ ok: false, error: sendResult.error.message ?? 'Resend rejeitou o envio' }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (NOTIFY_EMAIL) {
      const notifyResult = await resend.emails.send({
        from: FROM_EMAIL,
        to: NOTIFY_EMAIL,
        subject: `[Lead Karteo] ${payload.nome} (${payload.email}) — sobra ${payload.diagnostico.sobra}`,
        text: `Lead capturado pela calculadora de churn.\n\n${JSON.stringify(payload, null, 2)}`,
      });
      if (notifyResult.error) {
        console.warn('[lead-churn] Notificação falhou:', notifyResult.error);
      }
    }

    return new Response(JSON.stringify({ ok: true, id: sendResult.data?.id ?? null }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[lead-churn] erro Resend:', error);
    return new Response(
      JSON.stringify({ ok: false, error: 'Falha ao enviar email' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
