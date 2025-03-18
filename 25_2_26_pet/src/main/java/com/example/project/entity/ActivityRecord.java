package com.example.project.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class ActivityRecord implements Serializable {
    private static final long serialVersionUID = 1L;

    /** 编号 */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /** 宠物ID */
    private Long petId;

    /** 用户ID */
    private Long userId;

    /** 活动类型 */
    private String type;

    /** 心情值 */
    private Integer mood;

    /** 创建时间 */
    private String createdTime;

    /** 描述 */
    private String description;
} 