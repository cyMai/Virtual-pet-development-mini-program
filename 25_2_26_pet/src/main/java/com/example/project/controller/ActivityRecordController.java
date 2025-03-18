package com.example.project.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.project.entity.ActivityRecord;
import com.example.project.entity.Pet;
import com.example.project.mapper.ActivityRecordMapper;
import com.example.project.mapper.PetMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/project/activityRecord")
public class ActivityRecordController {
    @Autowired
    private ActivityRecordMapper activityRecordMapper;

    @Autowired
    private PetMapper petMapper;

    // 随机活动类型列表
    private static final String[] ACTIVITY_TYPES = {
        // 正面活动
        "散步", "玩球", "洗澡", "吃饭", "玩耍",
        // 负面活动
        "生病", "淋雨", "孤单", "饥饿", "受伤"
    };
    
    // 随机活动描述
    private static final Map<String, String[]> ACTIVITY_DESCRIPTIONS = new HashMap<String, String[]>() {{
        // 正面活动描述
        put("散步", new String[]{"今天天气真好，一起出去散步吧！", "在公园里遇到了其他小伙伴~"});
        put("玩球", new String[]{"接住球球！", "玩得好开心~"});
        put("洗澡", new String[]{"泡泡浴时间！", "香喷喷的~"});
        put("吃饭", new String[]{"最喜欢吃饭时间了！", "肚子好饱~"});
        put("玩耍", new String[]{"和主人一起玩真开心！", "今天玩得好尽兴~"});
        // 负面活动描述
        put("生病", new String[]{"今天感觉不太舒服...", "肚子疼得厉害..."});
        put("淋雨", new String[]{"突然下雨了，全身都湿透了", "感觉要感冒了..."});
        put("孤单", new String[]{"今天好想主人啊...", "一个人待着好无聊..."});
        put("饥饿", new String[]{"好饿啊，想吃东西...", "肚子咕咕叫..."});
        put("受伤", new String[]{"不小心摔倒了...", "脚脚好痛..."});
    }};

    @GetMapping("/list/{userId}")
    public List<ActivityRecord> list(@PathVariable Long userId) {
        QueryWrapper<ActivityRecord> queryWrapper = new QueryWrapper<>();
        if (userId != null) {
            queryWrapper.eq("user_id", userId)
                .apply("DATE(created_time) = CURDATE()")
                .orderByDesc("created_time");
        } else {
            queryWrapper.apply("DATE(created_time) = CURDATE()")
                .orderByDesc("created_time");
        }
        return activityRecordMapper.selectList(queryWrapper);
    }

    @GetMapping("/list")
    public List<ActivityRecord> list() {
        QueryWrapper<ActivityRecord> queryWrapper = new QueryWrapper<>();
        return activityRecordMapper.selectList(queryWrapper);
    }

    @PostMapping("/detail")
    public ActivityRecord getInfo(@RequestBody ActivityRecord record) {
        return activityRecordMapper.selectById(record);
    }

    @PostMapping("/add")
    public int add(@RequestBody ActivityRecord record) {
        return activityRecordMapper.insert(record);
    }

    @PostMapping("/edit")
    public int edit(@RequestBody ActivityRecord record) {
        return activityRecordMapper.updateById(record);
    }

    @PostMapping("/del")
    public int remove(@RequestBody ActivityRecord record) {
        return activityRecordMapper.deleteById(record);
    }

    @PostMapping("/randomActivity")
    public Map<String, Object> randomActivity(@RequestBody Pet pet) {
        Map<String, Object> result = new HashMap<>();
        
        // 检查今天的活动次数
        QueryWrapper<ActivityRecord> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", pet.getUserId())  // 改用 userId 检查次数
            .apply("DATE(created_time) = CURDATE()");
        
        int todayCount = activityRecordMapper.selectCount(queryWrapper);
        
        if (todayCount >= 3) {
            result.put("success", false);
            result.put("message", "今天的活动次数已达上限");
            return result;
        }
        
        // 随机选择活动类型（前5个是正面活动，后5个是负面活动）
        Random random = new Random();
        boolean isPositive = random.nextDouble() >= 0.6; // 40%概率正面活动
        int startIndex = isPositive ? 0 : 5;
        String type = ACTIVITY_TYPES[startIndex + random.nextInt(5)];
        
        // 获取当前宠物
        Pet currentPet = petMapper.selectById(pet.getId());
        
        
        // 计算新的心情值
        int moodChange;
        if (!isPositive) { // 负面活动
            moodChange = -5;
        } else { // 正面活动
            moodChange = 5;
        }
        
        // 计算新的心情值
        int newMood = Math.min(100, Math.max(0, currentPet.getMood() + moodChange));
        
        // 更新宠物心情值
        currentPet.setMood(newMood);
        petMapper.updateById(currentPet);
        
        // 随机选择活动描述
        String[] descriptions = ACTIVITY_DESCRIPTIONS.get(type);
        String description = descriptions[new Random().nextInt(descriptions.length)];
        
        // 创建活动记录
        ActivityRecord record = new ActivityRecord()
            .setPetId(pet.getId())
            .setUserId(pet.getUserId())  // 设置 userId
            .setType(type)
            .setMood(moodChange)
            .setDescription(description)
            .setCreatedTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        
        activityRecordMapper.insert(record);
        
        // 返回结果
        result.put("success", true);
        result.put("type", type);
        result.put("description", description);
        result.put("moodChange", moodChange);
        result.put("newMood", newMood);
        result.put("remainingCount", 3 - todayCount - 1);  // 返回剩余次数
        
        return result;
    }
} 