import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      success: false,
      error: "RESEND_API_KEY is missing in Vercel. Check Environment Variables and redeploy.",
    });
  }

  const resend = new Resend(apiKey);
  const data = req.body || {};
  const bookingRef = `EWS-${Date.now()}`;

  try {
    await resend.emails.send({
      from: "Elevate Wheel Studio <info@elevatewheelstudio.com>",
      to: "info@elevatewheelstudio.com",
      subject: `New Booking Received - ${bookingRef}`,
      html: `
        <h1>New Booking Received</h1>
        <p><strong>Booking Reference:</strong> ${bookingRef}</p>
        <p><strong>Customer:</strong> ${data.customerName || ""}</p>
        <p><strong>Customer Email:</strong> ${data.customerEmail || ""}</p>
        <p><strong>Dealership:</strong> ${data.dealership || ""}</p>
        <p><strong>Advisor:</strong> ${data.advisorName || ""}</p>
        <p><strong>Advisor Email:</strong> ${data.advisorEmail || ""}</p>
        <p><strong>Date:</strong> ${data.appointmentDate || ""}</p>
        <p><strong>Time:</strong> ${data.appointmentTime || ""}</p>
        <p><strong>Wheel Quantity:</strong> ${data.wheelQuantity || ""}</p>
        <p><strong>Wheel Position:</strong> ${data.wheelPosition || ""}</p>
        <p><strong>Repair Order:</strong> ${data.repairOrder || ""}</p>
        <p><strong>Vehicle Tag:</strong> ${data.vehicleTag || ""}</p>
        <p><strong>Vehicle:</strong> ${data.vehicle || ""}</p>
        <p><strong>VIN:</strong> ${data.vin || ""}</p>
        <p><strong>Notes:</strong> ${data.notes || "None"}</p>
      `,
    });

    if (data.customerEmail) {
      await resend.emails.send({
        from: "Elevate Wheel Studio <info@elevatewheelstudio.com>",
        to: data.customerEmail,
        subject: `Appointment Request Received - ${bookingRef}`,
        html: `
          <div style="font-family:Arial;background:#050505;color:#ffffff;padding:30px;">
            <div style="max-width:650px;margin:auto;background:#111111;border:1px solid #333333;padding:30px;">
              <h1 style="color:#e4001b;">Appointment Request Received</h1>
              <p>Hello ${data.customerName || "there"},</p>
              <p>Thank you for choosing Elevate Wheel Studio. Your booking request has been received.</p>
              <h2>Booking Reference</h2>
              <h1 style="color:#e4001b;">${bookingRef}</h1>
              <p><strong>Date:</strong> ${data.appointmentDate || ""}</p>
              <p><strong>Time:</strong> ${data.appointmentTime || ""}</p>
              <p><strong>Dealership:</strong> ${data.dealership || ""}</p>
              <p><strong>Vehicle:</strong> ${data.vehicle || ""}</p>
              <p>We will review your booking and contact you shortly.</p>
              <p><strong>Elevate Wheel Studio</strong></p>
              <p>info@elevatewheelstudio.com</p>
            </div>
          </div>
        `,
      });
    }

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
