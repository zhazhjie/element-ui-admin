package com.web.admin.modules.sys.service.impl;

import com.web.admin.modules.sys.entity.po.SysUserToken;
import com.web.admin.modules.sys.mapper.SysUserTokenMapper;
import com.web.admin.modules.sys.service.SysUserTokenService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.web.common.utils.SysConstant;
import com.web.common.utils.TokenGenerator;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * <p>
 * 系统用户Token 服务实现类
 * </p>
 *
 * @author zzj
 * @since 2019-09-11
 */
@Service
public class SysUserTokenServiceImpl extends ServiceImpl<SysUserTokenMapper, SysUserToken> implements SysUserTokenService {
    @Override
    public String buildLoginToken(Long userId) {
        //生成一个token
        String token = TokenGenerator.generateValue();

        //当前时间
        Date now = new Date();
        //过期时间
        Date expireTime = new Date(now.getTime()+ SysConstant.LOGIN_EXPIRE_TIME);

        //判断是否生成过token
        SysUserToken tokenEntity = baseMapper.selectById(userId);;
        if (tokenEntity == null) {
            tokenEntity = new SysUserToken();
            tokenEntity.setUserId(userId);
            tokenEntity.setToken(token);
            tokenEntity.setUpdateTime(now);
            tokenEntity.setExpireTime(expireTime);
            //保存token
            baseMapper.insert(tokenEntity);
        } else {
            tokenEntity.setToken(token);
            tokenEntity.setUpdateTime(now);
            tokenEntity.setExpireTime(expireTime);
            //更新token
            baseMapper.updateById(tokenEntity);
        }
        return token;
    }
}
