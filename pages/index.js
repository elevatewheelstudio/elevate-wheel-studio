export default function Home() {
  return (
    <main className="page">
      <header className="header">
        <div className="logoText">ELEVATE<br /><span>WHEEL STUDIO</span></div>
        <nav>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#reviews">Reviews</a>
          <a href="#booking" className="navBtn">Book an Appointment</a>
        </nav>
      </header>

      <section className="hero">
        <div className="heroText">
          <h1><span>Elevate</span> Your Wheels.<br /><span>Elevate</span> Your Drive.</h1>
          <p>Premium wheel repair, refinishing, powder coating, and custom wheel restoration crafted with precision.</p>
          <div className="heroBtns">
            <a href="#booking">Book an Appointment</a>
            <a href="#services" className="outline">Our Services</a>
          </div>
        </div>
      </section>

      <section className="features" id="services">
        <div><b>Premium Quality</b><p>Top-tier materials and industry-leading techniques.</p></div>
        <div><b>Precision Crafted</b><p>Every detail is crafted with unmatched precision.</p></div>
        <div><b>Built To Last</b><p>Durable finishes that stand the test of time.</p></div>
        <div><b>Customer Focused</b><p>Your satisfaction is our top priority.</p></div>
      </section>

      <section className="booking" id="booking">
        <div className="formBox">
          <h2>Book an Appointment</h2>
          <p>Complete the form below and we'll confirm your appointment.</p>

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
        </div>

        <div className="workflow">
          <div><h3>Book</h3><p>Schedule an appointment at a time that works for you.</p></div>
          <div><h3>Confirmation</h3><p>You’ll receive a booking confirmation by email.</p></div>
          <div><h3>We Work</h3><p>We complete the repairs with precision and care.</p></div>
          <div><h3>Invoice</h3><p>You’ll receive an invoice once the work is complete.</p></div>
        </div>
      </section>

      <section className="about" id="about">
        <div>
          <p className="red">About Elevate Wheel Studio</p>
          <h2>Driven by Precision.<br />Defined by Quality.</h2>
          <p>We specialize in wheel repair, refinishing, powder coating, and custom finishes. Every wheel is treated with the highest level of care to ensure a factory-quality finish every time.</p>
        </div>
      </section>

      <footer>
        <div className="logoText footerLogo">ELEVATE<br /><span>WHEEL STUDIO</span></div>
        <div>
          <h4>Contact</h4>
          <p>info@elevatewheelstudio.com</p>
        </div>
        <div>
          <h4>Hours</h4>
          <p>Monday - Friday<br />9:00 AM - 6:00 PM<br />Saturday by appointment<br />Sunday closed</p>
        </div>
      </footer>

      <style jsx>{`
        * { box-sizing: border-box; }
        .page { margin: 0; background: #050505; color: white; font-family: Arial, Helvetica, sans-serif; }
        .header { height: 115px; display: flex; align-items: center; justify-content: space-between; padding: 0 42px; background: #030303; border-bottom: 1px solid #e4001b; }
        .logoText { font-size: 28px; font-weight: 900; letter-spacing: 4px; line-height: .9; color: white; }
        .logoText span { font-size: 13px; color: #aaa; letter-spacing: 6px; }
        nav { display: flex; gap: 38px; align-items: center; }
        nav a { color: white; text-decoration: none; text-transform: uppercase; font-weight: 800; font-size: 14px; }
        .navBtn, .heroBtns a, button { background: #e4001b; color: white; padding: 18px 28px; border-radius: 5px; text-transform: uppercase; font-weight: 800; text-decoration: none; border: 0; }

        .hero { min-height: 520px; padding: 80px 42px; display: flex; align-items: center; background: radial-gradient(circle at 77% 45%, rgba(228,0,27,.38), transparent 28%), linear-gradient(90deg,#050505 0%,#080808 45%,#111 100%); }
        .heroText { max-width: 760px; }
        h1 { font-size: 64px; line-height: 1.05; margin: 0 0 26px; }
        h1 span { color: #e4001b; font-style: italic; }
        .hero p { font-size: 20px; line-height: 1.6; color: #eee; max-width: 650px; }
        .heroBtns { display: flex; gap: 20px; margin-top: 28px; }
        .outline { background: transparent !important; border: 1px solid white; }

        .features { display: grid; grid-template-columns: repeat(4,1fr); border-top: 1px solid #292929; border-bottom: 1px solid #292929; background: #080808; }
        .features div { padding: 35px; border-right: 1px solid #292929; }
        .features b { color: white; text-transform: uppercase; }
        .features p { color: #ccc; }

        .booking { margin: 35px; padding: 35px; border: 1px solid #333; border-radius: 10px; display: grid; grid-template-columns: 2fr 1fr; gap: 30px; background: #090909; }
        h2 { font-size: 34px; text-transform: uppercase; }
        form { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        input, select { background: #111; border: 1px solid #333; color: white; padding: 16px; border-radius: 6px; }
        button { grid-column: 1 / -1; cursor: pointer; }
        .workflow div { border: 1px solid #333; border-radius: 8px; padding: 24px; margin-bottom: 16px; background: #101010; }

        .about { margin: 35px; padding: 60px; background: linear-gradient(90deg,#090909,#151515); border: 1px solid #333; }
        .about h2 { font-size: 36px; }
        .about p { max-width: 520px; color: #ddd; line-height: 1.6; }
        .red { color: #e4001b !important; text-transform: uppercase; font-weight: 800; }

        footer { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 30px; padding: 35px; border-top: 1px solid #333; background: #050505; color: #bbb; }

        @media(max-width:850px){
          .header { height: auto; flex-direction: column; gap: 20px; padding: 20px; }
          nav { flex-wrap: wrap; justify-content: center; }
          h1 { font-size: 44px; }
          .features, .booking, form, footer { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
