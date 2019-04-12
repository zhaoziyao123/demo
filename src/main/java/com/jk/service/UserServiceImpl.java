package com.jk.service;

import com.jk.mapper.UserMapper;
import com.jk.pojo.TreeBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;

    @Override
    public List<TreeBean> queryTree() {

        return userMapper.queryTree();
    }
}
