package com.korit.board_back.dto.auth.reponse;

import com.korit.board_back.entity.User;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;

@Getter
public class SignUpResponseDto {
    private  Long id;
    private  String  password;
    private  String  email;
    private  String  name;

    public SignUpResponseDto(User user){
        this.id =user.getId();
        this.password =user.getPassword();
        this.email =user.getEmail();
        this.name =user.getName();
    }


}
