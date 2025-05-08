import { useEffect, useState } from "react";
import { Row, Col, Form, Dropdown } from "react-bootstrap";
import { CiUser, CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { FiMoreVertical } from "react-icons/fi";
import ButtonComponent from "../components/ButtonComponent"; // Adjust path
import DynamicModal from "../components/DynamicModal"; // Adjust path
import adminService from "../../services/adminService"; // Adjust path

const UserComponent = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({});
  const [modalAddUsers, setModalAddUsers] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const openAddUsers = () => setModalAddUsers(true);
  const closeAddUsers = () => {
    setFormData({});
    setModalAddUsers(false);
  };

  const fetchUsers = async () => {
    try {
      const data = await adminService.listUsers();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const data = await adminService.viewSuperAdmin();
      setCurrentUser(data.user);
    } catch (error) {
      console.error("Error fetching super admin:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCurrentUser();
  }, []);

  const handleAddUser = async () => {
    try {
      if (formData.id) {
        await adminService.updateUser(formData.id, formData); // Implement this in your service
      } else {
        await adminService.addUser(formData);
      }
      await fetchUsers();
      closeAddUsers();
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await adminService.deleteUser(userId);
      await fetchUsers();
      if (currentUser && currentUser.id === userId) {
        setCurrentUser(null); // If the deleted user is the current one, reset currentUser
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleUserClick = (user) => {
    setCurrentUser(user); // Display the clicked user's details
  };

  return (
    <>
        <div className="d-flex flex-column gap-3 h-100">
      <div className="d-flex justify-content-between align-items-center pb-2">
        <h2 className="text-base mb-0">Users</h2>
        <ButtonComponent
          variant="btnGray"
          label="Add new user"
          icon="feathers fea-add-icon fea-15"
          iconPosition="left"
          onClick={openAddUsers}
        />
      </div>

      <div className="d-grid grid-cols-2 gap-4 flex-1">
        <div className="block03 d-flex flex-column gap-2 overflow-auto pe-1">
          {users.map((user) => (
            <div
              key={user.id}
              className="block02-a d-flex gap-3 justify-content-between align-items-center boxBlock01"
              onClick={() => handleUserClick(user)}
            >
              <div className="flex-1 d-flex gap-3">
                <CiUser className="text-28 iconBlock" />
                <div className="d-grid grid-cols-2 w-100 gap-3">
                  <div className="d-flex flex-column">
                    <span className="textBlock">Full Name</span>
                    <span className="font-weight-500">{user.full_name}</span>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="textBlock">Phone Number</span>
                    <span className="font-weight-500">{user.phone_number}</span>
                  </div>
                </div>
              </div>
              <Dropdown>
                <Dropdown.Toggle variant="" className="p-0">
                  <FiMoreVertical className="text-20 iconBlock" />
                </Dropdown.Toggle>
                <Dropdown.Menu className="text-sm">
                  <Dropdown.Item
                    as="button"
                    className="d-flex align-items-center gap-3"
                    onClick={() => {
                      setFormData(user);
                      setModalAddUsers(true);
                    }}
                  >
                    <CiEdit className="text-19" />
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="button"
                    className="d-flex align-items-center gap-3"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <AiOutlineDelete className="text-base" />
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ))}
        </div>

        <div className="block03 bdr-light">
          <div className="block02-a h-100">
            <CiUser className="text-28 iconBlock mb-2" />
            <div className="ul-02 ul-column branchBlock02 overflow-auto pe-2">
              <ul className="d-grid grid-cols-12 gap-4 rowgap-3">
                <li className="col-span-6"><span>Full Name</span><span className="font-weight-500">{currentUser?.full_name || "-"}</span></li>
                <li className="col-span-6"><span>Username</span><span className="font-weight-500">{currentUser?.username || "-"}</span></li>
                <li className="col-span-6"><span>Email</span><span className="font-weight-500">{currentUser?.email || "-"}</span></li>
                <li className="col-span-6"><span>Phone Number</span><span className="font-weight-500">{currentUser?.phone_number || "-"}</span></li>
                <li className="col-span-6"><span>Role</span><span className="font-weight-500">{currentUser?.role || "-"}</span></li>
                <li className="col-span-6"><span>Status</span><span className="font-weight-500">{currentUser?.status || "-"}</span></li>
                <li className="col-span-6"><span>Password</span><span className="font-weight-500">************</span></li>
                <li className="col-span-6"><span>Last Login</span><span className="font-weight-500">{currentUser?.last_login || "-"}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
 

      {/* Add/Edit User Modal */}
      <DynamicModal
        show={modalAddUsers}
        size="lg"
        onHide={closeAddUsers}
        title={formData.id ? "Edit User" : "Add User"}
        content={
          <Row>
            {[{ label: "Full Name", name: "full_name" },
              { label: "Username", name: "username" },
              { label: "Email", name: "email" },
              { label: "Phone Number", name: "phone_number" },
              { label: "Password", name: "password" },
              { label: "Confirm Password", name: "confirmPassword" },
            ].map((field, idx) => (
              <Col md={6} key={idx}>
                <Form.Group className="mb-3">
                  <Form.Label>{field.label}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter..."
                    value={formData[field.name] || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.name]: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            ))}

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  value={formData.role || ""}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="">Select role</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={formData.status || ""}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="">Select status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        }
        footer={
          <ButtonComponent
            variant="btnBlue"
            label={formData.id ? "Update User" : "Save User"}
            onClick={handleAddUser}
          />
        }
      />
    </>
  );
};

export default UserComponent;
