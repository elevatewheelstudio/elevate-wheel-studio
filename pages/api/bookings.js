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
  const bookingStatus = "New";

  try {
    await resend.emails.send({
      from: "Elevate Wheel Studio <info@elevatewheelstudio.com>",
      to: "info@elevatewheelstudio.com",
      subject: `New Booking Received - ${bookingRef}`,
      html: `
        <h1>New Booking Received</h1>
        <p><strong>Booking Reference:</strong> ${bookingRef}</p>
        <p><strong>Booking Status:</strong> ${bookingStatus}</p>

        <hr />

        <h2>Request Details</h2>
        <p><strong>Appointment Requested By:</strong> ${data.requestedBy || "Not provided"}</p>
        <p><strong>Dealership Department:</strong> ${data.dealershipDepartment || "Not provided"}</p>

        <hr />

        <h2>Appointment Details</h2>
        <p><strong>Dealership:</strong> ${data.dealership || ""}</p>
        <p><strong>Date:</strong> ${data.appointmentDate || ""}</p>
        <p><strong>Time:</strong> ${data.appointmentTime || ""}</p>

        <hr />

        <h2>Advisor / BDC Details</h2>
        <p><strong>Advisor / BDC Name:</strong> ${data.advisorName || ""}</p>
        <p><strong>Advisor / BDC Email:</strong> ${data.advisorEmail || ""}</p>

        <hr />

        <h2>Customer Details</h2>
        <p><strong>Customer:</strong> ${data.customerName || ""}</p>
        <p><strong>Customer Email:</strong> ${data.customerEmail || "Not provided"}</p>

        <hr />

        <h2>Vehicle Details</h2>
        <p><strong>Vehicle:</strong> ${data.vehicle || ""}</p>
        <p><strong>VIN:</strong> ${data.vin || ""}</p>
        <p><strong>Repair Order:</strong> ${data.repairOrder || ""}</p>
        <p><strong>Vehicle Tag:</strong> ${data.vehicleTag || ""}</p>

        <hr />

        <h2>Wheel Details</h2>
        <p><strong>Service Type:</strong> ${data.serviceType || ""}</p>
        <p><strong>Wheel Quantity:</strong> ${data.wheelQuantity || ""}</p>
        <p><strong>Wheel Position:</strong> ${data.wheelPosition || ""}</p>

        <hr />

        <h2>Notes</h2>
        <p>${data.notes || "None"}</p>
      `,
    });

    if (data.advisorEmail) {
      await resend.emails.send({
        from: "Elevate Wheel Studio <info@elevatewheelstudio.com>",
        to: data.advisorEmail,
        subject: `Booking Request Received - ${bookingRef}`,
        html: `
          <div style="font-family:Arial;background:#050505;color:#ffffff;padding:30px;">
            <div style="max-width:650px;margin:auto;background:#111111;border:1px solid #333333;padding:30px;">
              <h1 style="color:#e4001b;">Booking Request Received</h1>
              <p>Hello ${data.advisorName || "there"},</p>
              <p>Your booking request has been received by Elevate Wheel Studio.</p>

              <h2>Booking Reference</h2>
              <h1 style="color:#e4001b;">${bookingRef}</h1>
              <p><strong>Booking Status:</strong> ${bookingStatus}</p>

              <p><strong>Appointment Requested By:</strong> ${data.requestedBy || "Not provided"}</p>
              <p><strong>Dealership Department:</strong> ${data.dealershipDepartment || "Not provided"}</p>
              <p><strong>Dealership:</strong> ${data.dealership || ""}</p>
              <p><strong>Date:</strong> ${data.appointmentDate || ""}</p>
              <p><strong>Time:</strong> ${data.appointmentTime || ""}</p>
              <p><strong>Customer:</strong> ${data.customerName || ""}</p>
              <p><strong>Vehicle:</strong> ${data.vehicle || ""}</p>
              <p><strong>Service Type:</strong> ${data.serviceType || ""}</p>
              <p><strong>VIN:</strong> ${data.vin || ""}</p>

              <p>We will review this request and contact you if any additional information is required.</p>

              <p><strong>Elevate Wheel Studio</strong></p>
              <p>info@elevatewheelstudio.com</p>
            </div>
          </div>
        `,
      });
    }

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
              <p><strong>Booking Status:</strong> ${bookingStatus}</p>

              <p><strong>Date:</strong> ${data.appointmentDate || ""}</p>
              <p><strong>Time:</strong> ${data.appointmentTime || ""}</p>
              <p><strong>Dealership:</strong> ${data.dealership || ""}</p>
              <p><strong>Vehicle:</strong> ${data.vehicle || ""}</p>
              <p><strong>Service Type:</strong> ${data.serviceType || ""}</p>

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
