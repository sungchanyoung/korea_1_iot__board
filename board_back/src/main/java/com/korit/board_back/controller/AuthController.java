package com.korit.board_back.controller;

import com.korit.board_back.common.ApiMappingPattern;
import com.korit.board_back.dto.ResponseDto;
import com.korit.board_back.dto.auth.reponse.LoginResponseDto;
import com.korit.board_back.dto.auth.reponse.SignUpResponseDto;
import com.korit.board_back.dto.auth.request.LoginRequestDto;
import com.korit.board_back.dto.auth.request.SignUpRequestDto;
import com.korit.board_back.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ApiMappingPattern.AUTH)
@RequiredArgsConstructor
public class  AuthController {
    private final AuthService authService;

    private  static  final String SIGN_UP_PATH ="/signUp";
    private  static  final String LOGIN_PATH ="/login";

    @PostMapping (SIGN_UP_PATH)
     public ResponseEntity<ResponseDto<SignUpResponseDto>> signUp( @Valid @RequestBody SignUpRequestDto dto){
     ResponseDto<SignUpResponseDto> response =  authService.signUp(dto);
     HttpStatus status = response.isResult() ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
     return ResponseEntity.status(status).body(response);
    }

    @PostMapping(LOGIN_PATH)
    public ResponseEntity<ResponseDto<LoginResponseDto>> login (@Valid @RequestBody LoginRequestDto dto){
        ResponseDto<LoginResponseDto> response =authService.login(dto);
        HttpStatus status = response.isResult() ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;
        return ResponseEntity.status(status).body(response);
    }
}
