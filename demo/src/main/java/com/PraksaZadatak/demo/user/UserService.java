package com.PraksaZadatak.demo.user;


import com.PraksaZadatak.demo.Token.TokenRepository;
import com.PraksaZadatak.demo.Token.VerificationToken;
import com.PraksaZadatak.demo.email.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;


import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    @Autowired
    private EmailService emailSenderService;
    private final UserRepository userRepository;

    private final TokenRepository   tokenRepository;



    public User findByUsername(String username) {
        return userRepository.findByUsername(username);

    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }


    public void registerNewUser(UserRegistrationRequest registrationRequest) {
        User newUser = new User();
        newUser.setUsername(registrationRequest.getUsername());
        newUser.setPassword((registrationRequest.getPassword()));
        newUser.setEmail(registrationRequest.getEmail());
        newUser.setRole(UserRole.USER); // Set default role as USER

        userRepository.save(newUser);
        sendValidationEmail(newUser);
    }

    private void sendValidationEmail(User user) {
        String newToken = generateAndSaveActivationToken(user);

        String confirmationLink = "http://localhost:3000/confirm/" + newToken;
        String imageUrl = "https://scontent.fbeg2-1.fna.fbcdn.net/v/t39.30808-6/354063099_567058225601864_6397367641490621157_n.png?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=nMLcEOPiLVoQ7kNvgFHud6u&_nc_ht=scontent.fbeg2-1.fna&cb_e2o_trans=q&oh=00_AYB0TYXZCxsrGwdXDwfFL5gxXTX3BIzYac4weK_bC6Ek0g&oe=665C0CB2";

        String htmlContent = "<html><body style='background-color: #f5f5f5; padding: 20px;'>" +
                "<div style='text-align: center; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-image: url(" + imageUrl + "); background-size: cover; font-family: \"Khand\", sans-serif;'>" +
                "<h1 style='color: white;'>Hello  " + user.getUsername() + " "  + "!</h1>" +
                "<p style='color: white;'>Click the button below to verify your account:</p>" +
                "<a href='" + confirmationLink + "' style='display: inline-block; padding: 10px 20px; background-color: #4caf50; color: #ffffff; text-decoration: none; border-radius: 5px;'>Confirm Email</a>" +
                "<br><br>" +
                "</div></body></html>";





        // Send the email with HTML content
        emailSenderService.sendHtmlEmail(user.getEmail(), "Activate Your Account", htmlContent);

    }

    public void activateUser(String token) {
        VerificationToken activationToken = tokenRepository.findByToken(token);

        if (activationToken == null) {
            throw new ResourceNotFoundException("Activation token not found");
        }

        if (activationToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Activation token has expired");
        }

        User user = activationToken.getUser();
        user.setEnabled(true);
        userRepository.save(user);
        activationToken.setValidatedAt(LocalDateTime.now());
        tokenRepository.save(activationToken);

        // Optional: You can delete the activation token after it's used
    }
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }




    private String generateAndSaveActivationToken(User user) {
        String generatedToken=generateActivationCode(6);
        var toke= VerificationToken.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();
        tokenRepository.save(toke);
        return generatedToken;
    }

    private String generateActivationCode(int length) {
        String characters = "0123456789";
        StringBuilder sb = new StringBuilder();
        SecureRandom Secure = new SecureRandom();
        for (int i = 0; i < length; i++) {
            int index = Secure.nextInt(characters.length());
            sb.append(characters.charAt(index));
        }
        return sb.toString();
    }

}

