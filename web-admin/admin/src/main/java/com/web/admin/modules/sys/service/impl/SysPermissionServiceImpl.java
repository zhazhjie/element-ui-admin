package com.web.admin.modules.sys.service.impl;

import com.web.admin.modules.sys.entity.SysPermission;
import com.web.admin.modules.sys.mapper.SysPermissionMapper;
import com.web.admin.modules.sys.service.SysPermissionService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.web.admin.modules.sys.service.SysRolePermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

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
    @Autowired
    SysRolePermissionService sysRolePermissionService;

    @Override
    public List<SysPermission> listMenu(Map<String, Object> params) {
        return baseMapper.listMenu(params);
    }

    @Override
    public void add(SysPermission sysPermission) {
        baseMapper.insert(sysPermission);
    }

    @Override
    public void update(SysPermission sysPermission) {
        baseMapper.updateById(sysPermission);
    }

    @Override
    public void delete(Long id) {
        baseMapper.deleteById(id);
        sysRolePermissionService.deleteByPermissionId(id);
    }
}
