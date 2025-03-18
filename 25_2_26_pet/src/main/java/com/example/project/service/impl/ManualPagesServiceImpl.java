package com.example.project.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.project.entity.ManualPages;
import com.example.project.mapper.ManualPagesMapper;
import com.example.project.service.IManualPagesService;
import org.springframework.stereotype.Service;

@Service
public class ManualPagesServiceImpl extends ServiceImpl<ManualPagesMapper, ManualPages> implements IManualPagesService {
} 