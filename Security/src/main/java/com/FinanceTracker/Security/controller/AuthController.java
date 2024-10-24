package com.FinanceTracker.Security.controller;

import com.FinanceTracker.Security.JwtUtil;
import com.FinanceTracker.Security.model.AuthRequest;
import com.FinanceTracker.Security.model.AuthResponse;
import com.FinanceTracker.Security.model.User;
import com.FinanceTracker.Security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        try {
            System.out.println(authRequest.getUsername()+" "+authRequest.getPassword());
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
            final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
            final String jwt = jwtUtil.generateToken(userDetails.getUsername());
            System.out.println(ResponseEntity.ok(new AuthResponse(jwt)));
            return ResponseEntity.ok(new AuthResponse(jwt));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody    User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.status(400).body("User already exists");
        }
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword())); // Encode password
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }
}
