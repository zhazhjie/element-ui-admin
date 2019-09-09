package com.web.admin.modules.sys.controller;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.web.admin.modules.sys.entity.dto.SysUserDTO;
import com.web.admin.modules.sys.entity.po.SysUser;
import com.web.admin.modules.sys.service.SysUserService;
import com.web.common.utils.Constant;
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
@RequestMapping("/sys/user")
public class SysUserController extends BaseController {
    @Autowired
    SysUserService sysUserService;

    @GetMapping("/listPage")
    public ResponseData listPage(@RequestParam Map<String, Object> params) {
        IPage iPage = sysUserService.listPage(params);
        return ResponseData.success(iPage);
    }

    @GetMapping("/info")
    public ResponseData info() {
        SysUser user = sysUserService.getUserById(getUser().getId());
        return ResponseData.success(user);
    }

    @PostMapping("/update")
    public ResponseData update(@RequestBody @Valid SysUserDTO sysUserDTO) {
        sysUserService.update(sysUserDTO);
        return ResponseData.success();
    }

    @PutMapping("/add")
    public ResponseData add(@RequestBody @Valid SysUserDTO sysUserDTO) {
        sysUserService.add(sysUserDTO);
        return ResponseData.success(Constant.INITIAL_PASSWORD);
    }

    @DeleteMapping("/delete")
    public ResponseData delete(@RequestBody List<Long> ids) {
        sysUserService.delete(ids);
        return ResponseData.success();
    }

    @PostMapping("/resetPassword/{userId}")
    public ResponseData resetPassword(@PathVariable Long userId) {
        sysUserService.resetPassword(userId);
        return ResponseData.success(Constant.INITIAL_PASSWORD);
    }

}
