import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

async function createInvoicePDF(data) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const money = (amount) =>
    Number(amount || 0).toLocaleString("en-CA", {
      style: "currency",
      currency: "CAD",
    });

  let y = 740;

  page.drawText("ELEVATE WHEEL STUDIO", {
    x: 50,
    y,
    size: 24,
    font: bold,
    color: rgb(0.89, 0, 0.1),
  });

  y -= 28;

  page.drawText("1001651472 Ontario Inc. o/a Elevate Wheel Studio", {
    x: 50,
    y,
    size: 10,
    font,
  });

  y -= 14;

  page.drawText("Ontario, Canada | info@elevatewheelstudio.com", {
    x: 50,
    y,
    size: 10,
    font,
  });

  y -= 45;

  page.drawText("INVOICE", {
    x: 50,
    y,
    size: 28,
    font: bold,
  });

  page.drawText(data.invoiceNumber || "", {
    x: 400,
    y: y + 8,
    size: 12,
    font: bold,
  });

  page.drawText(`Status: ${data.invoiceStatus || ""}`, {
    x: 400,
    y: y - 8,
    size: 10,
    font,
  });

  y -= 45;

  page.drawText("Bill To", { x: 50, y, size: 14, font: bold });
  page.drawText("Vehicle Details", { x: 330, y, size: 14, font: bold });

  y -= 20;

  page.drawText(`Customer: ${data.customerName || "-"}`, { x: 50, y, size: 10, font });
  page.drawText(`Vehicle: ${data.vehicle || "-"}`, { x: 330, y, size: 10, font });

  y -= 16;

  page.drawText(`Dealership: ${data.dealership || "-"}`, { x: 50, y, size: 10, font });
  page.drawText(`VIN: ${data.vin || "-"}`, { x: 330, y, size: 10, font });

  y -= 16;

  page.drawText(`RO#: ${data.repairOrder || "-"}`, { x: 330, y, size: 10, font });

  y -= 16;

  page.drawText(`Tag#: ${data.vehicleTag || "-"}`, { x: 330, y, size: 10, font });

  y -= 45;

  page.drawRectangle({
    x: 50,
    y: y - 8,
    width: 512,
    height: 25,
    color: rgb(0.89, 0, 0.1),
  });

  page.drawText("Description", {
    x: 60,
    y,
    size: 11,
    font: bold,
    color: rgb(1, 1, 1),
  });

  page.drawText("Amount", {
    x: 490,
    y,
    size: 11,
    font: bold,
    color: rgb(1, 1, 1),
  });

  y -= 32;

  page.drawText(data.serviceType || "Labour", { x: 60, y, size: 10, font });
  page.drawText(money(data.labour), { x: 485, y, size: 10, font });

  y -= 24;

  page.drawText("Materials / Supplies", { x: 60, y, size: 10, font });
  page.drawText(money(data.materials), { x: 485, y, size: 10, font });

  y -= 50;

  page.drawText(`Subtotal: ${money(data.subtotal)}`, { x: 390, y, size: 11, font });
  y -= 18;

  page.drawText(`HST 13%: ${money(data.hst)}`, { x: 390, y, size: 11, font });
  y -= 22;

  page.drawText(`Total: ${money(data.total)}`, {
    x: 390,
    y,
    size: 16,
    font: bold,
    color: rgb(0.89, 0, 0.1),
  });

  y -= 55;

  page.drawText("Notes", { x: 50, y, size: 14, font: bold });
  y -= 18;

  page.drawText(data.notes || "Thank you for choosing Elevate Wheel Studio.", {
    x: 50,
    y,
    size: 10,
    font,
  });

  return await pdfDoc.save();
}

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
      error: "RESEND_API_KEY is missing in Vercel.",
    });
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(500).json({
      success: false,
      error: "Supabase environment variables are missing in Vercel.",
    });
  }

  const resend = new Resend(apiKey);

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

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
    const pdfBytes = await createInvoicePDF(data);
    const pdfBase64 = Buffer.from(pdfBytes).toString("base64");

    await resend.emails.send({
      from: "Elevate Wheel Studio <info@elevatewheelstudio.com>",
      to: data.advisorEmail,
      cc: "info@elevatewheelstudio.com",
      subject: `Invoice ${data.invoiceNumber || ""} - Elevate Wheel Studio`,
      html: `
        <div style="font-family:Arial;padding:25px;">
          <h1 style="color:#e4001b;">Elevate Wheel Studio Invoice</h1>
          <p>Please find the attached PDF invoice.</p>

          <p><strong>Invoice:</strong> ${data.invoiceNumber || ""}</p>
          <p><strong>Customer:</strong> ${data.customerName || ""}</p>
          <p><strong>Dealership:</strong> ${data.dealership || ""}</p>
          <p><strong>Vehicle:</strong> ${data.vehicle || ""}</p>
          <p><strong>RO#:</strong> ${data.repairOrder || ""}</p>
          <p><strong>Service:</strong> ${data.serviceType || ""}</p>
          <p><strong>Total:</strong> ${money(data.total)}</p>

          <p>Thank you,</p>
          <p><strong>Elevate Wheel Studio</strong></p>
        </div>
      `,
      attachments: [
        {
          filename: `${data.invoiceNumber || "invoice"}.pdf`,
          content: pdfBase64,
        },
      ],
    });

    const { error: supabaseError } = await supabase.from("invoices").insert([
      {
        invoice_number: data.invoiceNumber || "",
        status: data.invoiceStatus || "Sent",
        advisor_email: data.advisorEmail || "",
        customer_name: data.customerName || "",
        dealership: data.dealership || "",
        repair_order: data.repairOrder || "",
        vehicle_tag: data.vehicleTag || "",
        vehicle: data.vehicle || "",
        vin: data.vin || "",
        service_type: data.serviceType || "",
        labour: Number(data.labour || 0),
        materials: Number(data.materials || 0),
        subtotal: Number(data.subtotal || 0),
        hst: Number(data.hst || 0),
        total: Number(data.total || 0),
        notes: data.notes || "",
        sent_at: new Date().toISOString(),
      },
    ]);

    if (supabaseError) {
      return res.status(500).json({
        success: false,
        error: `Invoice email sent, but invoice history failed: ${supabaseError.message}`,
      });
    }

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
