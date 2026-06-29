import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { id, status } = req.body;

  try {
    const { data: booking, error: fetchError } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError) {
      return res.status(500).json({ success: false, error: fetchError.message });
    }

    const { error: updateError } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);

    if (updateError) {
      return res.status(500).json({ success: false, error: updateError.message });
    }

    const shouldEmailCustomer =
      booking.customer_email &&
      ["Confirmed", "Scheduled", "Completed", "Cancelled"].includes(status);

    if (shouldEmailCustomer) {
      const html = `
        <div style="font-family:Arial,Helvetica,sans-serif;background:#050505;color:#ffffff;padding:30px;">
          <div style="max-width:650px;margin:auto;background:#111111;border:1px solid #333333;padding:25px;">
            <h1 style="color:#e4001b;">Booking ${status}</h1>
            <p>Hello ${booking.customer_name || "there"},</p>
            <p>Your Elevate Wheel Studio booking status has been updated to:</p>
            <h2 style="color:#e4001b;">${status}</h2>
            <hr />
            <p><strong>Date:</strong> ${booking.preferred_date || "To be confirmed"}</p>
            <p><strong>Time:</strong> ${booking.preferred_time || "To be confirmed"}</p>
            <p><strong>Dealership:</strong> ${booking.dealership || ""}</p>
            <p><strong>Vehicle:</strong> ${booking.vehicle || ""}</p>
            <p><strong>VIN:</strong> ${booking.vin || ""}</p>
            <p><strong>Service Type:</strong> ${booking.service_type || ""}</p>
            <p>If you have any questions, please contact us at info@elevatewheelstudio.com.</p>
            <p><strong>Elevate Wheel Studio</strong></p>
          </div>
        </div>
      `;

      const emailResult = await resend.emails.send({
        from: "Elevate Wheel Studio <info@elevatewheelstudio.com>",
        to: booking.customer_email,
        cc: "info@elevatewheelstudio.com",
        subject: `Booking ${status} - Elevate Wheel Studio`,
        html,
      });

      if (emailResult.error) {
        return res.status(500).json({
          success: false,
          error: emailResult.error.message,
        });
      }
    }

    return res.status(200).json({
      success: true,
      emailed: Boolean(shouldEmailCustomer),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
