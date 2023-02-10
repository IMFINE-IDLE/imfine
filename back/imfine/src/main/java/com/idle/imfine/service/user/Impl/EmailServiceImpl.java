package com.idle.imfine.service.user.Impl;

import com.idle.imfine.data.dto.user.request.ConfirmEmailRequestDto;
import com.idle.imfine.data.dto.user.request.SendEmailRequestDto;
import com.idle.imfine.errors.code.EmailErrorCode;
import com.idle.imfine.errors.exception.ErrorException;
import com.idle.imfine.service.user.EmailService;
import com.idle.imfine.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.Message.RecipientType;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender emailSender;
    private final RedisUtil redisUtil;

    private MimeMessage createMessage(String to, String confirm) throws MessagingException, UnsupportedEncodingException {
        log.info("[EmailService.createMessage] 보내는 대상 : "+ to);
        log.info("[EmailService.createMessage] 인증 번호 : "+ confirm);
        MimeMessage  message = emailSender.createMimeMessage();

        message.addRecipients(RecipientType.TO, to);//보내는 대상
        message.setSubject("[IMFINE] 이메일 인증");//제목

        String msgg="";
        msgg+= "<div style='margin:20px;'>";
        msgg+= "<h1> 안녕하세요 IMFINE입니다. </h1>";
        msgg+= "<br>";
        msgg+= "<p>아래 코드를 복사해 입력해주세요<p>";
        msgg+= "<br>";
        msgg+= "<p>감사합니다.<p>";
        msgg+= "<br>";
        msgg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgg+= "<h3 style='color:blue;'>회원가입 인증 코드입니다.</h3>";
        msgg+= "<div style='font-size:130%'>";
        msgg+= "CODE : <strong>";
        msgg+= confirm+"</strong><div><br/> ";
        msgg+= "</div>";
        message.setText(msgg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress("idle.imfine@gmail.com","IDLE"));//보내는 사람

        return message;
    }

    public static String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = rnd.nextInt(3); // 0~2 까지 랜덤

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    //  a~z  (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    //  A~Z
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    // 0~9
                    break;
            }
        }
        return key.toString();
    }

    @Override
    public void sendEmail(SendEmailRequestDto requestDto) {
        try {
            String email = requestDto.getEmail();
            String confirm = createKey();
            MimeMessage message = createMessage(requestDto.getEmail(), confirm);
            emailSender.send(message);
            redisUtil.setDataExpire(email, confirm, 60 * 3L);
            log.info("인증 메일 전송을 성공했습니다.");
        } catch(Exception e){
            log.info("인증 메일 전송을 실패했습니다.");
            throw new ErrorException(EmailErrorCode.EMAIL_FAILED);
        }
    }

    @Override
    public void confirmEmail(ConfirmEmailRequestDto requestDto) {
        String confirm = redisUtil.getData(requestDto.getEmail());

        if (confirm != null && confirm.equals(requestDto.getConfirm())) {
            log.info("이메일이 인증되었습니다.");
            redisUtil.deleteData(requestDto.getEmail());
            return;
        }

        log.info("유효하지 않은 인증번호 입니다.");
        throw new ErrorException(EmailErrorCode.EMAIL_AUTH_INVALID);
    }

}