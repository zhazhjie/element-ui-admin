package com.web.admin.modules.sys.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 系统用户 前端控制器
 * </p>
 *
 * @author zzj
 * @since 2019-09-03
 */
@RestController
@RequestMapping("/sys/user")
public class UserController {
    @GetMapping("/info")
    public void info(){

    }

}
