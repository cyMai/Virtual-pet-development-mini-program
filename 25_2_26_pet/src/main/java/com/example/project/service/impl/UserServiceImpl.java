package com.example.project.service.impl;


import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import com.example.project.mapper.UserMapper;
import com.example.project.entity.User;
import com.example.project.service.IUserService;



/**
 * 用户管理Service业务层处理
 *
 * @author changyao
 * @date 2025-01-09
 */

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {

}

