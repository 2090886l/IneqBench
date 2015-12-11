package me.ineqbench.controllers;

public class GetCustomersTest {

    private final long id;
    private final String content;

    public GetCustomersTest(long id, String content) {
        this.id = id;
        this.content = content;
    }

    public long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }
}
