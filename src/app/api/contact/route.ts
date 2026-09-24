import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { name, email, message } = await req.json()

  try {
    const data = await resend.emails.send({
      from: 'Lacroix Lab <onboarding@resend.dev>',
      to: ['lacroixdevops@gmail.com'],
      subject: `Nuevo mensaje de ${name}`,
      replyTo: email,
      html: `
        <h2>Nuevo contacto desde la web</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `
    })
    console.log(data)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error enviando mail' }, { status: 500 })
  }
}