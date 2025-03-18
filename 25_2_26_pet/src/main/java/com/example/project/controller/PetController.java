package com.example.project.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.project.entity.Pet;
import com.example.project.mapper.PetMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/project/pet")
public class PetController {
    @Autowired
    private PetMapper petMapper;

    @GetMapping("/list")
    public List<Pet> list() {
        QueryWrapper<Pet> queryWrapper = new QueryWrapper<>();
        return petMapper.selectList(queryWrapper);
    }

    @PostMapping("/getPet")
    public Pet getPet(@RequestBody Pet pet) {
        QueryWrapper<Pet> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", pet.getUserId());
        return petMapper.selectOne(queryWrapper);
    }

    @PostMapping("/detail")
    public Pet getInfo(@RequestBody Pet pet) {
        return petMapper.selectById(pet);
    }


    @PostMapping("/add")
    public int add(@RequestBody Pet pet) {
        return petMapper.insert(pet);
    }

    @PostMapping("/edit")
    public int edit(@RequestBody Pet pet) {
        return petMapper.updateById(pet);
    }

    @PostMapping("/del")
    public int remove(@RequestBody Pet pet) {
        return petMapper.deleteById(pet);
    }
} 