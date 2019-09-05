package com.web.admin.modules.sys.service;

import com.web.admin.modules.sys.entity.SysRole;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * 角色 服务类
 * </p>
 *
 * @author zzj
 * @since 2019-09-04
 */
public interface SysRoleService extends IService<SysRole> {
    List<SysRole> list(Long userId);
}
