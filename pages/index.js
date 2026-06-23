!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Elevate Wheel Studio</title>

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: Arial, Helvetica, sans-serif;
    }

    body {
      background: #050505;
      color: #ffffff;
    }

    header {
      width: 100%;
      padding: 25px 8%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #000;
      border-bottom: 1px solid #222;
    }

    .logo img {
      width: 210px;
    }

    nav a {
      color: #ffffff;
      text-decoration: none;
      margin-left: 30px;
      font-size: 14px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    nav a:hover {
      color: #e60012;
    }

    .hero {
      min-height: 90vh;
      display: flex;
      align-items: center;
      padding: 80px 8%;
      background:
        linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.9)),
        url("ELEVATE LOGO.png") center/contain no-repeat;
    }

    .hero-content {
      max-width: 720px;
    }

    .hero h1 {
      font-size: 64px;
      line-height: 1.05;
      text-transform: uppercase;
      margin-bottom: 25px;
    }

    .hero h1 span {
      color: #e60012;
    }

    .hero p {
      font-size: 20px;
      color: #d5d5d5;
      line-height: 1.6;
      margin-bottom: 35px;
    }

    .buttons {
      display: flex;
      gap: 18px;
      flex-wrap: wrap;
    }

    .btn {
      padding: 16px 30px;
      border-radius: 4px;
      text-decoration: none;
      text-transform: uppercase;
      font-weight: bold;
      letter-spacing: 1px;
    }

    .btn-red {
      background: #e60012;
      color: #fff;
    }

    .btn-outline {
      border: 1px solid #cfcfcf;
      color: #fff;
    }

    .services {
      padding: 80px 8%;
      background: #0b0b0b;
      text-align: center;
    }

    .services h2 {
      font-size: 38px;
      margin-bottom: 50px;
      text-transform: uppercase;
    }

    .service-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 25px;
    }

    .card {
      background: #111;
      padding: 35px 25px;
      border: 1px solid #222;
      border-radius: 10px;
    }

    .card h3 {
      color: #e60012;
      margin-bottom: 15px;
      text-transform: uppercase;
    }

    .card p {
      color: #c7c7c7;
      line-height: 1.6;
    }

    .about {
      padding: 80px 8%;
      background: #000;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 50px;
      align-items: center;
    }

    .about img {
      width: 100%;
      max-width: 500px;
    }

    .about h2 {
      font-size: 40px;
      margin-bottom: 20px;
      text-transform: uppercase;
    }

    .about p {
      color: #cfcfcf;
      line-height: 1.7;
      font-size: 17px;
    }

    .cta {
      padding: 80px 8%;
      text-align: center;
      background: linear-gradient(135deg, #e60012, #670000);
    }

    .cta h2 {
      font-size: 42px;
      margin-bottom: 20px;
      text-transform: uppercase;
    }

    .cta p {
      font-size: 18px;
      margin-bottom: 30px;
    }

    footer {
      padding: 30px 8%;
      background: #000;
      text-align: center;
      color: #aaa;
      border-top: 1px solid #222;
    }

    @media (max-width: 768px) {
      header {
        flex-direction: column;
        gap: 20px;
      }

      nav a {
        margin: 0 10px;
        font-size: 12px;
      }

      .hero h1 {
        font-size: 42px;
      }

      .about {
        grid-template-columns: 1fr;
        text-align: center;
      }
    }
  </style>
</head>

<body>

  <header>
    <div class="logo">
      <img src="ELEVATE LOGO.png" alt="Elevate Wheel Studio Logo">
    </div>

    <nav>
      <a href="#">Home</a>
      <a href="#">Services</a>
      <a href="#">Gallery</a>
      <a href="#">Booking</a>
      <a href="#">Contact</a>
    </nav>
  </header>

  <section class="hero">
    <div class="hero-content">
      <h1>Premium Wheel Care <span>Elevated</span></h1>
      <p>
        Elevate Wheel Studio specializes in high-end wheel refinishing,
        repair, customization, and detailing for drivers who demand a
        premium finish.
      </p>

      <div class="buttons">
        <a href="#" class="btn btn-red">Book Appointment</a>
        <a href="#" class="btn btn-outline">View Services</a>
      </div>
    </div>
  </section>

  <section class="services">
    <h2>Our Services</h2>

    <div class="service-grid">
      <div class="card">
        <h3>Wheel Repair</h3>
        <p>Curb rash, scratches, bends, chips, and cosmetic wheel damage repaired with precision.</p>
      </div>

      <div class="card">
        <h3>Refinishing</h3>
        <p>Premium paint, clear coat, sanding, polishing, and factory-style restoration finishes.</p>
      </div>

      <div class="card">
        <h3>Custom Finishes</h3>
        <p>Gloss black, satin, matte, metallic, two-tone, and custom colour wheel styling.</p>
      </div>

      <div class="card">
        <h3>Tire Services</h3>
        <p>Mounting, balancing, seasonal swaps, and professional wheel care packages.</p>
      </div>
    </div>
  </section>

  <section class="about">
    <div>
      <img src="ELEVATE LOGO.png" alt="Elevate Wheel Studio">
    </div>

    <div>
      <h2>Built for Premium Results</h2>
      <p>
        At Elevate Wheel Studio, every wheel is handled with care,
        precision, and attention to detail. Our goal is simple:
        restore, enhance, and elevate the appearance of your vehicle
        with professional-grade wheel services.
      </p>
    </div>
  </section>

  <section class="cta">
    <h2>Ready to Elevate Your Wheels?</h2>
    <p>Book your appointment today and give your vehicle the finish it deserves.</p>
    <a href="#" class="btn btn-outline">Contact Us</a>
  </section>

  <footer>
    <p>© 2026 Elevate Wheel Studio. All Rights Reserved.</p>
  </footer>

</body>
</html>