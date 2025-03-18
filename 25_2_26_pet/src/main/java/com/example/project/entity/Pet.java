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
public class Pet implements Serializable {
    private static final long serialVersionUID = 1L;

    /** 编号 */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /** 用户ID */
    private Long userId;

    /** 名称 */
    private String name;

    /** 类型 */
    private String type;

    /** 等级 */
    private Integer level;

    /** 心情值 */
    private Integer mood;

    /** 经验值 */
    private Integer exp;

    /** 当前装扮ID */
    private Long currentClothesId;

    /** 创建时间 */
    private String createdTime;
} 