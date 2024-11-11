package com.korit.board_back.service;

import com.korit.board_back.dto.ResponseDto;
import com.korit.board_back.dto.auth.reponse.LoginResponseDto;
import com.korit.board_back.dto.auth.reponse.SignUpResponseDto;
import com.korit.board_back.dto.auth.request.LoginRequestDto;
import com.korit.board_back.dto.auth.request.SignUpRequestDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseDto<SignUpResponseDto> signUp(SignUpRequestDto dto);
    ResponseDto<LoginResponseDto> login(LoginRequestDto dto);
}
