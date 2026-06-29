import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { id, status } = req.body;

  try {
    // Get booking details
    const { data: booking, error: fetchError } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError) {
      return res.status(500).json({
        success: false,
        error: fetchError.message,
      });
    }

    // Update booking status
    const { error: updateError } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);

    if (updateError) {
      return res.status(500).json({
        success: false,
        error: updateError.message,
      });
    }

    // Send customer email for certain statuses
    const shouldEmailCustomer =
      booking.customer_email &&
      ["Confirmed", "Scheduled", "Completed", "Cancelled"].includes(status);

    if (shouldEmailCustomer) {
      const emailResult = await resend.emails.send({
        from: "Elevate Wheel Studio <info@elevatewheelstudio.com>",
        to: booking.customer_email,
        cc: "info@elevatewheelstudio.com",
        subject: `Booking ${status} - Elevate Wheel Studio`,
        html: `
          <div style="font-family:Arial,Helvetica,sans-serif
