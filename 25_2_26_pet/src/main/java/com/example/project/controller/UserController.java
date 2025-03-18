package com.example.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.project.entity.User;
import com.example.project.mapper.UserMapper;

/**
 * 用户管理Controller
 *
 * @author changyao
 * @date 2025-01-09
 */
@RestController
@RequestMapping("/project/user")
public class UserController
{
    @Autowired
    private UserMapper userMapper;

    /**
     * 查询用户管理列表
     */
    @GetMapping("/list")
    public List<User> list()
    {
        QueryWrapper<User> queryWrapper=new QueryWrapper<>();
        return userMapper.selectList(queryWrapper);
    }


    @PostMapping("/login")
    public List<User> Login(@RequestBody User user)
    {

        QueryWrapper<User> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("user_account",user.getUserAccount()).eq("user_password",user.getUserPassword()).eq("user_permissions",user.getUserPermissions());
        return userMapper.selectList(queryWrapper);
    }
    @PostMapping("/register")
    public String  register(@RequestBody User user)
    {
        QueryWrapper<User> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("user_account",user.getUserAccount()).eq("user_password",user.getUserPassword()).eq("user_permissions",user.getUserPermissions());
        List<User> users = userMapper.selectList(queryWrapper);
        if(users.size()!=0){
            return "该账户已注册";
        }else{
            userMapper.insert(user);
            return "注册成功";
        }
    }
    /**
     * 获取用户管理详细信息
     */
    @PostMapping("/detail")
    public User getInfo(@RequestBody User user)
    {
        return userMapper.selectById(user);
    }


    /**
     * 新增用户管理
     */
    @PostMapping("/add")
    public int add(@RequestBody User user)
    {
        return userMapper.insert(user);
    }

    /**
     * 修改用户管理
     */
    @PostMapping("/edit")
    public int edit(@RequestBody User user)
    {
        return userMapper.updateById(user);
    }

    /**
     * 删除用户管理
     */
	@PostMapping("/del")
    public int remove(@RequestBody User user)
    {
        return userMapper.deleteById(user);
    }
}
