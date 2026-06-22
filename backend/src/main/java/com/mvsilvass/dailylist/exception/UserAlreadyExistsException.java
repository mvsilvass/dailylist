package com.mvsilvass.dailylist.excepiton;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(){
        super("Usuário já existe");
    }
    
    public UserAlreadyExistsException(String message){
        super(message);
    }
}
