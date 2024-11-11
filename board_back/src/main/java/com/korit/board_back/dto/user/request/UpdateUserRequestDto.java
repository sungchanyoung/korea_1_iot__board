package com.korit.board_back.dto.user.request;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateUserRequestDto {
    private String email;
    private String name;
    private String phone;

}
