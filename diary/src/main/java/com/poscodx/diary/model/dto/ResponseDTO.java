package com.poscodx.diary.model.dto;

import lombok.Data;

@Data
public class ResponseDTO {
    Boolean success = false;
    String message;
    Object data;
}
