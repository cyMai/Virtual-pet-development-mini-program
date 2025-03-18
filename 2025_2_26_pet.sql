/*
 Navicat Premium Data Transfer

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 50744 (5.7.44-log)
 Source Host           : localhost:3306
 Source Schema         : 2025_2_26_pet

 Target Server Type    : MySQL
 Target Server Version : 50744 (5.7.44-log)
 File Encoding         : 65001

 Date: 16/03/2025 13:41:08
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activity_record
-- ----------------------------
DROP TABLE IF EXISTS `activity_record`;
CREATE TABLE `activity_record`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `pet_id` int(11) NULL DEFAULT NULL COMMENT '宠物ID',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '活动类型',
  `mood` int(255) NULL DEFAULT NULL COMMENT '心情值变化',
  `created_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '记录日期',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '活动名称',
  `user_id` int(11) NULL DEFAULT NULL COMMENT '用户ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of activity_record
-- ----------------------------
INSERT INTO `activity_record` VALUES (19, 7, '饥饿', -5, '2025-03-02 15:38:48', '好饿啊，想吃东西...', 6);
INSERT INTO `activity_record` VALUES (20, 7, '淋雨', -5, '2025-03-02 15:38:50', '突然下雨了，全身都湿透了', 6);
INSERT INTO `activity_record` VALUES (21, 7, '饥饿', -5, '2025-03-02 15:38:51', '肚子咕咕叫...', 6);

-- ----------------------------
-- Table structure for clothes
-- ----------------------------
DROP TABLE IF EXISTS `clothes`;
CREATE TABLE `clothes`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `price` int(255) NULL DEFAULT NULL COMMENT '金币价格',
  `user_ids` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '购买此衣服的用户',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of clothes
-- ----------------------------
INSERT INTO `clothes` VALUES (1, '连衣裙', 200, '1');
INSERT INTO `clothes` VALUES (2, '短袖衣服', 180, '1,6');
INSERT INTO `clothes` VALUES (3, '蕾丝边小衬衫', 150, '6');
INSERT INTO `clothes` VALUES (4, '卫衣', 160, NULL);

-- ----------------------------
-- Table structure for focus_record
-- ----------------------------
DROP TABLE IF EXISTS `focus_record`;
CREATE TABLE `focus_record`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `user_id` int(11) NULL DEFAULT NULL COMMENT '用户ID',
  `pet_id` int(11) NULL DEFAULT NULL COMMENT '宠物ID',
  `focus_time` int(255) NULL DEFAULT NULL COMMENT '专注时长',
  `exp_gained` int(255) NULL DEFAULT NULL COMMENT '获得的经验百分比',
  `created_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '记录时间',
  `focus_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 51 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of focus_record
-- ----------------------------
INSERT INTO `focus_record` VALUES (36, 1, 1, 5, 5, '2025-03-01 16:22:33', 'ddd');
INSERT INTO `focus_record` VALUES (37, 1, 1, 5, 5, '2025-03-01 16:22:38', 'ddd');
INSERT INTO `focus_record` VALUES (38, 1, 1, 5, 13, '2025-03-01 16:22:42', 'ddd');
INSERT INTO `focus_record` VALUES (39, 1, 1, 5, 10, '2025-03-01 16:22:48', 'ddd');
INSERT INTO `focus_record` VALUES (40, 1, 1, 5, 12, '2025-03-01 16:30:23', 'ddd');
INSERT INTO `focus_record` VALUES (41, 1, 1, 5, 10, '2025-03-01 16:34:54', 'ddd');
INSERT INTO `focus_record` VALUES (42, 1, 1, 5, 10, '2025-03-01 16:35:06', 'ddd');
INSERT INTO `focus_record` VALUES (47, 6, 7, 5, 6, '2025-03-02 15:21:35', '学习');
INSERT INTO `focus_record` VALUES (48, 6, 7, 100, 203, '2025-03-02 15:22:09', '玩耍');
INSERT INTO `focus_record` VALUES (49, 6, 7, 125, 241, '2025-03-02 15:22:47', '玩耍');
INSERT INTO `focus_record` VALUES (50, 6, 7, 45, 92, '2025-03-02 15:23:12', '学习一下');

-- ----------------------------
-- Table structure for game_record
-- ----------------------------
DROP TABLE IF EXISTS `game_record`;
CREATE TABLE `game_record`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `user_id` int(11) NULL DEFAULT NULL COMMENT '用户ID',
  `pet_id` int(11) NULL DEFAULT NULL COMMENT '宠物ID',
  `mood_gained` int(11) NULL DEFAULT NULL COMMENT '获得的心情值',
  `created_time` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT '记录时间',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of game_record
-- ----------------------------
INSERT INTO `game_record` VALUES (24, 1, 1, 6, '2025-03-02 13:42:11', '2048合成');
INSERT INTO `game_record` VALUES (25, 1, 1, 5, '2025-03-02 13:42:13', '2048合成');
INSERT INTO `game_record` VALUES (26, 1, 1, 5, '2025-03-02 13:42:14', '2048合成');
INSERT INTO `game_record` VALUES (27, 1, 1, 5, '2025-03-02 13:42:14', '2048合成');
INSERT INTO `game_record` VALUES (28, 6, 7, 5, '2025-03-02 15:39:05', '2048合成');
INSERT INTO `game_record` VALUES (29, 6, 7, 5, '2025-03-02 15:39:07', '2048合成');
INSERT INTO `game_record` VALUES (30, 6, 7, 1, '2025-03-02 15:39:19', '猜成语');

-- ----------------------------
-- Table structure for manual_pages
-- ----------------------------
DROP TABLE IF EXISTS `manual_pages`;
CREATE TABLE `manual_pages`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `img` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT '图片',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of manual_pages
-- ----------------------------
INSERT INTO `manual_pages` VALUES (1, 'http://localhost:9999/uploadImage/1740897198747.jpg');
INSERT INTO `manual_pages` VALUES (2, 'http://localhost:9999/uploadImage/1740897223952.jpg');
INSERT INTO `manual_pages` VALUES (3, 'http://localhost:9999/uploadImage/1740897244465.jpg');
INSERT INTO `manual_pages` VALUES (4, 'http://localhost:9999/uploadImage/1740901190841.jpg');

-- ----------------------------
-- Table structure for pet
-- ----------------------------
DROP TABLE IF EXISTS `pet`;
CREATE TABLE `pet`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `user_id` int(11) NULL DEFAULT NULL COMMENT '用户编号',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '宠物类型',
  `level` int(11) NULL DEFAULT 1 COMMENT '等级',
  `mood` int(100) NULL DEFAULT 100 COMMENT '心情值',
  `exp` int(11) NULL DEFAULT NULL COMMENT '经验值',
  `current_clothes_id` int(11) NULL DEFAULT NULL COMMENT '当前穿戴的衣服Id',
  `created_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '领养时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pet
-- ----------------------------
INSERT INTO `pet` VALUES (1, 1, '旺财', 'dog', 1, 85, 72, NULL, NULL);
INSERT INTO `pet` VALUES (7, 6, '小旺财', 'dog', 6, 91, 42, NULL, NULL);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `user_account` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '账号',
  `user_password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `user_permissions` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '普通用户' COMMENT '权限',
  `user_pic` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像',
  `user_nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `user_age` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '年龄',
  `user_sex` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '性别',
  `total_focus_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '总专注时长(分钟)',
  `coins` decimal(10, 1) NULL DEFAULT NULL COMMENT '金币',
  `max_score` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '最高分',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户管理表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'user', '123456', '普通用户', 'http://localhost:9999/uploadImage/1740897353536.jpg', '是的是的', NULL, NULL, '40', 9802.5, '132.0');
INSERT INTO `user` VALUES (2, 'admin', '123456', '管理员', NULL, '管理员', NULL, NULL, '0', NULL, NULL);
INSERT INTO `user` VALUES (6, 'user1', '123456', '普通用户', 'http://localhost:9999/uploadImage/1740900037636.jpg', '大王村', NULL, NULL, '275', 470.5, '12.0');

SET FOREIGN_KEY_CHECKS = 1;
