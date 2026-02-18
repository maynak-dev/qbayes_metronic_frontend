import React from 'react';

const NewDesignationsCard = ({ designations }) => {
  if (!designations || designations.length === 0) {
    return (
      <div className="card card-flush h-100">
        <div className="card-body p-6">
          <h5 className="card-title fw-bold mb-6">New Designations</h5>
          <p className="text-muted">No designations</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card card-flush h-100">
      <div className="card-body p-6">
        <h5 className="card-title fw-bold mb-6">New Designations</h5>
        <div className="d-flex flex-column mb-6">
          {designations.map((item, idx) => (
            <div key={idx} className="d-flex flex-column mb-4">
              <span className="fw-bold text-dark">{item.title}</span>
              <span className="text-gray-500 fw-semibold">
                {item.company} · {item.date}
              </span>
            </div>
          ))}
        </div>
        <div className="text-end">
          <a href="/designations" className="fw-bold text-primary text-hover-primary">
            View All
            <i className="bi bi-arrow-right ms-1"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewDesignationsCard;