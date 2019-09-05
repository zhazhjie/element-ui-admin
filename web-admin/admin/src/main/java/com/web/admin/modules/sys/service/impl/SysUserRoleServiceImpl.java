package com.web.admin.modules.sys.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.web.admin.modules.sys.entity.SysUserRole;
import com.web.admin.modules.sys.mapper.SysUserRoleMapper;
import com.web.admin.modules.sys.service.SysUserRoleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 * 用户角色关系表 服务实现类
 * </p>
 *
 * @author zzj
 * @since 2019-09-04
 */
@Service("SysUserRoleService")
public class SysUserRoleServiceImpl extends ServiceImpl<SysUserRoleMapper, SysUserRole> implements SysUserRoleService {
    @Override
    public void saveUserRole(Long userId,List<Long> roleIds) {
        baseMapper.delete(new QueryWrapper<SysUserRole>().eq("user_id",userId));
        roleIds.forEach(roleId->{
            SysUserRole sysUserRole = new SysUserRole();
            sysUserRole.setRoleId(roleId);
            sysUserRole.setUserId(userId);
            baseMapper.insert(sysUserRole);
        });
    }
}
