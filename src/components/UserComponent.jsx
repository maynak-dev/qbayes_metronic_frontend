import React from 'react';

const UserComponent = ({ users }) => {
  return (
    <div className="card card-custom card-stretch gutter-b">
      {/* Header */}
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">Agents Stats</span>
          <span className="text-muted mt-3 font-weight-bold font-size-sm">
            More than 400+ new members
          </span>
        </h3>
        <div className="card-toolbar">
          <a href="#" className="btn btn-success font-weight-bolder font-size-sm">
            <span className="svg-icon svg-icon-md svg-icon-white">
              {/* SVG icon for Add User */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
              >
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <polygon points="0 0 24 0 24 24 0 24" />
                  <path
                    d="M18,8 L16,8 C15.4477153,8 15,7.55228475 15,7 C15,6.44771525 15.4477153,6 16,6 L18,6 L18,4 C18,3.44771525 18.4477153,3 19,3 C19.5522847,3 20,3.44771525 20,4 L20,6 L22,6 C22.5522847,6 23,6.44771525 23,7 C23,7.55228475 22.5522847,8 22,8 L20,8 L20,10 C20,10.5522847 19.5522847,11 19,11 C18.4477153,11 18,10.5522847 18,10 L18,8 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z"
                    fill="#000000"
                    fillRule="nonzero"
                    opacity="0.3"
                  />
                  <path
                    d="M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z"
                    fill="#000000"
                    fillRule="nonzero"
                  />
                </g>
              </svg>
            </span>
            Add New Member
          </a>
        </div>
      </div>
      {/* Body */}
      <div className="card-body py-0">
        {/* Table */}
        <div className="table-responsive">
          <table
            className="table table-head-custom table-vertical-center"
            id="kt_advance_table_widget_1"
          >
            <thead>
              <tr className="text-left">
                <th className="pl-0" style={{ width: '20px' }}>
                  <label className="checkbox checkbox-lg checkbox-inline">
                    <input type="checkbox" value="1" />
                    <span></span>
                  </label>
                </th>
                <th className="pr-0" style={{ width: '50px' }}>Authors</th>
                <th style={{ minWidth: '200px' }}></th>
                <th style={{ minWidth: '150px' }}>Company</th>
                <th style={{ minWidth: '150px' }}>Progress</th>
                <th className="pr-0 text-right" style={{ minWidth: '150px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users && users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index}>
                    {/* Checkbox */}
                    <td className="pl-0">
                      <label className="checkbox checkbox-lg checkbox-inline">
                        <input type="checkbox" value="1" />
                        <span></span>
                      </label>
                    </td>
                    {/* Avatar */}
                    <td className="pr-0">
                      <div className="symbol symbol-50 symbol-light mt-1">
                        <span className="symbol-label">
                          <img
                            src={user.avatar}
                            className="h-75 align-self-end"
                            alt=""
                          />
                        </span>
                      </div>
                    </td>
                    {/* Name & Skills */}
                    <td className="pl-0">
                      <a href="#" className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">
                        {user.name}
                      </a>
                      <span className="text-muted font-weight-bold d-block">{user.skills}</span>
                    </td>
                    {/* Company & Industry */}
                    <td>
                      <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                        {user.company}
                      </span>
                      <span className="text-muted font-weight-bold">{user.industry}</span>
                    </td>
                    {/* Progress */}
                    <td>
                      <div className="d-flex flex-column w-100 mr-2">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span className="text-muted mr-2 font-size-sm font-weight-bold">
                            {user.progress}%
                          </span>
                          <span className="text-muted font-size-sm font-weight-bold">Progress</span>
                        </div>
                        <div className="progress progress-xs w-100">
                          <div
                            className={`progress-bar bg-${user.progressColor}`}
                            role="progressbar"
                            style={{ width: `${user.progress}%` }}
                            aria-valuenow={user.progress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          ></div>
                        </div>
                      </div>
                    </td>
                    {/* Action buttons */}
                    <td className="pr-0 text-right">
                      {/* Settings button */}
                      <a href="#" className="btn btn-icon btn-light btn-hover-primary btn-sm">
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                          {/* SVG for settings */}
                          {/* You can include SVG code here */}
                        </span>
                      </a>
                      {/* Edit button */}
                      <a href="#" className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3">
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                          {/* SVG for edit */}
                        </span>
                      </a>
                      {/* Delete button */}
                      <a href="#" className="btn btn-icon btn-light btn-hover-primary btn-sm">
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                          {/* SVG for delete */}
                        </span>
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* End table */}
      </div>
    </div>
  );
};

export default UserComponent;