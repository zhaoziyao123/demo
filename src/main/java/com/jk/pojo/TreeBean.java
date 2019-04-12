package com.jk.pojo;

public class TreeBean {
    private Integer id;

    private String url;

    private String text;

    private Integer pid;

    @Override
    public String toString() {
        return "TreeBean{" +
                "id=" + id +
                ", url='" + url + '\'' +
                ", text='" + text + '\'' +
                ", pid=" + pid +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }
}
