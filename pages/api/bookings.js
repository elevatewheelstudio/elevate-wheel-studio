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

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      bookings: data || [],
    });
  }

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
      error: "RESEND_API_KEY is missing in Vercel.",
    });
  }

  const resend = new Resend(apiKey);
  const data = req.body || {};

  const bookingRef = `EWS-${Date.now()}`;
  const bookingStatus = "New";

  try {
    const customerEmail = data.customerEmail || "";
    const advisorEmail = data.advisorEmail || "";

    const { error: bookingSaveError } = await supabase.from("bookings").insert([
      {
        status: bookingStatus,
        customer_name: data.customerName || "",
        customer_email: customerEmail,
        customer_phone: "",
        dealership: data.dealership || "",
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
      return res.status(500).json({
        success: false,
        error: bookingSaveError.message,
      });
    }

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
        <p><strong>Dealership:</strong> ${data.dealership || "Not provided"}</p>
        <p><strong>Appointment Date:</strong> ${data.appointmentDate || "Not provided"}</p>
        <p><strong>Appointment Time:</strong> ${data.appointmentTime || "Not provided"}</p>
        <p><strong>Advisor Name:</strong> ${data.advisorName || "Not provided"}</p>
        <p><strong>Advisor Email:</strong> ${advisorEmail || "Not provided"}</p>
        <p><strong>Requested By:</strong> ${data.requestedBy || "Not provided"}</p>
        <p><strong>Department:</strong> ${data.dealershipDepartment || "Not provided"}</p>
        <p><strong>RO#:</strong> ${data.repairOrder || "Not provided"}</p>
        <p><strong>Vehicle Tag:</strong> ${data.vehicleTag || "Not provided"}</p>
        <p><strong>Vehicle:</strong> ${data.vehicle || "Not provided"}</p>
        <p><strong>VIN:</strong> ${data.vin || "Not provided"}</p>
        <p><strong>Customer Name:</strong> ${data.customerName || "Not provided"}</p>
        <p><strong>Customer Email:</strong> ${customerEmail || "Not provided"}</p>
        <p><strong>Service Type:</strong> ${data.serviceType || "Not provided"}</p>
        <p><strong>Wheel Quantity:</strong> ${data.wheelQuantity || "Not provided"}</p>
        <p><strong>Wheel Position:</strong> ${data.wheelPosition || "Not provided"}</p>
        <p><strong>Notes:</strong> ${data.notes || "None"}</p>
      `,
    });

    if (customerEmail) {
      const customerEmailResult = await resend.emails.send({
        from: "Elevate Wheel Studio <info@elevatewheelstudio.com>",
        to: customerEmail,
        cc: advisorEmail || undefined,
        subject: `Appointment Request Received - ${bookingRef}`,
        html: `
          <div style="font-family:Arial,Helvetica,sans-serif;background:#050505;color:#ffffff;padding:30px;">
            <div style="max-width:650px;margin:auto;background:#111111;border:1px solid #333333;padding:25px;">
              <h1 style="color:#e4001b;">Appointment Request Received</h1>
              <p>Hello ${data.customerName || "there"},</p>
              <p>Thank you for choosing Elevate Wheel Studio. Your appointment request has been received.</p>
              <h2>Booking Reference</h2>
              <h1 style="color:#e4001b;">${bookingRef}</h1>
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

      if (customerEmailResult.error) {
        return res.status(500).json({
          success: false,
          error: customerEmailResult.error.message,
        });
      }
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
