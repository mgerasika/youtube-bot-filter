import Cors from 'cors';

export function myCors(request) {
  if(request.url.startsWith('http://localhost:3000') || request.url.includes('bot-landing-6a052')){
    return null;
  }

  const allowedOrigins = ['http://localhost:3000', 'https://www.youtube.com', 'https://bot-landing-6a052.web.app'];
  const origin = request.headers.get('origin');

  if (!allowedOrigins.includes(origin) ) {
    return new Response('CORS Error: Not allowed by CORS', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  // If origin is allowed, return null to proceed
  return null;
}