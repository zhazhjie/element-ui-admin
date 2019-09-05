package com.web.admin.modules.sys.controller;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.web.admin.modules.sys.entity.SysPermission;
import com.web.admin.modules.sys.service.SysPermissionService;
import com.web.common.utils.ResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  权限管理 前端控制器
 * </p>
 *
 * @author zzj
 * @since 2019-09-04
 */
@RestController
@RequestMapping("/sys/permission")
public class SysPermissionController {
    @Autowired
    SysPermissionService sysPermissionService;

    @GetMapping("/listMenu")
    public ResponseData listMenu(@RequestParam Map<String, Object> params) {
        List<SysPermission> sysPermissions = sysPermissionService.listMenu(params);
        return ResponseData.success(sysPermissions);
    }
}
