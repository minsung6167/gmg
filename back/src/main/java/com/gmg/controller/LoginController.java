package com.gmg.controller;

import com.gmg.dao.UserRepository;
import com.gmg.domain.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

    private final UserRepository userRepository;

    public LoginController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");

        if (isBlank(userId) || isBlank(request.get("password")) || isBlank(request.get("name"))) {
            return ResponseEntity.badRequest().body("이름, 아이디, 비밀번호는 필수입니다.");
        }
        if (userRepository.existsByUserId(userId)) {
            return ResponseEntity.status(409).body("이미 사용 중인 아이디입니다.");
        }
        User user = new User(
                request.get("name"),
                userId,
                request.get("password"),
                request.get("phone"),
                request.get("email"));
        userRepository.save(user);
        return ResponseEntity.ok().build();
    }

    private boolean isBlank(String s) {
        return s == null || s.isBlank();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request, HttpServletRequest httpRequest) {
        User user = userRepository.findByUserId(request.get("userId")).orElse(null);
        if (user == null || !user.getPassword().equals(request.get("password"))) {
            return ResponseEntity.status(401).body("아이디 또는 비밀번호가 올바르지 않습니다.");
        }
        HttpSession session = httpRequest.getSession();
        session.setAttribute("user_no", user.getNo());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(HttpServletRequest httpRequest) {
        HttpSession session = httpRequest.getSession(false);
        if (session == null || session.getAttribute("user_no") == null) {
            return ResponseEntity.status(401).build();
        }
        Long no = (Long) session.getAttribute("user_no");
        User user = userRepository.findById(no).orElse(null);
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(Map.of("name", user.getName(), "userId", user.getUserId()));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest httpRequest) {
        HttpSession session = httpRequest.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok().build();
    }
}
