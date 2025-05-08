import React, { useState } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import "./login.scss";
import loginImage from "../../assets/images/login-img.png";
import logoImage from "../../assets/images/logo/logo.svg";
import { signup, login } from "../../services/authService";
import { useNavigate } from "react-router-dom"; 

const Login = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    email: "",
    phone_number: "",
    organization_name: "",
    organization_id: "",
    status: "",
    role: "",
    password: "",
  });

  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = showSignUp ? await signup(formData) : await login(formData);
      alert(res.message);
      // On successful login, navigate to the user management page
      if (!showSignUp) {
        navigate("/admin-dashboard");  // Redirect to the user management page
      } 
    } catch (err) {
      alert(err.response?.data?.message || "An error occurred");
    }
  };
  

  const handleSignUpClick = (e) => {
    e.preventDefault();
    setShowSignUp(true);
  };

  const handleSignInClick = (e) => {
    e.preventDefault();
    setShowSignUp(false);
  };

  return (
    <div className="loginWrap">
      <Container>
        <Row>
          <Col lg={12}>
            <div className="mb-5 mt-4">
              <Image className="cw-100" src={logoImage} alt="Logo" />
            </div>
          </Col>

          <Col lg={6}>
            <div className="h-100 w-100 d-flex align-items-center flex-column justify-content-center ">
              <div className="loginBox02">
                <h2 className="line-28 font-weight-700 mb-4">
                  Advanced Fleet Optimization.
                </h2>
                <div className="loginImg">
                  <Image src={loginImage} alt="" />
                </div>
              </div>
              <div className="loginBox01 mt-3">
                <p>
                  Vofyd offers a fleet optimization solution powered by data
                  analytics and AI, delivering critical intelligence for
                  informed decision-making.
                </p>
              </div>
            </div>
          </Col>

          <Col lg={6}>
            <div className="loginRightBlock d-flex h-100 align-items-center flex-column justify-content-center">
              <div className="loginForm h-100 d-flex flex-column justify-content-center">
                <h2 className="font-weight-700 mb-4">Explore !</h2>
                <Form className="custom-form-control" onSubmit={handleSubmit}>
                  {showSignUp ? (
                    <>
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleChange}
                          placeholder="Enter Full Name"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          placeholder="Enter Username"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter Email"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="phone_number"
                          value={formData.phone_number}
                          onChange={handleChange}
                          placeholder="Phone Number"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Organization Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="organization_name"
                          value={formData.organization_name}
                          onChange={handleChange}
                          placeholder="Organization Name"
                        />
                      </Form.Group>
                      {/* <Form.Group className="mb-3">
                        <Form.Label>Organization ID</Form.Label>
                        <Form.Control
                          type="text"
                          name="organization_id"
                          value={formData.organization_id}
                          onChange={handleChange}
                          placeholder="Organization ID"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                          type="text"
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                          placeholder="Status"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                          type="text"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          placeholder="Role"
                        />
                      </Form.Group> */}
                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Password"
                        />
                      </Form.Group>
                    </>
                  ) : (
                    <>
                      <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter email"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter password"
                        />
                      </Form.Group>
                    </>
                  )}

                  <div className="d-flex justify-content-between mt-3">
                    <div className="form-border">
                      <a href="#" onClick={handleSignUpClick}>
                        Sign up
                      </a>
                    </div>
                    <div className="form-border">
                      <a href="#">Forgot password</a>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end mt-3">
                    <Button variant="primary" type="submit">
                      {showSignUp ? "Sign up" : "Sign in"}
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </Col>

          <Col lg={12}>
            <div className="d-flex justify-content-between mt-4">
              <div>
                <span className="d-block font-weight-500">Email:</span>
                <span className="d-block">support@vofyd.com</span>
              </div>
              <div>
                <span className="d-block font-weight-500">Phone:</span>
                <span className="d-block">+91 9539745595</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
