import React, { useEffect, useState } from 'react';

const UserProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      // Fetch user details from localStorage
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }, []);

    
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = { ...user, photo: reader.result };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login'; // Redirect to login page
  };


  
    if (!user) {
      return <p>Loading...</p>;
    }
  
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <img
              src={user.photo || 'https://via.placeholder.com/150'}
              className="card-img-top"
              alt="User Profile"
            />
            <div className="card-body">
              {/* <h5 className="card-title">User Profile</h5> */}
              <p className="card-text">
                <strong>Name:</strong> {user.name}
              </p>
              <p className="card-text">
                <strong>Email:</strong> {user.email}
              </p>
              <div className="mb-3">
                <input type="file" onChange={handlePhotoUpload} />
              </div>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
