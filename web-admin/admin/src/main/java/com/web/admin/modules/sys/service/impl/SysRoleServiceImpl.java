package com.web.admin.modules.sys.service.impl;

import com.web.admin.modules.sys.entity.SysRole;
import com.web.admin.modules.sys.mapper.SysRoleMapper;
import com.web.admin.modules.sys.service.SysRoleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 角色 服务实现类
 * </p>
 *
 * @author zzj
 * @since 2019-09-04
 */
@Service("SysRoleService")
public class SysRoleServiceImpl extends ServiceImpl<SysRoleMapper, SysRole> implements SysRoleService {

}
