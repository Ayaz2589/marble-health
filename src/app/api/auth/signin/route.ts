import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services';

const authService = new AuthService();

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    if (!username || !password) {
      return NextResponse.json(
        { message: 'Missing username or password' },
        { status: 400 }
      );
    }

    const authResult = await authService.authenticateUser({ username, password });
    return NextResponse.json(authResult);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error during sign-in', error: String(error) },
      { status: 500 }
    );
  }
}
