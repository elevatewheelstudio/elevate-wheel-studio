import { useEffect, useMemo, useState } from "react";

export default function InvoicesDashboard() {
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const money = (amount) =>
    Number(amount || 0).toLocaleString("en-CA", {
      style: "currency",
      currency: "CAD",
    });

  useEffect(() => {
    async function loadInvoices() {
      try {
        const res = await fetch("/api/invoices");
        const result = await res.json();

        if (result.success) {
          setInvoices(result.invoices || []);
        } else {
          alert(result.error || "Failed to load invoices.");
        }
      } catch (error) {
        alert(error.message || "Failed to load invoices.");
      }

      setLoading(false);
    }

    loadInvoices();
  }, []);

  const updateStatus = async (id, status) => {
    const res = await fetch("/api/update-invoice-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });

    const result = await res.json();

    if (!result.success) {
      alert(result.error || "Failed to update status.");
      return;
    }

    setInvoices((current) =>
      current.map((invoice) =>
        invoice.id === id ? { ...invoice, status } : invoice
      )
    );
  };

  const filteredInvoices = useMemo(() => {
    const q = search.toLowerCase();

    return invoices.filter((invoice) =>
      [
        invoice.invoice_number,
        invoice.status,
        invoice.advisor_email,
        invoice.customer_name,
        invoice.dealership,
        invoice.repair_order,
        invoice.vehicle_tag,
        invoice.vehicle,
        invoice.vin,
        invoice.service_type,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [invoices, search]);

  const totalRevenue = filteredInvoices.reduce(
    (sum, invoice) => sum + Number(invoice.total || 0),
    0
  );

  const totalOutstanding = filteredInvoices
    .filter((invoice) => invoice.status !== "Paid")
    .reduce((sum, invoice) => sum + Number(invoice.total || 0), 0);

  return (
    <main className="page">
      <section className="header">
        <img src="/logo_transparent (3).png" className="logo" />
        <h1>Invoice Dashboard</h1>
        <p>Search, review, and manage Elevate Wheel Studio invoice history.</p>
      </section>

      <section className="stats">
        <div>
          <span>Total Invoices</span>
          <strong>{filteredInvoices.length}</strong>
        </div>
        <div>
          <span>Total Revenue</span>
          <strong>{money(totalRevenue)}</strong>
        </div>
        <div>
          <span>Outstanding</span>
          <strong>{money(totalOutstanding)}</strong>
        </div>
      </section>

      <section className="toolbar">
        <input
          placeholder="Search by invoice, RO, VIN, customer, dealership, vehicle..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <section className="tableWrap">
        {loading ? (
          <p className="loading">Loading invoices...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date Sent</th>
                <th>Invoice</th>
                <th>Status</th>
                <th>Customer</th>
                <th>Dealership</th>
                <th>RO</th>
                <th>Vehicle</th>
                <th>VIN</th>
                <th>Service</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>
                    {invoice.sent_at
                      ? new Date(invoice.sent_at).toLocaleDateString("en-CA")
                      : "-"}
                  </td>
                  <td>{invoice.invoice_number || "-"}</td>
                  <td>
                    <select
                      value={invoice.status || "Sent"}
                      onChange={(e) =>
                        updateStatus(invoice.id, e.target.value)
                      }
                    >
                      <option>Draft</option>
                      <option>Sent</option>
                      <option>Outstanding</option>
                      <option>Paid</option>
                    </select>
                  </td>
                  <td>{invoice.customer_name || "-"}</td>
                  <td>{invoice.dealership || "-"}</td>
                  <td>{invoice.repair_order || "-"}</td>
                  <td>{invoice.vehicle || "-"}</td>
                  <td>{invoice.vin || "-"}</td>
                  <td>{invoice.service_type || "-"}</td>
                  <td>{money(invoice.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && filteredInvoices.length === 0 && (
          <p className="loading">No invoices found.</p>
        )}
      </section>

      <style jsx>{styles}</style>
    </main>
  );
}

const styles = `
*{box-sizing:border-box}
.page{background:#050505;color:white;min-height:100vh;font-family:Arial,Helvetica,sans-serif;padding:30px}
.header{max-width:1400px;margin:0 auto 25px}
.logo{width:240px}
h1{font-size:44px;margin:20px 0 8px;color:#e4001b;text-transform:uppercase}
p{color:#ddd}
.stats{max-width:1400px;margin:0 auto 25px;display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.stats div{background:#0b0b0b;border:1px solid #333;padding:22px;border-radius:10px}
.stats span{display:block;color:#aaa;margin-bottom:8px}
.stats strong{font-size:28px;color:white}
.toolbar{max-width:1400px;margin:0 auto 20px}
input{width:100%;background:#111;border:1px solid #333;color:white;padding:16px;border-radius:8px;font-size:16px}
.tableWrap{max-width:1400px;margin:0 auto;background:#0b0b0b;border:1px solid #333;border-radius:10px;overflow:auto}
table{width:100%;border-collapse:collapse;min-width:1200px}
th{background:#111;color:#e4001b;text-align:left;padding:14px;border-bottom:1px solid #333;font-size:14px;text-transform:uppercase}
td{padding:14px;border-bottom:1px solid #222;color:#eee;font-size:14px}
tr:hover td{background:#111}
select{background:#111;color:white;border:1px solid #444;border-radius:6px;padding:8px;font-weight:bold}
.loading{padding:30px;color:#ccc}
@media(max-width:800px){
  .stats{grid-template-columns:1fr}
  h1{font-size:34px}
}
`;
