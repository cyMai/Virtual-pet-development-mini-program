package com.example.project.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.project.entity.GameRecord;
import com.example.project.entity.Pet;
import com.example.project.mapper.GameRecordMapper;
import com.example.project.mapper.PetMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/project/gameRecord")
public class GameRecordController {
    @Autowired
    private GameRecordMapper gameRecordMapper;
    @Autowired
    private PetMapper petMapper;

    @GetMapping("/list/{userId}")
    public List<GameRecord> list(@PathVariable Long userId) {
        QueryWrapper<GameRecord> queryWrapper = new QueryWrapper<>();
        if (userId != null) {
            queryWrapper.eq("user_id", userId);
        } 
        return gameRecordMapper.selectList(queryWrapper);
    }

    @GetMapping("/list")
    public List<GameRecord> list() {
        QueryWrapper<GameRecord> queryWrapper = new QueryWrapper<>();
        return gameRecordMapper.selectList(queryWrapper);
    }

    @PostMapping("/detail")
    public GameRecord getInfo(@RequestBody GameRecord record) {
        return gameRecordMapper.selectById(record);
    }

    @PostMapping("/add")
    public int add(@RequestBody GameRecord record) {
        return gameRecordMapper.insert(record);
    }

    @PostMapping("/edit")
    public int edit(@RequestBody GameRecord record) {
        return gameRecordMapper.updateById(record);
    }

    @PostMapping("/del")
    public int remove(@RequestBody GameRecord record) {
        return gameRecordMapper.deleteById(record);
    }

    @PostMapping("/merge2048")
    public Map<String, Object> merge2048(@RequestBody GameRecord record) {
        Map<String, Object> result = new HashMap<>();
        
        // 根据游戏类型设置不同的心情值增加
        int moodGained;
        if ("猜成语".equals(record.getType())) {
            moodGained = 1;  // 猜成语每次增加1点
        } else {
            moodGained = 5;  // 2048每次增加5点
        }
        
        // 获取当前宠物
        Pet currentPet = petMapper.selectById(record.getPetId());
        
        // 计算新的心情值
        int newMood = Math.min(100, Math.max(0, currentPet.getMood() + moodGained));
        
        // 更新宠物心情值
        currentPet.setMood(newMood);
        petMapper.updateById(currentPet);
        
        // 保存游戏记录
        record.setMoodGained(moodGained);
        record.setCreatedTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        gameRecordMapper.insert(record);
        
        result.put("moodGained", moodGained);
        result.put("newMood", newMood);
        return result;
    }
} 