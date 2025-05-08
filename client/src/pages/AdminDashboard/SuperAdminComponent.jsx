import { useState, useEffect } from "react";
import { Col, Form, Row, Image } from "react-bootstrap";
import ButtonComponent from "../components/ButtonComponent";
import { CiEdit, CiUser } from "react-icons/ci";
import DynamicModal from "../components/DynamicModal";
import superAdminIcon from "../../../public/images/fea-super-admin-icon.svg";
import { AiOutlineDelete } from "react-icons/ai";
import adminService from "../../services/adminService";

const SuperAdminComponent = () => {
  const [modalAddUsers, setModalAddUsers] = useState(false);
  const [modalEditSuperAdmin, setModalEditSuperAdmin] = useState(false);
  const [superAdmin, setSuperAdmin] = useState(null);
  const [users, setUsers] = useState([]);
  const [editSuperAdminData, setEditSuperAdminData] = useState({});
  const [newUserData, setNewUserData] = useState({
    full_name: "",
    username: "",
    email: "",
    phone_number: "",
    role: "",
  });

  useEffect(() => {
    const fetchSuperAdmin = async () => {
      try {
        const data = await adminService.viewSuperAdmin();
        setSuperAdmin(data);
        setEditSuperAdminData({ ...data });
      } catch (error) {
        console.error("Error fetching super admin details:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const data = await adminService.listUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchSuperAdmin();
    fetchUsers();
  }, []);

  const openAddUsers = () => setModalAddUsers(true);
  const closeAddUsers = () => setModalAddUsers(false);

  const openEditSuperAdmin = () => setModalEditSuperAdmin(true);
  const closeEditSuperAdmin = () => setModalEditSuperAdmin(false);

  const handleAddUser = async () => {
    try {
      await adminService.addUser(newUserData);
      const updatedUsers = await adminService.listUsers();
      setUsers(updatedUsers);
      closeAddUsers();
      setNewUserData({
        full_name: "",
        username: "",
        email: "",
        phone_number: "",
        role: "Admin",
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleUpdateSuperAdmin = async () => {
    try {
      await adminService.updateUser(superAdmin.id, editSuperAdminData);
      const updatedSuperAdmin = await adminService.viewSuperAdmin();
      setSuperAdmin(updatedSuperAdmin);
      closeEditSuperAdmin();
    } catch (error) {
      console.error("Error updating super admin:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await adminService.deleteUser(userId);
      const updatedUsers = await adminService.listUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <div className="d-flex gap-3 flex-column">
        <div className="bg-white px-3 py-2 d-flex justify-content-between gap-3">
          <div className="d-flex justify-content-between flex-1 align-items-center">
            <div>
              <h2 className="text-base mb-0">User Management</h2>
            </div>
            <div className="searchBox">
              <Form.Group className="input-group">
                <Form.Control type="text" placeholder="Search" />
                <span className="input-group-text" id="basic-addon1">
                  <span className="feathers fea-search-icon fea-27 bg-size-15"></span>
                </span>
              </Form.Group>
            </div>
          </div>
        </div>

        <div className="block03 bdr-light h-100">
      <div className="block02-a">
        <div className="d-flex justify-content-between headingBlock01 pb-2 align-items-center mb-2">
          <h2 className="text-base mb-0">Super Admin</h2>
          <div className="d-flex gap-3 align-items-center">
            <Image src={superAdminIcon} alt="" className="hd-icon" />
            <ButtonComponent
              variant="btnGray"
              label="Edit Super Admin"
              icon={<CiEdit className="text-19" />}
              iconPosition="left"
              onClick={openEditSuperAdmin}
            />
          </div>
        </div>
        <div className="mt-2 ul-02 ul-column overflow-auto pe-2">
          {superAdmin ? (
            <ul className="d-grid grid-cols-4 gap-4 rowgap-3">
              <li><span>Full Name</span><span className="font-weight-500">{superAdmin.full_name}</span></li>
              <li><span>Username</span><span className="font-weight-500">{superAdmin.username}</span></li>
              <li><span>Email</span><span className="font-weight-500">{superAdmin.email}</span></li>
              <li><span>Phone Number</span><span className="font-weight-500">{superAdmin.phone_number}</span></li>
              <li><span>Organization Name</span><span className="font-weight-500">{superAdmin.organization_name}</span></li>
              <li><span>Organization ID</span><span className="font-weight-500">{superAdmin.organization_id}</span></li>
              <li><span>Status</span><span className="font-weight-500">{superAdmin.status}</span></li>
              <li><span>Role</span><span className="font-weight-500">{superAdmin.role}</span></li>
            </ul>
          ) : (
            <p className="text-muted">Loading Super Admin Info...</p>
          )}
        </div>
      </div>
    </div>

      </div>

      <DynamicModal
        show={modalEditSuperAdmin}
        size="lg"
        onHide={closeEditSuperAdmin}
        title="Edit Super Admin"
        content={
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editSuperAdminData.full_name || ""}
                  onChange={(e) =>
                    setEditSuperAdminData({
                      ...editSuperAdminData,
                      full_name: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  value={editSuperAdminData.phone_number || ""}
                  onChange={(e) =>
                    setEditSuperAdminData({
                      ...editSuperAdminData,
                      phone_number: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
        }
        footer={
          <ButtonComponent
            variant="btnBlue"
            label="Save Super Admin"
            onClick={handleUpdateSuperAdmin}
          />
        }
      />

      <DynamicModal
        show={modalEditSuperAdmin}
        size="lg"
        onHide={closeEditSuperAdmin}
        title="Edit Super Admin"
        content={
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editSuperAdminData.full_name || ""}
                  onChange={(e) =>
                    setEditSuperAdminData({
                      ...editSuperAdminData,
                      full_name: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  value={editSuperAdminData.phone_number || ""}
                  onChange={(e) =>
                    setEditSuperAdminData({
                      ...editSuperAdminData,
                      phone_number: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={editSuperAdminData.email || ""}
                  onChange={(e) =>
                    setEditSuperAdminData({
                      ...editSuperAdminData,
                      email: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
        }
        footer={
          <ButtonComponent
            variant="btnBlue"
            label="Save Super Admin"
            onClick={handleUpdateSuperAdmin}
          />
        }
      />
    </>
  );
};

export default SuperAdminComponent;
