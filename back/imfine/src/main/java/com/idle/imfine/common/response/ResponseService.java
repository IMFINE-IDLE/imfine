package com.idle.imfine.common.response;

import com.idle.imfine.common.result.ListResult;
import com.idle.imfine.common.result.Result;
import com.idle.imfine.common.result.SingleResult;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class ResponseService {

    private static final String SUCCESS_MSG = "요청에 성공하였습니다.";

    public Result getDefaultSuccessResult() {
        return getSuccessResult();
    }

    // 단일건 결과 처리하는 메서드
    public <T> SingleResult<T> getSingleResult(T data) {
        SingleResult<T> result;
        result = new SingleResult<>();
        setSuccessResult(result);
        result.setData(data);

        return result;
    }

    // 다중건 결과를 처리하는 메서드
    public <T> ListResult<T> getListResult(List<T> data) {
        ListResult<T> result = new ListResult<>();
        setSuccessResult(result);
        result.setData(data);

        return result;
    }

    public Result getSuccessResult() {
        Result result = new Result();
        result.setSuccess(true);
        result.setStatus(200);
        result.setMessage(SUCCESS_MSG);

        return result;
    }

    public void setSuccessResult(Result result) {
        result.setSuccess(true);
        result.setStatus(200);
        result.setMessage(SUCCESS_MSG);
    }

}