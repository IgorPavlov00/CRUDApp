package com.PraksaZadatak.demo.device;

import com.PraksaZadatak.demo.user.User;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.*;



@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Device {

    @Valid
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotNull
    @Size(min = 3, message = "Name must be at least 3 characters long")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @NotNull
    private DeviceType type;

    private String derId;

    @Column(nullable = false)
    @NotNull
    private String category;

    @Min(value = 0, message = "Output power must be at least 0")
    @Max(value = 300, message = "Output power cannot be more than 300")
    private Double outputPower;

    @Min(value = 0, message = "Voltage must be at least 0")
    @Max(value = 30, message = "Voltage cannot be more than 30")
    private Double voltage;

    @Min(value = 0, message = "Current must be at least 0")
    @Max(value = 10, message = "Current cannot be more than 10")
    private Double current;

    @Min(value = 0, message = "Open circuit voltage must be at least 0")
    @Max(value = 40, message = "Open circuit voltage cannot be more than 40")
    private Double openCircuitVoltage;

    @Min(value = 0, message = "Short circuit current must be at least 0")
    @Max(value = 10, message = "Short circuit current cannot be more than 10")
    private Double shortCircuitCurrent;

    @Min(value = -3, message = "Power tolerance must be at least -3")
    @Max(value = 3, message = "Power tolerance cannot be more than 3")
    private Double powerTolerance;

    @Min(value = 0, message = "Maximum available power must be at least 0")
    @Max(value = 250, message = "Maximum available power cannot be more than 250")
    private Double maximumAvailablePower;

    @Min(value = 1, message = "Cut-in wind speed must be at least 1")
    @Max(value = 3, message = "Cut-in wind speed cannot be more than 3")
    private Double cutInWindSpeed;

    @Pattern(regexp = "^(12|48)$", message = "Output voltages must be either 12 or 48")
    private String outputVoltages;

    @Min(value = 0, message = "Power ratings must be at least 0")
    @Max(value = 850, message = "Power ratings cannot be more than 850")
    private Double powerRatings;

    @Min(value = 0, message = "Current ratings must be at least 0")
    @Max(value = 30, message = "Current ratings cannot be more than 30")
    private Double currentRatings;

    @Min(value = 0, message = "Capacity must be at least 0")
    @Max(value = 10, message = "Capacity cannot be more than 10")
    private Double capacity;

    @Min(value = 0, message = "Min state of charge must be at least 0")
    @Max(value = 20, message = "Min state of charge cannot be more than 20")
    private Double minStateOfCharge;

    @Min(value = 90, message = "Max state of charge must be at least 90")
    @Max(value = 100, message = "Max state of charge cannot be more than 100")
    private Double maxStateOfCharge;

    @Min(value = 0, message = "Motor power must be at least 0")
    @Max(value = 125, message = "Motor power cannot be more than 125")
    private Double motorPower;

    @Min(value = 0, message = "Battery capacity must be at least 0")
    @Max(value = 33, message = "Battery capacity cannot be more than 33")
    private Double batteryCapacity;

    @Min(value = 0, message = "CO2 emission rate must be at least 0")
    @Max(value = 100, message = "CO2 emission rate cannot be more than 100")
    private Double co2EmissionRate;

    @Min(value = 0, message = "Building max power must be at least 0")
    @Max(value = 700, message = "Building max power cannot be more than 700")
    private Double buildingMaxPower;

    @Min(value = 0, message = "Residual max power must be at least 0")
    @Max(value = 30, message = "Residual max power cannot be more than 30")
    private Double residualMaxPower;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public enum DeviceType {
        PHOTOVOLTAIC_PANEL,
        WIND_TURBINE,
        BATTERY,
        ELECTRICAL_GRID,
        BUILDING,
        RESIDUAL_ELECTRICAL_LOADS,
        ELECTRICAL_VEHICLE
    }

    public enum Category {
        PRODUCER,
        CONSUMER,
        MIXED
    }
}
