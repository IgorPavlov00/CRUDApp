package com.PraksaZadatak.demo.device;

import com.PraksaZadatak.demo.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

    public Device addDevice(Device device) {
        return deviceRepository.save(device);
    }

    public Device updateDevice(Long id, Device updatedDevice) {
        return deviceRepository.findById(id)
                .map(device -> {
                    device.setName(updatedDevice.getName());
                    device.setType(updatedDevice.getType());
                    device.setDerId(updatedDevice.getDerId());
                    device.setCategory(updatedDevice.getCategory());
                    device.setOutputPower(updatedDevice.getOutputPower());
                    device.setVoltage(updatedDevice.getVoltage());
                    device.setCurrent(updatedDevice.getCurrent());
                    device.setOpenCircuitVoltage(updatedDevice.getOpenCircuitVoltage());
                    device.setShortCircuitCurrent(updatedDevice.getShortCircuitCurrent());
                    device.setPowerTolerance(updatedDevice.getPowerTolerance());
                    device.setMaximumAvailablePower(updatedDevice.getMaximumAvailablePower());
                    device.setCutInWindSpeed(updatedDevice.getCutInWindSpeed());
                    device.setCapacity(updatedDevice.getCapacity());
                    device.setMinStateOfCharge(updatedDevice.getMinStateOfCharge());
                    device.setMaxStateOfCharge(updatedDevice.getMaxStateOfCharge());
                    device.setMotorPower(updatedDevice.getMotorPower());
                    device.setBatteryCapacity(updatedDevice.getBatteryCapacity());
                    device.setCo2EmissionRate(updatedDevice.getCo2EmissionRate());
                    device.setPowerRatings(updatedDevice.getPowerRatings());
                    device.setCurrentRatings(updatedDevice.getCurrentRatings());
                    return deviceRepository.save(device);
                }).orElseThrow(() -> new ResourceNotFoundException("Device not found with id " + id));
    }

    public void deleteDevice(Long id) {
        deviceRepository.deleteById(id);
    }

    public Device getById(Long id) {
        Optional<Device> optionalDevice = deviceRepository.findById(id);
        return optionalDevice.orElse(null);
    }
    public List<Device> getAllDevicesForUser(User user) {
        return deviceRepository.findByUser(user);
    }

    public Optional<Device> getDeviceByIdForUser(Long deviceId, User user) {
        return deviceRepository.findByIdAndUser(deviceId, user);
    }

    public void saveDevice(Device device, User user) {
        device.setUser(user);
        deviceRepository.save(device);
    }

    public void deleteDeviceByIdForUser(Long deviceId, User user) {
        deviceRepository.deleteByIdAndUser(deviceId, user);
    }


}
