package com.poscodx.main.model;

import lombok.Data;

@Data
public class ResponseDTO {
    Boolean success = false;
    String message;
    Object data;
}
