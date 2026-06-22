package com.mvsilvass.dailylist.excepiton;

public class ForbiddenException extends RuntimeException{
    public ForbiddenException(){
        super("Você não tem permissão para acessar este recurso");
    }
    
    public ForbiddenException(String message){
        super(message);
    }
}
