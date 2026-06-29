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

  if (!data.advisorEmail) {
    return res.status(400).json({
      success: false,
      error: "Advisor email is required.",
    });
  }

  const money = (amount) =>
    Number(amount || 0).toLocaleString("en-CA", {
      style: "currency",
      currency: "CAD",
    });

  try {
    await resend.emails.send({
      from: "Elevate Wheel Studio <info@elevatewheelstudio.com>",
      to: data.advisorEmail,
      cc: "info@elevatewheelstudio.com",
      subject: `Invoice ${data.invoiceNumber || ""} - Elevate Wheel Studio`,
      html: `
        <div style="font-family:Arial;background:#050505;color:#ffffff;padding:30px;">
          <div style="max-width:750px;margin:auto;background:#111111;border:1px solid #333333;padding:30px;">
            <h1 style="color:#e4001b;margin-bottom:5px;">Elevate Wheel Studio Invoice</h1>
            <p>Please see the invoice details below.</p>

            <hr style="border:0;border-top:1px solid #333333;margin:25px 0;" />

            <h2 style="color:#ffffff;">Invoice Details</h2>
            <p><strong>Invoice Number:</strong> ${data.invoiceNumber || ""}</p>
            <p><strong>Invoice Status:</strong> ${data.invoiceStatus || ""}</p>

            <hr style="border:0;border-top:1px solid #333333;margin:25px 0;" />

            <h2 style="color:#ffffff;">Customer / Dealership</h2>
            <p><strong>Customer Name:</strong> ${data.customerName || ""}</p>
            <p><strong>Dealership:</strong> ${data.dealership || ""}</p>

            <hr style="border:0;border-top:1px solid #333333;margin:25px 0;" />

            <h2 style="color:#ffffff;">Vehicle Details</h2>
            <p><strong>Vehicle:</strong> ${data.vehicle || ""}</p>
            <p><strong>VIN:</strong> ${data.vin || ""}</p>
            <p><strong>Repair Order:</strong> ${data.repairOrder || ""}</p>
            <p><strong>Vehicle Tag:</strong> ${data.vehicleTag || ""}</p>
            <p><strong>Service Type:</strong> ${data.serviceType || ""}</p>

            <hr style="border:0;border-top:1px solid #333333;margin:25px 0;" />

            <h2 style="color:#ffffff;">Charges</h2>

            <table style="width:100%;border-collapse:collapse;margin-top:15px;">
              <tr>
                <th style="text-align:left;background:#e4001b;color:#ffffff;padding:12px;">Description</th>
                <th style="text-align:right;background:#e4001b;color:#ffffff;padding:12px;">Amount</th>
              </tr>
              <tr>
                <td style="padding:12px;border-bottom:1px solid #333333;">${data.serviceType || "Labour"}</td>
                <td style="padding:12px;border-bottom:1px solid #333333;text-align:right;">${money(data.labour)}</td>
              </tr>
              <tr>
                <td style="padding:12px;border-bottom:1px solid #333333;">Materials / Supplies</td>
                <td style="padding:12px;border-bottom:1px solid #333333;text-align:right;">${money(data.materials)}</td>
              </tr>
            </table>

            <div style="max-width:320px;margin-left:auto;margin-top:25px;">
              <p style="display:flex;justify-content:space-between;">
                <strong>Subtotal:</strong>
                <span>${money(data.subtotal)}</span>
              </p>
              <p style="display:flex;justify-content:space-between;">
                <strong>HST (Ontario 13%):</strong>
                <span>${money(data.hst)}</span>
              </p>
              <p style="display:flex;justify-content:space-between;font-size:22px;color:#e4001b;">
                <strong>Total:</strong>
                <strong>${money(data.total)}</strong>
              </p>
            </div>

            <hr style="border:0;border-top:1px solid #333333;margin:25px 0;" />

            <h2 style="color:#ffffff;">Notes</h2>
            <p>${data.notes || "Thank you for choosing Elevate Wheel Studio."}</p>

            <hr style="border:0;border-top:1px solid #333333;margin:25px 0;" />

            <p><strong>1001651472 Ontario Inc.</strong></p>
            <p>o/a Elevate Wheel Studio</p>
            <p>info@elevatewheelstudio.com</p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
