package com.example.project.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.project.entity.GameRecord;
import com.example.project.mapper.GameRecordMapper;
import com.example.project.service.IGameRecordService;
import org.springframework.stereotype.Service;

@Service
public class GameRecordServiceImpl extends ServiceImpl<GameRecordMapper, GameRecord> implements IGameRecordService {
} 