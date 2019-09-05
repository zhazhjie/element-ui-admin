/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80012
Source Host           : 127.0.0.1:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 80012
File Encoding         : 65001

Date: 2019-09-05 17:43:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sys_permission
-- ----------------------------
DROP TABLE IF EXISTS `sys_permission`;
CREATE TABLE `sys_permission` (
  `id` bigint(20) NOT NULL,
  `parent_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '父菜单ID，一级菜单为0 (类型为菜单时必填)',
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '权限名称',
  `url` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '菜单路由 (类型为菜单时选填)',
  `permission_flag` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '授权标识 (如：sys:user:list)',
  `type` int(11) NOT NULL COMMENT '类型 0：菜单，1：按钮，2：接口',
  `icon` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '菜单图标 (类型为菜单时选填)',
  `state` tinyint(2) NOT NULL DEFAULT '0' COMMENT '状态 0 正常 1禁用',
  `sort` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `hidden` tinyint(2) NOT NULL DEFAULT '0' COMMENT '是否隐藏 1 隐藏，0 显示 (类型为菜单时选填)',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT=' 权限管理';

-- ----------------------------
-- Records of sys_permission
-- ----------------------------
INSERT INTO `sys_permission` VALUES ('1', '0', '系统中心', '', null, '0', 'icon-setting', '0', '99', '0', '2017-11-08 09:52:09', '2018-11-10 03:56:45');
INSERT INTO `sys_permission` VALUES ('2', '1', '用户管理', '/sys/user', null, '1', 'icon-user', '0', '1', '0', '2017-11-08 09:52:09', '2018-11-10 04:12:07');
INSERT INTO `sys_permission` VALUES ('3', '1', '菜单管理', '/sys/menu', '', '1', 'icon-menu', '0', '2', '0', '2017-11-08 09:52:09', '2018-11-10 04:12:25');
INSERT INTO `sys_permission` VALUES ('4', '1', '角色管理', '/sys/role', null, '1', 'icon-team', '0', '3', '0', '2017-11-08 09:52:09', '2018-11-10 04:12:47');
INSERT INTO `sys_permission` VALUES ('5', '2', '用户查看', '', 'sys:user:list', '2', null, '0', '1', '0', '2017-11-08 09:52:09', '2017-12-04 16:31:10');
INSERT INTO `sys_permission` VALUES ('6', '2', '用户新增', '', 'sys:user:add', '2', null, '0', '2', '0', '2017-11-08 09:52:09', '2017-12-04 16:31:10');
INSERT INTO `sys_permission` VALUES ('7', '2', '用户修改', '', 'sys:user:update', '2', null, '0', '3', '0', '2017-11-08 09:52:09', '2017-12-04 16:31:10');
INSERT INTO `sys_permission` VALUES ('8', '2', '用户删除', '', 'sys:user:delete', '2', null, '0', '4', '0', '2017-11-08 09:52:09', '2017-12-04 16:31:10');
INSERT INTO `sys_permission` VALUES ('9', '3', '菜单查看', '', 'sys:menu:list', '2', null, '0', '1', '0', '2017-11-08 09:52:09', '2017-12-04 16:31:10');
INSERT INTO `sys_permission` VALUES ('10', '3', '菜单新增', '', 'sys:menu:add', '2', null, '0', '2', '0', '2017-11-08 09:52:09', '2017-12-04 16:31:10');
INSERT INTO `sys_permission` VALUES ('11', '3', '菜单修改', '', 'sys:menu:update', '2', null, '0', '3', '0', '2017-11-08 09:52:09', '2017-12-04 16:31:10');
INSERT INTO `sys_permission` VALUES ('12', '3', '菜单删除', '', 'sys:menu:delete', '2', null, '0', '4', '0', '2017-11-08 09:52:09', '2017-12-04 16:31:10');
INSERT INTO `sys_permission` VALUES ('13', '4', '角色查看', '', 'sys:role:list', '2', null, '0', '1', '0', '2018-02-04 13:55:06', '2018-09-15 07:08:15');
INSERT INTO `sys_permission` VALUES ('14', '4', '角色新增', '', 'sys:role:add', '2', null, '0', '2', '0', '2018-02-04 13:55:06', '2018-09-15 07:08:15');
INSERT INTO `sys_permission` VALUES ('15', '4', '角色修改', '', 'sys:role:update', '2', null, '0', '3', '0', '2018-02-04 13:55:06', '2018-09-15 07:08:15');
INSERT INTO `sys_permission` VALUES ('16', '4', '角色删除', '', 'sys:role:delete', '2', null, '0', '4', '0', '2018-02-04 13:55:06', '2018-09-15 07:08:15');
INSERT INTO `sys_permission` VALUES ('1153189990263828481', '0', '会员中心', '', '', '0', 'icon-setting', '0', '1', '0', '2019-07-22 14:28:14', '2019-07-22 14:28:14');
INSERT INTO `sys_permission` VALUES ('1153190263568871426', '1153189990263828481', '会员类型', '/memberCenter/memberType', '', '1', 'icon-setting', '0', '1', '0', '2019-07-22 14:29:19', '2019-07-22 14:44:44');
INSERT INTO `sys_permission` VALUES ('1153653328160645122', '1153189990263828481', '会员列表', '/memberCenter/memberList', '', '1', 'icon-setting', '0', '2', '0', '2019-07-23 21:09:22', '2019-07-23 21:09:22');
INSERT INTO `sys_permission` VALUES ('1154354962195611650', '0', '配置中心', '', '', '0', 'icon-setting', '0', '0', '0', '2019-07-25 19:37:25', '2019-07-26 11:15:11');
INSERT INTO `sys_permission` VALUES ('1154355322498908162', '1154354962195611650', '提现规则', '/configCenter/withdrawRule', '', '1', 'icon-setting', '0', '1', '0', '2019-07-25 19:38:50', '2019-07-26 11:48:32');
INSERT INTO `sys_permission` VALUES ('1154389609496887298', '0', '商品中心', '', '', '0', 'icon-setting', '0', '3', '0', '2019-07-25 21:55:05', '2019-07-25 21:55:05');
INSERT INTO `sys_permission` VALUES ('1154389755186036737', '1154389609496887298', '商品管理', '/product/info', '', '1', 'icon-setting', '0', '1', '0', '2019-07-25 21:55:40', '2019-07-25 21:55:40');
INSERT INTO `sys_permission` VALUES ('1154599246522019842', '1153189990263828481', '会员提现申请', '/memberCenter/memberWithdrawApply', '', '1', 'icon-setting', '0', '3', '0', '2019-07-26 11:48:06', '2019-07-26 11:48:23');
INSERT INTO `sys_permission` VALUES ('1156772099253317634', '0', '订单中心', '', '', '0', 'icon-menu', '0', '4', '0', '2019-08-01 11:42:15', '2019-08-01 11:43:27');
INSERT INTO `sys_permission` VALUES ('1156773152807956481', '1156772099253317634', '订单查询', '/orderCenter/info', '', '1', 'icon-menu', '0', '1', '0', '2019-08-01 11:46:26', '2019-08-01 11:47:46');
INSERT INTO `sys_permission` VALUES ('1166241995435532289', '1153189990263828481', '会员股权申请', '/memberCenter/memberEquityApply', '', '1', 'icon-setting', '0', '4', '0', '2019-08-27 14:52:14', '2019-08-27 14:52:36');
