package com.korit.board_back.service;

import com.korit.board_back.dto.ResponseDto;
import com.korit.board_back.dto.article.reponse.ArticleResponseDto;
import com.korit.board_back.dto.article.request.ArtcleCreateRequestDto;

public interface ArticleService {

    ResponseDto<ArticleResponseDto> createArticle(Long authorId, ArtcleCreateRequestDto dto);

    ResponseDto<ArticleResponseDto> updateArticle(Long authorId, Long id, ArtcleCreateRequestDto dto);

    ResponseDto<Void> deleteArticle(Long authorId, Long id);

    ResponseDto<ArticleResponseDto> getArticle(Long id);

    ResponseDto<ArticleResponseDto> getEditableArticle(Long id, Long authborId);
}
