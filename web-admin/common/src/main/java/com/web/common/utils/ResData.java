package com.web.common.utils;

import lombok.Data;

import java.io.Serializable;

/**
 * controller返回值
 * @param <T>
 */
@Data
public class ResData<T> implements Serializable {
    private Integer code;
    private String message;
    private Long timestamp;
    private T data;

    private static Integer SUCCESS_CODE = 200;
    private static String SUCCESS_MESSAGE = "成功";

    private static Integer FAIL_CODE = 500;
    private static String FAIL_MESSAGE = "失败";

    public ResData(Integer code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
        this.timestamp = System.currentTimeMillis();
    }

    public static <T> ResData success(T data) {
        return new ResData<>(SUCCESS_CODE, SUCCESS_MESSAGE, data);
    }

    public static <T> ResData fail() {
        return fail(FAIL_CODE, FAIL_MESSAGE);
    }

    public static <T> ResData fail(String message) {
        return fail(FAIL_CODE, message);
    }

    public static <T> ResData fail(Integer code, String message) {
        return new ResData<>(code, message, null);
    }
}
