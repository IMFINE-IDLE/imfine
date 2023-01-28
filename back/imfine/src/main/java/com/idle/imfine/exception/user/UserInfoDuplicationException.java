package com.idle.imfine.exception.user;

public class UserInfoDuplicationException extends IllegalStateException {

    public UserInfoDuplicationException() {
        super();
    }

    public UserInfoDuplicationException(String s) {
        super(s);
    }

    public UserInfoDuplicationException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserInfoDuplicationException(Throwable cause) {
        super(cause);
    }

}
