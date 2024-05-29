package com.PraksaZadatak.demo.user;

import com.PraksaZadatak.demo.device.Device;
import com.PraksaZadatak.demo.device.DeviceService;
import org.springframework.stereotype.Service;

import java.util.List;

// Example usage in a controller or service
@Service
public class CombinedService {

    private final DeviceService deviceService;
    private final UserService userService;

    public CombinedService(DeviceService deviceService, UserService userService) {
        this.deviceService = deviceService;
        this.userService = userService;
    }

    public List<Device> getAllDevicesForCurrentUser(String username) {
        User user = userService.findByUsername(username);
        return deviceService.getAllDevicesForUser(user);
    }

    public void saveDeviceForCurrentUser(Device device, String username) {
        User user = userService.findByUsername(username);
        deviceService.saveDevice(device, user);
    }

    public void deleteDeviceForCurrentUser(Long deviceId, String username) {
        User user = userService.findByUsername(username);
        deviceService.deleteDeviceByIdForUser(deviceId, user);
    }
}
