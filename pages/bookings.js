import { useEffect, useMemo, useState } from "react";

export default function BookingsDashboard() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBookings() {
      try {
        const res = await fetch("/api/bookings");
        const result = await res.json();

        if (result.success) {
          setBookings(result.bookings || []);
        } else {
          alert(result.error || "Failed to load bookings.");
        }
      } catch (error) {
        alert(error.message || "Failed to load bookings.");
      }

      setLoading(false);
    }

    loadBookings();
  }, []);

  const updateStatus = async (id, status) => {
    const res = await fetch("/api/update-booking-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });

    const result = await res.json();

    if (!result.success) {
      alert(result.error || "Failed to update booking status.");
      return;
    }

    setBookings((current) =>
      current.map((booking) =>
        booking.id === id ? { ...booking, status } : booking
      )
    );
  };

  const filteredBookings = useMemo(() => {
    const q = search.toLowerCase();

    return bookings.filter((booking) =>
      [
        booking.status,
        booking.customer_name,
        booking.customer_email,
        booking.customer_phone,
        booking.dealership,
        booking.vehicle,
        booking.vin,
        booking.wheel_size,
        booking.service_type,
        booking.preferred_date,
        booking.preferred_time,
        booking.notes,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [bookings, search]);

  const stats = useMemo(() => {
    return {
      total: filteredBookings.length,
      newBookings: filteredBookings.filter((b) => b.status === "New").length,
      confirmed: filteredBookings.filter((b) => b.status === "Confirmed").length,
      scheduled: filteredBookings.filter((b) => b.status === "Scheduled").length,
      completed: filteredBookings.filter((b) => b.status === "Completed").length,
    };
  }, [filteredBookings]);

  return (
    <main className="page">
      <section className="header">
        <img src="/logo_transparent (3).png" className="logo" />
        <h1>Booking Dashboard</h1>
        <p>Search, review, and manage Elevate Wheel Studio booking requests.</p>
      </section>

      <section className="stats">
        <div>
          <span>Total Bookings</span>
          <strong>{stats.total}</strong>
        </div>
        <div>
          <span>New</span>
          <strong>{stats.newBookings}</strong>
        </div>
        <div>
          <span>Confirmed</span>
          <strong>{stats.confirmed}</strong>
        </div>
        <div>
          <span>Scheduled</span>
          <strong>{stats.scheduled}</strong>
        </div>
        <div>
          <span>Completed</span>
          <strong>{stats.completed}</strong>
        </div>
      </section>

      <section className="toolbar">
        <input
          placeholder="Search by customer, dealership, VIN, vehicle, service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <section className="tableWrap">
        {loading ? (
          <p className="loading">Loading bookings...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Created</th>
                <th>Status</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Dealership</th>
                <th>Vehicle</th>
                <th>VIN</th>
                <th>Wheel Size</th>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>Notes</th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    {booking.created_at
                      ? new Date(booking.created_at).toLocaleDateString("en-CA")
                      : "-"}
                  </td>
                  <td>
                    <select
                      value={booking.status || "New"}
                      onChange={(e) => updateStatus(booking.id, e.target.value)}
                    >
                      <option>New</option>
                      <option>Contacted</option>
                      <option>Confirmed</option>
                      <option>Scheduled</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                  <td>{booking.customer_name || "-"}</td>
                  <td>{booking.customer_email || "-"}</td>
                  <td>{booking.customer_phone || "-"}</td>
                  <td>{booking.dealership || "-"}</td>
                  <td>{booking.vehicle || "-"}</td>
                  <td>{booking.vin || "-"}</td>
                  <td>{booking.wheel_size || "-"}</td>
                  <td>{booking.service_type || "-"}</td>
                  <td>{booking.preferred_date || "-"}</td>
                  <td>{booking.preferred_time || "-"}</td>
                  <td>{booking.notes || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && filteredBookings.length === 0 && (
          <p className="loading">No bookings found.</p>
        )}
      </section>

      <style jsx>{styles}</style>
    </main>
  );
}

const styles = `
*{box-sizing:border-box}
.page{background:#050505;color:white;min-height:100vh;font-family:Arial,Helvetica,sans-serif;padding:30px}
.header{max-width:1500px;margin:0 auto 25px}
.logo{width:240px}
h1{font-size:44px;margin:20px 0 8px;color:#e4001b;text-transform:uppercase}
p{color:#ddd}
.stats{max-width:1500px;margin:0 auto 25px;display:grid;grid-template-columns:repeat(5,1fr);gap:16px}
.stats div{background:#0b0b0b;border:1px solid #333;padding:22px;border-radius:10px}
.stats span{display:block;color:#aaa;margin-bottom:8px}
.stats strong{font-size:28px;color:white}
.toolbar{max-width:1500px;margin:0 auto 20px}
input{width:100%;background:#111;border:1px solid #333;color:white;padding:16px;border-radius:8px;font-size:16px}
.tableWrap{max-width:1500px;margin:0 auto;background:#0b0b0b;border:1px solid #333;border-radius:10px;overflow:auto}
table{width:100%;border-collapse:collapse;min-width:1600px}
th{background:#111;color:#e4001b;text-align:left;padding:14px;border-bottom:1px solid #333;font-size:13px;text-transform:uppercase}
td{padding:14px;border-bottom:1px solid #222;color:#eee;font-size:14px;vertical-align:top}
tr:hover td{background:#111}
select{background:#111;color:white;border:1px solid #444;border-radius:6px;padding:8px;font-weight:bold}
.loading{padding:30px;color:#ccc}
@media(max-width:900px){
  .stats{grid-template-columns:1fr}
  h1{font-size:34px}
}
`;
