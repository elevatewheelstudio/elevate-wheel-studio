import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return res.status(500).json({ success: false, error: error.message });

    return res.status(200).json({ success: true, bookings: data || [] });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const data = req.body || {};
  const bookingRef = `EWS-${Date.now()}`;
  const bookingStatus = "New";

  const confirmationEmail = data.customerEmail || data.advisorEmail || "";
  const confirmationName = data.customerName || data.advisorName || "there";

  try {
    const { error: bookingSaveError } = await supabase.from("bookings").insert([
      {
        status: bookingStatus,
        customer_name: data.customerName || data.advisorName || data.requestedBy || "",
        customer_email: confirmationEmail,
        customer_phone: data.customerPhone || "",
        dealership: data.dealership || data.dealershipDepartment || "",
        vehicle: data.vehicle || "",
        vin: data.vin || "",
        wheel_size: data.wheelSize || "",
        service_type: data.serviceType || "",
        preferred_date: data.appointmentDate || null,
        preferred_time: data.appointmentTime || "",
        notes: data.notes || "",
      },
    ]);

    if (bookingSaveError) {
      return res.status(500).json({ success: false, error: bookingSaveError.message });
    }

    await resend.emails.send({
      from: "Elevate Wheel Studio <info@elevatewheelstudio.com>",
      to: "info@elevatewheelstudio.com",
      subject: `New Booking Received - ${bookingRef}`,
      html: `
        <h1>New Booking Received</h1>
        <p><strong>Booking Reference:</strong> ${bookingRef}</p>
        <p><strong>Status:</strong> ${bookingStatus}</p>
        <p><strong>Send Confirmation To:</strong> ${confirmationEmail || "No email provided"}</p>
        <hr />
        <p><strong>Dealership:</strong> ${data.dealership || ""}</p>
        <p><strong>Date:</strong> ${data.appointmentDate || ""}</p>
        <p><strong>Time:</strong> ${data.appointmentTime || ""}</p>
        <p><strong>Advisor:</strong> ${data.advisorName || ""}</p>
        <p><strong>Advisor Email:</strong> ${data.advisorEmail || ""}</p>
        <p><strong>Customer:</strong> ${data.customerName || ""}</p>
        <p><strong>Customer Email:</strong> ${data.customerEmail || ""}</p>
        <p><strong>Vehicle:</strong> ${data.vehicle || ""}</p>
        <p><strong>VIN:</strong> ${data.vin || ""}</p>
        <p><strong>Service:</strong> ${data.serviceType || ""}</p>
      `,
    });

    if (confirmationEmail) {
      const emailResult = await resend.emails.send({
        from: "Elevate Wheel Studio <info@elevatewheelstudio.com>",
        to: confirmationEmail,
        cc: data.advisorEmail && data.customerEmail ? data.advisorEmail : undefined,
        subject: `Appointment Request Received - ${bookingRef}`,
        html: `
          <div style="font-family:Arial,Helvetica,sans-serif;background:#050505;color:#ffffff;padding:30px;">
            <div style="max-width:650px;margin:auto;background:#111111;border:1px solid #333333;padding:25px;">
              <h1 style="color:#e4001b;">Appointment Request Received</h1>
              <p>Hello ${confirmationName},</p>
              <p>Your appointment request has been received.</p>
              <h2 style="color:#e4001b;">${bookingRef}</h2>
              <p><strong>Status:</strong> ${bookingStatus}</p>
              <hr />
              <p><strong>Date:</strong> ${data.appointmentDate || "To be confirmed"}</p>
              <p><strong>Time:</strong> ${data.appointmentTime || "To be confirmed"}</p>
              <p><strong>Dealership:</strong> ${data.dealership || ""}</p>
              <p><strong>Vehicle:</strong> ${data.vehicle || ""}</p>
              <p><strong>VIN:</strong> ${data.vin || ""}</p>
              <p><strong>Service Type:</strong> ${data.serviceType || ""}</p>
              <p>We will review your booking and contact you shortly.</p>
              <p><strong>Elevate Wheel Studio</strong></p>
              <p>info@elevatewheelstudio.com</p>
            </div>
          </div>
        `,
      });

      if (emailResult.error) {
        return res.status(500).json({ success: false, error: emailResult.error.message });
      }
    }

    return res.status(200).json({ success: true, bookingRef });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
