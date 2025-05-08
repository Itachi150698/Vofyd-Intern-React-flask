import React, { useState } from "react";
import { Col, Form, Row, Image, Dropdown } from "react-bootstrap";
import ButtonComponent from "../components/ButtonComponent";
import { MdOutlineAccountTree } from "react-icons/md";
import { PiTreeStructure } from "react-icons/pi";
import { FiMoreVertical } from "react-icons/fi";
import { branches } from "../data/data";
import DynamicModal from "../components/DynamicModal";
import organizationIcon from "../../../public/images/fea-organization-icon.svg";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";

const Organization = () => {
  const [modal1, setModal1] = useState(false);
  const [modalAddBranch, setModalAddBranch] = useState(false);

  const openModal1 = () => {
    setModal1(true);
  };

  const closeModal1 = () => {
    setModal1(false);
  };

  const openAddBranch = () => {
    setModalAddBranch(true);
  };

  const closeAddBranch = () => {
    setModalAddBranch(false);
  };
  return (
    <>
      <div className="d-flex gap-3 flex-column">
        <div className="bg-white px-3 py-2 d-flex justify-content-between gap-3">
          <div className="d-flex justify-content-between flex-1 align-items-center">
            <div>
              <h2 className="text-base mb-0">Organization Management</h2>
            </div>
            <div className="d-flex gap-3">
              {/* <div className="h-27 bg-blue-100 d-flex align-items-center px-3 gap-2">
                <span className="feathers fea-add-icon fea-15"></span>
                <span className="text-white">Add vehicle</span>
              </div> */}
              <div className="searchBox">
                <div>
                  <Form.Group className="input-group">
                    <Form.Control type="email" placeholder="Search" />
                    <span className="input-group-text" id="basic-addon1">
                      <span className="feathers fea-search-icon fea-27 bg-size-15"></span>
                    </span>
                  </Form.Group>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="divider"></div>
          <div className="d-flex gap-3 h-27 bg-black-900 px-3 gap-3 align-items-center">
            <div className=" d-flex align-items-center gap-2">
              <span className="feathers fea-filter-icon fea-15"></span>
              <span className="text-white">Filters</span>
              <span className="d-block numberBox">02</span>
            </div>
            <div className="divider-light"></div>
            <div className=" d-flex align-items-center">
              <span className="text-white">Clear all</span>
            </div>
          </div> */}
        </div>
        <div className="bg-white px-3 py-3">
          <div className="block03 bdr-light">
            <div className="block02-a h-100">
              <div className="d-flex justify-content-between align-items-center headingBlock01 pb-2 mb-2">
                <div>
                  <h2 class="text-base mb-0">Organization</h2>
                </div>
                <div className="d-flex gap-3 align-items-center">
                  <div className="hd-icon">
                    <Image src={organizationIcon} alt="" />
                  </div>
                  <ButtonComponent
                    variant="btnGray"
                    label="Add Organization"
                    icon="feathers fea-add-icon fea-15"
                    iconPosition="left"
                    onClick={openModal1}
                  />
                </div>
              </div>
              <div className="mt-2 ul-02 ul-column overflow-auto pe-2 h-block01">
                <ul className="d-grid grid-cols-4 gap-4 rowgap-3">
                  <li>
                    <span>Organization Name</span>
                    <span class="font-weight-500">Fleet Masters Inc.</span>
                  </li>
                  <li>
                    <span>Contact Email</span>
                    <span class="font-weight-500">
                      mthompson@fleetmasters.com
                    </span>
                  </li>
                  <li>
                    <span>Contact Phone Number</span>
                    <span class="font-weight-500">+1-456-789-0123</span>
                  </li>
                  <li>
                    <span>Address</span>
                    <span class="font-weight-500">
                      1234 Fleet Street, Suite 500
                    </span>
                  </li>
                  <li>
                    <span>City</span>
                    <span class="font-weight-500">Los Angeles</span>
                  </li>
                  <li>
                    <span>State</span>
                    <span class="font-weight-500">California</span>
                  </li>
                  <li>
                    <span>Zip Code</span>
                    <span class="font-weight-500">90017</span>
                  </li>
                  <li>
                    <span>Country</span>
                    <span class="font-weight-500">USA</span>
                  </li>
                  <li>
                    <span>Website</span>
                    <span class="font-weight-500">www.fleetmasters.com</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between pb-2 mt-3 mb-2">
            <div>
              <h2 class="text-base mb-0">Branches</h2>
            </div>
            <div className="d-flex gap-3 align-items-center">
              <ButtonComponent
                variant="btnGray"
                label="Add new branch"
                icon="feathers fea-add-icon fea-15"
                iconPosition="left"
                onClick={openAddBranch}
              />
            </div>
          </div>

          <div className="d-grid grid-cols-2 gap-4">
            <div className="block03 d-flex flex-column gap-1 overflow-auto pe-1">
              {branches.map((branch) => (
                <div
                  key={branch.id}
                  className="block02-a d-flex gap-3 justify-content-between align-items-center boxBlock01"
                >
                  <div className="flex-1 d-flex gap-3">
                    <div className="">
                      <PiTreeStructure className="text-28 iconBlock" />
                    </div>
                    <div className=" d-grid grid-cols-2 w-100 gap-3">
                      <div className=" d-flex flex-column">
                        <span className="textBlock">Branch Name</span>
                        <span className="font-weight-500">
                          {branch.BranchName}
                        </span>
                      </div>
                      <div className=" d-flex flex-column">
                        <span className="textBlock">Phone Number</span>
                        <span className="font-weight-500">
                          {branch.phoneNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant=""
                        className="p-0"
                        id="dropdown-basic"
                      >
                        <FiMoreVertical className="text-20 iconBlock" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="text-sm">
                        <Dropdown.Item href="#" className="d-flex align-items-center gap-3">
                          <CiEdit className="text-19" />
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item href="#" className="d-flex align-items-center gap-3">
                          <AiOutlineDelete className="text-base" />
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              ))}
            </div>
            <div className="block03 bdr-light">
              <div className="block02-a h-100">
                <div className=" ">
                  <div className="ul-02 ul-column branchBlock01 overflow-auto pe-2">
                    <ul className="d-grid grid-cols-12 gap-4 rowgap-3">
                      <li className="col-span-6">
                        <span>Branch Name</span>
                        <span className="font-weight-500">
                          Fleet Masters - New York
                        </span>
                      </li>
                      <li className="col-span-6">
                        <span>Branch Location</span>
                        <span className="font-weight-500">New York, NY</span>
                      </li>
                      <li className="col-span-6">
                        <span>Person in Charge</span>
                        <span className="font-weight-500">Sarah Johnson</span>
                      </li>
                      <li className="col-span-6">
                        <span>Contact Email</span>
                        <span className="font-weight-500">
                          sjohnson@fleetmasters.com
                        </span>
                      </li>
                      <li className="col-span-6">
                        <span>Contact Phone Number</span>
                        <span className="font-weight-500">+1-212-555-0147</span>
                      </li>
                      <li className="col-span-6">
                        <span>Address</span>
                        <span className="font-weight-500">
                          456 Broadway Ave, Suite 300
                        </span>
                      </li>
                      <li className="col-span-4">
                        <span>City</span>
                        <span className="font-weight-500">New York</span>
                      </li>
                      <li className="col-span-4">
                        <span>State</span>
                        <span className="font-weight-500">New York</span>
                      </li>
                      <li className="col-span-4">
                        <span>Country</span>
                        <span className="font-weight-500">USA</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Organization */}
      <DynamicModal
        show={modal1}
        size="lg"
        onHide={closeModal1}
        title="Add Organization"
        content={
          <div>
            <Row>
              <Col md={6}>
                <div>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>Organization Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter..." />
                  </Form.Group>
                </div>
              </Col>
              <Col md={6}>
                <div>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>Contact Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter..." />
                  </Form.Group>
                </div>
              </Col>
              <Col md={6}>
                <div>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>Contact Phone Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter..." />
                  </Form.Group>
                </div>
              </Col>
              <Col md={6}>
                <div>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter..." />
                  </Form.Group>
                </div>
              </Col>
              <Col md={6}>
                <div>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="Enter..." />
                  </Form.Group>
                </div>
              </Col>
              <Col md={6}>
                <div>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" placeholder="Enter..." />
                  </Form.Group>
                </div>
              </Col>

              <Col md={6}>
                <div>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </Col>
              <Col md={6}>
                <div>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>Country</Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </Col>
              <Col md={6}>
                <div>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>Website</Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </Col>
            </Row>
          </div>
        }
        footer={
          <>
            <ButtonComponent variant="btnBlue" label="Save Organization" />
          </>
        }
      />

      {/* Add Branch */}

      <DynamicModal
        show={modalAddBranch}
        size="lg"
        onHide={closeAddBranch}
        title="Add Branch"
        content={
          <div>
            <Row>
              <Col md={6}>
                <div>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>Branch Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your Full Name"
                    />
                  </Form.Group>
                </div>
              </Col>
              <Col md={6}>
                <div>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>Branch Location</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your Username"
                    />
                  </Form.Group>
                </div>
              </Col>
              <Col md={6}>
                <div>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>Person in Charge</Form.Label>
                    <Form.Control type="text" placeholder="Enter..." />
                  </Form.Group>
                </div>
              </Col>
              <Col md={6}>
                <div>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>Contact Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter your Email" />
                  </Form.Group>
                </div>
              </Col>
              <Col md={6}>
                <div>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>Contact Phone Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter..." />
                  </Form.Group>
                </div>
              </Col>
              <Col md={6}>
                <div>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter..." />
                  </Form.Group>
                </div>
              </Col>

              <Col md={6}>
                <div>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>City</Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </Col>
              <Col md={6}>
                <div>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>State</Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </Col>
              <Col md={6}>
                <div>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>Country</Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </Col>
            </Row>
          </div>
        }
        footer={
          <>
            <ButtonComponent variant="btnBlue" label="Save Branch" />
          </>
        }
      />
    </>
  );
};

export default Organization;
