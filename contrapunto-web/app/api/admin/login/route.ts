import { NextRequest, NextResponse } from 'next/server';
import { AUTHORIZED_USERS, MASTER_PASSWORD, createAdminToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { userName, password } = await request.json();

    if (!userName || !password) {
      return NextResponse.json(
        { success: false, error: 'Debe ingresar el usuario y la contraseña.' },
        { status: 400 }
      );
    }

    // Verificar si el usuario está en la lista de autorizados
    const isValidUser = AUTHORIZED_USERS.some(
      (u) => u.name.toLowerCase() === userName.toLowerCase()
    );

    if (!isValidUser) {
      return NextResponse.json(
        { success: false, error: 'Usuario no autorizado.' },
        { status: 401 }
      );
    }

    // Verificar contraseña maestra
    if (password !== MASTER_PASSWORD) {
      return NextResponse.json(
        { success: false, error: 'Contraseña incorrecta.' },
        { status: 401 }
      );
    }

    // Crear token de sesión JWT
    const token = await createAdminToken(userName);

    const response = NextResponse.json({
      success: true,
      user: userName,
      message: 'Inicio de sesión exitoso.',
    });

    // Guardar token en cookie HTTP-Only segura
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 horas
    });

    return response;
  } catch (err) {
    console.error('[Admin Login Error]', err);
    return NextResponse.json(
      { success: false, error: 'Ocurrió un error interno al iniciar sesión.' },
      { status: 500 }
    );
  }
}
