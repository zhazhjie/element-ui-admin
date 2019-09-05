package com.web.admin.modules.sys.service.impl;

import com.web.admin.modules.sys.entity.SysRole;
import com.web.admin.modules.sys.entity.SysUserRole;
import com.web.admin.modules.sys.mapper.SysRoleMapper;
import com.web.admin.modules.sys.service.SysRoleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.web.admin.modules.sys.service.SysUserRoleService;
import com.web.common.utils.AssertUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
    @Autowired
    SysUserRoleService sysUserRoleService;

    @Override
    public List<SysRole> list(Long userId) {
        List<SysRole> sysRoles = baseMapper.selectList(null);
        return sysRoles;
    }

    @Override
    public void add(SysRole sysRole) {
        baseMapper.insert(sysRole);
    }

    @Override
    public void update(SysRole sysRole) {
        baseMapper.updateById(sysRole);
    }

    @Override
    public void delete(List<Long> ids) {
        ids.forEach(id->{
            List<SysUserRole> byRoleId = sysUserRoleService.getByRoleId(id);
            AssertUtil.isFalse(byRoleId.size()>0,"该角色已被使用，不能删除");
            baseMapper.deleteById(id);
        });
    }
}
