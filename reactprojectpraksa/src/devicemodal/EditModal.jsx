import React, { useState, useEffect } from 'react';
import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CButton,
    CForm,
    CCol,
    CFormInput,
    CFormFeedback,
    CFormLabel,
} from '@coreui/react';
import axios from 'axios';
import { toast } from 'react-toastify';

const deviceImages = {
    'PHOTOVOLTAIC_PANEL': 'https://cdn-icons-png.flaticon.com/128/3392/3392674.png',
    'BATTERY': 'https://cdn-icons-png.flaticon.com/128/1835/1835726.png',
    'WIND_TURBINE': 'https://cdn-icons-png.flaticon.com/128/5223/5223040.png',
    'ELECTRICAL_VEHICLE': 'https://cdn-icons-png.flaticon.com/128/4277/4277309.png',
    'ELECTRICAL_GRID': 'https://cdn-icons-png.flaticon.com/128/12350/12350582.png',
    'BUILDING': 'https://cdn-icons-png.flaticon.com/128/4200/4200376.png',
    'RESIDUAL_ELECTRICAL_LOADS': 'https://cdn-icons-png.flaticon.com/128/11652/11652120.png',
};

const EditModal = ({ isOpen, onClose, deviceId, fetchData }) => {
    const [validated, setValidated] = useState(false);
    const [device, setDevice] = useState({
        id: '',
        name: '',
        type: '',
        derId: '',
        category: '',
        outputPower: '',
        voltage: '',
        current: '',
        openCircuitVoltage: '',
        shortCircuitCurrent: '',
        powerTolerance: '',
        currentRatings: '',
        powerRatings: '',
        maximumAvailablePower: '',
        cutInWindSpeed: '',
        capacity: '',
        minStateOfCharge: '',
        maxStateOfCharge: '',
        motorPower: '',
        batteryCapacity: '',
        co2EmissionRate: '',
        buildingMaxPower: '',
        residualMaxPower: '',
    });

    useEffect(() => {
        if (deviceId) {
            fetchDeviceDetails(deviceId);
        }
    }, [deviceId]);

    const fetchDeviceDetails = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8084/api/devices/${id}`);
            setDevice(response.data);
        } catch (error) {
            console.error('Error fetching device details:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDevice(prevDevice => ({
            ...prevDevice,
            [name]: value
        }));
    };

    const handleNameInput = (e) => {
        const input = e.target;
        const minLength = 3;
        if (input.value.length < minLength) {
            input.setCustomValidity(`Name must be at least ${minLength} characters long.`);
        } else {
            input.setCustomValidity('');
        }
    };

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }
        try {
            await axios.patch(`http://localhost:8084/api/devices/${deviceId}`, device);
            toast.success("Device updated successfully");
            fetchData();
            onClose();
        } catch (error) {
            console.error('Error updating device:', error);
            toast.error("Error updating device");
        }
    };

    const fields = [
        { label: 'Name', name: 'name', minLength: 3 },
        { label: 'Type', name: 'type', readOnly: true },
        { label: 'DER ID', name: 'derId', readOnly: true },
        { label: 'Category', name: 'category', readOnly: true },
        { label: 'Output Power', name: 'outputPower', min: 0, max: 300 },
        { label: 'Voltage', name: 'voltage', min: 0, max: 30 },
        { label: 'Current', name: 'current', min: 0, max: 10 },
        { label: 'Open Circuit Voltage', name: 'openCircuitVoltage', min: 0, max: 40 },
        { label: 'Short Circuit Current', name: 'shortCircuitCurrent', min: 0, max: 10 },
        { label: 'Power Tolerance', name: 'powerTolerance', min: -3, max: 3 },
        { label: 'Power ratings', name: 'powerRatings', min: 0, max: 850 },
        { label: 'Current ratings', name: 'currentRatings', min: 0, max: 30 },
        { label: 'Maximum Available Power', name: 'maximumAvailablePower', min: 0, max: 250 },
        { label: 'Cut-in Wind Speed', name: 'cutInWindSpeed', min: 1, max: 30 },
        { label: 'Capacity', name: 'capacity', min: 0, max: 10 },
        { label: 'Min State of Charge', name: 'minStateOfCharge', min: 0, max: 20 },
        { label: 'Max State of Charge', name: 'maxStateOfCharge', min: 90, max: 100 },
        { label: 'Motor Power', name: 'motorPower', min: 0, max: 125 },
        { label: 'Battery Capacity', name: 'batteryCapacity', min: 0, max: 33 },
        { label: 'CO2 Emission Rate', name: 'co2EmissionRate', min: 0, max: 100 },
        { label: 'Building Max Power', name: 'buildingMaxPower', min: 0, max: 700 },
        { label: 'Residual Max Power', name: 'residualMaxPower', min: 0, max: 30 },
    ];

    const filteredFields = fields.filter(field => device[field.name] !== undefined && device[field.name] !== null);

    return (
        <CModal visible={isOpen} onClose={onClose} size={'lg'}>
            <CModalHeader className="custom-modal-header">
                <CModalTitle id="VerticallyCenteredExample">Edit Device</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <div className="d-flex justify-content-center mb-3">
                    <img
                        src={deviceImages[device.type]}
                        className="img-fluid"
                        alt={`Icon for ${device.type}`}
                        width={100}
                        height={100}
                    />
                </div>
                <CForm
                    className="row g-3 needs-validation"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                >
                    {filteredFields.map((field, index) => (
                        <CCol md={6} key={index}>
                            <CFormLabel htmlFor={field.name}>{field.label}</CFormLabel>
                            {field.readOnly ?
                                <CFormInput
                                    type="text"
                                    value={device[field.name]}
                                    id={field.name}
                                    name={field.name}
                                    readOnly
                                />
                                :
                                <CFormInput
                                    type={field.name === 'name' ? 'text' : 'number'}
                                    value={device[field.name]}
                                    onChange={handleInputChange}
                                    onInput={field.name === 'name' ? handleNameInput : null}
                                    id={field.name}
                                    name={field.name}
                                    placeholder={`Enter ${field.label.toLowerCase()}`}
                                    readOnly={field.readOnly}
                                    required={!field.readOnly}
                                    min={field.min}
                                    max={field.max}
                                    minLength={field.name === 'name' ? field.minLength : undefined}
                                />
                            }
                            <CFormFeedback valid>Looks good!</CFormFeedback>
                            <CFormFeedback invalid>
                                {field.name === 'name' && field.minLength ?
                                    `Name must be at least ${field.minLength} characters long.`
                                    : `Please provide a valid ${field.label.toLowerCase()}${field.min ? ` between ${field.min} and ${field.max}` : ''}.`}
                            </CFormFeedback>
                        </CCol>
                    ))}
                    <CCol xs={12}>
                        <CButton color="primary" type="submit">
                            Save Changes
                        </CButton>
                    </CCol>
                </CForm>
            </CModalBody>
        </CModal>
    );
};

export default EditModal;