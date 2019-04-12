package com.jk.controller;

import com.jk.pojo.TreeBean;
import com.jk.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("user")
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping("queryTree")
    @ResponseBody
    public List<TreeBean> queryTree() {

        return userService.queryTree();
    }
}
