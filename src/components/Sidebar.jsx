import React from 'react';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "User's Home", path: '/user-home', icon: 'bi-house-door' },
    { name: 'Dashboard', path: '/dashboard', icon: 'bi-speedometer2' },
    { name: 'Designation', path: '/designation', icon: 'bi-briefcase' },
    { name: 'Users', path: '/users', icon: 'bi-people' },
    { name: 'Enquiries', path: '/enquiries', icon: 'bi-envelope' },
    { name: 'Subscribers', path: '/subscribers', icon: 'bi-people-fill' },
    { name: 'Purchases', path: '/purchases', icon: 'bi-cart' },
    { name: 'Services', path: '/services', icon: 'bi-gear' },
  ];

  return (
    <div className="aside aside-left aside-fixed d-flex flex-column" id="kt_aside">
      {/* User info */}
      <div className="aside-logo py-6 px-6 d-flex align-items-center">
        <div className="symbol symbol-50px me-3">
          <img src="/assets/media/avatars/blank.png" alt="avatar" className="rounded-circle" />
        </div>
        <div className="flex-grow-1">
          <span className="fw-bold text-dark d-block">Sayan Shaw</span>
          <span className="text-muted fw-semibold text-gray-500">Admin</span>
        </div>
      </div>

      {/* Menu */}
      <div className="aside-menu flex-column-fluid">
        <ul className="menu menu-column menu-rounded menu-title-gray-600 menu-icon-gray-400 menu-state-primary menu-arrow-gray-400 fw-semibold">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name} className="menu-item">
                <a href={item.path} className={`menu-link ${isActive ? 'active' : ''}`}>
                  <span className="menu-icon">
                    <i className={`bi ${item.icon} fs-3`}></i>
                  </span>
                  <span className="menu-title">{item.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;