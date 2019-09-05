package com.web.admin.modules.sys.controller;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.web.admin.modules.sys.entity.SysRole;
import com.web.admin.modules.sys.service.SysRoleService;
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
 * 角色 前端控制器
 * </p>
 *
 * @author zzj
 * @since 2019-09-04
 */
@RestController
@RequestMapping("/sys/role")
public class SysRoleController {
    @Autowired
    SysRoleService sysRoleService;

    @GetMapping("/list")
    public ResponseData listPage() {
        List<SysRole> list = sysRoleService.list(1L);
        return ResponseData.success(list);
    }
}
