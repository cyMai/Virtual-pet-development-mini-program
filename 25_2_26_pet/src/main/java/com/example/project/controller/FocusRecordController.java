package com.example.project.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.project.config.AjaxResult;
import com.example.project.entity.FocusRecord;
import com.example.project.entity.Pet;
import com.example.project.entity.User;
import com.example.project.mapper.FocusRecordMapper;
import com.example.project.mapper.PetMapper;
import com.example.project.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Random;
import java.util.HashMap;

@RestController
@RequestMapping("/project/focus")
public class FocusRecordController {
    @Autowired
    private FocusRecordMapper focusRecordMapper;
    
    @Autowired
    private PetMapper petMapper;

    @Autowired
    private UserMapper userMapper;

    @GetMapping("/list/{userId}")
    public List<FocusRecord> list(@PathVariable("userId") Long userId) {
        QueryWrapper<FocusRecord> queryWrapper = new QueryWrapper<>();
        if(userId != null) {
            queryWrapper.eq("user_id", userId);
        }
        return focusRecordMapper.selectList(queryWrapper);
    }

    @GetMapping("/list")
    public List<FocusRecord> list() {
        QueryWrapper<FocusRecord> queryWrapper = new QueryWrapper<>();
        return focusRecordMapper.selectList(queryWrapper);
    }

    @PostMapping("/detail")
    public FocusRecord getInfo(@RequestBody FocusRecord record) {
        return focusRecordMapper.selectById(record);
    }

    @PostMapping("/add")
    public AjaxResult addFocusRecord(@RequestBody FocusRecord focusRecord) {
        // 1. 计算获得的经验值
        int focusTime = focusRecord.getFocusTime();
        int totalExp = 0;
        double earnedCoins = 0.0;  // 声明在方法开始处
        
        // 获取宠物当前心情值
        Pet pet = petMapper.selectById(focusRecord.getPetId());
        int mood = pet != null ? pet.getMood() : 0;
        
        // 每5分钟计算一次经验值
        int times = focusTime / 5;
        Random random = new Random();
        
        for(int i = 0; i < times; i++) {
            // 根据心情值决定获得的经验值
            int exp;
            if (mood >= 80) {
                exp = random.nextInt(11) + 5; // 生成5-15的随机数
            } else if (mood >= 60) {
                exp = random.nextInt(6) + 5;  // 生成5-10的随机数
            } else {
                exp = 5;  // 固定获得5点经验
            }
            totalExp += exp;
        }
        
        // 2. 设置经验值和创建时间
        focusRecord.setExpGained(totalExp);
        focusRecord.setCreatedTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        
        // 3. 保存专注记录
        focusRecordMapper.insert(focusRecord);
        
        // 4. 更新宠物经验值和等级
        if(pet != null) {
            // 累加经验值
            int newExp = (pet.getExp() != null ? pet.getExp() : 0) + totalExp;
            pet.setExp(newExp);
            
            // 计算是否可以升级
            while(newExp >= 100) {  // 当经验值超过100时，可以升级
                newExp -= 100;      // 减去100点经验
                pet.setLevel(pet.getLevel() + 1);  // 等级+1
                // 升级时增加心情值
                pet.setMood(Math.min(100, pet.getMood() + 10));
            }
            
            // 保存剩余经验值
            pet.setExp(newExp);
            
            petMapper.updateById(pet);
        }
        
        // 更新用户总专注时间和金币
        User user = userMapper.selectById(focusRecord.getUserId());
        if(user != null) {
            // 更新总专注时间
            int totalTime = Integer.parseInt(user.getTotalFocusTime() != null ? user.getTotalFocusTime() : "0");
            totalTime += focusTime;
            user.setTotalFocusTime(String.valueOf(totalTime));
            
            // 计算并更新金币(每分钟0.5个金币)
            earnedCoins = focusTime * 0.5;  // 计算本次获得的金币
            double currentCoins = user.getCoins() != null ? user.getCoins() : 0.0;
            double newCoins = currentCoins + earnedCoins;  // 累加金币
            user.setCoins(newCoins);
            
            userMapper.updateById(user);
        }
        
        HashMap<String, Object> result = new HashMap<>();
        result.put("expGained", totalExp);
        result.put("focusTime", focusTime);
        result.put("earnedCoins", earnedCoins);  // 返回获得的金币数
        return AjaxResult.success(result);
    }

    @PostMapping("/edit")
    public int edit(@RequestBody FocusRecord record) {
        return focusRecordMapper.updateById(record);
    }

    @PostMapping("/del")
    public int remove(@RequestBody FocusRecord record) {
        return focusRecordMapper.deleteById(record);
    }
} 