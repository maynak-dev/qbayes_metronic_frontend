import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TrafficSourcesCard = ({ data }) => {
  if (!data || !data.labels || !data.series) {
    return (
      <div className="card card-flush h-100">
        <div className="card-body p-6">
          <h5 className="card-title fw-bold mb-4">Traffic Sources</h5>
          <p className="text-muted">No data available</p>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.series,
        backgroundColor: ['#3699FF', '#FFA800', '#F64E60', '#8950FC', '#1BC5BD'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { position: 'bottom' },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="card card-flush h-100">
      <div className="card-header">
        <h3 className="card-title mb-0">Traffic Sources</h3>
        {/* Dropdown menu for actions */}
        <div className="card-toolbar">
          <div className="dropdown">
            <button
              className="btn btn-sm btn-icon btn-light-primary"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {/* SVG icon for the button */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-more-vertical"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card-body pt-0">
        {/* Chart container with SVG icon */}
        <div className="d-flex justify-content-center mb-10" style={{ height: '150px' }}>
          {/* You can replace this SVG with your actual icon */}
          <svg
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" stroke="#3699FF" strokeWidth="2" />
            <path d="M12 6v6l4 2" stroke="#3699FF" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        {/* Dynamic list of traffic sources */}
        <div className="d-flex flex-wrap gap-2">
          {data.labels.map((label, idx) => (
            <span key={idx} className="badge badge-light-primary py-3 px-4 fs-6">
              {label}
            </span>
          ))}
        </div>
        {/* Pie chart */}
        <div style={{ height: '200px', marginTop: '20px' }}>
          <Pie data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default TrafficSourcesCard;