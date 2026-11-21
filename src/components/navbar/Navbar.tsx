import { Link, useNavigate } from "react-router-dom";
import { useAdminStore } from "../../store/AdminStore";
import "./navbar.scss";

const Navbar = () => {
  const { data, update } = useAdminStore();
  const navigate = useNavigate();
  const processing = data.orders.filter((order) => order.status === "Processing").length;

  const signOut = () => {
    update((d) => ({ ...d, session: null }), "Signed out");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <Link to="/" className="logo">
        <img src="/logo.svg" alt="" />
        <span>Admin</span>
      </Link>
      <div className="icons">
        <Link to="/orders" className="notification" title={`${processing} orders to process`}>
          <img src="/notifications.svg" alt="Orders to process" />
          {processing > 0 && <span>{processing}</span>}
        </Link>
        <Link to="/users/1" className="user">
          <img src={data.settings.avatar || "/noavatar.png"} alt="" />
          <span>{data.settings.name}</span>
        </Link>
        <Link to="/settings" title="Settings">
          <img src="/settings.svg" alt="Settings" className="icon" />
        </Link>
        <button className="signOut" onClick={signOut}>
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
