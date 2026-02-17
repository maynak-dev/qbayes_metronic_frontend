import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
const AdminLogin = () => {
  const [activeForm, setActiveForm] = useState('signin');
  const signinFormRef = useRef(null);
  const forgotFormRef = useRef(null);
  const signinValidationRef = useRef(null);
  const forgotValidationRef = useRef(null);

  const [signInData, setSignInData] = useState({ username: '', password: '', remember: false });
  const [forgotData, setForgotData] = useState({ email: '' });
  const navigate = useNavigate();
  const scrollTop = () => {
    if (window.KTUtil && typeof window.KTUtil.scrollTop === 'function') {
      window.KTUtil.scrollTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // --- Sign In Form Validation ---
useEffect(() => {
  if (activeForm === 'signin' && signinFormRef.current) {
    if (signinValidationRef.current) signinValidationRef.current.destroy();

    const validation = window.FormValidation.formValidation(signinFormRef.current, {
      fields: {
        username: { validators: { notEmpty: { message: 'Username is required' } } },
        password: { validators: { notEmpty: { message: 'Password is required' } } },
      },
      plugins: {
        trigger: new window.FormValidation.plugins.Trigger(),
        submitButton: new window.FormValidation.plugins.SubmitButton(),
        bootstrap: new window.FormValidation.plugins.Bootstrap(),
      },
    });
    signinValidationRef.current = validation;

    const submitBtn = document.getElementById('kt_login_signin_submit');
    const handleSignInClick = (e) => {
      e.preventDefault();
      validation.validate().then((status) => {
        if (status === 'Valid') {
          // Send login request to Django backend
          fetch(`${import.meta.env.VITE_API_URL}/api/token/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: signInData.username,
              password: signInData.password,
            }),
          })
            .then((res) => {
              if (!res.ok) {
                return res.json().then((err) => Promise.reject(err));
              }
              return res.json();
            })
            .then((data) => {
              // Store tokens
              localStorage.setItem('access_token', data.access);
              localStorage.setItem('refresh_token', data.refresh);
              // Redirect to dashboard
              navigate('/admindashboard');
            })
            .catch((error) => {
              console.error('Login error:', error);
              window.Swal.fire({
                text: error.detail || 'Invalid credentials or server error',
                icon: 'error',
                buttonsStyling: false,
                confirmButtonText: 'Ok, got it!',
                customClass: { confirmButton: 'btn font-weight-bold btn-light-primary' },
              }).then(scrollTop);
            });
        } else {
          window.Swal.fire({
            text: 'Please fill in all fields',
            icon: 'error',
            buttonsStyling: false,
            confirmButtonText: 'Ok, got it!',
            customClass: { confirmButton: 'btn font-weight-bold btn-light-primary' },
          }).then(scrollTop);
        }
      });
    };

    if (submitBtn) submitBtn.addEventListener('click', handleSignInClick);
    return () => {
      if (submitBtn) submitBtn.removeEventListener('click', handleSignInClick);
      if (signinValidationRef.current) {
        signinValidationRef.current.destroy();
        signinValidationRef.current = null;
      }
    };
  }
  // Add signInData as a dependency so the handler always uses the latest form values
}, [activeForm, signInData, navigate]);
 

  // --- Forgot Password Form Validation ---
  useEffect(() => {
    if (activeForm === 'forgot' && forgotFormRef.current) {
      if (forgotValidationRef.current) forgotValidationRef.current.destroy();
      const validation = window.FormValidation.formValidation(forgotFormRef.current, {
        fields: {
          email: {
            validators: {
              notEmpty: { message: 'Email address is required' },
              emailAddress: { message: 'The value is not a valid email address' },
            },
          },
        },
        plugins: {
          trigger: new window.FormValidation.plugins.Trigger(),
          bootstrap: new window.FormValidation.plugins.Bootstrap(),
        },
      });
      forgotValidationRef.current = validation;

      const submitBtn = document.getElementById('kt_login_forgot_submit');
      const handleForgotClick = (e) => {
        e.preventDefault();
        validation.validate().then((status) => {
          if (status === 'Valid') {
            scrollTop();
          } else {
            window.Swal.fire({
              text: 'Sorry, looks like there are some errors detected, please try again.',
              icon: 'error',
              buttonsStyling: false,
              confirmButtonText: 'Ok, got it!',
              customClass: { confirmButton: 'btn font-weight-bold btn-light-primary' },
            }).then(scrollTop);
          }
        });
      };

      if (submitBtn) submitBtn.addEventListener('click', handleForgotClick);
      return () => {
        if (submitBtn) submitBtn.removeEventListener('click', handleForgotClick);
        if (forgotValidationRef.current) {
          forgotValidationRef.current.destroy();
          forgotValidationRef.current = null;
        }
      };
    }
  }, [activeForm]);

  return (
    <>
      <style>
        {`
        /* Full height container, centers content */
        .login-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: url('/assets/media/bg/bg-2.jpg') no-repeat center center fixed;
          background-size: cover;
        }
        /* Form wrapper with transparent background (no overlay) */
        .login-form-wrapper {
          padding: 40px;
          max-width: 400px;
          width: 100%;
          border-radius: 8px;
        }
        /* Style logo image for better appearance */
        .max-h-75px {
          max-height: 75px;
        }
        /* Style for header texts for better visibility */
        .header-text {
          text-align: center;
          margin-bottom: 20px;
        }
        .header-text h3,
        .header-text p {
          color: #fff; /* White text for visibility */
        }
        `}
      </style>
      <div className="login-page">
        <div className="login-form-wrapper">
          {/* Logo */}
          <div className="d-flex flex-center mb-15">
            <a href="#">
              <img src="/assets/media/logos/logo-letter-13.png" className="max-h-75px" alt="logo" />
            </a>
          </div>

          {/* Sign In Header with more visible text */}
          {activeForm === 'signin' && (
            <div className="header-text mb-20">
              <h3 className="font-weight-normal mb-2">Sign In To Admin</h3>
              <p className="mb-0">Enter your details to login to your account:</p>
            </div>
          )}

          {/* Sign In Form */}
          {activeForm === 'signin' && (
            <div className="login-signin">
              <form className="form" id="kt_login_signin_form" ref={signinFormRef}>
                <div className="form-group">
                  <input
                    className="form-control h-auto text-white bg-white-o-5 rounded-pill border-0 py-4 px-8"
                    type="text"
                    placeholder="Username"
                    name="username"
                    autoComplete="off"
                    value={signInData.username}
                    onChange={(e) => setSignInData({ ...signInData, username: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control h-auto text-white bg-white-o-5 rounded-pill border-0 py-4 px-8"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={signInData.password}
                    onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                  />
                </div>
                <div className="form-group d-flex flex-wrap justify-content-between align-items-center px-8 opacity-60">
                  <div className="checkbox-inline">
                    <label className="checkbox checkbox-outline checkbox-white m-0">
                      <input
                        type="checkbox"
                        name="remember"
                        checked={signInData.remember}
                        onChange={(e) => setSignInData({ ...signInData, remember: e.target.checked })}
                      />
                      <span></span>Remember me
                    </label>
                  </div>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); setActiveForm('forgot'); }}
                    className="text-white font-weight-bold"
                    id="kt_login_forgot"
                  >
                    Forget Password ?
                  </a>
                </div>
                <div className="form-group text-center mt-10">
                  <button
                    type="button"
                    id="kt_login_signin_submit"
                    className="btn btn-pill btn-primary opacity-90 px-15 py-3"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Forgot Password Form */}
          {activeForm === 'forgot' && (
            <div className="login-forgot">
              <form className="form" id="kt_login_forgot_form" ref={forgotFormRef}>
                <div className="form-group mb-10">
                  <input
                    className="form-control h-auto text-white bg-white-o-5 rounded-pill border-0 py-4 px-8"
                    type="email"
                    placeholder="Email"
                    name="email"
                    autoComplete="off"
                    value={forgotData.email}
                    onChange={(e) => setForgotData({ email: e.target.value })}
                  />
                </div>
                <div className="form-group d-flex flex-column flex-sm-row justify-content-center">
                  <button
                    type="button"
                    id="kt_login_forgot_submit"
                    className="btn btn-pill btn-primary opacity-90 px-15 py-3 m-2"
                  >
                    Request
                  </button>
                  <button
                    type="button"
                    id="kt_login_forgot_cancel"
                    className="btn btn-pill btn-outline-white opacity-70 px-15 py-3 m-2"
                    onClick={() => setActiveForm('signin')}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminLogin;