package com.korit.board_back.dto.user.reponse;


import com.korit.board_back.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
@Setter
public class UserResponseDto {
    private String userId;
    private String email;
    private String name;
    private String phone;
    private String gender;

    //생성자가 setter 역활 까지 함
    public UserResponseDto(User user){
        this.userId = user.getUserId();
        this.email = user.getEmail();
        this.name = user.getName();
        this.phone =user.getPhone();
        this.gender = user.getGender();
    }

}
