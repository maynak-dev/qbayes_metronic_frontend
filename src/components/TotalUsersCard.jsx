import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  PointElement
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler, PointElement);

const TotalUsersCard = ({
  weeklyData,
  monthlyData,
  weeklyChartData,
  monthlyChartData,
}) => {
  const [activeTab, setActiveTab] = useState('weekly');

  const current = activeTab === 'weekly' ? weeklyData : monthlyData;
  const currentChartData = activeTab === 'weekly' ? weeklyChartData : monthlyChartData;

  const isChartDataValid =
    currentChartData &&
    currentChartData.labels &&
    Array.isArray(currentChartData.labels) &&
    currentChartData.datasets &&
    Array.isArray(currentChartData.datasets);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  return (
    <div className="card card-flush h-100">
      <div className="card-body p-6">
        {/* Header with tabs */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h5 className="card-title fw-bold mb-0">Total Users</h5>
          <ul className="nav nav-tabs nav-tabs-line nav-bold nav-tabs-line-3x" role="tablist">
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === 'weekly' ? 'active' : ''}`}
                href="#"
                onClick={(e) => { e.preventDefault(); setActiveTab('weekly'); }}
                role="tab"
              >
                Weekly
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === 'monthly' ? 'active' : ''}`}
                href="#"
                onClick={(e) => { e.preventDefault(); setActiveTab('monthly'); }}
                role="tab"
              >
                Monthly
              </a>
            </li>
          </ul>
        </div>
        {/* Icon and count */}
        <div className="d-flex align-items-center mb-3">
          <div className="symbol symbol-50px me-3 bg-light-primary">
            <i className="bi bi-people fs-2x text-primary"></i>
          </div>
          <div>
            <span className="text-gray-600 fw-semibold d-block">Total Users</span>
            <span className="text-dark fs-1 fw-bold">{current.count}</span>
          </div>
        </div>
        {/* Growth badge */}
        <div className="d-flex align-items-center mb-4">
          <span className="badge badge-light-success me-2">{current.growth}</span>
          <span className="text-gray-500">Growth this {activeTab}</span>
        </div>
        {/* Chart */}
        <div className="mt-4" style={{ height: '150px' }}>
          {isChartDataValid ? (
            <Line data={currentChartData} options={chartOptions} />
          ) : (
            <p>No chart data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TotalUsersCard;