package com.korit.board_back.service.implement;

import com.korit.board_back.common.ResponseMessage;
import com.korit.board_back.dto.ResponseDto;
import com.korit.board_back.dto.auth.reponse.LoginResponseDto;
import com.korit.board_back.dto.auth.reponse.SignUpResponseDto;
import com.korit.board_back.dto.auth.request.LoginRequestDto;
import com.korit.board_back.dto.auth.request.SignUpRequestDto;
import com.korit.board_back.entity.User;

import com.korit.board_back.provider.JwtProvider;
import com.korit.board_back.repository.UserRepository;
import com.korit.board_back.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.commons.validator.routines.EmailValidator;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private  final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptpasswordEncoder;
    private final JwtProvider jwtProvider;

    @Override
    public ResponseDto<SignUpResponseDto> signUp(@Valid SignUpRequestDto dto) {
        String userId = dto.getUserId();
        String password = dto.getPassword();
        String confirmPassword = dto.getConfirmPassword();
        String name = dto.getName();
        String email = dto.getEmail();
        String phone = dto.getPhone();
        String gender = dto.getGender();

        SignUpResponseDto data = null;

        //1.유효성 검사

        if(userId == null || userId.isEmpty()){
            //INVALID_USER_ID
            return  ResponseDto.setFailed(ResponseMessage.VALIDATION_FAIL);
        }

        if(password == null || password.isEmpty() || confirmPassword== null || confirmPassword.isEmpty() ){
            //INVALID_PASSWORD
            return  ResponseDto.setFailed(ResponseMessage.VALIDATION_FAIL);
        }

        if(!password.equals(confirmPassword)){
            return  ResponseDto.setFailed(ResponseMessage.NOT_MATCH_PASSWORD);
        }

        if (password.length()<8 || !password.matches(".*[A-Z.*]") || !!password.matches(".*\\d.*")){
            //".*[A-Z.*]" : 하나 이상의 대문지 포함ㅁ
            //".*\\d.*":하나이상의 숫자 포함

            //Weak_password
            return ResponseDto.setFailed(ResponseMessage.VALIDATION_FAIL);
        }

        if(name== null || name .isEmpty()){
            return  ResponseDto.setFailed(ResponseMessage.VALIDATION_FAIL);
        }

        if(email == null || email.isEmpty() || !EmailValidator.getInstance().isValid(email)){
            return  ResponseDto.setFailed(ResponseMessage.VALIDATION_FAIL);
        }

        if(phone== null || phone.isEmpty() ||  !phone.matches("[0-9]{10,15}$")){
            //"[0-9]{10,15}$" -10자에서 15자 사이 숫자로만 이루어짐
            //INVALID_PHONE
            return  ResponseDto.setFailed(ResponseMessage.VALIDATION_FAIL);
        }

        if(email == null  && !gender.matches("M|F")){
            return  ResponseDto.setFailed(ResponseMessage.VALIDATION_FAIL);
        }
        //중복 체크
        if(userRepository.existsByUserId(userId)){
            return ResponseDto.setFailed(ResponseMessage.EXIST_USER);
        }
        if(userRepository.existsByEmail(email)){
            //
            return ResponseDto.setFailed(ResponseMessage.EXIST_USER);
        }


        if (!password.equals(confirmPassword)){
            return ResponseDto.setFailed(ResponseMessage.NOT_MATCH_PASSWORD);
        }

        try{

            String encodedPassword = bCryptpasswordEncoder.encode(password);
            User user = User.builder()
                    .userId(userId)
                    .password(encodedPassword)
                    .email(email)
                    .name(name)
                    .phone(phone)
                    .gender(gender)
                    .build();
            userRepository.save(user);
            data =  new SignUpResponseDto(user);


        } catch (Exception e) {
            e.printStackTrace();
            return  ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);

        }
        return  ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    @Override
    public ResponseDto<LoginResponseDto> login(LoginRequestDto dto) {
        String userId = dto.getUserId();
        String password =dto.getPassword();

        LoginResponseDto data = null;

        if(userId== null || userId.isEmpty()){
            return ResponseDto.setFailed(ResponseMessage.VALIDATION_FAIL);
        }

        if(password== null || password.isEmpty()){
            return ResponseDto.setFailed(ResponseMessage.VALIDATION_FAIL);
        }
        try{
            User user = userRepository.findByUserId(userId)
                    .orElse(null);
            if(user == null){
                return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_USER);
            }
            if(!bCryptpasswordEncoder.matches(password,user.getPassword())){
                return ResponseDto.setFailed(ResponseMessage.NOT_MATCH_PASSWORD);
            }
            String token = jwtProvider.generateJwtToken(userId);
            int expirTime  =  jwtProvider.getExpiration();

            data =new LoginResponseDto(user, token, expirTime);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }

        return ResponseDto.setSuccess(ResponseMessage.SUCCESS,data);
    }
}
