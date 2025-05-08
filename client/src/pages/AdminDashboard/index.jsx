import SuperAdminComponent from "./SuperAdminComponent";
import UserComponent from "./UserComponent";

const AdminDashboard = () => {
  return (
    <div className="d-flex flex-column gap-4 bg-white px-3 py-3 boxBlock">
      <SuperAdminComponent />
      <UserComponent />
    </div>
  );
};

export default AdminDashboard;
