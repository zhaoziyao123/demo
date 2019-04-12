package com.jk.mapper;

import com.jk.pojo.TreeBean;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface UserMapper {

    @Select("select * from t_tree")
    List<TreeBean> queryTree();
}
