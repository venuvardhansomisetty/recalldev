package com.recalldev.backend.controller;

import com.recalldev.backend.model.User;
import com.recalldev.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already registered"));
        }
        user.setId(null); // make sure a NEW row is created
        user.setPassword(encoder.encode(user.getPassword())); // store the scrambled password
        User saved = userRepository.save(user);
        return ResponseEntity.ok(Map.of("id", saved.getId(), "name", saved.getName()));
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User login) {
        User user = userRepository.findByEmail(login.getEmail());
        if (user == null || !encoder.matches(login.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error", "Wrong email or password"));
        }
        return ResponseEntity.ok(Map.of("id", user.getId(), "name", user.getName()));
    }
}