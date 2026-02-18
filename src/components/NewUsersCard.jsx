import React, { useState } from 'react';
import AddUserModal from './AddUserModal';

const NewUsersCard = ({ users, onUserAdded }) => {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddUser = async (formData) => {
    try {
      const apiBase = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiBase}/api/users/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          // Do NOT set Content-Type – browser sets it with boundary for FormData
        },
        body: formData,
      });

      const responseData = await response.json().catch(() => ({}));

      if (!response.ok) {
        // Extract error details from DRF response
        const errorDetail = responseData.detail || 
                            responseData.non_field_errors?.[0] ||
                            Object.values(responseData).flat().join(', ') ||
                            'Failed to create user';
        throw new Error(errorDetail);
      }

      console.log('User created:', responseData);
      if (onUserAdded) onUserAdded(); // refresh list
      setShowAddModal(false);
    } catch (err) {
      console.error('Error adding user:', err);
      alert(`Error adding user: ${err.message}`);
    }
  };

  // If no users, show placeholder
  if (!users || users.length === 0) {
    return (
      <div className="card card-flush h-100">
        <div className="card-body p-6">
          <h5 className="card-title fw-bold mb-4">New User</h5>
          <p className="text-muted">No recent users</p>
          <button className="btn btn-sm btn-light-primary mt-3" onClick={() => setShowAddModal(true)}>
            <i className="bi bi-plus-circle me-1"></i> Add User
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="card card-flush h-100">
        <div className="card-body p-6">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h5 className="card-title fw-bold mb-0">New User</h5>
            <button className="btn btn-sm btn-light-primary" onClick={() => setShowAddModal(true)}>
              <i className="bi bi-plus-circle me-1"></i> Add User
            </button>
          </div>

          <div className="d-flex flex-column">
            {users.map((user, idx) => (
              <div key={idx} className="d-flex align-items-center mb-4">
                <div className="symbol symbol-40px me-3">
                  <img src={`/assets/media/avatars/150-${(idx % 4) + 1}.jpg`} alt={user.username} />
                </div>
                <div className="flex-grow-1">
                  <span className="fw-bold text-dark d-block">{user.first_name || user.username}</span>
                  <span className="text-gray-500 fw-semibold">{user.email}</span>
                </div>
                <span className="badge badge-light-gray-600 text-gray-800 px-3 py-2">
                  {user.time || 'New'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddUserModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSave={handleAddUser}
      />
    </>
  );
};

export default NewUsersCard;