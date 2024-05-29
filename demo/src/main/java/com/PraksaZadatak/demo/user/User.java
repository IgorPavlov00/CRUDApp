package com.PraksaZadatak.demo.user;

import com.PraksaZadatak.demo.device.Device;
import jakarta.persistence.*;

import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String email;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    private boolean enabled;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Device> devices = new HashSet<>();

    // getters and setters
}
