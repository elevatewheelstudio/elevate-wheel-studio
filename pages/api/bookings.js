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

    const {
      dealership,
      date,
      time,
      customerName,
      email,
      phone,
      vehicle,
      vin,
      mileage,
      service,
      notes,
    } = req.body;

    const bookingRef = `EWS-${Date.now()}`;

    await resend.emails.send({
      from: "Elevate Wheel Studio <info@elevatewheelstudio.com>",
      to: ["ishmil90@gmail.com"],
      subject: `New Booking ${bookingRef}`,
      html: `
        <h2>New Appointment Booking</h2>

        <p><strong>Reference:</strong> ${bookingRef}</p>
        <p><strong>Dealership:</strong> ${dealership}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>

        <hr>

        <p><strong>Customer:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>

        <hr>

        <p><strong>Vehicle:</strong> ${vehicle}</p>
        <p><strong>VIN:</strong> ${vin}</p>
        <p><strong>Mileage:</strong> ${mileage}</p>

        <hr>

        <p><strong>Service:</strong> ${service}</p>

        <p><strong>Notes:</strong></p>
        <p>${notes || "None"}</p>
      `,
    });

    return res.status(200).json({
      success: true,
      bookingRef,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
