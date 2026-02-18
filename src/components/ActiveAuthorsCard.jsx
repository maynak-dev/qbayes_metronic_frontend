import React from 'react';

const ActiveAuthorsCard = ({ authors, showToggle, isActive, onToggle }) => {
  if (!authors || authors.length === 0) {
    return (
      <div className="card card-flush h-100">
        <div className="card-body p-6">
          <h5 className="card-title fw-bold mb-0">Active Authors</h5>
          <p className="text-gray-500 fw-semibold mb-5">Top contributing users stats</p>
          <p className="text-muted">No data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card card-flush h-100">
      <div className="card-body p-6">
        <h5 className="card-title fw-bold mb-0">Active Authors</h5>
        <p className="text-gray-500 fw-semibold mb-5">Top contributing users stats</p>
        {showToggle && (
          <div className="form-check form-switch mb-4">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isActive}
              onChange={(e) => onToggle(e.target.checked)}
              id="authorsToggle"
            />
            <label className="form-check-label" htmlFor="authorsToggle">
              {isActive ? 'Active' : 'Inactive'}
            </label>
          </div>
        )}
        <div className="d-flex flex-column">
          {authors.map((author, idx) => (
            <div key={idx} className="mb-5">
              <div className="d-flex justify-content-between mb-2">
                <span className="fw-bold text-dark">{author.name}</span>
                <span className="text-gray-500">{author.role}</span>
              </div>
              <div className="progress h-10px bg-light-primary">
                <div className="progress-bar bg-primary" style={{ width: `${author.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActiveAuthorsCard;