package com.idle.imfine.data.dto.image;

import lombok.Data;

@Data
public class UploadFile {

    private String uploadFileName;
    // 시스템에 저장할 파일명 (유효아이디로 안겹치게)
    private String storeFileName;

    public UploadFile(String uploadFileName, String storeFileName) {
        this.uploadFileName = uploadFileName;
        this.storeFileName = storeFileName;
    }
}
