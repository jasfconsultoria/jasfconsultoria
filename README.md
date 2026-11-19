# José Alves — Portfólio profissional

Site de portfólio em React + Vite, com servidor Node.js/Express opcional para receber o formulário por e-mail.

## Rodar localmente

Requisitos: Node.js 18 ou superior.

```bash
npm install
npm run dev
```

Abra o endereço local indicado pelo Vite.

## Gerar versão de produção

```bash
npm run build
```

O site pronto ficará na pasta `dist/`.

## Publicar na Hostinger

### Opção A — Hospedagem compartilhada (site estático)
1. Execute `npm install` e `npm run build` no computador.
2. Envie **o conteúdo de `dist/`** para `public_html/` pelo Gerenciador de Arquivos ou FTP.
3. Configure o domínio para apontar para a hospedagem.
4. O formulário de e-mail depende do backend Node; sem ele, use o botão de WhatsApp ou configure um serviço de formulário.

### Opção B — Hospedagem com suporte a aplicações Node.js
1. Envie o projeto para a hospedagem.
2. Configure a aplicação Node com o comando de instalação `npm install`, comando de inicialização `npm run server` e a versão Node suportada pela Hostinger.
3. Execute `npm run build` antes de iniciar o servidor.
4. Copie `.env.example` para `.env` e informe os dados SMTP do seu domínio. Nunca publique o arquivo `.env` nem compartilhe a senha SMTP.
5. Configure `CONTACT_TO` para o e-mail que receberá as mensagens.

## Personalização obrigatória antes de publicar

- Substituir o quadro de foto na primeira dobra por uma foto profissional autorizada. O álbum Google Fotos informado não forneceu os arquivos de imagem para incorporação automática; baixe a foto escolhida e coloque em `public/` ou `src/assets/`, ajustando `src/main.jsx`.
- Confirmar os links públicos de LinkedIn e JasfConsultoria.
- Revisar a cronologia dos vínculos profissionais, principalmente a transição ATI → CGE → SEFAZ, e a forma exata de apresentar os cargos.
- Validar o escopo público de cada projeto e quais marcas podem ser exibidas.
- Confirmar se PMW420 deve ter descrição comercial mais específica.

## Segurança e privacidade

O site não exibe endereço residencial, estado civil ou idade. O formulário valida os campos no servidor e usa variáveis de ambiente para credenciais SMTP. Em produção, restrinja `ALLOWED_ORIGIN` ao domínio do site e configure HTTPS.
