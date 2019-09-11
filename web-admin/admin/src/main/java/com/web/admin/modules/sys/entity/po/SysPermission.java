package com.web.admin.modules.sys.entity.po;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.web.admin.modules.sys.entity.BaseModel;
import lombok.Data;

/**
 * <p>
 *  权限管理
 * </p>
 *
 * @author zzj
 * @since 2019-09-04
 */
@Data
@TableName("sys_permission")
public class SysPermission extends BaseModel {

    private static final long serialVersionUID = 1L;

    /**
     * 父菜单ID，一级菜单为0 (类型为菜单时必填)
     */
    private Long parentId;

    @TableField(exist = false)
    private String parentName;

    /**
     * 权限名称
     */
    private String name;

    /**
     * 菜单路由 (类型为菜单时选填)
     */
    private String url;

    /**
     * 授权标识 (如：sys:user:list)
     */
    private String permissionFlag;

    /**
     * 类型 0：菜单，1：按钮，2：接口
     */
    private Integer type;

    /**
     * 菜单图标 (类型为菜单时选填)
     */
    private String icon;

    /**
     * 状态 0 正常 1禁用
     */
    private Integer state;

    /**
     * 排序
     */
    private Integer sort;

    /**
     * 是否隐藏 1 隐藏，0 显示 (类型为菜单时选填)
     */
    private Integer hidden;

}
