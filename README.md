# Karteo — Landing Page

Landing page do Karteo (planejamento financeiro premium para assessores e planejadores).

**Stack:** Astro v6 + Tailwind CSS v4 + Resend (lead magnet email)

---

## Rodar localmente

```sh
npm install
npm run dev
```

App sobe em http://localhost:4321

---

## Variáveis de ambiente

Copie `.env.example` para `.env` e preencha:

| Variável | Descrição |
|---|---|
| `RESEND_API_KEY` | API key do Resend (envio de email do lead magnet) |
| `RESEND_FROM_EMAIL` | Remetente (ex: `Karteo <hello@karteo.com.br>`) |
| `RESEND_NOTIFY_EMAIL` | Email pra receber cópia de cada lead capturado |

---

## Deploy

Sugestão: **Vercel** (mais simples para Astro + autodeploy via GitHub).

### Vercel

1. Conectar repo `realizewm/karteo-site` no [vercel.com](https://vercel.com)
2. Framework Preset: **Astro** (detecta automático)
3. Build command: `npm run build`
4. Output directory: `dist/`
5. Configurar Environment Variables (lista acima)
6. Deploy

Domínio custom: apontar `karteo.com.br` para o Vercel (CNAME).

### Alternativas

- **Netlify:** mesmo fluxo, similar
- **Fly.io:** já é onde roda o app principal — mas Vercel é mais simples pra landing estática

---

## Estrutura

```
src/
├── components/      # Astro components (DashboardMockup, Icon)
├── layouts/         # Layout base
├── pages/           # Rotas (index.astro + api/lead-churn.ts)
└── styles/          # global.css (Tailwind v4)
public/
└── images/report/   # Mockups do PDF do Karteo
```

---

## Comandos

| Comando | Faz |
|---|---|
| `npm run dev` | Servidor local em :4321 com hot reload |
| `npm run build` | Build de produção para `dist/` |
| `npm run preview` | Preview do build local |
