package com.PraksaZadatak.demo.user;


import com.PraksaZadatak.demo.device.Device;
import com.PraksaZadatak.demo.device.DeviceService;
import com.PraksaZadatak.demo.user.User;
import com.PraksaZadatak.demo.user.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/system")
@CrossOrigin(origins = "http://localhost:3000")
@Validated
public class CombinedControler {

    private final DeviceService deviceService;
    private final UserService userService;

    @Autowired
    public CombinedControler(DeviceService deviceService, UserService userService) {
        this.deviceService = deviceService;
        this.userService = userService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Device>> getAllDevicesForCurrentUser(@RequestParam String username) {
        User user = userService.findByUsername(username);
        List<Device> devices = deviceService.getAllDevicesForUser(user);
        return ResponseEntity.ok(devices);
    }

    @GetMapping("getcurrentdevice/{id}")
    public ResponseEntity<Device> getDeviceByIdForCurrentUser(@PathVariable Long id, @RequestParam String username) {
        User user = userService.findByUsername(username);
        Optional<Device> device = deviceService.getDeviceByIdForUser(id, user);
        return device.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/")
    public ResponseEntity<Device> createDevice(@RequestBody @Valid Device device, @RequestParam String username) {
        User user = userService.findByUsername(username);
        device.setUser(user); // Set the user to avoid circular reference
        deviceService.saveDevice(device, user);
        return new ResponseEntity<>(device, HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Device> updateDevice(
            @PathVariable Long id,
            @RequestBody Device updatedDevice,
            @RequestParam String username
    ) {
        User user = userService.findByUsername(username);
        Optional<Device> existingDevice = deviceService.getDeviceByIdForUser(id, user);

        if (existingDevice.isPresent()) {
            Device device = existingDevice.get();

            // Update all fields with updatedDevice
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
            device.setBuildingMaxPower(updatedDevice.getBuildingMaxPower());
            device.setMinStateOfCharge(updatedDevice.getMinStateOfCharge());
            device.setMaxStateOfCharge(updatedDevice.getMaxStateOfCharge());
            device.setMotorPower(updatedDevice.getMotorPower());
            device.setBatteryCapacity(updatedDevice.getBatteryCapacity());
            device.setCo2EmissionRate(updatedDevice.getCo2EmissionRate());
            device.setPowerRatings(updatedDevice.getPowerRatings());
            device.setCurrentRatings(updatedDevice.getCurrentRatings());

            // Save the updated device
            deviceService.saveDevice(device, user);

            return ResponseEntity.ok(device);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDevice(@PathVariable Long id, @RequestParam String username) {
        User user = userService.findByUsername(username);
        Optional<Device> device = deviceService.getDeviceByIdForUser(id, user);
        if (device.isPresent()) {
            deviceService.deleteDeviceByIdForUser(id, user);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}

