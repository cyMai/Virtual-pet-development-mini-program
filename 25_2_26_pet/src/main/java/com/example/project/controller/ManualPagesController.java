package com.example.project.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.project.entity.ManualPages;
import com.example.project.mapper.ManualPagesMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/project/manualPages")
public class ManualPagesController {
    @Autowired
    private ManualPagesMapper manualPagesMapper;

    @GetMapping("/list")
    public List<ManualPages> list() {
        QueryWrapper<ManualPages> queryWrapper = new QueryWrapper<>();
        return manualPagesMapper.selectList(queryWrapper);
    }

    @PostMapping("/detail")
    public ManualPages getInfo(@RequestBody ManualPages page) {
        return manualPagesMapper.selectById(page);
    }

    @PostMapping("/add")
    public int add(@RequestBody ManualPages page) {
        return manualPagesMapper.insert(page);
    }

    @PostMapping("/edit")
    public int edit(@RequestBody ManualPages page) {
        return manualPagesMapper.updateById(page);
    }

    @PostMapping("/del")
    public int remove(@RequestBody ManualPages page) {
        return manualPagesMapper.deleteById(page);
    }
} 