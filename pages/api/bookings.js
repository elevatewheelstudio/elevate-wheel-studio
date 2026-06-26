import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const data = req.body || {};
    const bookingRef = `EWS-${Date.now()}`;

    await resend.emails.send({
      from: "Elevate Wheel Studio <onboarding@resend.dev>",
      to: "ishmil90@gmail.com",
      subject: `Test Booking Email - ${bookingRef}`,
      html: `
        <h1>New Booking Test</h1>
        <p><strong>Booking Ref:</strong> ${bookingRef}</p>
        <p><strong>Customer:</strong> ${data.customerName || ""}</p>
        <p><strong>Email:</strong> ${data.customerEmail || ""}</p>
        <p><strong>Dealership:</strong> ${data.dealership || ""}</p>
        <p><strong>Date:</strong> ${data.appointmentDate || ""}</p>
        <p><strong>Time:</strong> ${data.appointmentTime || ""}</p>
        <p><strong>Vehicle:</strong> ${data.vehicle || ""}</p>
      `,
    });

    return res.status(200).json({
      success: true,
      bookingRef,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
