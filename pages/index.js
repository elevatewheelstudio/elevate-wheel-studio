export default function Home() {
  return (
    <main className="page">
      <header className="header">
        <div className="brand">
          <div className="brandMain">ELEVATE</div>
          <div className="brandSub">WHEEL STUDIO</div>
        </div>

        <nav>
          <a href="#services">Services</a>
          <a href="#booking">Book</a>
          <a href="#about">About</a>
          <a className="navBtn" href="#booking">Book an Appointment</a>
        </nav>
      </header>

      <section className="hero">
        <div className="heroText">
          <h1>
            <span>Elevate</span> Your Wheels.
            <br />
            <span>Elevate</span> Your Drive.
          </h1>
          <p>
            Premium wheel repair, refinishing, powder coating, and custom wheel
            restoration crafted with precision.
          </p>

          <div className="heroBtns">
            <a href="#booking">Book an Appointment</a>
            <a href="#services" className="outline">Our Services</a>
          </div>
        </div>

        <div className="wheelArt">
          <div className="rim"></div>
        </div>
      </section>

      <section className="features" id="services">
        <div>
          <span className="featureIcon">✪</span>
          <b>Premium Quality</b>
          <p>Top-tier materials and industry-leading techniques.</p>
        </div>
        <div>
          <span className="featureIcon">⌖</span>
          <b>Precision Crafted</b>
          <p>Every detail is crafted with unmatched precision.</p>
        </div>
        <div>
          <span className="featureIcon">盾</span>
          <b>Built To Last</b>
          <p>Durable finishes that stand the test of time.</p>
        </div>
        <div>
          <span className="featureIcon">♡</span>
          <b>Customer Focused</b>
          <p>Your satisfaction is our top priority.</p>
        </div>
      </section>

      <section className="booking" id="booking">
        <div className="formBox">
          <h2>Book an Appointment</h2>
          <p>Complete the form below and we’ll confirm your appointment.</p>

          <form>
            <input placeholder="Dealership" />
            <input type="datetime-local" />
            <select>
              <option>How many wheels?</option>
              <option>1 Wheel</option>
              <option>2 Wheels</option>
              <option>3 Wheels</option>
              <option>4 Wheels</option>
            </select>
            <select>
              <option>Damaged wheel(s)</option>
              <option>Front Left</option>
              <option>Front Right</option>
              <option>Rear Left</option>
              <option>Rear Right</option>
            </select>
            <input placeholder="Advisor Name" />
            <input placeholder="Advisor Email" />
            <input placeholder="RO#" />
            <input placeholder="Tag#" />
            <input placeholder="Vehicle Make / Model" />
            <input placeholder="VIN#" />
            <textarea placeholder="Additional notes / damage description"></textarea>
            <button type="submit">Submit Booking Request</button>
          </form>
        </div>

        <div className="workflow">
          <div><span>▦</span><h3>Book</h3><p>Schedule an appointment at a time that works for you.</p></div>
          <div><span>✉</span><h3>Confirmation</h3><p>You’ll receive a booking confirmation by email.</p></div>
          <div><span>⚒</span><h3>We Work</h3><p>We complete the repairs with precision and care.</p></div>
          <div><span>▤</span><h3>Invoice</h3><p>You’ll receive an invoice once the work is complete.</p></div>
        </div>
      </section>

      <section className="about" id="about">
        <div>
          <p className="red">About Elevate Wheel Studio</p>
          <h2>Driven by Precision.<br />Defined by Quality.</h2>
          <p>
            We specialize in wheel repair, refinishing, powder coating, and custom
            finishes. Every wheel is treated with the highest level of care to
            ensure a factory-quality finish every time.
          </p>
          <a href="#booking">Learn More About Us</a>
        </div>
      </section>

      <footer>
        <div className="brand footerBrand">
          <div className="brandMain">ELEVATE</div>
          <div className="brandSub">WHEEL STUDIO</div>
        </div>

        <div>
          <h4>Contact</h4>
          <p>info@elevatewheelstudio.com</p>
        </div>

        <div>
          <h4>Hours</h4>
          <p>Monday - Friday<br />9:00 AM - 6:00 PM<br />Saturday by appointment<br />Sunday closed</p>
        </div>

        <div>
          <h4>Follow Us</h4>
          <p className="socials">◎  f  ✉</p>
        </div>

        <p className="copy">© 2026 Elevate Wheel Studio. All rights reserved.</p>
      </footer>

      <style jsx>{`
        * { box-sizing: border-box; }
        .page { margin: 0; background: #050505; color: white; font-family: Arial, Helvetica, sans-serif; }

        .header {
          height: 115px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 42px;
          background: #030303;
          border-bottom: 1px solid #e4001b;
        }

        .brandMain {
          font-size: 34px;
          font-weight: 900;
          letter-spacing: 5px;
          color: white;
          font-style: italic;
        }

        .brandSub {
          color: #aaa;
          letter-spacing: 7px;
          font-size: 12px;
          margin-top: 5px;
        }

        nav { display: flex; gap: 36px; align-items: center; }
        nav a {
          color: white;
          text-decoration: none;
          text-transform: uppercase;
          font-weight: 800;
          font-size: 14px;
        }

        .navBtn, .heroBtns a, button {
          background: #e4001b;
          color: white;
          padding: 18px 28px;
          border-radius: 5px;
          text-transform: uppercase;
          font-weight: 800;
          text-decoration: none;
          border: 0;
        }

        .hero {
          min-height: 560px;
          padding: 80px 42px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          background:
            radial-gradient(circle at 75% 45%, rgba(228,0,27,.38), transparent 28%),
            linear-gradient(90deg,#050505 0%,#080808 45%,#111 100%);
          border-bottom: 1px solid #292929;
          overflow: hidden;
        }

        h1 {
          font-size: 64px;
          line-height: 1.05;
          margin: 0 0 26px;
        }

        h1 span { color: #e4001b; font-style: italic; }

        .hero p {
          font-size: 20px;
          line-height: 1.6;
          color: #eee;
          max-width: 650px;
        }

        .heroBtns { display: flex; gap: 20px; margin-top: 28px; }
        .outline { background: transparent !important; border: 1px solid white; }

        .wheelArt {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .rim {
          width: 440px;
          height: 440px;
          border-radius: 50%;
          background:
            radial-gradient(circle, #111 0 12%, #e4001b 13% 15%, #111 16% 23%, transparent 24%),
            repeating-conic-gradient(from 0deg, #111 0deg 12deg, #777 13deg 16deg, #050505 17deg 28deg);
          box-shadow: 0 0 60px rgba(228,0,27,.35), inset 0 0 60px #000;
          opacity: .9;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-bottom: 1px solid #292929;
          background: #080808;
        }

        .features div {
          padding: 35px;
          border-right: 1px solid #292929;
        }

        .featureIcon {
          display: block;
          color: #e4001b;
          font-size: 42px;
          margin-bottom: 16px;
        }

        .features b { text-transform: uppercase; }
        .features p { color: #ccc; line-height: 1.5; }

        .booking {
          margin: 35px;
          padding: 35px;
          border: 1px solid #333;
          border-radius: 10px;
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
          background: #090909;
        }

        h2 { font-size: 34px; text-transform: uppercase; margin-bottom: 10px; }
        .formBox > p { color: #ddd; }

        form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-top: 22px;
        }

        input, select, textarea {
          background: #111;
          border: 1px solid #333;
          color: white;
          padding: 16px;
          border-radius: 6px;
        }

        textarea, button { grid-column: 1 / -1; }
        textarea { min-height: 100px; }

        .workflow div {
          border: 1px solid #333;
          border-radius: 8px;
          padding: 24px;
          margin-bottom: 16px;
          background: #101010;
        }

        .workflow span {
          color: #e4001b;
          font-size: 40px;
        }

        .workflow h3 {
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .workflow p { color: #ddd; line-height: 1.5; }

        .about {
          margin: 35px;
          padding: 65px;
          min-height: 300px;
          background:
            radial-gradient(circle at 75% 50%, rgba(255,255,255,.12), transparent 24%),
            linear-gradient(90deg,#090909,#151515);
          border: 1px solid #333;
        }

        .about h2 { font-size: 36px; }
        .about p { max-width: 560px; color: #ddd; line-height: 1.6; }
        .about a {
          display: inline-block;
          margin-top: 18px;
          color: #e4001b;
          border: 1px solid #e4001b;
          padding: 13px 22px;
          text-decoration: none;
          text-transform: uppercase;
          font-weight: 800;
        }

        .red {
          color: #e4001b !important;
          text-transform: uppercase;
          font-weight: 800;
        }

        footer {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 30px;
          padding: 35px;
          border-top: 1px solid #333;
          background: #050505;
          color: #bbb;
        }

        footer h4 { color: white; text-transform: uppercase; }
        .footerBrand .brandMain { font-size: 28px; }
        .socials { font-size: 30px; letter-spacing: 18px; color: white; }
        .copy { grid-column: 1 / -1; color: #888; font-size: 13px; }

        @media(max-width: 850px) {
          .header { height: auto; flex-direction: column; gap: 20px; padding: 20px; }
          nav { flex-wrap: wrap; justify-content: center; gap: 18px; }
          .hero, .features, .booking, form, footer { grid-template-columns: 1fr; }
          h1 { font-size: 44px; }
          .rim { width: 280px; height: 280px; }
        }
      `}</style>
    </main>
  );
}
