package com.example.project.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.project.entity.ActivityRecord;
import com.example.project.mapper.ActivityRecordMapper;
import com.example.project.service.IActivityRecordService;
import org.springframework.stereotype.Service;

@Service
public class ActivityRecordServiceImpl extends ServiceImpl<ActivityRecordMapper, ActivityRecord> implements IActivityRecordService {
} 