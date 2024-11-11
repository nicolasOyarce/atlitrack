import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token');

  if (accessToken) {
    console.log('Token: ',accessToken.value);
    return new Response(JSON.stringify({ access_token: accessToken.value }), { status: 200 });
  }
  
  return new Response('No access token found', { status: 401 });
}