import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('token');

  if (accessToken) {
    return new Response(JSON.stringify({ token: accessToken.value }), { status: 200 });
  }
  
  return new Response('No access token found', { status: 401 });
}