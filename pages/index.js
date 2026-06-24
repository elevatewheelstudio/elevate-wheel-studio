export default function Home() {
  return (
    <main className="page">
      <header className="header">
        <img src="/logo_transparent (3).png" className="logo" />
        <nav>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#reviews">Reviews</a>
        </nav>
      </header>

      <section className="hero">
        <div className="heroText">
          <h1><span>Elevate</span> Your Wheels.<br /><span>Elevate</span> Your Drive.</h1>
          <div className="line"></div>
          <p>Premium wheel repair, refinishing, powder coating, and custom wheel restoration crafted with precision.</p>
        </div>
      </section>

      <section className="features" id="services">
        <div><img src="/icon-quality.svg" /><b>Premium Quality</b><p>Top-tier materials and industry-leading techniques.</p></div>
        <div><img src="/icon-target.svg" /><b>Precision Crafted</b><p>Every detail is crafted with unmatched precision.</p></div>
        <div><img src="/icon-shield.svg" /><b>Built To Last</b><p>Durable finishes that stand the test of time.</p></div>
        <div><img src="/icon-user.svg" /><b>Customer Focused</b><p>Your satisfaction is our top priority.</p></div>
      </section>

      <section className="booking" id="booking">
        <div className="formBox">
          <h2>Book an Appointment</h2>
          <p>Complete the form below and we’ll confirm your appointment.</p>

<form action="https://formspree.io/f/xdarajqa" method="POST">
<input name="dealership" placeholder="Dealership *" required />
<input name="appointment_date" type="date" required />
<select name="appointment_time" required>
  <option>Appointment Time *</option>
  <option>9:00 AM</option>
  <option>9:30 AM</option>
  <option>10:00 AM</option>
  <option>10:30 AM</option>
  <option>11:00 AM</option>
  <option>11:30 AM</option>
  <option>12:00 PM</option>
  <option>12:30 PM</option>
  <option>1:00 PM</option>
  <option>1:30 PM</option>
  <option>2:00 PM</option>
  <option>2:30 PM</option>
  <option>3:00 PM</option>
  <option>3:30 PM</option>
  <option>4:00 PM</option>
  <option>4:30 PM</option>
  <option>5:00 PM</option>
  <option>5:30 PM</option>
</select>
            <select><option>Wheel Quantity *</option><option>1</option><option>2</option><option>3</option><option>4</option></select>
            <select><option>Affected Wheel Position(s) *</option><option>Front Left</option><option>Front Right</option><option>Rear Left</option><option>Rear Right</option><option>Multiple Wheels</option></select>
            <input placeholder="Advisor Name *" />
            <input placeholder="Advisor Email *" />
            <input placeholder="Repair Order (RO#) *" />
            <input placeholder="Vehicle Tag# *" />
            <input placeholder="Vehicle Make / Model *" />
            <input placeholder="VIN#" />
            <button type="submit">Submit Booking Request</button>
          </form>
        </div>

        <div className="workflow">
          <div><img src="/icon-calendar.svg" /><h3>Book</h3><p>Schedule an appointment at a time that works for you.</p></div>
          <div><img src="/icon-envelope.svg" /><h3>Confirmation</h3><p>You’ll receive a booking confirmation by email.</p></div>
          <div><img src="/icon-tools.svg" /><h3>We Work</h3><p>We complete the repairs with precision and care.</p></div>
          <div><img src="/icon-invoice.svg" /><h3>Invoice</h3><p>You’ll receive an invoice once the work is complete.</p></div>
        </div>
      </section>

      <section className="about" id="about">
        <div>
          <p className="red">About Elevate Wheel Studio</p>
          <h2>Driven by Precision.<br />Defined by Quality.</h2>
          <p>We specialize in wheel repair, refinishing, powder coating, and custom finishes. Every wheel is treated with the highest level of care to ensure a factory-quality finish every time.</p>
          <a href="#booking">Learn More About Us</a>
        </div>
      </section>

      <footer>
        <img src="/logo_transparent (3).png" className="footerLogo" />
        <div><h4>Contact</h4><p>info@elevatewheelstudio.com</p></div>
        <div><h4>Hours</h4><p>Monday - Friday<br />9:00 AM - 6:00 PM<br />Saturday<br />By Appointment<br />Sunday<br />Closed</p></div>
        <div><h4>Follow Us</h4><p className="socials">◎ f ✉</p></div>
        <p className="copy">© 2026 Elevate Wheel Studio. All rights reserved.</p>
      </footer>

      <style jsx>{`
        *{box-sizing:border-box}
        html,body{margin:0;padding:0}
        .page{margin:0;background:#050505;color:white;font-family:Arial,Helvetica,sans-serif;overflow-x:hidden}

        .header{
          height:118px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:0 60px;
          background:#030303;
          border-bottom:1px solid #e4001b;
        }

        .logo{
          width:260px;
          max-height:92px;
          object-fit:contain;
          display:block;
        }

        nav{display:flex;gap:52px;align-items:center}
        nav a{
          color:white;
          text-decoration:none;
          text-transform:uppercase;
          font-weight:900;
          font-size:17px;
          letter-spacing:.4px;
        }

        .hero{
          min-height:570px;
          padding:80px 60px;
          display:flex;
          align-items:center;
          background:
            linear-gradient(90deg,#050505 0%,rgba(5,5,5,.94) 34%,rgba(5,5,5,.55) 58%,rgba(5,5,5,.1) 100%),
            url('/wheel-hero.jpg');
          background-size:cover;
          background-position:center right;
          border-bottom:1px solid #292929;
        }

        .heroText{max-width:760px}
        h1{
          font-size:72px;
          line-height:1.04;
          margin:0 0 24px;
          font-weight:900;
          letter-spacing:-2px;
        }
        h1 span{color:#e4001b;font-style:italic}
        .line{width:82px;height:3px;background:#e4001b;margin:0 0 24px}
        .hero p{
          font-size:22px;
          line-height:1.55;
          color:#f1f1f1;
          max-width:690px;
          margin:0;
        }

        .features{
          display:grid;
          grid-template-columns:repeat(4,1fr);
          background:#080808;
          border-bottom:1px solid #292929;
        }

        .features div{
          display:grid;
          grid-template-columns:76px 1fr;
          gap:20px;
          padding:36px 42px;
          border-right:1px solid #292929;
          align-items:center;
          min-height:132px;
        }

        .features img{width:60px}
        .features b{
          text-transform:uppercase;
          font-size:17px;
          font-weight:900;
        }
        .features p{
          grid-column:2;
          color:#ccc;
          margin:0;
          line-height:1.5;
          font-size:15px;
        }

        .booking{
          margin:38px;
          padding:38px;
          border:1px solid #333;
          border-radius:10px;
          display:grid;
          grid-template-columns:2fr 1.05fr;
          gap:34px;
          background:#090909;
        }

        h2{
          font-size:38px;
          text-transform:uppercase;
          margin:0 0 8px;
          letter-spacing:-.5px;
        }
        .formBox>p{color:#ddd;font-size:17px}

        form{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:15px;
          margin-top:22px;
        }

input,select{
  background:#111;
  border:1px solid #333;
  color:white;
  padding:18px 16px;
  border-radius:6px;
  font-size:16px;
  min-height:58px;
  width:100%;
  cursor:pointer;
}

input[type="date"]{
  appearance:auto;
  -webkit-appearance:auto;
  color-scheme:dark;
}

        button{
          grid-column:1/-1;
          background:#e4001b;
          color:white;
          border:0;
          padding:20px;
          border-radius:5px;
          text-transform:uppercase;
          font-weight:900;
          font-size:16px;
          cursor:pointer;
        }

        .workflow div{
          display:grid;
          grid-template-columns:82px 1fr;
          gap:20px;
          border:1px solid #333;
          border-radius:8px;
          padding:26px;
          margin-bottom:16px;
          background:#101010;
          align-items:center;
          min-height:124px;
        }

        .workflow img{width:64px}
        .workflow h3{
          text-transform:uppercase;
          margin:0;
          font-size:20px;
        }
        .workflow p{
          grid-column:2;
          color:#ddd;
          line-height:1.5;
          margin:0;
          font-size:16px;
        }

        .about{
          margin:38px;
          padding:65px 42px;
          min-height:330px;
          background:
            linear-gradient(90deg,#070707 0%,rgba(7,7,7,.86) 42%,rgba(7,7,7,.25) 100%),
            url('/wheel-shop.jpg');
          background-size:cover;
          background-position:center right;
          border:1px solid #333;
        }

        .about h2{
          font-size:42px;
          line-height:1.1;
          margin:8px 0 16px;
        }
        .about p{
          max-width:600px;
          color:#ddd;
          line-height:1.6;
          font-size:17px;
        }
        .about a{
          display:inline-block;
          margin-top:16px;
          color:#e4001b;
          border:1px solid #e4001b;
          padding:14px 24px;
          text-decoration:none;
          text-transform:uppercase;
          font-weight:900;
        }
        .red{color:#e4001b!important;text-transform:uppercase;font-weight:900}

        footer{
          display:grid;
          grid-template-columns:1.5fr 1fr 1fr 1fr;
          gap:34px;
          padding:38px 60px;
          border-top:1px solid #333;
          background:#050505;
          color:#bbb;
        }

        .footerLogo{width:230px;object-fit:contain}
        footer h4{color:white;text-transform:uppercase;margin-top:0}
        .socials{font-size:30px;letter-spacing:16px;color:white}
        .copy{grid-column:1/-1;color:#888;font-size:13px}

        @media(max-width:850px){
          .header{height:auto;flex-direction:column;gap:20px;padding:22px}
          nav{flex-wrap:wrap;justify-content:center;gap:22px}
          .hero{min-height:520px;padding:60px 24px;background-position:center right}
          h1{font-size:46px}
          .hero p{font-size:18px}
          .features,.booking,form,footer{grid-template-columns:1fr}
          .features div,.workflow div{grid-template-columns:1fr}
          .features p,.workflow p{grid-column:1}
          .booking,.about{margin:22px;padding:24px}
        }
      `}</style>
    </main>
  );
}
