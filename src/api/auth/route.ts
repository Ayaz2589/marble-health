import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services';

const authService = new AuthService();

export async function GET(_request: NextRequest) {
  // Just an example; normally you'd parse credentials from the request or session.
  const authResult = authService.authenticateUser({
    username: 'admin',
    password: 'password'
  });

  return NextResponse.json({
    message: 'Auth GET route placeholder',
    authResult
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json(); // Expecting { username, password }
  const { username, password } = body;

  const authResult = authService.authenticateUser({ username, password });

  return NextResponse.json({
    message: 'Auth POST route placeholder',
    authResult
  });
}
