import express from 'express'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()
const app = express()
app.use(express.json({ limit: '20kb' }))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body || {}
  if (![name, email, message].every(v => typeof v === 'string' && v.trim()) || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ ok: false, message: 'Preencha nome, e-mail válido e mensagem.' })
  }
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return res.status(503).json({ ok: false, message: 'Formulário por e-mail ainda não configurado. Utilize o botão do WhatsApp.' })
  }
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE || 'true') === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    })
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_TO || 'jasfconsultoria@gmail.com',
      replyTo: email,
      subject: `Contato pelo site: ${String(subject || 'Novo contato').slice(0, 120)}`,
      text: `Nome: ${name}\nE-mail: ${email}\n\n${message}`
    })
    res.json({ ok: true, message: 'Mensagem enviada com sucesso.' })
  } catch (error) {
    console.error('Falha no envio do contato:', error.message)
    res.status(500).json({ ok: false, message: 'Não foi possível enviar agora. Tente pelo WhatsApp.' })
  }
})

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dist = path.resolve(__dirname, '../dist')
app.use(express.static(dist))
app.get('*', (req, res) => res.sendFile(path.join(dist, 'index.html')))
const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Site disponível na porta ${port}`))
