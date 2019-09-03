package com.web.admin.modules.sys.service.impl;

import com.web.admin.modules.sys.entity.User;
import com.web.admin.modules.sys.mapper.UserMapper;
import com.web.admin.modules.sys.service.UserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 系统用户 服务实现类
 * </p>
 *
 * @author zzj
 * @since 2019-09-03
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

}
