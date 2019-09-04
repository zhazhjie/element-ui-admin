package com.web.admin.modules.sys.service.impl;

import com.web.admin.modules.sys.entity.SysPermission;
import com.web.admin.modules.sys.mapper.SysPermissionMapper;
import com.web.admin.modules.sys.service.SysPermissionService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  权限管理 服务实现类
 * </p>
 *
 * @author zzj
 * @since 2019-09-04
 */
@Service("SysPermissionService")
public class SysPermissionServiceImpl extends ServiceImpl<SysPermissionMapper, SysPermission> implements SysPermissionService {

}
