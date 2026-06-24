export default function Home() {
  return (
    <main className="page">
      <header className="header">
        <img src="/logo-transparent.png" className="logo" />
        <nav>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#booking" className="navButton">Book an Appointment</a>
        </nav>
      </header>

      <section className="hero">
        <div className="heroText">
          <h1><span>Elevate</span> Your Wheels.<br /><span>Elevate</span> Your Drive.</h1>
          <p>Premium wheel repair, refinishing, powder coating, and custom wheel restoration crafted with precision.</p>
          <a href="#booking" className="button">Book an Appointment</a>
        </div>
      </section>

      <section className="features">
        <div><strong>Premium Quality</strong><p>Top-tier materials and industry-leading techniques.</p></div>
        <div><strong>Precision Crafted</strong><p>Every detail is crafted with unmatched precision.</p></div>
        <div><strong>Built To Last</strong><p>Durable finishes that stand the test of time.</p></div>
        <div><strong>Customer Focused</strong><p>Your satisfaction is our top priority.</p></div>
      </section>

      <section className="booking" id="booking">
        <h2>Book an Appointment</h2>
        <form>
          <input placeholder="Dealership" />
          <input type="datetime-local" />
          <select><option>How many wheels?</option><option>1</option><option>2</option><option>3</option><option>4</option></select>
          <select><option>Damaged wheel(s)</option><option>Front Left</option><option>Front Right</option><option>Rear Left</option><option>Rear Right</option></select>
          <input placeholder="Advisor Name" />
          <input placeholder="Advisor Email" />
          <input placeholder="RO#" />
          <input placeholder="Tag#" />
          <input placeholder="Vehicle Make / Model" />
          <input placeholder="VIN#" />
          <button>Submit Booking Request</button>
        </form>
      </section>

      <section className="about" id="about">
        <div>
          <p className="red">About Elevate Wheel Studio</p>
          <h2>Driven by Precision.<br />Defined by Quality.</h2>
          <p>We specialize in wheel repair, refinishing, powder coating, and custom finishes. Every wheel is treated with the highest level of care.</p>
        </div>
      </section>

      <footer>
        <img src="/logo-transparent.png" className="footerLogo" />
        <p>Contact: info@elevatewheelstudio.com</p>
        <p>© 2026 Elevate Wheel Studio. All rights reserved.</p>
      </footer>

      <style jsx>{`
        .page { margin:0; background:#050505; color:white; font-family:Arial, sans-serif; }
        .header { height:110px; display:flex; justify-content:space-between; align-items:center; padding:0 42px; background:#050505; border-bottom:1px solid #e4001b; }
        .logo { width:230px; height:auto; }
        nav { display:flex; align-items:center; gap:38px; }
        nav a { color:white; text-decoration:none; text-transform:uppercase; font-weight:700; }
        .navButton, .button { background:#e4001b; padding:18px 28px; border-radius:4px; color:white; text-decoration:none; text-transform:uppercase; font-weight:700; }

        .hero { min-height:520px; display:flex; align-items:center; padding:80px 42px; background:radial-gradient(circle at 75% 45%, rgba(228,0,27,.35), transparent 25%), linear-gradient(90deg,#050505,#111); }
        .heroText { max-width:720px; }
        h1 { font-size:72px; line-height:1.05; margin:0 0 28px; }
        h1 span { color:#e4001b; font-style:italic; }
        .hero p { font-size:22px; line-height:1.6; color:#ddd; margin-bottom:32px; }

        .features { display:grid; grid-template-columns:repeat(4,1fr); border-top:1px solid #252525; border-bottom:1px solid #252525; }
        .features div { padding:35px; border-right:1px solid #252525; }
        .features strong { color:#e4001b; text-transform:uppercase; }
        .features p { color:#ccc; }

        .booking { padding:60px 42px; border:1px solid #333; margin:40px 32px; border-radius:14px; background:#0a0a0a; }
        .booking h2 { font-size:36px; text-transform:uppercase; }
        form { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        input, select { background:#111; border:1px solid #333; color:white; padding:17px; border-radius:6px; font-size:16px; }
        button { grid-column:1/-1; background:#e4001b; color:white; border:0; padding:18px; font-weight:700; text-transform:uppercase; border-radius:5px; }

        .about { margin:40px 32px; padding:60px; background:linear-gradient(90deg,#080808,#181818); border:1px solid #333; }
        .about h2 { font-size:38px; margin:10px 0; }
        .about p { max-width:580px; color:#ddd; line-height:1.6; }
        .red { color:#e4001b !important; text-transform:uppercase; font-weight:700; }

        footer { padding:40px; background:#050505; border-top:1px solid #333; color:#bbb; }
        .footerLogo { width:220px; }

        @media(max-width:800px){
          .header{height:auto; padding:20px; flex-direction:column; gap:20px;}
          nav{gap:18px; flex-wrap:wrap; justify-content:center;}
          h1{font-size:44px;}
          .features, form{grid-template-columns:1fr;}
        }
      `}</style>
    </main>
  );
}
