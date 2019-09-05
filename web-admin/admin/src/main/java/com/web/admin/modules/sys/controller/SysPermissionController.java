package com.web.admin.modules.sys.controller;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.web.admin.modules.sys.dto.SysUserDTO;
import com.web.admin.modules.sys.entity.SysPermission;
import com.web.admin.modules.sys.service.SysPermissionService;
import com.web.common.utils.ResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 权限管理 前端控制器
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

    @GetMapping("/list")
    public ResponseData listMenu(@RequestParam Map<String, Object> params) {
        List<SysPermission> sysPermissions = sysPermissionService.listMenu(params);
        return ResponseData.success(sysPermissions);
    }

    @PostMapping("/update")
    public ResponseData update(@RequestBody @Valid SysPermission sysPermission) {
        sysPermissionService.update(sysPermission);
        return ResponseData.success();
    }

    @PutMapping("/add")
    public ResponseData add(@RequestBody @Valid SysPermission sysPermission) {
        sysPermissionService.add(sysPermission);
        return ResponseData.success();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseData delete(@PathVariable Long id) {
        sysPermissionService.delete(id);
        return ResponseData.success();
    }
}
