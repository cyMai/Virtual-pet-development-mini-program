package com.example.project.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.project.entity.Clothes;
import com.example.project.mapper.ClothesMapper;
import com.example.project.service.IClothesService;
import org.springframework.stereotype.Service;

@Service
public class ClothesServiceImpl extends ServiceImpl<ClothesMapper, Clothes> implements IClothesService {
} 