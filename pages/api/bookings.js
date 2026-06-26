export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  const bookingRef = `EWS-${Date.now()}`;

  return res.status(200).json({
    success: true,
    bookingRef,
  });
}
