import React, { useEffect, useRef, useState } from 'react';
import { HomeFilled } from '@ant-design/icons';
import { RxAvatar } from "react-icons/rx";
export const Header = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };


  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5038/api/resumedb/getUsers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`

        }
      })
        .then(response => response.json())
        .then(data => setUsername(data.username))
        .catch(error => console.error('Error fetching profile:', error));

    }

  }, []);
  
  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('Token removed from localStorage');
    window.location.href = '/';
  };
console.log(username)
  return (
    <div className='header-container'>
      <a href='/'><HomeFilled /> Home</a>
      <div className='header-register'>
        <div className='header-sign-login' >
          <a href='/register'>Sign Up</a>
          <a href='/login'>Login</a>
        </div>
        <div className="dropdown" ref={dropdownRef}>
          {username ? (
            <button onClick={toggleDropdown} className="dropbtn">Welcome, {username}<RxAvatar /></button>
          ) : (
            <p></p>
          )}
          <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
            {username ? (
              <a href='/myResumes'>My Resumes</a>
            ) : (
              <p></p>
            )}
            <a href='/' onClick={handleLogout}>Logout</a>
          </div>
        </div>
      </div>
    </div>
  );
};
