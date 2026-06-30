export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  const { username, password } = req.body;

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    return res.status(500).json({
      success: false,
      error: "Admin login credentials are missing in Vercel.",
    });
  }

  if (username === adminUsername && password === adminPassword) {
    return res.status(200).json({
      success: true,
    });
  }

  return res.status(401).json({
    success: false,
    error: "Invalid username or password.",
  });
}
