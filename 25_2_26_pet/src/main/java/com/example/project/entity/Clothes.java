package com.example.project.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("clothes")
public class Clothes implements Serializable {
    private static final long serialVersionUID = 1L;

    /** 编号 */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /** 购买此衣服的用户编号 */
    private String userIds;

    /** 临时字段，用于接收前端传来的用户ID */
    @TableField(exist = false)
    private Long userId;

    /** 名称 */
    private String name;

    /** 价格 */
    private Integer price;
} 