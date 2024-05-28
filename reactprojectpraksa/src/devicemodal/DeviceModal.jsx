import React, { useEffect, useState } from 'react';
import {
    CButton,
    CCol,
    CForm,
    CFormCheck,
    CFormFeedback,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow
} from '@coreui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define image URLs for each device type
const deviceImages = {
    'Photovoltaic panel': 'https://cdn-icons-png.flaticon.com/128/3392/3392674.png',
    'Battery': 'https://cdn-icons-png.flaticon.com/128/1835/1835726.png',
    'Wind turbine': 'https://cdn-icons-png.flaticon.com/128/5223/5223040.png',
    'Electrical vehicle': 'https://cdn-icons-png.flaticon.com/128/4277/4277309.png',
    'Electrical grid': 'https://cdn-icons-png.flaticon.com/128/12350/12350582.png',
    'Building': 'https://cdn-icons-png.flaticon.com/128/4200/4200376.png',
    'Residual electrical loads': 'https://cdn-icons-png.flaticon.com/128/11652/11652120.png'
};

const DeviceModal = ({ addDevice }) => {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [deviceCategory, setDeviceCategory] = useState('');
    const [categoryDisabled, setCategoryDisabled] = useState(true);
    const [deviceName, setDeviceName] = useState('');
    const [derId, setDerId] = useState('');

    const [outputPower, setOutputPower] = useState('');
    const [voltage, setVoltage] = useState('');
    const [current, setCurrent] = useState('');
    const [openCircuitVoltage, setOpenCircuitVoltage] = useState('');
    const [shortCircuitCurrent, setShortCircuitCurrent] = useState('');
    const [powerTolerance, setPowerTolerance] = useState('');
    const [maximumAvailablePower, setMaximumAvailablePower] = useState('');
    const [currentRatings, setcurrentRatings] = useState('');
    const [cutInWindSpeed, setCutInWindSpeed] = useState('');
    const [outputVoltages, setOutputVoltages] = useState('');
    const [powerRatings, setPowerRatings] = useState('');
    const [capacity, setCapacity] = useState('');
    const [minStateOfCharge, setMinStateOfCharge] = useState('');
    const [maxStateOfCharge, setMaxStateOfCharge] = useState('');
    const [motorPower, setMotorPower] = useState('');
    const [batteryCapacity, setBatteryCapacity] = useState('');
    const [co2EmissionRate, setCo2EmissionRate] = useState('');
    const [buildingMaxPower, setBuildingMaxPower] = useState('');
    const [residualMaxPower, setResidualMaxPower] = useState('');
    const [isNameValid, setIsNameValid] = useState(true);

    const handleNameChange = (e) => {
        const value = e.target.value;
        setDeviceName(value);
        if (value.length < 3) {
            setIsNameValid(false);
        } else {
            setIsNameValid(true);
        }
    };

    const handleSubmit = async (event) => {
        generateRandomNumber();
        const form = event.currentTarget;

        if (form.checkValidity() === false || !isNameValid) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();

            const deviceTypeEnumMap = {
                'Photovoltaic panel': 'PHOTOVOLTAIC_PANEL',
                'Battery': 'BATTERY',
                'Wind turbine': 'WIND_TURBINE',
                'Electrical vehicle': 'ELECTRICAL_VEHICLE',
                'Electrical grid': 'ELECTRICAL_GRID',
                'Building': 'BUILDING',
                'Residual electrical loads': 'RESIDUAL_ELECTRICAL_LOADS',
            };

            const deviceData = {
                name: deviceName,
                type: deviceTypeEnumMap[selectedType],
                derId: derId,
                category: deviceCategory,
                outputPower,
                voltage,
                current,
                openCircuitVoltage,
                shortCircuitCurrent,
                powerTolerance,
                maximumAvailablePower,
                currentRatings,
                powerRatings,
                cutInWindSpeed,
                capacity,
                minStateOfCharge,
                maxStateOfCharge,
                motorPower,
                batteryCapacity,
                co2EmissionRate,
                buildingMaxPower,
                residualMaxPower
            };

            try {
                const response = await fetch('http://localhost:8084/api/devices', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(deviceData),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const result = await response.json();
                console.log('Success:', result);
                toast.success('Form submitted successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                setTimeout(() => {
                    window.location.reload(false);
                }, 3000);

                setVisible(false);
                setValidated(false);
                setDeviceName('');
                setSelectedType('');
                setCategoryDisabled(true);
                setDeviceCategory('');
                setOutputPower('');
                setVoltage('');
                setCurrent('');
                setOpenCircuitVoltage('');
                setShortCircuitCurrent('');
                setPowerTolerance('');
                setMaximumAvailablePower('');
                setCutInWindSpeed('');
                setOutputVoltages('');
                setPowerRatings('');
                setCapacity('');
                setMinStateOfCharge('');
                setMaxStateOfCharge('');
                setMotorPower('');
                setBatteryCapacity('');
                setCo2EmissionRate('');
                setBuildingMaxPower('');
                setResidualMaxPower('');

            } catch (error) {
                console.error('Error adding device:', error);
                toast.error('Failed to submit form. Please try again.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        }
        setValidated(true);
    };

    const handleTypeChange = (event) => {
        const type = event.target.value;
        setSelectedType(type);
        setCategoryDisabled(false);
        setDeviceCategory(getDeviceCategory(type));
    };

    const generateRandomNumber = () => {
        const randomNumber = Math.floor(Math.random() * 1000000);
        setDerId(randomNumber.toString());
    };

    useEffect(() => {
        generateRandomNumber();
    }, []);

    const getDeviceCategory = (type) => {
        switch (type) {
            case 'Photovoltaic panel':
            case 'Wind turbine':
            case 'Electrical grid':
                return 'PRODUCER';
            case 'Building':
            case 'Electrical vehicle':
            case 'Residual electrical loads':
                return 'CONSUMER';
            case 'Battery':
                return 'MIXED';
            default:
                return '';
        }
    };

    const CustomSelectOption = ({ value, label }) => (
        <option value={value} className="d-flex align-items-center">
            <img src={deviceImages[value]} height="30" alt={label} className="me-2" />
            {label}
        </option>
    );

    return (
        <>
            <CButton color="primary" onClick={() => setVisible(!visible)}>
                Add Device
            </CButton>
            <CModal
                alignment="center"
                size="lg"
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="VerticallyCenteredExample"
            >
                <CModalHeader className="custom-modal-header">
                    <CModalTitle id="VerticallyCenteredExample">Add Device</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow className="mb-3">
                        <CCol sm="12" style={{ marginLeft: '43%' }}>
                            <CCol>
                                <img src={deviceImages[selectedType]} alt={selectedType} style={{ width: '10%', height: 'auto' }} />
                            </CCol>
                        </CCol>
                    </CRow>

                    <CForm
                        className="row g-3 needs-validation"
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <CCol md={6}>
                            <CFormLabel htmlFor="deviceName">Name</CFormLabel>
                            <CFormInput
                                type="text"
                                id="deviceName"
                                placeholder="Enter device name"
                                required
                                value={deviceName}
                                onChange={handleNameChange}
                                invalid={!isNameValid}
                            />
                            {!isNameValid && (
                                <CFormFeedback invalid>
                                    The device name must be at least 3 characters long.
                                </CFormFeedback>
                            )}
                        </CCol>
                        <CCol md={6}>
                            <CFormLabel htmlFor="deviceType">Type</CFormLabel>
                            <CFormSelect
                                id="deviceType"
                                value={selectedType}
                                onChange={handleTypeChange}
                                required
                            >
                                <option value="">Choose...</option>
                                {Object.keys(deviceImages).map((key) => (
                                    <CustomSelectOption key={key} value={key} label={key}/>
                                ))}
                            </CFormSelect>
                            <CFormFeedback invalid>Please select a device type.</CFormFeedback>
                        </CCol>
                        <CCol md={6}>
                            <CFormLabel htmlFor="derId">DER ID</CFormLabel>
                            <CFormInput
                                type="text"
                                id="derId"
                                placeholder="Automatically generated"
                                disabled
                                value={derId}
                                onChange={(e) => setDerId(e.target.value)}
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormLabel htmlFor="category">Category</CFormLabel>
                            <CFormInput
                                type="text"
                                id="category"
                                value={deviceCategory}
                                placeholder="Automatically determined"
                                disabled
                                onChange={(e) => setDeviceCategory(e.target.value)}
                            />
                        </CCol>

                        {/* Conditional rendering of fields based on selected device type */}
                        {selectedType === 'Photovoltaic panel' && (
                            <>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="outputPower">Output Power (kW)</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        id="outputPower"
                                        min="0"
                                        max="300"
                                        required
                                        value={outputPower}
                                        onChange={(e) => setOutputPower(e.target.value)}
                                    />
                                    <CFormFeedback invalid>Please provide a valid output power.</CFormFeedback>
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="voltage">Voltage (V)</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        id="voltage"
                                        min="0"
                                        max="30"
                                        required
                                        value={voltage}
                                        onChange={(e) => setVoltage(e.target.value)}
                                    />
                                    <CFormFeedback invalid>Please provide a valid voltage.</CFormFeedback>
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="current">Current (A)</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        id="current"
                                        min="0"
                                        max="10"
                                        required
                                        value={current}
                                        onChange={(e) => setCurrent(e.target.value)}
                                    />
                                    <CFormFeedback invalid>Please provide a valid current.</CFormFeedback>
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="openCircuitVoltage">Open Circuit Voltage (V)</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        id="openCircuitVoltage"
                                        min="0"
                                        max="40"
                                        required
                                        value={openCircuitVoltage}
                                        onChange={(e) => setOpenCircuitVoltage(e.target.value)}
                                    />
                                    <CFormFeedback invalid>Please provide a valid open circuit voltage.</CFormFeedback>
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="shortCircuitCurrent">Short Circuit Current (A)</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        id="shortCircuitCurrent"
                                        min="0"
                                        max value={shortCircuitCurrent}
                                        onChange={(e) => setShortCircuitCurrent(e.target.value)}
                                    />
                                    <CFormFeedback invalid>Please provide a valid short circuit current.</CFormFeedback>
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="powerTolerance">Power Tolerance</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        id="powerTolerance"
                                        min="-3"
                                        max="3"
                                        required
                                        value={powerTolerance}
                                        onChange={(e) => setPowerTolerance(e.target.value)}
                                    />
                                    <CFormFeedback invalid>Please provide a valid power tolerance.</CFormFeedback>
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="maximumAvailablePower">Maximum Available Power
                                        (kW)</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        id="maximumAvailablePower"
                                        min="0"
                                        max="250"
                                        required
                                        value={maximumAvailablePower}
                                        onChange={(e) => setMaximumAvailablePower(e.target.value)}
                                    />
                                    <CFormFeedback invalid>Please provide a valid maximum available
                                        power.</CFormFeedback>
                                </CCol>
                            </>
                        )}

                        {selectedType === 'Wind turbine' && (
                            <>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="cutInWindSpeed">Cut In Wind Speed (m/s)</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        id="cutInWindSpeed"
                                        min="1"
                                        max="3"
                                        required
                                        value={cutInWindSpeed}
                                        onChange={(e) => setCutInWindSpeed(e.target.value)}
                                    />
                                    <CFormFeedback invalid>Please provide a valid cut in wind speed.</CFormFeedback>
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="outputVoltages">Output Voltages</CFormLabel>
                                    <CFormSelect
                                        id="outputVoltages"
                                        required
                                        value={outputVoltages}
                                        onChange={(e) => setOutputVoltages(e.target.value)}
                                    >
                                        <option value="">Choose...</option>
                                        <option value="12">12V</option>
                                        <option value="48">48V</option>
                                    </CFormSelect>
                                    <CFormFeedback invalid>Please select an output voltage.</CFormFeedback>
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="powerRatings">Power Ratings</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        id="powerRatings"
                                        min="0"
                                        max="850"
                                        required
                                        value={powerRatings}
                                        onChange={(e) => setPowerRatings(e.target.value)}
                                    />
                                    <CFormFeedback invalid>Please provide a valid power rating.</CFormFeedback>
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="curentRating">Current Ratings</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        id="powerRatings"
                                        min="0"
                                        max="30"
                                        required
                                        value={currentRatings}
                                        onChange={(e) => setcurrentRatings(e.target.value)}
                                    />
                                    <CFormFeedback invalid>Please provide a valid power rating.</CFormFeedback>
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="maximumAvailablePower">Maximum avaliable power(kW)</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        id="powerRatings"
                                        min="0"
                                        max="30"
                                        required
                                        value={maximumAvailablePower}
                                        onChange={(e) => setMaximumAvailablePower(e.target.value)}
                                    />
                                    <CFormFeedback invalid>Please provide a valid power rating.</CFormFeedback>
                                </CCol>
                            </>
                        )}

                        {selectedType === 'Battery' && (
                            <>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="capacity">Capacity (kWh)</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        id="capacity"
                                        min="0"
                                        max="10"
                                        required
                                        value={capacity}
                                        onChange={(e) => setCapacity(e.target.value)}
                                    />
                                    <CFormFeedback invalid>Please provide a valid capacity.</CFormFeedback>
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel>State of Charge (%)</CFormLabel>
                                    <CRow>
                                        <CCol>
                                            <CFormLabel htmlFor="minStateOfCharge">Min</CFormLabel>
                                            <CFormInput
                                                type="number"
                                                id="minStateOfCharge"
                                                min="0"
                                                max="20"
                                                required
                                                value={minStateOfCharge}
                                                onChange={(e) => setMinStateOfCharge(e.target.value)}
                                            />
                                            <CFormFeedback invalid>Please provide a valid minimum state of
                                                charge.</CFormFeedback>
                                        </CCol>
                                        <CCol>
                                            <CFormLabel htmlFor="maxStateOfCharge">Max</CFormLabel>
                                            <CFormInput
                                                type="number"
                                                id="maxStateOfCharge"
                                                min="90"
                                                max="100"
                                                required
                                                value={maxStateOfCharge}
                                                onChange={(e) => setMaxStateOfCharge(e.target.value)}
                                            />
                                            <CFormFeedback invalid>Please provide a valid maximum state of
                                                charge.</CFormFeedback>
                                        </CCol>
                                    </CRow>
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="maximumAvailablePower">Maximum Available Power
                                        (kW)</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        id="maximumAvailablePower"
                                        min="0"
                                        max="10"
                                        required
                                        value={maximumAvailablePower}
                                        onChange={(e) => setMaximumAvailablePower(e.target.value)}
                                    />
                                    <CFormFeedback invalid>Please provide a valid maximum available
                                        power.{ maximumAvailablePower ? ` between 0 and ${maximumAvailablePower}` : ''}</CFormFeedback>
                                </CCol>
                            </>
                        )}

                        {selectedType === 'Electrical vehicle' && (
                            <>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="motorPower">Motor Power (kW)</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        id="motorPower"
                                        min="0"
                                        max="125"
                                        required
                                        value={motorPower}
                                        onChange={(e) => setMotorPower(e.target.value)}
                                    />
                                    <CFormFeedback invalid>Please provide a valid motor power.{motorPower ? ` between 0 and ${motorPower}` : ''}</CFormFeedback>
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="batteryCapacity">Battery (kWh)</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        id="batteryCapacity"
                                        min="0"
                                        max="33"
                                        required
                                        value={batteryCapacity}
                                        onChange={(e) => setBatteryCapacity(e.target.value)}
                                    />
                                    <CFormFeedback invalid>Please provide a valid battery capacity.{batteryCapacity ? ` between 0 and ${batteryCapacity}` : ''}</CFormFeedback>
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="maximumAvailablePower">Maximum Available Power
                                        (kW)</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        id="maximumAvailablePower"
                                        min="0"
                                        max="125"
                                        required
                                        value={maximumAvailablePower}
                                        onChange={(e) => setMaximumAvailablePower(e.target.value)}
                                    />
                                    <CFormFeedback invalid>Please provide a valid maximum available
                                        power.{maximumAvailablePower ? ` between 0 and ${maximumAvailablePower}` : ''}</CFormFeedback>
                                </CCol>
                            </>
                        )}

                        {selectedType === 'Electrical grid' && (
                            <>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="maximumAvailablePower">Maximum Available Power
                                        (kW)</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        id="maximumAvailablePower"
                                        min="0"
                                        max="3000"
                                        required
                                        value={maximumAvailablePower}
                                        onChange={(e) => setMaximumAvailablePower(e.target.value)}
                                    />
                                    <CFormFeedback invalid>Please provide a valid maximum available
                                        power.{maximumAvailablePower ? ` between 0 and ${maximumAvailablePower}` : ''}</CFormFeedback>
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="co2EmissionRate">CO2 Emission Rate (g/kWh)</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        id="co2EmissionRate"
                                        min="0"
                                        max="100"
                                        required
                                        value={co2EmissionRate}
                                        onChange={(e) => setCo2EmissionRate(e.target.value)}
                                    />
                                    <CFormFeedback invalid>Please provide a valid CO2 emission rate.{co2EmissionRate ? ` between 0 and ${co2EmissionRate}` : ''}</CFormFeedback>
                                </CCol>
                            </>
                        )}

                        {selectedType === 'Building' && (
                            <>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="buildingMaxPower">Maximum Available Power (kW)</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        id="buildingMaxPower"
                                        min="0"
                                        max="700"
                                        required
                                        value={buildingMaxPower}
                                        onChange={(e) => setBuildingMaxPower(e.target.value)}
                                    />
                                    <CFormFeedback invalid>Please provide a valid maximum available
                                        power.{buildingMaxPower ? ` between 0 and ${buildingMaxPower}` : ''}</CFormFeedback>
                                </CCol>
                            </>
                        )}

                        {selectedType === 'Residual electrical loads' && (
                            <>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="residualMaxPower">Maximum Available Power (kW)</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        id="residualMaxPower"
                                        min="0"
                                        max="30"
                                        required
                                        value={residualMaxPower}
                                        onChange={(e) => setResidualMaxPower(e.target.value)}
                                    />
                                    <CFormFeedback invalid>Please provide a valid maximum available
                                        power{residualMaxPower ? ` between 0 and ${residualMaxPower}` : ''}.</CFormFeedback>
                                </CCol>
                            </>
                        )}

                        <CCol xs={12}>

                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setVisible(false)}>
                                    Close
                                </CButton>
                                <CButton color="primary" type="submit">
                                    Submit form
                                </CButton>
                            </CModalFooter>
                        </CCol>
                    </CForm>
                </CModalBody>
            </CModal>
        </>
    );
};


export default DeviceModal;