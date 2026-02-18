import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap'; // or use your own modal

const UserDetailsModal = ({ show, onHide, user, onSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: '',
    pan: '',
    aadhar: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.username,
        email: user.email || '',
        phone: user.phone || '',
        status: user.status || 'pending',
        pan: user.pan || '',
        aadhar: user.aadhar || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    setEditMode(false);
  };

  const documents = [
    { name: 'PAN Card', url: '#', type: 'pan' },
    { name: 'Aadhar Card', url: '#', type: 'aadhar' },
    { name: 'Signature', url: '#', type: 'signature' },
  ];

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>User Documents</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <h5>User Details</h5>
            <form>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-control"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  disabled={!editMode}
                >
                  <option value="pending">Pending Approval</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">PAN Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="pan"
                  value={formData.pan}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Aadhar Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="aadhar"
                  value={formData.aadhar}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <h5>Uploaded Documents</h5>
            {documents.map((doc, idx) => (
              <div key={idx} className="d-flex align-items-center justify-content-between mb-3 p-3 border rounded">
                <span>{doc.name}</span>
                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-light-primary">
                  Open in new tab
                </a>
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {!editMode ? (
          <button className="btn btn-primary" onClick={() => setEditMode(true)}>
            Edit
          </button>
        ) : (
          <>
            <button className="btn btn-success" onClick={handleSave}>Save</button>
            <button className="btn btn-secondary" onClick={() => setEditMode(false)}>Cancel</button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default UserDetailsModal;