import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = req.body || {};
    const bookingRef = `EWS-${Date.now()}`;

    const adminHtml = `
      <h1>New Booking Received</h1>

      <p><strong>Booking Reference:</strong> ${bookingRef}</p>

      <hr>

      <p><strong>Customer:</strong> ${data.customerName || ""}</p>
      <p><strong>Customer Email:</strong> ${data.customerEmail || ""}</p>

      <hr>

      <p><strong>Dealership:</strong> ${data.dealership || ""}</p>
      <p><strong>Advisor:</strong> ${data.advisorName || ""}</p>
      <p><strong>Advisor Email:</strong> ${data.advisorEmail || ""}</p>

      <hr>

      <p><strong>Date:</strong> ${data.appointmentDate || ""}</p>
      <p><strong>Time:</strong> ${data.appointmentTime || ""}</p>

      <hr>

      <p><strong>Wheel Quantity:</strong> ${data.wheelQuantity || ""}</p>
      <p><strong>Wheel Position:</strong> ${data.wheelPosition || ""}</p>

      <hr>

      <p><strong>Repair Order:</strong> ${data.repairOrder || ""}</p>
      <p><strong>Vehicle Tag:</strong> ${data.vehicleTag || ""}</p>

      <hr>

      <p><strong>Vehicle:</strong> ${data.vehicle || ""}</p>
      <p><strong>VIN:</strong> ${data.vin || ""}</p>

      <hr>

      <p><strong>Notes:</strong></p>

      <p>${data.notes || "None"}</p>
    `;

    const customerHtml = `
      <div style="font-family:Arial;background:#050505;color:#ffffff;padding:30px;">
        <div style="max-width:650px;margin:auto;background:#111111;border:1px solid #333333;padding:30px;">

          <h1 style="color:#e4001b;">Appointment Request Received</h1>

          <p>Hello ${data.customerName || "there"},</p>

          <p>Thank you for choosing Elevate Wheel Studio.</p>

          <p>Your booking request has been received.</p>

          <h2>Booking Reference</h2>

          <h1 style="color:#e4001b;">${bookingRef}</h1>

          <hr>

          <p><strong>Date:</strong> ${data.appointmentDate || ""}</p>

          <p><strong>Time:</strong> ${data.appointmentTime || ""}</p>

          <p><strong>Dealership:</strong> ${data.dealership || ""}</p>

          <p><strong>Vehicle:</strong> ${data.vehicle || ""}</p>

          <hr>

          <p>We will review your booking and contact you shortly.</p>

          <br>

          <strong>Elevate Wheel Studio</strong><br>

          info@elevatewheelstudio.com

        </div>
      </div>
    `;

    console.log("Sending admin email...");

    await resend.emails.send({
      from: "Elevate Wheel Studio <info@elevatewheelstudio.com>",
      to: "info@elevatewheelstudio.com",
      subject: `New Booking Received - ${bookingRef}`,
      html: adminHtml,
    });

    console.log("Admin email sent.");

    if (data.customerEmail) {

      console.log("Sending customer email...");

      await resend.emails.send({
        from: "Elevate Wheel Studio <info@elevatewheelstudio.com>",
        to: data.customerEmail,
        subject: `Appointment Request Received - ${bookingRef}`,
        html: customerHtml,
      });

      console.log("Customer email sent.");
    }

    return res.status(200).json({
      success: true,
      bookingRef,
    });

  } catch (error) {

    console.error("BOOKING API ERROR");
    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });

  }
}
