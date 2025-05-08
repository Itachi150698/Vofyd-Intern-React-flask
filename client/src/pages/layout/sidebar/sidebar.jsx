import React from 'react'
import "./sidebar.scss"
import { FiUsers } from 'react-icons/fi'
import { GoOrganization } from 'react-icons/go'
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
const { pathname } = location;
const getActiveClass = (path) => (pathname === path ? 'active' : '');
  return (
    <>
    <aside className="bg-white sidebar position-fixed">
      <ul className="d-flex flex-column gap-1">
        <li className={getActiveClass('/organization')}>
          <Link to="/organization"  className={getActiveClass('/organization')}>
            <GoOrganization className="text-xl" />
            <span>Organization</span>
          </Link>
        </li>
        <li className={getActiveClass('/admin-dashboard')}>
          <Link to="/admin-dashboard"  className={getActiveClass('/admin-dashboard')}>
            <FiUsers className="text-xl" />
            <span>Users</span>
          </Link>
        </li>
      </ul>
    </aside>
    </>
  )
}

export default Sidebar