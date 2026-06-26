import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    dealership: "",
    appointmentDate: "",
    appointmentTime: "",
    wheelQuantity: "",
    wheelPosition: "",
    advisorName: "",
    advisorEmail: "",
    requestedBy: "Advisor",
    dealershipDepartment: "Service",
    repairOrder: "",
    vehicleTag: "",
    vehicle: "",
    vin: "",
    customerName: "",
    customerEmail: "",
    notes: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const result = await res.json();

      if (result.success) {
        setBookingRef(result.bookingRef);
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        alert(result.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      alert(error.message || "Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  if (submitted) {
    return (
      <main className="page successPage">
        <section className="successCard">
          <img src="/logo_transparent (3).png" className="successLogo" />
          <div className="checkmark">✓</div>
          <h1>Appointment <span>Booked!</span></h1>
          <p>
  Thank you for choosing Elevate Wheel Studio. We have received your
  appointment request. A confirmation email has been sent to the advisor
  or representative listed on the booking.
</p>
          <div className="bookingRef">
            <small>BOOKING REFERENCE</small>
            <strong>{bookingRef}</strong>
          </div>

          <div className="summary">
            <p><b>Date:</b> {form.appointmentDate}</p>
            <p><b>Time:</b> {form.appointmentTime}</p>
            <p><b>Dealership:</b> {form.dealership}</p>
            <p><b>Requested By:</b> {form.requestedBy}</p>
            <p><b>Department:</b> {form.dealershipDepartment}</p>
            <p><b>Vehicle:</b> {form.vehicle}</p>
          </div>

          <button onClick={() => window.location.href = "/"}>
            Return to Home
          </button>
        </section>

        <style jsx>{styles}</style>
      </main>
    );
  }

  return (
    <main className="page">
      <header className="header">
        <img src="/logo_transparent (3).png" className="logo" />
        <nav>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#booking">Book</a>
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

          <form onSubmit={submitBooking}>
            <input name="dealership" placeholder="Dealership *" value={form.dealership} onChange={update} required />

            <input name="appointmentDate" type="date" value={form.appointmentDate} onChange={update} required />

            <select name="appointmentTime" value={form.appointmentTime} onChange={update} required>
              <option value="">Appointment Time *</option>
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

            <select name="wheelQuantity" value={form.wheelQuantity} onChange={update} required>
              <option value="">Wheel Quantity *</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>

            <select name="wheelPosition" value={form.wheelPosition} onChange={update} required>
              <option value="">Affected Wheel Position(s) *</option>
              <option>Front Left</option>
              <option>Front Right</option>
              <option>Rear Left</option>
              <option>Rear Right</option>
              <option>Multiple Wheels</option>
              <option>All Wheels</option>
            </select>

            <input name="advisorName" placeholder="Advisor / BDC Name *" value={form.advisorName} onChange={update} required />
            <input name="advisorEmail" type="email" placeholder="Advisor / BDC Email *" value={form.advisorEmail} onChange={update} required />

            <select name="requestedBy" value={form.requestedBy} onChange={update} required>
              <option value="Advisor">Appointment Requested By: Advisor</option>
              <option value="BDC">Appointment Requested By: BDC</option>
              <option value="Service Manager">Appointment Requested By: Service Manager</option>
              <option value="Customer">Appointment Requested By: Customer</option>
            </select>

            <select name="dealershipDepartment" value={form.dealershipDepartment} onChange={update} required>
              <option value="Service">Dealership Department: Service</option>
              <option value="BDC">Dealership Department: BDC</option>
              <option value="Sales">Dealership Department: Sales</option>
              <option value="Management">Dealership Department: Management</option>
            </select>

            <input name="repairOrder" placeholder="Repair Order (RO#) *" value={form.repairOrder} onChange={update} required />
            <input name="vehicleTag" placeholder="Vehicle Tag# *" value={form.vehicleTag} onChange={update} required />
            <input name="vehicle" placeholder="Vehicle Make / Model *" value={form.vehicle} onChange={update} required />
            <input name="vin" placeholder="VIN#" value={form.vin} onChange={update} />
            <input name="customerName" placeholder="Customer Name *" value={form.customerName} onChange={update} required />
            <input name="customerEmail" type="email" placeholder="Customer Email (Optional)" value={form.customerEmail} onChange={update} />

            <textarea name="notes" placeholder="Notes / Special Instructions" value={form.notes} onChange={update}></textarea>

            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Booking Request"}
            </button>
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
          <p>We specialize in wheel repair, refinishing, powder coating, and custom finishes. Every wheel is treated with the highest level of care to ensure a factory-quality finish—every time.</p>
        </div>
      </section>

      <footer>
        <img src="/logo_transparent (3).png" className="footerLogo" />
        <div><h4>Contact</h4><p>info@elevatewheelstudio.com</p></div>
        <div><h4>Hours</h4><p>Monday - Friday<br />9:00 AM - 6:00 PM<br />Saturday By Appointment<br />Sunday Closed</p></div>
        <p className="copy">© 2026 Elevate Wheel Studio. All rights reserved.</p>
      </footer>

      <style jsx>{styles}</style>
    </main>
  );
}

const styles = `
*{box-sizing:border-box}
html,body{margin:0;padding:0}
.page{margin:0;background:#050505;color:white;font-family:Arial,Helvetica,sans-serif;overflow-x:hidden}

.header{height:118px;display:flex;align-items:center;justify-content:space-between;padding:0 60px;background:#030303;border-bottom:1px solid #e4001b}
.logo{width:260px;max-height:92px;object-fit:contain}
nav{display:flex;gap:52px}
nav a{color:white;text-decoration:none;text-transform:uppercase;font-weight:900;font-size:17px}

.hero{min-height:570px;padding:80px 60px;display:flex;align-items:center;background:linear-gradient(90deg,#050505 0%,rgba(5,5,5,.94) 34%,rgba(5,5,5,.55) 58%,rgba(5,5,5,.1) 100%),url('/wheel-hero.jpg');background-size:cover;background-position:center right;border-bottom:1px solid #292929}
.heroText{max-width:760px}
h1{font-size:72px;line-height:1.04;margin:0 0 24px;font-weight:900;letter-spacing:-2px}
h1 span{color:#e4001b;font-style:italic}
.line{width:82px;height:3px;background:#e4001b;margin:0 0 24px}
.hero p{font-size:22px;line-height:1.55;color:#f1f1f1;max-width:690px;margin:0}

.features{display:grid;grid-template-columns:repeat(4,1fr);background:#080808;border-bottom:1px solid #292929}
.features div{display:grid;grid-template-columns:76px 1fr;gap:20px;padding:36px 42px;border-right:1px solid #292929;align-items:center;min-height:132px}
.features img{width:60px}
.features b{text-transform:uppercase;font-size:17px;font-weight:900}
.features p{grid-column:2;color:#ccc;margin:0;line-height:1.5;font-size:15px}

.booking{margin:38px;padding:38px;border:1px solid #333;border-radius:10px;display:grid;grid-template-columns:2fr 1.05fr;gap:34px;background:#090909}
h2{font-size:38px;text-transform:uppercase;margin:0 0 8px;letter-spacing:-.5px}
.formBox>p{color:#ddd}
form{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-top:22px}
input,select,textarea{background:#111;border:1px solid #333;color:white;padding:18px 16px;border-radius:6px;font-size:16px;min-height:58px;width:100%}
textarea{grid-column:1/-1;min-height:100px}
input[type="date"]{appearance:auto;-webkit-appearance:auto;color-scheme:dark}
button{grid-column:1/-1;background:#e4001b;color:white;border:0;padding:20px;border-radius:5px;text-transform:uppercase;font-weight:900;font-size:16px;cursor:pointer}
button:disabled{opacity:.75;cursor:not-allowed}

.workflow div{display:grid;grid-template-columns:82px 1fr;gap:20px;border:1px solid #333;border-radius:8px;padding:26px;margin-bottom:16px;background:#101010;align-items:center}
.workflow img{width:60px}
.workflow h3{text-transform:uppercase;margin:0}
.workflow p{grid-column:2;color:#ddd;line-height:1.5;margin:0}

.about{margin:38px;padding:55px 35px;min-height:300px;background:linear-gradient(90deg,#070707 0%,rgba(7,7,7,.86) 45%,rgba(7,7,7,.25) 100%),url('/wheel-shop.jpg');background-size:cover;background-position:center right;border:1px solid #333}
.about h2{font-size:42px}
.about p{max-width:560px;color:#ddd;line-height:1.6}
.red{color:#e4001b!important;text-transform:uppercase;font-weight:900}

footer{display:grid;grid-template-columns:1.5fr 1fr 1fr;gap:30px;padding:35px;border-top:1px solid #333;background:#050505;color:#bbb}
.footerLogo{width:240px}
footer h4{color:white;text-transform:uppercase}
.copy{grid-column:1/-1;color:#888;font-size:13px}

.successPage{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(rgba(0,0,0,.82),rgba(0,0,0,.92)),url('/wheel-hero.jpg');background-size:cover}
.successCard{max-width:620px;width:92%;text-align:center;background:#0b0b0b;border:1px solid #333;border-radius:14px;padding:45px}
.successLogo{width:280px;margin-bottom:25px}
.checkmark{width:86px;height:86px;border:3px solid #e4001b;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 25px;font-size:48px}
.successCard h1{font-size:46px}
.successCard h1 span{color:#e4001b}
.bookingRef{border:1px solid #333;padding:24px;margin:28px 0;background:#050505}
.bookingRef small{display:block;color:#aaa;letter-spacing:2px}
.bookingRef strong{display:block;color:#e4001b;font-size:34px;margin-top:8px}
.summary{text-align:left;background:#111;padding:22px;border-radius:8px;margin-bottom:25px}

@media(max-width:850px){
.header{height:auto;flex-direction:column;gap:20px;padding:20px}
nav{flex-wrap:wrap;justify-content:center}
h1{font-size:44px}
.features,.booking,form,footer{grid-template-columns:1fr}
.features div,.workflow div{grid-template-columns:1fr;text-align:center}
.features p,.workflow p{grid-column:1}
.booking,.about{margin:18px;padding:24px}
}
`;
