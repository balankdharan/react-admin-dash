import { Link, useParams } from "react-router-dom";
import Single from "../../components/single/Single";
import { singleUser } from "../../data";
import { useAdminStore } from "../../store/AdminStore";
import "./user.scss";

const User = () => {
  const { id } = useParams();
  const { data } = useAdminStore();
  const user = data.users.find((row) => row.id === Number(id));

  if (!user) {
    return (
      <div className="user notFound">
        <h1>User not found</h1>
        <Link to="/users">Back to users</Link>
      </div>
    );
  }

  const fullname = `${user.firstName} ${user.lastName}`;

  return (
    <div className="user">
      <Single
        id={user.id}
        img={user.img as string | undefined}
        title={fullname}
        info={{
          fullname,
          email: user.email,
          phone: user.phone,
          joined: user.createdAt,
          status: user.verified ? "verified" : "not verified",
        }}
        chart={singleUser.chart}
        activities={singleUser.activities.map((activity) => ({
          ...activity,
          text: activity.text.replace("John Doe", fullname),
        }))}
      />
    </div>
  );
};

export default User;
