package com.korit.board_back.controller;

import com.korit.board_back.common.ApiMappingPattern;
import com.korit.board_back.dto.ResponseDto;
import com.korit.board_back.dto.user.reponse.UserResponseDto;
import com.korit.board_back.dto.user.request.UpdateUserRequestDto;
import com.korit.board_back.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ApiMappingPattern.USER)
@RequiredArgsConstructor // 의존성 주입 생성자로
public class UserController {

    private UserService userService;

    @GetMapping()
    public ResponseEntity<ResponseDto<UserResponseDto>> getUserInfo(
            @AuthenticationPrincipal String userId){
        ResponseDto<UserResponseDto> response = userService.getUserInfo(userId);
        HttpStatus status = response.isResult() ? HttpStatus.OK: HttpStatus.NOT_FOUND;
      return ResponseEntity.status(status).body(response);
    }

    @PutMapping
    public ResponseEntity<ResponseDto<UserResponseDto>> updateUser(
            @AuthenticationPrincipal String userId, @RequestBody UpdateUserRequestDto dto){
        ResponseDto<UserResponseDto> response = userService.updateUser(userId, dto);
        HttpStatus status = response.isResult() ? HttpStatus.OK: HttpStatus.BAD_REQUEST;
        return  ResponseEntity.status(status).body(response);
    }

    @DeleteMapping
    public ResponseEntity<ResponseDto<Void>> deleteUser(
            @AuthenticationPrincipal String userId){
        ResponseDto<Void> response = userService.deleteUser(userId);
        HttpStatus status = response.isResult() ? HttpStatus.NO_CONTENT: HttpStatus.BAD_REQUEST;
        return  ResponseEntity.status(status).body(response);
    }

}
