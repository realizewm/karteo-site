# Servidor futuro

`lead-churn.ts` era a rota `/api/lead-churn` (e-mail do diagnóstico da
calculadora de churn via Resend). Foi desativada em 16/07/2026 quando o site
passou a ser 100% estático no GitHub Pages — e a chave do Resend nunca chegou
a ser configurada, então nada que funcionava se perdeu.

O formulário da calculadora em `/planejador` degrada com elegância: se o
envio falha, mostra "escreva para joao@karteo.com.br".

Pra reativar: hospedar o site em plataforma com servidor (Vercel/Fly.io),
voltar este arquivo pra `src/pages/api/`, restaurar o adapter `@astrojs/node`
no `astro.config.mjs` e configurar `RESEND_API_KEY` / `RESEND_NOTIFY_EMAIL`.
