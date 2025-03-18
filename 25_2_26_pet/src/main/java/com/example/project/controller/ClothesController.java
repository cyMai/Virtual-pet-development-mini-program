package com.example.project.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.project.entity.Clothes;
import com.example.project.mapper.ClothesMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/project/clothes")
public class ClothesController {
    @Autowired
    private ClothesMapper clothesMapper;

    @GetMapping("/list")
    public List<Clothes> list() {
        QueryWrapper<Clothes> queryWrapper = new QueryWrapper<>();
        return clothesMapper.selectList(queryWrapper);
    }

    @PostMapping("/detail")
    public Clothes getInfo(@RequestBody Clothes clothes) {
        return clothesMapper.selectById(clothes);
    }

    @PostMapping("/add")
    public int add(@RequestBody Clothes clothes) {
        return clothesMapper.insert(clothes);
    }

    @PostMapping("/edit")
    public int edit(@RequestBody Clothes clothes) {
        // 获取当前服装信息
        Clothes currentClothes = clothesMapper.selectById(clothes.getId());
        
        // 处理userIds
        String currentUserIds = currentClothes.getUserIds();
        String newUserId = String.valueOf(clothes.getUserId());
        
        if(currentUserIds == null || currentUserIds.isEmpty()) {
            // 第一个购买的用户
            currentClothes.setUserIds(newUserId);
        } else {
            // 追加用户ID
            currentClothes.setUserIds(currentUserIds + "," + newUserId);
        }
        
        return clothesMapper.updateById(currentClothes);
    }

    @PostMapping("/del")
    public int remove(@RequestBody Clothes clothes) {
        return clothesMapper.deleteById(clothes);
    }
} 