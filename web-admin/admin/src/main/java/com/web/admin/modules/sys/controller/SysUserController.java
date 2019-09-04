package com.web.admin.modules.sys.controller;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.web.admin.modules.sys.dto.SysUserDTO;
import com.web.admin.modules.sys.service.SysUserService;
import com.web.common.utils.ResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 系统用户 前端控制器
 * </p>
 *
 * @author zzj
 * @since 2019-09-04
 */
@RestController
@RequestMapping("/sysUser")
public class SysUserController {
    @Autowired
    SysUserService sysUserService;

    @GetMapping("/listPage")
    public ResponseData listPage(@RequestParam Map<String, Object> params) {
        IPage iPage = sysUserService.listPage(params);
        return ResponseData.success(iPage);
    }

    @PostMapping("/update")
    public ResponseData update(@RequestBody @Valid SysUserDTO sysUserDTO) {
        return null;
    }

    @PutMapping("/add")
    public ResponseData add(@RequestBody @Valid SysUserDTO sysUserDTO) {
        return null;
    }

    @DeleteMapping("/delete")
    public ResponseData delete(@RequestBody List<Long> ids) {
        return null;
    }
}
