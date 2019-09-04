package com.web.admin.modules.sys.service.impl;

import com.web.admin.modules.sys.entity.SysRolePermission;
import com.web.admin.modules.sys.mapper.SysRolePermissionMapper;
import com.web.admin.modules.sys.service.SysRolePermissionService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 角色权限关系表 服务实现类
 * </p>
 *
 * @author zzj
 * @since 2019-09-04
 */
@Service("SysRolePermissionService")
public class SysRolePermissionServiceImpl extends ServiceImpl<SysRolePermissionMapper, SysRolePermission> implements SysRolePermissionService {

}
