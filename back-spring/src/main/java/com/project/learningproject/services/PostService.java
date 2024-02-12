package com.project.learningproject.services;

import com.project.learningproject.entities.Post;

import java.util.List;

public interface PostService {
    List<Post> findAll();
    Post findById(Long id);
    Post save(Post post);
    void deleteById(Long id);
}
