import React, { useState, useEffect } from 'https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.development.js';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    tenantName: '',
    firstName: '',
    lastName: '',
    country: '',
    agreeTerms: false,
  });
  const [passwordStrength, setPasswordStrength] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch('/api/auth/status', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.isAuthenticated) {
          setIsAuthenticated(true);
          window.location.href = '/dashboard';
        }
      })
      .catch(err => console.error('Auth check failed:', err));
  }, []);

  const checkPasswordStrength = (password) => {
    if (password.length < 6) return 'Weak';
    if (password.length >= 6 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return 'Strong';
    return 'Medium';
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      setError('You must agree to the Terms of Service.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        window.location.href = '/dashboard';
      } else {
        const data = await response.json();
        setError(data.message || 'Sign up failed.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
    setIsLoading(false);
  };

  if (isAuthenticated) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-purple-900 p-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Sign Up</h1>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300">Email or Phone</label>
            <input
              type="text"
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="relative">
            <label className="block text-sm text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <span className="text-xs text-gray-400 mt-1">{passwordStrength && `Strength: ${passwordStrength}`}</span>
          </div>
          <div className="relative">
            <label className="block text-sm text-gray-300">Organization Name</label>
            <input
              type="text"
              name="tenantName"
              value={formData.tenantName}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <span className="text-xs text-gray-400 mt-1 cursor-pointer" title="This will be your tenant/organization identifier">Why this?</span>
          </div>
          <div>
            <label className="block text-sm text-gray-300">First Name (Optional)</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300">Last Name (Optional)</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300">Country (Optional)</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="mr-2"
              required
            />
            <label className="text-sm text-gray-300">I agree to the <a href="/terms" className="text-purple-400 hover:underline">Terms of Service</a></label>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-sm text-gray-400 mt-4 text-center">
          Already have an account? <a href="/login" className="text-purple-400 hover:underline">Log In</a>
        </p>
      </div>
    </div>
  );
};

ReactDOM.render(<SignUpForm />, document.getElementById('root'));