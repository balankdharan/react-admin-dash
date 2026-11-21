import { FormEvent, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAdminStore } from "../../store/AdminStore";
import "./login.scss";

// There is no backend, so any email and a password of 4+ characters signs
// you in. The session is kept in the browser with the rest of the data.
const Login = () => {
  const { data, update } = useAdminStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(data.settings.email);
  const [password, setPassword] = useState("demo1234");
  const [error, setError] = useState("");

  const from = (location.state as { from?: string } | null)?.from ?? "/";

  if (data.session) return <Navigate to="/" replace />;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Please enter a valid email.");
    if (password.length < 4) return setError("The password needs at least 4 characters.");
    update((d) => ({ ...d, session: { email } }), `Signed in as ${email}`);
    navigate(from, { replace: true });
  };

  return (
    <div className="login">
      <form className="loginCard" onSubmit={handleSubmit}>
        <div className="logo">
          <img src="/logo.svg" alt="" />
          <span>Admin</span>
        </div>
        <h1>Sign in</h1>
        <p className="hint">Demo mode: any email and a password of 4+ characters works.</p>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button>Sign in</button>
      </form>
    </div>
  );
};

export default Login;
