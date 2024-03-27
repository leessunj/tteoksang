package com.welcome.tteoksang.game.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpgradeVehicleInfo {
    private Long gold;
    private Integer vehicleLevel;
}
