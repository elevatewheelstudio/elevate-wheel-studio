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

          <form>
            <input placeholder="Dealership *" />
            <input type="datetime-local" />
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
        .page{margin:0;background:#050505;color:white;font-family:Arial,Helvetica,sans-serif}
.header{height:130px;display:flex;align-items:center;justify-content:space-between;padding:0 42px;background:#030303;border-bottom:1px solid #e4001b}
.logo{width:320px;max-height:none;object-fit:contain}
        nav{display:flex;gap:42px}
        nav a{color:white;text-decoration:none;text-transform:uppercase;font-weight:800;font-size:14px}

        .hero{
min-height:650px;
          padding:70px 42px;
          display:flex;
          align-items:center;
          background:
            linear-gradient(90deg,#050505 0%,rgba(5,5,5,.9) 42%,rgba(5,5,5,.25) 70%),
            url('/wheel-hero.jpg');
          background-size:cover;
background-position:110% center;
          border-bottom:1px solid #292929;
        }
        .heroText{max-width:700px}
        h1{font-size:62px;line-height:1.05;margin:0 0 22px;font-weight:900}
        h1 span{color:#e4001b;font-style:italic}
        .line{width:70px;height:3px;background:#e4001b;margin:0 0 18px}
        .hero p{font-size:19px;line-height:1.6;color:#eee;max-width:610px}

        .features{display:grid;grid-template-columns:repeat(4,1fr);background:#080808;border-bottom:1px solid #292929}
.features div{display:grid;grid-template-columns:70px 1fr;ga
.features img{width:64px}
        .features b{text-transform:uppercase}
        .features p{grid-column:2;color:#ccc;margin:0;line-height:1.5}

        .booking{margin:32px;padding:32px;border:1px solid #333;border-radius:10px;display:grid;grid-template-columns:2fr 1.1fr;gap:28px;background:#090909}
        h2{font-size:34px;text-transform:uppercase;margin:0 0 8px}
        .formBox>p{color:#ddd}
        form{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:20px}
        input,select{background:#111;border:1px solid #333;color:white;padding:16px;border-radius:6px}
        button{grid-column:1/-1;background:#e4001b;color:white;border:0;padding:18px;border-radius:5px;text-transform:uppercase;font-weight:800}

        .workflow div{display:grid;grid-template-columns:70px 1fr;gap:18px;border:1px solid #333;border-radius:8px;padding:24px;margin-bottom:16px;background:#101010;align-items:center}
        .workflow img{width:52px}
        .workflow h3{text-transform:uppercase;margin:0}
        .workflow p{grid-column:2;color:#ddd;line-height:1.5;margin:0}

        .about{
          margin:32px;
          padding:55px 35px;
          min-height:300px;
          background:
            linear-gradient(90deg,#070707 0%,rgba(7,7,7,.86) 45%,rgba(7,7,7,.25) 100%),
            url('/wheel-shop.jpg');
          background-size:cover;
          background-position:center right;
          border:1px solid #333;
        }
        .about h2{font-size:36px;margin:8px 0}
        .about p{max-width:560px;color:#ddd;line-height:1.6}
        .about a{display:inline-block;margin-top:14px;color:#e4001b;border:1px solid #e4001b;padding:13px 22px;text-decoration:none;text-transform:uppercase;font-weight:800}
        .red{color:#e4001b!important;text-transform:uppercase;font-weight:800}

        footer{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:30px;padding:35px;border-top:1px solid #333;background:#050505;color:#bbb}
.footerLogo{width:160px}
        footer h4{color:white;text-transform:uppercase}
        .socials{font-size:30px;letter-spacing:16px;color:white}
        .copy{grid-column:1/-1;color:#888;font-size:13px}

        @media(max-width:850px){
          .header{height:auto;flex-direction:column;gap:20px;padding:20px}
          nav{flex-wrap:wrap;justify-content:center}
          .features,.booking,form,footer{grid-template-columns:1fr}
          .features div,.workflow div{grid-template-columns:1fr}
          .features p,.workflow p{grid-column:1}
          h1{font-size:44px}
        }
      `}</style>
    </main>
  );
}
