import BarChartBox from "../../components/barChartBox/BarChartBox";
import BigChartBox from "../../components/bigChartBox/BigChartBox";
import PieChartBox from "../../components/pieChartBox/PieChartBox";
import { barChartBoxRevenue, barChartBoxVisit } from "../../data";
import { useAdminStore } from "../../store/AdminStore";
import "./charts.scss";

const Charts = () => {
  const { data } = useAdminStore();

  // Live numbers from the data you can edit in the dashboard.
  const statuses = ["Processing", "Shipped", "Delivered", "Cancelled"].map((status) => ({
    status,
    count: data.orders.filter((order) => order.status === status).length,
  }));
  const maxCount = Math.max(1, ...statuses.map((s) => s.count));
  const verified = data.users.filter((user) => user.verified).length;
  const inStock = data.products.filter((product) => product.inStock).length;

  return (
    <div className="page charts">
      <div className="pageHeader">
        <div>
          <h1>Charts</h1>
          <p>Sales and traffic, plus live numbers from your users, products and orders.</p>
        </div>
      </div>
      <div className="stats">
        <div className="panel stat">
          <span className="muted">Users</span>
          <strong>{data.users.length}</strong>
          <span className="muted">{verified} verified</span>
        </div>
        <div className="panel stat">
          <span className="muted">Products</span>
          <strong>{data.products.length}</strong>
          <span className="muted">{inStock} in stock</span>
        </div>
        <div className="panel stat">
          <span className="muted">Orders</span>
          <strong>{data.orders.length}</strong>
          <span className="muted">{statuses[2].count} delivered</span>
        </div>
      </div>
      <div className="panel">
        <h2>Orders by status</h2>
        {statuses.map((s) => (
          <div className="bar" key={s.status}>
            <span>{s.status}</span>
            <div className="track">
              <div
                className={`fill ${s.status.toLowerCase()}`}
                style={{ width: `${(s.count / maxCount) * 100}%` }}
              />
            </div>
            <strong>{s.count}</strong>
          </div>
        ))}
      </div>
      <div className="panel big">
        <BigChartBox />
      </div>
      <div className="row">
        <div className="panel">
          <PieChartBox />
        </div>
        <div className="panel">
          <BarChartBox {...barChartBoxVisit} />
        </div>
        <div className="panel">
          <BarChartBox {...barChartBoxRevenue} />
        </div>
      </div>
    </div>
  );
};

export default Charts;
