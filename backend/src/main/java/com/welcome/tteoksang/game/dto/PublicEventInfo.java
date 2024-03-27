package com.welcome.tteoksang.game.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PublicEventInfo {
    LocalDateTime inGameTime;
    LocalDateTime turnStartTime;
    Integer turn;
    List<ProductInfo> productInfoList;
    List<Integer> buyableProductList;
    String specialEventId;

}