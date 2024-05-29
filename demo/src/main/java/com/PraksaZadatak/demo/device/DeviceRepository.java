package com.PraksaZadatak.demo.device;

import com.PraksaZadatak.demo.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {
    List<Device> findByUser(User user);

    Optional<Device> findByIdAndUser(Long deviceId, User user);

    void deleteByIdAndUser(Long deviceId, User user);
}
