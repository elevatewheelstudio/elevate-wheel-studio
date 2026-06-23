export default function Home() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logo}>ELEVATE WHEEL STUDIO</div>
        <nav style={styles.nav}>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section style={styles.hero}>
        <h1>Elevate Wheel Studio</h1>
        <p>Premium wheel repair, refinishing, powder coating, and custom finishes.</p>
        <a href="#contact" style={styles.button}>Book an Appointment</a>
      </section>

      <section id="services" style={styles.section}>
        <h2>Our Services</h2>
        <div style={styles.cards}>
          <div style={styles.card}>
            <h3>Wheel Repair</h3>
            <p>Curb rash, scratches, bends, and cosmetic wheel damage.</p>
          </div>
          <div style={styles.card}>
            <h3>Wheel Refinishing</h3>
            <p>Factory-style restoration and premium custom finishes.</p>
          </div>
          <div style={styles.card}>
            <h3>Powder Coating</h3>
            <p>Durable, clean, and professional colour finishes.</p>
          </div>
        </div>
      </section>

      <section id="about" style={styles.about}>
        <h2>Built for Detail. Finished with Precision.</h2>
        <p>
          Elevate Wheel Studio is dedicated to high-quality wheel restoration and customization.
          Whether you want to repair damage or completely transform your wheels, we bring your
          vision to life with care and precision.
        </p>
        <p style={styles.est}>EST. 2026</p>
      </section>

      <section id="contact" style={styles.contact}>
        <h2>Contact Us</h2>
        <p>Ready to elevate your wheels?</p>
        <p>Email: info@elevatewheelstudio.com</p>
        <p>Website: www.elevatewheelstudio.com</p>
        <a href="mailto:info@elevatewheelstudio.com" style={styles.button}>Email Us</a>
      </section>

      <footer style={styles.footer}>
        © 2026 Elevate Wheel Studio. All rights reserved.
      </footer>
    </div>
  );
}
<<<<<<< HEAD
=======

const styles = {
  page: {
    margin: 0,
    background: "#050505",
    color: "#ffffff",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px 8%",
    background: "#000000",
    borderBottom: "1px solid #222",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#d4af37",
    letterSpacing: "1px",
  },
  nav: {
    display: "flex",
    gap: "24px",
  },
  hero: {
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0 8%",
    background: "linear-gradient(135deg, #000000, #1a1a1a)",
  },
  section: {
    padding: "80px 8%",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "24px",
    marginTop: "30px",
  },
  card: {
    background: "#111111",
    padding: "30px",
    borderRadius: "14px",
    border: "1px solid #333",
  },
  about: {
    padding: "80px 8%",
    background: "#0d0d0d",
  },
  contact: {
    padding: "80px 8%",
    background: "#111111",
  },
  button: {
    display: "inline-block",
    marginTop: "20px",
    padding: "14px 24px",
    background: "#d4af37",
    color: "#000000",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "bold",
  },
  est: {
    color: "#d4af37",
    fontWeight: "bold",
    marginTop: "20px",
  },
  footer: {
    textAlign: "center",
    padding: "24px",
    background: "#000000",
    color: "#888",
  },
};
const styles = {
  page: {
    minHeight: "100vh",
    background: "#111",
    color: "white",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    padding: "25px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontWeight: "bold",
    letterSpacing: "2px",
  },
  nav: {
    display: "flex",
    gap: "20px",
  },
  hero: {
    padding: "80px 40px",
    textAlign: "center",
  },
  button: {
    display: "inline-block",
    marginTop: "20px",
    padding: "14px 24px",
    background: "#d4af37",
    color: "#111",
    textDecoration: "none",
    fontWeight: "bold",
    borderRadius: "6px",
  },
  section: {
    padding: "50px 40px",
    textAlign: "center",
  },
  cards: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  card: {
    border: "1px solid #444",
    borderRadius: "10px",
    padding: "25px",
    width: "250px",
  },
  about: {
    padding: "50px 40px",
    textAlign: "center",
  },
};
>>>>>>> 6cfb5c5666e2b9636f8a37191ab471ebe8c01621