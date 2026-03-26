export async function GET() {
  // Forward request to backend

  const res = await fetch(`${process.env.BACK_END_URL}/courses`, {
    method: "GET",
  });

  // Stream backend response directly to client
  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
  });
}