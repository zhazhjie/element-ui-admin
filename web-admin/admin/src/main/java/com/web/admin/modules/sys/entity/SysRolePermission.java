package com.web.admin.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.web.model.BaseModel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 角色权限关系表
 * </p>
 *
 * @author zzj
 * @since 2019-09-04
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
@TableName("sys_role_permission")
public class SysRolePermission extends BaseModel {

    private static final long serialVersionUID = 1L;

    /**
     * 角色ID
     */
    private Long roleId;

    /**
     * 权限ID
     */
    private Long permissionId;


}
