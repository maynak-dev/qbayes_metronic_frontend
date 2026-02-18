import React from 'react';

const UserActivityStatsCard = ({ data }) => {
  const isDataValid =
    data &&
    Array.isArray(data.labels) &&
    Array.isArray(data.series) &&
    data.labels.length > 0 &&
    data.series.length > 0;

  return (
    <div className="card card-flush h-100">
      <div className="card-body p-6">
        <h5 className="card-title fw-bold mb-4">User Activity Stats</h5>
        {!isDataValid ? (
          <div
            style={{
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <h6 className="text-muted">
              {data === null ? 'Loading...' : 'No data available'}
            </h6>
          </div>
        ) : (
          // Example placeholder: replace with your actual chart component
          <div style={{ height: '200px' }}>
            {/* Your chart component here, e.g., Line, Bar, etc., with validated data */}
            {/* For demonstration, showing a message */}
            <p>Chart would render here with valid data.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserActivityStatsCard;