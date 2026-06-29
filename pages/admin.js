import { useEffect, useMemo, useState } from "react";

export default function AdminDashboard() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const money = (amount) =>
    Number(amount || 0).toLocaleString("en-CA", {
      style: "currency",
      currency: "CAD",
    });

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/invoices");
        const result = await res.json();

        if (result.success) {
          setInvoices(result.invoices || []);
        } else {
          alert(result.error || "Failed to load dashboard data.");
        }
      } catch (error) {
        alert(error.message || "Failed to load dashboard data.");
      }

      setLoading(false);
    }

    loadData();
  }, []);

  const stats = useMemo(() => {
    const totalRevenue = invoices.reduce(
      (sum, invoice) => sum + Number(invoice.total || 0),
      0
    );

    const outstandingInvoices = invoices.filter(
      (invoice) => invoice.status !== "Paid"
    );

    const outstandingTotal = outstandingInvoices.reduce(
      (sum, invoice) => sum + Number(invoice.total || 0),
      0
    );

    const paidInvoices = invoices.filter((invoice) => invoice.status === "Paid");

    return {
      totalInvoices: invoices.length,
      totalRevenue,
      outstandingCount: outstandingInvoices.length,
      outstandingTotal,
      paidCount: paidInvoices.length,
    };
  }, [invoices]);

  const recentInvoices = invoices.slice(0, 6);

  return (
    <main className="page">
      <section className="hero">
        <img src="/logo_transparent (3).png" className="logo" />
        <div>
          <p className="eyebrow">Elevate Wheel Studio</p>
          <h1>Admin Dashboard</h1>
          <p className="subtitle">
            Your main operations hub for invoices, revenue, and shop activity.
          </p>
        </div>
      </section>

      <section className="quickLinks">
        <a href="/invoice">Create Invoice</a>
        <a href="/invoices">Invoice Dashboard</a>
        <a href="/">Website Home</a>
      </section>

      {loading ? (
        <section className="panel">
          <p>Loading dashboard...</p>
        </section>
      ) : (
        <>
          <section className="stats">
            <div className="card">
              <span>Total Invoices</span>
              <strong>{stats.totalInvoices}</strong>
            </div>

            <div className="card">
              <span>Total Revenue</span>
              <strong>{money(stats.totalRevenue)}</strong>
            </div>

            <div className="card">
              <span>Outstanding</span>
              <strong>{money(stats.outstandingTotal)}</strong>
              <small>{stats.outstandingCount} invoice(s)</small>
            </div>

            <div className="card">
              <span>Paid Invoices</span>
              <strong>{stats.paidCount}</strong>
            </div>
          </section>

          <section className="panel">
            <div className="panelHeader">
              <h2>Recent Invoices</h2>
              <a href="/invoices">View All</a>
            </div>

            {recentInvoices.length === 0 ? (
              <p>No invoices found yet.</p>
            ) : (
              <div className="tableWrap">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Invoice</th>
                      <th>Status</th>
                      <th>Customer</th>
                      <th>Dealership</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentInvoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td>
                          {invoice.sent_at
                            ? new Date(invoice.sent_at).toLocaleDateString(
                                "en-CA"
                              )
                            : "-"}
                        </td>
                        <td>{invoice.invoice_number || "-"}</td>
                        <td>
                          <span
                            className={`status ${
                              invoice.status
                                ? invoice.status.toLowerCase()
                                : "sent"
                            }`}
                          >
                            {invoice.status || "Sent"}
                          </span>
                        </td>
                        <td>{invoice.customer_name || "-"}</td>
                        <td>{invoice.dealership || "-"}</td>
                        <td>{money(invoice.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}

      <style jsx>{styles}</style>
    </main>
  );
}

const styles = `
*{box-sizing:border-box}
.page{background:#050505;color:white;min-height:100vh;font-family:Arial,Helvetica,sans-serif;padding:30px}
.hero{max-width:1400px;margin:0 auto 25px;display:flex;align-items:center;gap:28px}
.logo{width:220px}
.eyebrow{color:#e4001b;font-weight:900;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px}
h1{font-size:46px;margin:0 0 10px;color:white;text-transform:uppercase}
.subtitle{color:#ccc;margin:0;font-size:17px}
.quickLinks{max-width:1400px;margin:0 auto 25px;display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.quickLinks a{background:#e4001b;color:white;text-decoration:none;text-align:center;padding:16px;border-radius:8px;font-weight:900;text-transform:uppercase}
.quickLinks a:hover{background:#b80016}
.stats{max-width:1400px;margin:0 auto 25px;display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.card{background:#0b0b0b;border:1px solid #333;border-radius:10px;padding:22px}
.card span{display:block;color:#aaa;margin-bottom:8px}
.card strong{display:block;font-size:30px;color:white}
.card small{display:block;color:#999;margin-top:8px}
.panel{max-width:1400px;margin:0 auto;background:#0b0b0b;border:1px solid #333;border-radius:10px;padding:24px}
.panelHeader{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.panelHeader h2{margin:0;color:#e4001b;text-transform:uppercase}
.panelHeader a{color:white;background:#222;border:1px solid #444;text-decoration:none;padding:10px 14px;border-radius:6px}
.tableWrap{overflow:auto}
table{width:100%;border-collapse:collapse;min-width:900px}
th{background:#111;color:#e4001b;text-align:left;padding:14px;border-bottom:1px solid #333;font-size:13px;text-transform:uppercase}
td{padding:14px;border-bottom:1px solid #222;color:#eee}
.status{display:inline-block;padding:6px 10px;border-radius:999px;background:#333;color:white;font-size:12px;font-weight:900}
.status.paid{background:#0f7b3f}
.status.sent{background:#1f4f9f}
.status.outstanding{background:#9f1f1f}
.status.draft{background:#666}
@media(max-width:900px){
  .hero{flex-direction:column;align-items:flex-start}
  .quickLinks,.stats{grid-template-columns:1fr}
  h1{font-size:36px}
}
`;
