export default function Home() {
  return (
    <main className="page">
      <header className="header">
        <img src="/ELEVATE LOGO.png" className="logo" />
        <nav>
          <a href="#booking">Book</a>
          <a href="#process">Process</a>
          <a href="#invoice">Invoice</a>
        </nav>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">Dealership Wheel Repair Portal</p>
          <h1><span>Elevate</span> Your Wheels.<br /><span>Elevate</span> Your Drive.</h1>
          <p className="sub">
            Premium wheel repair, refinishing, powder coating, and custom wheel restoration crafted with precision.
          </p>
          <a href="#booking" className="button">Book an Appointment</a>
        </div>
      </section>

      <section className="features" id="process">
        <div><strong>Book</strong><p>Submit dealership appointment details.</p></div>
        <div><strong>Confirmation</strong><p>Advisor receives booking confirmation.</p></div>
        <div><strong>Repair</strong><p>We complete the approved wheel repair.</p></div>
        <div><strong>Invoice</strong><p>Invoice issued once repairs are complete.</p></div>
      </section>

      <section className="booking" id="booking">
        <div className="formWrap">
          <p className="eyebrow">Appointment Request</p>
          <h2>Book a Wheel Repair Appointment</h2>

          <form>
            <input placeholder="Dealership" />
            <input placeholder="Advisor Name" />
            <input placeholder="Advisor Email Address" type="email" />
            <input placeholder="RO#" />
            <input placeholder="Tag#" />
            <input placeholder="Vehicle Make / Model" />
            <input placeholder="VIN#" />
            <select>
              <option>How many wheels?</option>
              <option>1 Wheel</option>
              <option>2 Wheels</option>
              <option>3 Wheels</option>
              <option>4 Wheels</option>
            </select>
            <input type="datetime-local" />

            <div className="damage">
              <label><input type="checkbox" /> Front Left</label>
              <label><input type="checkbox" /> Front Right</label>
              <label><input type="checkbox" /> Rear Left</label>
              <label><input type="checkbox" /> Rear Right</label>
            </div>

            <textarea placeholder="Additional notes / damage description"></textarea>
            <button type="submit">Submit Booking Request</button>
          </form>
        </div>

        <aside className="side">
          <h3>Portal Workflow</h3>
          <p>Appointment coordinators and service advisors can submit wheel repair requests quickly and accurately.</p>
          <p id="invoice">Invoices can be issued once repairs are completed.</p>
        </aside>
      </section>

      <footer>
        <img src="/ELEVATE LOGO.png" className="footerLogo" />
        <p>info@elevatewheelstudio.com</p>
        <p>© 2026 Elevate Wheel Studio. All rights reserved.</p>
      </footer>

      <style jsx>{`
        * { box-sizing: border-box; }
        .page {
          min-height: 100vh;
          background: #050505;
          color: white;
          font-family: Arial, Helvetica, sans-serif;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 22px 7%;
          background: #030303;
          border-bottom: 1px solid #c40016;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .logo { width: 210px; max-width: 45%; }
        nav { display: flex; gap: 28px; }
        nav a {
          color: white;
          text-decoration: none;
          text-transform: uppercase;
          font-size: 14px;
          letter-spacing: 1px;
        }
        .hero {
          min-height: 620px;
          padding: 120px 7%;
          display: flex;
          align-items: center;
          background:
            radial-gradient(circle at 75% 45%, rgba(196,0,22,.28), transparent 30%),
            linear-gradient(90deg, #050505 0%, #0d0d0d 45%, #171717 100%);
        }
        .eyebrow {
          color: #e4001b;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: bold;
          font-size: 13px;
        }
        h1 {
          font-size: clamp(46px, 7vw, 82px);
          line-height: .98;
          margin: 12px 0 24px;
          max-width: 900px;
        }
        h1 span { color: #e4001b; font-style: italic; }
        .sub {
          max-width: 620px;
          font-size: 20px;
          line-height: 1.7;
          color: #ddd;
        }
        .button, form button {
          display: inline-block;
          background: #e4001b;
          color: white;
          padding: 17px 28px;
          border-radius: 6px;
          border: none;
          text-decoration: none;
          font-weight: bold;
          text-transform: uppercase;
          margin-top: 22px;
          cursor: pointer;
        }
        .features {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: #262626;
          border-top: 1px solid #222;
          border-bottom: 1px solid #222;
        }
        .features div {
          background: #080808;
          padding: 35px;
        }
        .features strong {
          color: #e4001b;
          text-transform: uppercase;
        }
        .features p { color: #ccc; }
        .booking {
          padding: 70px 7%;
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
          background: linear-gradient(135deg, #060606, #101010);
        }
        .formWrap, .side {
          border: 1px solid #333;
          background: rgba(255,255,255,.035);
          border-radius: 16px;
          padding: 35px;
        }
        h2 {
          font-size: 36px;
          margin-top: 8px;
        }
        form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        input, select, textarea {
          width: 100%;
          background: #0d0d0d;
          border: 1px solid #333;
          color: white;
          padding: 16px;
          border-radius: 8px;
          font-size: 15px;
        }
        textarea, .damage, form button {
          grid-column: 1 / -1;
        }
        .damage {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .damage label {
          border: 1px solid #333;
          padding: 14px;
          border-radius: 8px;
          background: #0d0d0d;
        }
        textarea { min-height: 110px; }
        .side h3 {
          color: #e4001b;
          font-size: 28px;
        }
        .side p {
          color: #ddd;
          line-height: 1.7;
        }
        footer {
          padding: 40px 7%;
          border-top: 1px solid #222;
          background: #030303;
          color: #aaa;
        }
        .footerLogo {
          width: 220px;
          margin-bottom: 20px;
        }
        @media (max-width: 850px) {
          .features, .booking, form, .damage {
            grid-template-columns: 1fr;
          }
          nav { display: none; }
          .hero { padding-top: 80px; }
        }
      `}</style>
    </main>
  );
}
