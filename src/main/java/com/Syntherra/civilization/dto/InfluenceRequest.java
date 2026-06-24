package com.Syntherra.civilization.dto;

import lombok.Data;

@Data
public class InfluenceRequest {

    private Long civilizationId;

    private String action;
}