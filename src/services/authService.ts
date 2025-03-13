import { PrismaClient, User } from '@prisma/client';

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: string | null;       
  isAuthenticated: boolean;  
}

class AuthService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async authenticateUser(credentials: AuthCredentials): Promise<AuthResponse> {
    const user: User | null = await this.prisma.user.findUnique({
      where: { username: credentials.username },
    });

    if (!user || user.password !== credentials.password) {
      return { user: null, isAuthenticated: false };
    }

    return {
      user: user.username,
      isAuthenticated: true,
    };
  }

  async createUser(credentials: AuthCredentials): Promise<User> {
    return this.prisma.user.create({
      data: {
        username: credentials.username,
        password: credentials.password,
      },
    });
  }
}

export default AuthService;
