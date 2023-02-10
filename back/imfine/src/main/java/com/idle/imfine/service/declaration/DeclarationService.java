package com.idle.imfine.service.declaration;

import com.idle.imfine.data.dto.declaration.request.RequestDeclarationDto;

public interface DeclarationService {
    void saveDiaryReport(RequestDeclarationDto requestDeclarationDto);
    void savePaperReport(RequestDeclarationDto requestDeclarationDto);
    void saveCommentReport(RequestDeclarationDto requestDeclarationDto);
    void saveBambooReport(RequestDeclarationDto requestDeclarationDto);
    void saveLeafReport(RequestDeclarationDto requestDeclarationDto);

}
