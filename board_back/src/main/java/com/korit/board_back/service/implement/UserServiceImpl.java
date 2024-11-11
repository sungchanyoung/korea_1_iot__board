package com.korit.board_back.service.implement;

import com.korit.board_back.common.ResponseMessage;

import com.korit.board_back.dto.ResponseDto;
import com.korit.board_back.dto.user.reponse.UserResponseDto;
import com.korit.board_back.dto.user.request.UpdateUserRequestDto;
import com.korit.board_back.entity.User;
import com.korit.board_back.repository.UserRepository;
import com.korit.board_back.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/*
    Implement : 축약어 Impl
    interface:상호작용 -미리 틀을 만들어서 사용한다
    팀플이나 다른사람과 같이 작업 할때  interface 구축이 상당히 중요하다
    interface로 불필요한 메서드를 방지 하기 위해서

 */
@Service
@RequiredArgsConstructor

public class UserServiceImpl implements UserService {

    private  final UserRepository userRepository;

    @Override
    public ResponseDto<UserResponseDto> getUserInfo(String userId) {
        UserResponseDto data = null;
        try {
            User user =  userRepository.findByUserId(userId)
                    .orElse(null);
            if(user == null ){
                return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_USER);
            }

            data = new UserResponseDto(user);

        } catch (Exception e) {
            e.printStackTrace();
            ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS,data);
    }

    @Override
    public ResponseDto<UserResponseDto> updateUser(String userId, UpdateUserRequestDto dto) {
            UserResponseDto data =null;
            String email = dto.getEmail();
            String name = dto.getName();
            String phone = dto.getPhone();

            try {

                User user =  userRepository.findByUserId(userId)
                        .orElse(null);

                if(user == null ){
                    ResponseDto.setFailed(ResponseMessage.NOT_EXIST_USER);
                }

//                user.setEmail(email);
//                user.setName(name);
//                user.setPhone(phone);

                //이미 생성되 객체에서 수정하는 것 ??
                user = user.toBuilder()
                        .email(email)
                        .name(name)
                        .phone(phone)
                        .build();

                userRepository.save(user);
                data = new UserResponseDto(user);


            } catch (Exception e) {
                e.printStackTrace();
                ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
            }

        return ResponseDto.setSuccess(ResponseMessage.SUCCESS,data);
    }

    @Override
    public ResponseDto<Void> deleteUser(String userId) {

    try {
        User user =  userRepository.findByUserId(userId)
                .orElse(null);

        if(user == null) ResponseDto.setFailed(ResponseMessage.NOT_EXIST_USER);
    } catch (Exception e) {
        e.printStackTrace();
        ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
    }
    return ResponseDto.setSuccess(ResponseMessage.SUCCESS,null);
    }
}
