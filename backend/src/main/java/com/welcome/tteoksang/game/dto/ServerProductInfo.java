package com.welcome.tteoksang.game.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ServerProductInfo {
    private Integer productCost;
    private Integer productMaxQuantity;
    private Integer productFluctuation;
}
