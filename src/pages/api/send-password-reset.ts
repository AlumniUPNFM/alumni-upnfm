import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, temporaryPassword } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Recuperación de contraseña - Alumni UPN',
      html: `
        <h2>Recuperación de contraseña</h2>
        <p>Hola ${name},</p>
        <p>Se ha generado una nueva contraseña temporal para tu cuenta: <strong>${temporaryPassword}</strong></p>
        <p>Por favor, inicia sesión con esta contraseña y cámbiala inmediatamente por una nueva.</p>
        <p>Si no solicitaste este cambio, por favor contacta con soporte.</p>
        <br>
        <p>Saludos cordiales,</p>
        <p>Equipo de Alumni UPN</p>
      `,
    });

    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ message: 'Error sending password reset email' });
  }
} 