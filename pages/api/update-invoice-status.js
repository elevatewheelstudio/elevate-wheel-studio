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

  const { invoiceNumber, status } = req.body;

  if (!invoiceNumber || !status) {
    return res.status(400).json({
      success: false,
      error: "Missing invoice number or status.",
    });
  }

  const { error } = await supabase
    .from("invoices")
    .update({ status })
    .eq("invoice_number", invoiceNumber);

  if (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }

  return res.status(200).json({
    success: true,
  });
}
