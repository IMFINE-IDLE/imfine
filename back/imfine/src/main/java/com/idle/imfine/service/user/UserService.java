package com.idle.imfine.service.user;

import com.idle.imfine.data.dto.user.request.*;
import com.idle.imfine.data.dto.user.response.FindIdResponseDto;
import com.idle.imfine.data.dto.user.response.SearchUserInfoResponseDto;
import java.util.Map;
import javax.servlet.http.Cookie;
import org.springframework.http.HttpHeaders;


public interface UserService {

    Map<String, Object> signUp(SignUpRequestDto requestDto);

    Map<String, Object> signIn(SignInRequestDto requestDto);

    void initProfile(String uid, InitProfileRequestDto requestDto);

    HttpHeaders signOut(String uid);

    Map<String, Object> refresh(Cookie cookie);

    void checkUidDuplicate(String uid);

    void checkNameDuplicate(String name);

    void checkEmailDuplicate(String email);

    void withdrawal(String uid);

    SearchUserInfoResponseDto searchUserInfo(String uid, String otherUid);

    void modifyUserName(String uid, ModifyUserNameRequestDto requestDto);

    void modifyUserOpen(String uid, ModifyUserOepnRequestDto requestDto);
    void modifyUserPlay(String uid, ModifyUserPlayRequestDto requestDto);

    void modifyUserMedicalList(String uid, ModifyUserMedicalListRequestDto requestDto);

    void changePassword(FindPasswordRequestDto requestDto);

    FindIdResponseDto findId(String email);

    void checkIdAndEmail(String uid, String email);

    void changePassword(String uid, ChangePasswordRequestDto requestDto);

}
