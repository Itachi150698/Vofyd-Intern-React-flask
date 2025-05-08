import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Image, Dropdown } from "react-bootstrap";
import "./header.scss";
import logoImage from "../../../assets/images/logo/logo.svg";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <header className="d-flex justify-content-between align-items-center gap-3">
        <div className="bg-white flex-1 d-flex justify-content-between align-items-center _h-50 px-3">
          <div>
            <Image className="cw-100" src={logoImage} alt="Logo" />
          </div>

          <div className="d-flex gap-3 align-items-center">
            <Dropdown align="end">
              <Dropdown.Toggle variant="light" id="dropdown-user" className="user-dropdown">
                Vishak Nataraj
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                {/* You can add more items here like Profile, Settings, etc. */}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <div className="menu-icon d-flex align-items-center">
          <Button variant="">
            <span className="feathers fa-menu-icon fea-26"></span>
          </Button>
        </div>
      </header>
    </>
  );
};

export default Header;
