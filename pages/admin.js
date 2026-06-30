import { useEffect } from "react";

export default function AdminPortal() {
  useEffect(() => {
    const loggedIn = localStorage.getItem("ews_admin_logged_in");

    if (loggedIn !== "true") {
      window.location.href = "/admin-login";
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("ews_admin_logged_in");
    window.location.href = "/";
  };

  return (
    <main className="page">
      <div className="container">
        <img src="/logo_transparent (3).png" className="logo" alt="Elevate Wheel Studio" />

        <h1>Admin Portal</h1>
        <p>Choose what you want to manage.</p>

        <div className="grid">
          <a href="/bookings" className="card">📅 Booking Dashboard</a>
          <a href="/invoices" className="card">📄 Invoice Dashboard</a>
          <a href="/invoice" className="card">🧾 Invoice Generator</a>
          <a href="/" className="card">🌐 Website Home</a>
        </div>

        <button onClick={logout} className="logout">Logout</button>
      </div>

      <style jsx>{`
        .page{min-height:100vh;background:#050505;color:white;font-family:Arial,Helvetica,sans-serif;padding:40px}
        .container{max-width:1100px;margin:auto;text-align:center}
        .logo{width:260px;margin-bottom:20px}
        h1{color:#e4001b;text-transform:uppercase;font-size:48px;margin:10px 0}
        p{color:#ccc;margin-bottom:35px}
        .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;margin-bottom:35px}
        .card{background:#111;border:1px solid #333;border-radius:12px;padding:35px;color:white;text-decoration:none;font-size:21px;font-weight:900}
        .card:hover{border-color:#e4001b}
        .logout{background:#e4001b;color:white;border:0;padding:15px 30px;border-radius:8px;font-weight:900;cursor:pointer}
      `}</style>
    </main>
  );
}
