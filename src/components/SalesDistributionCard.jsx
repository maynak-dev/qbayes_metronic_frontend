import React from 'react';

const SalesDistributionCard = () => {
  const cities = ['NYC', 'LDN', 'PAR', 'TOK', 'BER'];
  const growth = '+7.4%';

  return (
    <div className="card card-flush h-100">
      <div className="card-body p-6">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h5 className="card-title fw-bold mb-0">Sales Distribution</h5>
          <span className="badge badge-light-success fs-6">{growth}</span>
        </div>
        <div className="d-flex flex-wrap align-items-center gap-3">
          {cities.map((city, idx) => (
            <span key={idx} className="badge badge-light-primary py-3 px-4 fs-6">
              {city}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesDistributionCard;