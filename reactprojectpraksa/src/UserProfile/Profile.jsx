import React, { useState, useContext } from 'react';
import {
    CNavbar,
    CContainer,
    CNavbarToggler,
    CCollapse,
    CNavbarNav,
    CButton,
    CForm,
    CNavbarBrand
} from '@coreui/react';
import { UserContext } from '../context/UserContext';
import DeviceTable from "../devicetable/DeviceTable";
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Import CSS for custom styles
import { ToastContainer, toast } from 'react-toastify';
const UserProfile = () => {
    const [visible, setVisible] = useState(false);
    const { user, setUser } = useContext(UserContext); // Added setUser to clear user data from context
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        setUser(null); // Clear user data from context
        navigate('/'); // Navigate to the homepage or login page
    };

    return (
        <>
            <CNavbar expand="lg" colorScheme="blue">
                {/*<CNavbarBrand style={{ color: 'white',marginLeft: '110px' }}>DER</CNavbarBrand>*/}
                <CContainer fluid>
                    <CNavbarToggler onClick={() => setVisible(!visible)} />
                    <CCollapse className="navbar-collapse" visible={visible}>
                        <CNavbarNav style={{ width: '86%' }}>

                            {/* Add any additional navigation items here */}
                        </CNavbarNav>
                        {user && (
                            <div className="user-info">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/6052/6052205.png"
                                    alt="User Icon"
                                    className="user-icon"
                                />
                                <span className="user-email">{user.email}</span>
                            </div>
                        )}
                        <CForm className="d-flex align-items-center">
                            <CButton
                                type="button"
                                color="success"
                                variant="outline"
                                className="logout-button"
                                onClick={handleLogout}
                            >
                                Log out
                            </CButton>
                        </CForm>
                    </CCollapse>
                </CContainer>
            </CNavbar>

            <h1 style={{ textAlign: 'center' }}>Welcome {user?.username}</h1>
            {user ? (

                <div>
                    <ToastContainer />
                    <DeviceTable />
                </div>
            ) : (
                <p>No user data available.</p>
            )}
        </>
    );
};

export default UserProfile;
