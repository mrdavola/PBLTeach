export async function POST(request: Request) {
  const url = new URL(request.url);
  url.pathname = "/api/generate/driving-question";
  return Response.redirect(url, 307);
}
