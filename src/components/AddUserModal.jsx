import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

const AddUserModal = ({ show, onHide, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    status: 'pending',
    pan: '',
    aadhar: '',
  });
  const [files, setFiles] = useState({
    pan_card: null,
    aadhar_card: null,
    signature: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles(prev => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = () => {
    const data = new FormData();
    // User fields (using email as username)
    data.append('username', formData.email);
    data.append('email', formData.email);
    data.append('first_name', formData.name);
    data.append('password', formData.password);
    
    // Profile fields (nested with dot notation)
    data.append('profile.phone', formData.phone);
    data.append('profile.status', formData.status);
    data.append('profile.pan', formData.pan);
    data.append('profile.aadhar', formData.aadhar);
    
    // File fields (also nested)
    if (files.pan_card) data.append('profile.pan_card', files.pan_card);
    if (files.aadhar_card) data.append('profile.aadhar_card', files.aadhar_card);
    if (files.signature) data.append('profile.signature', files.signature);

    onSave(data);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <h5>User Details</h5>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select className="form-control" name="status" value={formData.status} onChange={handleChange}>
                <option value="pending">Pending Approval</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">PAN Number</label>
              <input type="text" className="form-control" name="pan" value={formData.pan} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Aadhar Number</label>
              <input type="text" className="form-control" name="aadhar" value={formData.aadhar} onChange={handleChange} />
            </div>
          </div>
          <div className="col-md-6">
            <h5>Upload Documents</h5>
            <div className="mb-3">
              <label className="form-label">PAN Card</label>
              <input type="file" className="form-control" name="pan_card" onChange={handleFileChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Aadhar Card</label>
              <input type="file" className="form-control" name="aadhar_card" onChange={handleFileChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Signature</label>
              <input type="file" className="form-control" name="signature" onChange={handleFileChange} />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onHide}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUserModal;