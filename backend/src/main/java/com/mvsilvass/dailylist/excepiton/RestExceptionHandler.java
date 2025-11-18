package com.mvsilvass.dailylist.excepiton;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.server.resource.InvalidBearerTokenException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class RestExceptionHandler {
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    private ResponseEntity<ValidationErrorMessage> validationErrorsHandler(MethodArgumentNotValidException ex) {
        Map<String, List<String>> errors = ex.getBindingResult().getFieldErrors()
            .stream()
            .collect(Collectors.groupingBy(
                FieldError::getField,
                Collectors.mapping(FieldError::getDefaultMessage, Collectors.toList())
            ));
        
        ValidationErrorMessage error = new ValidationErrorMessage(
            HttpStatus.BAD_REQUEST,
            "Erro de validação",
            errors
        );
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
    
    @ExceptionHandler(UserNotFoundException.class)
    private ResponseEntity<RestErrorMessage> userNotFoundHandler(UserNotFoundException ex){
        RestErrorMessage error = new RestErrorMessage(
            HttpStatus.NOT_FOUND,
            Instant.now(),
            "Usuário não encontrado",
            ex.getMessage()
        );
        
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    @ExceptionHandler(RoleNotFoundException.class)
    private ResponseEntity<RestErrorMessage> roleNotFoundHandler(RoleNotFoundException ex){
        RestErrorMessage error = new RestErrorMessage(
            HttpStatus.INTERNAL_SERVER_ERROR,
            Instant.now(),
            "Erro interno do servidor",
            ex.getMessage()
        );

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
    
    @ExceptionHandler(UserAlreadyExistsException.class)
    private ResponseEntity<RestErrorMessage> userAlreadyExistsHandler(UserAlreadyExistsException ex){
        RestErrorMessage error = new RestErrorMessage(
            HttpStatus.CONFLICT,
            Instant.now(),
            "Usuário já existe",
            ex.getMessage()
        );

        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<RestErrorMessage> genericExceptionHandler(Exception ex) {
        RestErrorMessage error = new RestErrorMessage(
            HttpStatus.INTERNAL_SERVER_ERROR,
            Instant.now(),
            "Erro inesperado no servidor",
            "Ocorreu um problema ao processar sua requisição"
        );
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
    
    @ExceptionHandler({BadCredentialsException.class, UsernameNotFoundException.class})
    private ResponseEntity<RestErrorMessage> badCredentialsHandler(BadCredentialsException ex){
        RestErrorMessage error = new RestErrorMessage(
            HttpStatus.UNAUTHORIZED,
            Instant.now(),
            "Falha na autenticação",
            "Usuário ou senha inválidos"
        );
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }
    
    @ExceptionHandler(AccessDeniedException.class)
    private ResponseEntity<RestErrorMessage> accessDeniedHandler(AccessDeniedException ex){
        RestErrorMessage error = new RestErrorMessage(
            HttpStatus.FORBIDDEN,
            Instant.now(),
            "Acesso negado",
            "Você não tem permissão para acessar este recurso"
        );
        
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
    }
    
    @ExceptionHandler(InvalidBearerTokenException.class)
    private ResponseEntity<RestErrorMessage> invalidBearerTokenHandler(InvalidBearerTokenException ex){
        RestErrorMessage error = new RestErrorMessage       (
            HttpStatus.UNAUTHORIZED,
            Instant.now(),
            "Acesso negado",
            "Token de acesso inválido ou expirado."
        );
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }
}
