package com.korit.board_back.dto.auth.reponse;

import com.korit.board_back.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class LoginResponseDto {
    private User user;
    private  String token;
    private int expirTime;


}