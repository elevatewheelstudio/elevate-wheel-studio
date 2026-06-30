<form onSubmit={login}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </section>

      <style jsx>{styles}</style>
    </main>
  );
}

const styles = `
*{box-sizing:border-box}
.page{background:#050505;color:white;min-height:100vh;font-family:Arial,Helvetica,sans-serif;display:flex;align-items:center;justify-content:center;padding:30px}
.loginBox{width:100%;max-width:460px;background:#0b0b0b;border:1px solid #333;border-radius:12px;padding:35px;text-align:center}
.logo{width:260px;margin-bottom:20px}
h1{color:#e4001b;text-transform:uppercase;font-size:38px;margin:10px 0}
p{color:#ccc}
form{display:grid;gap:14px;margin-top:25px}
input{background:#111;border:1px solid #333;color:white;padding:16px;border-radius:6px;font-size:16px}
button{background:#e4001b;color:white;border:0;padding:17px;border-radius:6px;text-transform:uppercase;font-weight:900;cursor:pointer}
button:disabled{opacity:.7;cursor:not-allowed}
`;
