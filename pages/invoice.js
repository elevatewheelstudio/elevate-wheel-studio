import { useMemo, useState } from "react";

export default function Invoice() {
  const [invoice, setInvoice] = useState({
    invoiceNumber: `INV-${Date.now()}`,
    invoiceStatus: "Draft",
    customerName: "",
    dealership: "",
    repairOrder: "",
    vehicleTag: "",
    vehicle: "",
    vin: "",
    serviceType: "Wheel Repair",
    labour: "",
    materials: "",
    notes: ""
  });

  const update = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const subtotal = useMemo(() => {
    return (Number(invoice.labour) || 0) + (Number(invoice.materials) || 0);
  }, [invoice.labour, invoice.materials]);

  const hst = subtotal * 0.13;
  const total = subtotal + hst;

  const money = (amount) =>
    amount.toLocaleString("en-CA", {
      style: "currency",
      currency: "CAD"
    });

  return (
    <main className="page">
      <section className="controls">
        <img src="/logo_transparent (3).png" className="logo" />
        <h1>Invoice Generator</h1>
        <p>Create a professional Elevate Wheel Studio invoice with Ontario HST automatically calculated at 13%.</p>

        <div className="formGrid">
          <input name="invoiceNumber" placeholder="Invoice Number" value={invoice.invoiceNumber} onChange={update} />

          <select name="invoiceStatus" value={invoice.invoiceStatus} onChange={update}>
            <option>Draft</option>
            <option>Sent</option>
            <option>Paid</option>
            <option>Outstanding</option>
          </select>

          <input name="customerName" placeholder="Customer Name" value={invoice.customerName} onChange={update} />
          <input name="dealership" placeholder="Dealership" value={invoice.dealership} onChange={update} />
          <input name="repairOrder" placeholder="Repair Order (RO#)" value={invoice.repairOrder} onChange={update} />
          <input name="vehicleTag" placeholder="Vehicle Tag#" value={invoice.vehicleTag} onChange={update} />
          <input name="vehicle" placeholder="Vehicle Make / Model" value={invoice.vehicle} onChange={update} />
          <input name="vin" placeholder="VIN#" value={invoice.vin} onChange={update} />

          <select name="serviceType" value={invoice.serviceType} onChange={update}>
            <option>Wheel Repair</option>
            <option>Wheel Refinish</option>
            <option>Powder Coating</option>
            <option>Color Change</option>
            <option>Bent Wheel Repair</option>
            <option>Cracked Wheel Repair</option>
            <option>Custom Finish</option>
            <option>Multiple Services</option>
          </select>

          <input name="labour" type="number" placeholder="Labour Amount" value={invoice.labour} onChange={update} />
          <input name="materials" type="number" placeholder="Materials Amount" value={invoice.materials} onChange={update} />

          <textarea name="notes" placeholder="Invoice Notes" value={invoice.notes} onChange={update}></textarea>
        </div>

        <button onClick={() => window.print()}>Print / Save as PDF</button>
      </section>

      <section className="invoice">
        <div className="invoiceHeader">
          <img src="/logo_transparent (3).png" className="invoiceLogo" />
          <div>
            <h2>INVOICE</h2>
            <p><strong>{invoice.invoiceNumber}</strong></p>
            <p>Status: {invoice.invoiceStatus}</p>
          </div>
        </div>

        <div className="company">
          <p><strong>1001651472 Ontario Inc.</strong></p>
          <p>o/a Elevate Wheel Studio</p>
          <p>Ontario, Canada</p>
          <p>info@elevatewheelstudio.com</p>
        </div>

        <hr />

        <div className="twoCol">
          <div>
            <h3>Bill To</h3>
            <p><strong>{invoice.customerName || "Customer Name"}</strong></p>
            <p>{invoice.dealership || "Dealership"}</p>
          </div>

          <div>
            <h3>Vehicle Details</h3>
            <p><strong>Vehicle:</strong> {invoice.vehicle || "-"}</p>
            <p><strong>VIN:</strong> {invoice.vin || "-"}</p>
            <p><strong>RO#:</strong> {invoice.repairOrder || "-"}</p>
            <p><strong>Tag#:</strong> {invoice.vehicleTag || "-"}</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{invoice.serviceType}</td>
              <td>{money(Number(invoice.labour) || 0)}</td>
            </tr>
            <tr>
              <td>Materials / Supplies</td>
              <td>{money(Number(invoice.materials) || 0)}</td>
            </tr>
          </tbody>
        </table>

        <div className="totals">
          <p><span>Subtotal:</span> {money(subtotal)}</p>
          <p><span>HST (Ontario 13%):</span> {money(hst)}</p>
          <h3><span>Total:</span> {money(total)}</h3>
        </div>

        <div className="notes">
          <h3>Notes</h3>
          <p>{invoice.notes || "Thank you for choosing Elevate Wheel Studio."}</p>
        </div>
      </section>

      <style jsx>{styles}</style>
    </main>
  );
}

const styles = `
*{box-sizing:border-box}
.page{background:#050505;color:white;min-height:100vh;font-family:Arial,Helvetica,sans-serif;padding:30px}
.controls{max-width:1100px;margin:0 auto 30px;background:#0b0b0b;border:1px solid #333;padding:30px;border-radius:10px}
.logo{width:240px}
h1{font-size:42px;margin:20px 0 8px;color:#e4001b;text-transform:uppercase}
.controls p{color:#ddd}
.formGrid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:22px}
input,select,textarea{background:#111;border:1px solid #333;color:white;padding:16px;border-radius:6px;font-size:16px;width:100%}
textarea{grid-column:1/-1;min-height:90px}
button{margin-top:18px;width:100%;background:#e4001b;color:white;border:0;padding:18px;border-radius:6px;text-transform:uppercase;font-weight:900;font-size:16px;cursor:pointer}

.invoice{max-width:900px;margin:0 auto;background:white;color:#111;padding:45px;border-radius:8px}
.invoiceHeader{display:flex;justify-content:space-between;align-items:center;border-bottom:4px solid #e4001b;padding-bottom:20px}
.invoiceLogo{width:230px}
.invoice h2{font-size:42px;margin:0;color:#e4001b}
.company{margin-top:20px;line-height:1.4}
.twoCol{display:grid;grid-template-columns:1fr 1fr;gap:30px;margin:30px 0}
h3{margin-bottom:8px;color:#111}
table{width:100%;border-collapse:collapse;margin-top:20px}
th{background:#111;color:white;text-align:left;padding:14px}
td{border-bottom:1px solid #ddd;padding:14px}
td:last-child,th:last-child{text-align:right}
.totals{margin-left:auto;margin-top:25px;max-width:320px}
.totals p,.totals h3{display:flex;justify-content:space-between}
.totals h3{font-size:24px;border-top:2px solid #111;padding-top:12px}
.notes{margin-top:35px;border-top:1px solid #ddd;padding-top:20px}

@media print{
  .controls{display:none}
  .page{background:white;padding:0}
  .invoice{box-shadow:none;border-radius:0;max-width:100%;padding:35px}
}

@media(max-width:750px){
  .formGrid,.twoCol{grid-template-columns:1fr}
  .invoiceHeader{flex-direction:column;align-items:flex-start;gap:20px}
}
`;
