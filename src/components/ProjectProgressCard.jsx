import React from 'react';

const ProjectProgressCard = ({ progress, projectName, dueIn, status, onStatusChange }) => {
  return (
    <div className="card card-flush h-100">
      <div className="card-body p-6">
        <h5 className="card-title fw-bold mb-4">Project Progress</h5>
        <div className="text-center mb-4">
          <span className="fs-1 fw-bold text-dark">{progress}%</span>
        </div>
        <div className="d-flex align-items-center justify-content-between mb-5">
          <span className="fw-bold text-dark">{projectName}</span>
          <span className="badge badge-light-warning">{dueIn}</span>
        </div>
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <span className="text-gray-700">Design Phase</span>
            <span className={`badge px-4 py-2 ${status === 'DONE' ? 'badge-light-success' : 'badge-light-primary'}`}>
              {status}
            </span>
          </div>
          {/* You can add more stages here */}
        </div>
      </div>
    </div>
  );
};

export default ProjectProgressCard;