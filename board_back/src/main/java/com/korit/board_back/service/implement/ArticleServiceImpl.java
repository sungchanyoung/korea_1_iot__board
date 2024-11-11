package com.korit.board_back.service.implement;

import com.korit.board_back.common.ResponseMessage;
import com.korit.board_back.dto.ResponseDto;
import com.korit.board_back.dto.article.reponse.ArticleResponseDto;
import com.korit.board_back.dto.article.request.ArtcleCreateRequestDto;
import com.korit.board_back.entity.Article;
import com.korit.board_back.repository.ArticleRepository;
import com.korit.board_back.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {
    private  final ArticleRepository articleRepository;

    @Override
    public ResponseDto<ArticleResponseDto> createArticle(Long authorId, ArtcleCreateRequestDto dto) {
        ArticleResponseDto data = null ;
        String title  =dto.getTitle();
        String content =  dto.getContent();
        try{
            Article article = Article.builder()
                    .title(title)
                    .content(content)
                    .authorId(authorId)
                    .build();

        } catch (Exception e) {
            e.printStackTrace();
           return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return  ResponseDto.setSuccess(ResponseMessage.SUCCESS,data);

    }

    @Override
    public ResponseDto<ArticleResponseDto> updateArticle(Long authorId, Long id, ArtcleCreateRequestDto dto) {

        ArticleResponseDto data = null ;
        String title  =dto.getTitle();
        String content =  dto.getContent();
        Long articleId =id;
        try {
            Optional<Article> optionalArticle  = articleRepository.findByIdAnAndAuthorId(articleId, authorId);
            if(optionalArticle.isEmpty()){
                return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_POST);
            }

            Article article  = optionalArticle.get();
            //optional  타입을 벗기기
            article = article.toBuilder()
                    .title(title)
                    .content(content)
                    .build();

            articleRepository.save(article);
            data = new ArticleResponseDto(article);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return  ResponseDto.setSuccess(ResponseMessage.SUCCESS,data);
    }

    @Override
    public ResponseDto<Void> deleteArticle(Long authorId, Long id) {
        Long articleId = id;

        try {
             Optional<Article> optionalArticle =  articleRepository.findByIdAnAndAuthorId(articleId,authorId);
             if(optionalArticle.isEmpty()){
                 return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_POST);
             }

             Article article = optionalArticle.get();
             articleRepository.delete(article);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return  ResponseDto.setSuccess(ResponseMessage.SUCCESS,null);
    }

    @Override
    public ResponseDto<ArticleResponseDto> getArticle(Long id) {
        ArticleResponseDto data = null;
        Long authorId =  id;
        try{
            Optional<Article> optionalArticle =  articleRepository.findById(authorId);

            if(optionalArticle.isEmpty()){
                return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
            }
            Article article = optionalArticle.get();
            data = new ArticleResponseDto(article);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return  ResponseDto.setSuccess(ResponseMessage.SUCCESS,data);
    }
    //로직이 로그인후 - 특정 게시글 찾기 게스글 하나  ㅠㅠ
    //Editable = 편집 가능한 기사 가져오기
    @Override
    public ResponseDto<ArticleResponseDto> getEditableArticle(Long id, Long authborId) {
        ArticleResponseDto data = null;
        Long articleId =  id;
        try {
            Optional<Article> optionalArticle = articleRepository.findById(articleId);
            if (optionalArticle.isEmpty()){
                return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_POST);
            }
            Article article = optionalArticle.get();//title content를 같이 가져 오는가 ?? -r
            if(!article.getAuthorId().equals(articleId)){
                return  ResponseDto.setFailed(ResponseMessage.NOT_EXIST_POST);
            }
            data = new ArticleResponseDto(article);


        } catch (Exception e) {
            e.printStackTrace();
            return  ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS,data);
    }
}
