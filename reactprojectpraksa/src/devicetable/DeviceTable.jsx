import React, { useState, useEffect } from 'react';
import {
    CButton,
} from '@coreui/react';
import { CSmartTable } from '@coreui/react-pro';
import '@fortawesome/fontawesome-free/css/all.min.css';
import DeviceModal from "../devicemodal/DeviceModal";
import EditModal from "../devicemodal/EditModal";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeviceTable = () => {
    const [details, setDetails] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedDeviceId, setSelectedDeviceId] = useState(null);
    const [filterText, setFilterText] = useState('');
    const inputStyle = {
        width: '200px',
        padding: '0.375rem 0.75rem',
        marginRight: '10px',
        borderRadius: '10px',
    };

    const columns = [
        {
            key: 'id',
            label: 'DER ID',
            _style: { width: '16%', textAlign: 'center' },
        },
        {
            key: 'icon',
            label: 'Icon',
            _style: { width: '16%', textAlign: 'center' },
            sorter: false, // Disable sorting for this column
        },
        {
            key: 'name',
            label: 'Name',
            _style: { width: '16%', textAlign: 'center' },
        },
        {
            key: 'type',
            label: 'Type',
            _style: { width: '16%', textAlign: 'center' },
        },
        {
            key: 'action',
            label: 'Action',
            _style: { width: '16%', textAlign: 'center' },
            sorter: false, // Disable sorting for this column
        },
    ];

    const [devices, setDevices] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8084/api/devices'); // Adjust URL as per your backend
            setDevices(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const gettypeIcon = (type) => {
        switch (type) {
            case 'PHOTOVOLTAIC_PANEL':
                return <img src="https://cdn-icons-png.flaticon.com/128/3392/3392674.png" height="40px" alt="Solar Panel" />;
            case 'BATTERY':
                return <img src="https://cdn-icons-png.flaticon.com/128/1835/1835726.png" height="40px" alt="Battery" />;
            case 'WIND_TURBINE':
                return <img src="https://cdn-icons-png.flaticon.com/128/5223/5223040.png" height="40px" alt="Wind Turbine" />;
            case 'ELECTRICAL_VEHICLE':
                return <img src="https://cdn-icons-png.flaticon.com/128/4277/4277309.png" height="40px" alt="Electrical Vehicle" />;
            case 'ELECTRICAL_GRID':
                return <img src="https://cdn-icons-png.flaticon.com/128/12350/12350582.png" height="40px" alt="Electrical Grid" />;
            case 'BUILDING':
                return <img src="https://cdn-icons-png.flaticon.com/128/4200/4200376.png" height="40px" alt="Building" />;
            case 'RESIDUAL_ELECTRICAL_LOADS':
                return <img src="https://cdn-icons-png.flaticon.com/128/11652/11652120.png" height="40px" alt="Residual Electrical Loads" />;
            default:
                return null;
        }
    };

    const openDeviceModal = () => setIsModalOpen(true);
    const closeDeviceModal = () => setIsModalOpen(false);

    const openEditModal = (id) => {
        setSelectedDeviceId(id);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setSelectedDeviceId(null);
        setIsEditModalOpen(false);
    };

    const confirmDelete = (id) => {
        toast.warn(
            <div>
                <span>Are you sure you want to delete this device?</span>
                <div className="d-grid gap-4 d-md-flex justify-content-md-end">
                    <CButton color="danger" className="mr-2" onClick={() => handleDelete(id)}>Yes</CButton>
                    <CButton color="secondary" onClick={toast.dismiss}>No</CButton>
                </div>
            </div>,
            {
                position: "top-center",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }
        );
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8084/api/devices/${id}`); // Adjust URL as per your backend
            setDevices(devices.filter(device => device.id !== id));
            toast.dismiss();
            toast.success("Device deleted successfully");
        } catch (error) {
            console.error('Error deleting device:', error);
            toast.error("Error deleting device");
        }
    };

    const filteredItems = devices.filter(item =>
        item.name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.type.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '20px', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Filter by name..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    style={inputStyle}
                />
                <DeviceModal
                    isOpen={isModalOpen}
                    onClose={closeDeviceModal}
                    fetchData={fetchData} // Pass fetchData to refresh the table after adding a new device
                />
                <EditModal
                    isOpen={isEditModalOpen}
                    onClose={closeEditModal}
                    deviceId={selectedDeviceId}
                    fetchData={fetchData} // Pass fetchData to refresh the table after editing a device
                />
            </div>

            <CSmartTable
                columns={columns}
                items={filteredItems}
                columnSorter
                itemsPerPage={6}
                pagination
                paginationProps={{
                    className: 'd-flex justify-content-center',
                    style: {
                        marginTop: '20px',
                    }
                }}
                scopedColumns={{
                    id: (item) => (
                        <td className="text-center">
                            {item.derId}
                        </td>
                    ),
                    icon: (item) => (
                        <td className="text-center">
                            {gettypeIcon(item.type)}
                        </td>
                    ),
                    name: (item) => (
                        <td className="text-center">
                            {item.name}
                        </td>
                    ),
                    type: (item) => (
                        <td className="text-center">
                            {item.type}
                        </td>
                    ),
                    action: (item) => (
                        <td className="text-center d-grid gap-4">
                            <div>
                                <CButton color="danger" onClick={() => confirmDelete(item.id)} style={{ marginRight: '10px' }}>Delete</CButton>
                                <CButton color="success" onClick={() => openEditModal(item.id)}>Edit</CButton>
                            </div>
                        </td>
                    ),
                    show_details: (item) => (
                        <td className="py-2"></td>
                    ),
                }}
                tableProps={{
                    color: 'light',
                    className: 'add-this-class',
                    responsive: true,
                    striped: true,
                    hover: true,
                    style: {
                        width: '80%',
                        margin: 'auto',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        backgroundColor: '#343a40',
                        color: 'white',
                    }
                }}
                tableBodyProps={{
                    className: 'align-middle',
                    style: {
                        backgroundColor: '#343a40',
                        color: 'white',
                    },
                }}
                sorterValue={{ column: 'status', state: 'asc' }}
            />

            <ToastContainer />
        </>
    );
};

export default DeviceTable;