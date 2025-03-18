package com.example.project.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.project.entity.FocusRecord;
import com.example.project.mapper.FocusRecordMapper;
import com.example.project.service.IFocusRecordService;
import org.springframework.stereotype.Service;

@Service
public class FocusRecordServiceImpl extends ServiceImpl<FocusRecordMapper, FocusRecord> implements IFocusRecordService {
} 