package com.idle.imfine.service.user;

import com.idle.imfine.data.dto.user.request.ConfirmEmailRequestDto;
import com.idle.imfine.data.dto.user.request.SendEmailRequestDto;

public interface EmailService {

    void sendEmail(SendEmailRequestDto requestDto);
    void confirmEmail(ConfirmEmailRequestDto requestDto);

}
