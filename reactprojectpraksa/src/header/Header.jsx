import React, { useState } from 'react';
import {
    CButton,
    CCol,
    CContainer,
    CCollapse,
    CForm,
    CFormInput,
    CNavbar,
    CNavbarBrand,
    CNavbarNav,
    CNavbarToggler,
    CRow
} from '@coreui/react';
import DeviceModal from '../devicemodal/DeviceModal';
import DeviceTable from "../devicetable/DeviceTable";

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const closeDeviceModal = () => {
        setIsModalOpen(false);
    };

    const navbarStyle = {
        backgroundColor: 'transparent',
        color: 'white',
    };

    const inputStyle = {
        width: '200px',
        padding: '0.375rem 0.75rem',
    };

    const buttonStyle = {
        padding: '0.375rem 0.75rem',
        color: 'white',
    };

    return (
        <>
            <CNavbar expand="lg" className="navbar-custom" style={navbarStyle}>
                <CContainer fluid>
                    <CNavbarBrand style={navbarStyle}>DER</CNavbarBrand>
                    <CNavbarToggler onClick={toggleModal} />
                    <CCollapse className="navbar-collapse" navbar>
                        <CNavbarNav className="ms-auto me-auto"> {/* Adjusted here to center align items */}
                            <CForm className="d-flex">



                                    {/*<DeviceModal visible={isModalOpen} onClose={closeDeviceModal} /> /!* Pass visibility state and function to close modal *!/*/}

                            </CForm>
                        </CNavbarNav>
                    </CCollapse>
                </CContainer>
            </CNavbar>

            <DeviceTable />

        </>
    );
};

export default Navbar;
