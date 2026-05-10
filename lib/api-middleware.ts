import { NextRequest, NextResponse } from 'next/server';
import { getUserById } from './advanced-db';

export interface AuthenticatedRequest extends NextRequest {
  userId?: string;
  user?: any;
}

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string, limit: number = 100, windowMs: number = 60000): boolean {
  const now = Date.now();
  const current = rateLimitMap.get(ip);

  if (!current || now > current.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (current.count >= limit) {
    return false;
  }

  current.count += 1;
  return true;
}

// Authentication middleware
export function withAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      const userId = req.cookies.get('userId')?.value;

      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const user = getUserById(userId);
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      const authReq = req as AuthenticatedRequest;
      authReq.userId = userId;
      authReq.user = user;

      return handler(authReq);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  };
}

// Rate limiting middleware
export function withRateLimit(limit: number = 100, windowMs: number = 60000) {
  return (handler: (req: NextRequest) => Promise<NextResponse>) => {
    return async (req: NextRequest) => {
      const ip = req.headers.get('x-forwarded-for') || req.ip || 'unknown';

      if (!checkRateLimit(ip, limit, windowMs)) {
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        );
      }

      return handler(req);
    };
  };
}

// Validation middleware
export function validateBody(schema: any) {
  return (handler: (req: NextRequest, body: any) => Promise<NextResponse>) => {
    return async (req: NextRequest) => {
      try {
        const body = await req.json();

        // Basic validation - can be extended with Zod/Joi
        for (const field of Object.keys(schema)) {
          if (schema[field].required && !body[field]) {
            return NextResponse.json(
              { error: `Missing required field: ${field}` },
              { status: 400 }
            );
          }

          if (schema[field].type && body[field] && typeof body[field] !== schema[field].type) {
            return NextResponse.json(
              { error: `Invalid type for field: ${field}` },
              { status: 400 }
            );
          }
        }

        return handler(req, body);
      } catch (error) {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
      }
    };
  };
}

// Error response helpers
export function successResponse(data: any, status: number = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function errorResponse(message: string, status: number = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}
