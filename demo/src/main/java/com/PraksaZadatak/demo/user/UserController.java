package com.PraksaZadatak.demo.user;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRegistrationRequest registrationRequest) {
        // Check if the user already exists
        if (userService.existsByUsername(registrationRequest.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }

        if (userService.existsByEmail(registrationRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }

        // Register the new user
        userService.registerNewUser(registrationRequest);
        return ResponseEntity.ok("User registered successfully");
    }


    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody LoginRequest loginRequest) {
        User user = userService.findByUsername(loginRequest.getUsername());

        // Check if the password matches
        if (user != null && user.getPassword().equals(loginRequest.getPassword()) && user.isEnabled()) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/confirm")
    public ResponseEntity<String> confirmUser(@RequestBody String token) {
        System.out.println("Received token: " + token);


            token = token.replaceAll("=", "");
            // Trim the token to remove any extra spaces
            token = token.trim();

            // No need to decode if the token is sent as plain string
            userService.activateUser(token);
            return ResponseEntity.ok("Account confirmed successfully");

    }

}
