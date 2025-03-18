package com.example.project.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("focus_record")
public class FocusRecord implements Serializable {
    private static final long serialVersionUID = 1L;

    /** 编号 */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /** 用户ID */
    private Long userId;

    /** 专注名称 */
    private String focusName;

    /** 专注时长(分钟) */
    private Integer focusTime;

    /** 获得的经验值 */
    private Integer expGained;

    /** 创建时间 */
    private String createdTime;

    /** 宠物ID */
    private String petId;
} 