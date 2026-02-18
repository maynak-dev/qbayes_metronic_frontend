import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDetailsModal from './UserDetailsModal'; // Make sure this path is correct

const UserBoard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock statuses, steps, and created dates for demonstration
  const statuses = ['pending', 'approved', 'rejected'];
  const getRandomStatus = () => statuses[Math.floor(Math.random() * statuses.length)];
  const getRandomSteps = () => Math.floor(Math.random() * 5) + 1; // 1-5
  const getRandomCreated = () => Math.floor(Math.random() * 30) + 1; // days ago

  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    'Content-Type': 'application/json',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const apiBase = import.meta.env.VITE_API_URL;
        if (!apiBase) throw new Error('VITE_API_URL not defined');

        const response = await fetch(`${apiBase}/api/users/`, {
          headers: getAuthHeaders(),
        });

        if (response.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          navigate('/admin');
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        // Enhance users with mock data
        const enhancedUsers = data.map(user => ({
          ...user,
          status: getRandomStatus(),
          steps: getRandomSteps(),
          created: getRandomCreated(),
        }));
        setUsers(enhancedUsers);
      } catch (err) {
        console.error('Fetch users error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleSaveUser = (updatedData) => {
    // TODO: send update to backend
    console.log('Saving user:', updatedData);
    // Update local state if needed
    setShowModal(false);
  };

  const filteredUsers = users.filter(user =>
    `${user.first_name} ${user.last_name} ${user.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'approved': return 'badge-light-success';
      case 'rejected': return 'badge-light-danger';
      default: return 'badge-light-warning';
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="alert alert-danger">
          Failed to load users: {error}. Please try again.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="card card-custom card-stretch gutter-b">
        {/* Header */}
        <div className="card-header border-0 py-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label font-weight-bolder text-dark">Users Management</span>
            <span className="text-muted mt-3 font-weight-bold font-size-sm">
              Manage your organization's users ({users.length} total)
            </span>
          </h3>
          <div className="card-toolbar">
            <button className="btn btn-light-primary font-weight-bolder mr-2">
              <i className="bi bi-funnel fs-5 me-1"></i> Filter
            </button>
            <button className="btn btn-light-primary font-weight-bolder">
              <i className="bi bi-download fs-5 me-1"></i> Export
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="card-body py-0">
          {/* Search */}
          <div className="d-flex align-items-center mb-8">
            <div className="position-relative w-100">
              <i className="bi bi-search fs-4 position-absolute text-gray-400" style={{ top: '50%', left: '1rem', transform: 'translateY(-50%)' }}></i>
              <input
                type="text"
                className="form-control form-control-solid ps-13"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-head-custom table-vertical-center">
              <thead>
                <tr className="text-left">
                  <th style={{ minWidth: '250px' }}>PROFILE</th>
                  <th style={{ minWidth: '120px' }}>STATUS</th>
                  <th style={{ minWidth: '100px' }}>STEPS</th>
                  <th style={{ minWidth: '120px' }}>CREATED</th>
                  <th className="pr-0 text-right" style={{ minWidth: '100px' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="pl-0">
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-50 symbol-light mr-4">
                          <span className="symbol-label">
                            <i className="bi bi-person-circle fs-2x text-primary"></i>
                          </span>
                        </div>
                        <div className="d-flex flex-column">
                          <a href="#" className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">
                            {user.first_name || user.username} {user.last_name}
                          </a>
                          <span className="text-muted font-weight-bold">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(user.status)} py-3 px-4 font-weight-bold`}>
                        {user.status.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <span className="text-dark-75 font-weight-bolder">{user.steps}</span>
                    </td>
                    <td>
                      <span className="text-dark-75 font-weight-bolder">{user.created} days ago</span>
                    </td>
                    <td className="pr-0 text-right">
                      <button
                        className="btn btn-icon btn-light btn-hover-primary btn-sm"
                        onClick={() => handleViewDetails(user)}
                      >
                        <i className="bi bi-three-dots-vertical fs-4"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-muted">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      <UserDetailsModal
        show={showModal}
        onHide={() => setShowModal(false)}
        user={selectedUser}
        onSave={handleSaveUser}
      />
    </>
  );
};

export default UserBoard;