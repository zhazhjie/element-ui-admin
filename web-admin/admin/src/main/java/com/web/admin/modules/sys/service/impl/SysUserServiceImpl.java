package com.web.admin.modules.sys.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.web.admin.modules.sys.dto.SysUserDTO;
import com.web.admin.modules.sys.entity.SysUser;
import com.web.admin.modules.sys.entity.SysUserRole;
import com.web.admin.modules.sys.mapper.SysUserMapper;
import com.web.admin.modules.sys.service.SysUserRoleService;
import com.web.admin.modules.sys.service.SysUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.web.admin.utils.PageWrapper;
import com.web.common.utils.AssertUtil;
import org.apache.commons.lang.RandomStringUtils;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 系统用户 服务实现类
 * </p>
 *
 * @author zzj
 * @since 2019-09-04
 */
@Service("SysUserService")
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser> implements SysUserService {
    @Autowired
    SysUserRoleService sysUserRoleService;

    @Override
    public IPage listPage(Map<String, Object> params) {
        IPage<SysUser> sysUserIPage = baseMapper.selectPage(new PageWrapper<SysUser>(params).getPage(), null);
        return sysUserIPage;
    }

    @Override
    public void add(SysUserDTO sysUserDTO) {
        SysUser existUser = this.getUserByUsername(sysUserDTO.getUsername());
        AssertUtil.isNull(existUser,"用户已存在");
        SysUser sysUser = new SysUser();
        BeanUtils.copyProperties(sysUserDTO,sysUser);
        String salt = RandomStringUtils.randomAlphanumeric(20);
        sysUser.setPassword(new Sha256Hash(sysUserDTO.getPassword(), salt).toHex());
        sysUser.setSalt(salt);
        baseMapper.insert(sysUser);
    }

    @Override
    public void update(SysUserDTO sysUserDTO) {
        SysUser existUser = baseMapper.selectById(sysUserDTO.getId());
        AssertUtil.isNull(existUser,"用户不存在");
        SysUser sysUser = new SysUser();
        sysUser.setId(sysUserDTO.getId());
        sysUser.setUsername(sysUserDTO.getUsername());
        sysUser.setPhone(sysUserDTO.getPhone());
        sysUser.setEmail(sysUserDTO.getEmail());
        sysUser.setState(sysUserDTO.getState());
        baseMapper.updateById(sysUser);
    }

    @Override
    public void delete(List<Long> ids) {
        baseMapper.deleteBatchIds(ids);
    }

    public SysUser getUserByUsername(String username){
        return baseMapper.selectOne(new QueryWrapper<SysUser>().eq("username",username));
    }
}
