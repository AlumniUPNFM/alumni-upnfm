import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase-client";
import nodemailer from 'nodemailer';

function generateRandomPassword(length: number = 12): string {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  
  return password;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const { dni } = req.body;

    if (!dni) {
      return res.status(400).json({ message: "El DNI es requerido" });
    }

    // Buscar usuario por DNI
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('dni', dni)
      .single();

    if (userError || !user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Generar contraseña temporal
    const temporaryPassword = generateRandomPassword();

    // Actualizar contraseña usando el procedimiento almacenado
    const { error: updateError } = await supabase.rpc('update_user_password', {
      p_props: {
        dni: dni,
        password: temporaryPassword
      }
    });

    if (updateError) {
      throw new Error("Error al actualizar la contraseña");
    }

    // Enviar correo con la nueva contraseña
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Recuperación de contraseña - Alumni UPN',
      html: `
        <h2>Recuperación de contraseña</h2>
        <p>Hola ${user.name},</p>
        <p>Se ha generado una nueva contraseña temporal para tu cuenta: <strong>${temporaryPassword}</strong></p>
        <p>Por favor, inicia sesión con esta contraseña y cámbiala inmediatamente por una nueva.</p>
        <p>Si no solicitaste este cambio, por favor contacta con soporte.</p>
        <br>
        <p>Saludos cordiales,</p>
        <p>Equipo de Alumni UPN</p>
      `,
    });

    return res.status(200).json({
      message: "Se ha enviado una nueva contraseña a tu correo electrónico",
    });
  } catch (error) {
    console.error("Error en forgot-password:", error);
    return res.status(500).json({
      message: "Error al procesar la solicitud de recuperación de contraseña",
    });
  }
} 