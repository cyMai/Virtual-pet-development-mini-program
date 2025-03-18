package com.example.project.entity;

import java.io.Serializable;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;



/**
 * 用户管理对象 user
 *
 * @author changyao
 * @date 2025-01-09
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class User implements Serializable
{
    private static final long serialVersionUID = 1L;
    @TableId(value = "id",type = IdType.AUTO)
    /** 编号 */
    private Long id;

    /** 账号 */
    private String userAccount;

    /** 密码 */
    private String userPassword;

    /** 身份 */
    private String userPermissions;

    /** 姓名 */
    private String userNickname;

    /** 年龄 */
    private String userAge;

    /** 总专注时间 */
    private String totalFocusTime;

    /** 性别 */
    private String userSex;

    private String userPic;

    /** 金币 */
    private Double coins;

    /** 最高分 */
    private Double maxScore;

}
