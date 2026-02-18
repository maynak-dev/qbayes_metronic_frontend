import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TotalUsersCard from '../components/TotalUsersCard';
import TrafficSourcesCard from '../components/TrafficSourcesCard';
import NewUsersCard from '../components/NewUsersCard';
import SalesDistributionCard from '../components/SalesDistributionCard';
import ProjectProgressCard from '../components/ProjectProgressCard';
import ActiveAuthorsCard from '../components/ActiveAuthorsCard';
import NewDesignationsCard from '../components/NewDesignationsCard';
import UserActivityStatsCard from '../components/UserActivityStatsCard';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // State for all dynamic data
  const [totalUsers, setTotalUsers] = useState({ count: 0, growth: '+0%' });
  const [recentUsers, setRecentUsers] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [trafficData, setTrafficData] = useState(null);
  const [activityData, setActivityData] = useState(null);
  const [authorsData, setAuthorsData] = useState([]);
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    'Content-Type': 'application/json',
  });

  // Helper to check response and handle 401
  const checkResponse = async (response) => {
    if (response.status === 401) {
      // Token expired or invalid – redirect to login
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      navigate('/admin');
      throw new Error('Unauthorized – redirecting to login');
    }
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const apiBase = import.meta.env.VITE_API_URL;
        if (!apiBase) throw new Error('VITE_API_URL not defined');

        // Fetch all endpoints in parallel
        const [
          usersCountRes,
          usersRes,
          designationsRes,
          trafficRes,
          activityRes,
          authorsRes,
          salesRes
        ] = await Promise.all([
          fetch(`${apiBase}/api/users/count/`, { headers: getAuthHeaders() }),
          fetch(`${apiBase}/api/users/recent/`, { headers: getAuthHeaders() }),
          fetch(`${apiBase}/api/designations/`, { headers: getAuthHeaders() }),
          fetch(`${apiBase}/api/traffic-sources/`, { headers: getAuthHeaders() }),
          fetch(`${apiBase}/api/user-activity/`, { headers: getAuthHeaders() }),
          fetch(`${apiBase}/api/active-authors/`, { headers: getAuthHeaders() }),
          fetch(`${apiBase}/api/sales-distribution/`, { headers: getAuthHeaders() })
        ]);

        // Parse all responses, checking for 401
        const [
          countData,
          usersData,
          designationsData,
          trafficDataRes,
          activityDataRes,
          authorsDataRes,
          salesDataRes
        ] = await Promise.all([
          checkResponse(usersCountRes),
          checkResponse(usersRes),
          checkResponse(designationsRes),
          checkResponse(trafficRes),
          checkResponse(activityRes),
          checkResponse(authorsRes),
          checkResponse(salesRes)
        ]);

        setTotalUsers({ count: countData.count, growth: countData.growth });
        setRecentUsers(usersData);
        setDesignations(designationsData);
        setTrafficData(trafficDataRes);
        setActivityData(activityDataRes);
        setAuthorsData(authorsDataRes);
        setSalesData(salesDataRes);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        if (!err.message.includes('Unauthorized')) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/admin');
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="alert alert-danger">
          Failed to load dashboard: {error}. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-row flex-column-fluid">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
        {/* Topbar */}
        <div className="header bg-white py-3 px-6 d-flex align-items-center justify-content-between border-bottom">
          <h4 className="mb-0">Dashboard &gt; Default</h4>
          <div className="d-flex align-items-center">
            <span className="fw-bold text-dark me-3">Maynak Dey</span>
            <div className="symbol symbol-40px">
              <img src="/assets/media/avatars/blank.png" alt="avatar" className="rounded-circle" />
            </div>
            <button onClick={handleLogout} className="btn btn-sm btn-light-primary ms-4">Logout</button>
          </div>
        </div>

        {/* Content */}
        <div className="content p-6">
          {/* First row */}
          <div className="row g-5 g-xl-8">
            <div className="col-xl-4">
              <TotalUsersCard
                weeklyData={{ count: totalUsers.count, growth: totalUsers.growth }}
                monthlyData={{ count: totalUsers.count, growth: totalUsers.growth }}
                weeklyChartData={{
                  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                  datasets: [{ data: [2, 4, 3, 5, 6, 4, 5], fill: false, borderColor: 'blue', tension: 0.4 }],
                }}
                monthlyChartData={{
                  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                  datasets: [{ data: [8, 10, 12, 10], fill: false, borderColor: 'blue', tension: 0.4 }],
                }}
              />
            </div>
            <div className="col-xl-4">
              <TrafficSourcesCard data={trafficData} />
            </div>
            <div className="col-xl-4">
              <NewUsersCard users={recentUsers} />
            </div>
          </div>

          {/* Second row */}
          <div className="row g-5 g-xl-8 mt-5">
            <div className="col-xl-4">
              <SalesDistributionCard data={salesData} />
            </div>
            <div className="col-xl-4">
              <ProjectProgressCard />
            </div>
            <div className="col-xl-4">
              <ActiveAuthorsCard authors={authorsData} />
            </div>
          </div>

          {/* Third row */}
          <div className="row g-5 g-xl-8 mt-5">
            <div className="col-xl-4">
              <NewDesignationsCard designations={designations} />
            </div>
            <div className="col-xl-8">
              <UserActivityStatsCard data={activityData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;