package com.PraksaZadatak.demo.user;


import com.PraksaZadatak.demo.device.Device;
import com.PraksaZadatak.demo.device.DeviceService;
import com.PraksaZadatak.demo.user.User;
import com.PraksaZadatak.demo.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/system")
@CrossOrigin(origins = "http://localhost:3000")
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

    @GetMapping("/{id}")
    public ResponseEntity<Device> getDeviceByIdForCurrentUser(@PathVariable Long id, @RequestParam String username) {
        User user = userService.findByUsername(username);
        Optional<Device> device = deviceService.getDeviceByIdForUser(id, user);
        return device.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/")
    public ResponseEntity<Device> createDevice(@RequestBody Device device, @RequestParam String username) {
        User user = userService.findByUsername(username);
        deviceService.saveDevice(device, user);
        return new ResponseEntity<>(device, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Device> updateDevice(@PathVariable Long id, @RequestBody Device device, @RequestParam String username) {
        User user = userService.findByUsername(username);
        Optional<Device> existingDevice = deviceService.getDeviceByIdForUser(id, user);
        if (existingDevice.isPresent()) {
            device.setId(id);
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

