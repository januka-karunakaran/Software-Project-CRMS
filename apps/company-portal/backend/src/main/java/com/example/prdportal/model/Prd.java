package com.example.prdportal.model;

public class Prd {
    private String pid;
    private String title;
    private String status;
    private String lastModified;
    private String version;

    public Prd() {
    }

    public Prd(String pid, String title, String status, String lastModified, String version) {
        this.pid = pid;
        this.title = title;
        this.status = status;
        this.lastModified = lastModified;
        this.version = version;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLastModified() {
        return lastModified;
    }

    public void setLastModified(String lastModified) {
        this.lastModified = lastModified;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }
}
