package com.project.learningproject.repositories;

import com.project.learningproject.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
    // You can define custom repository methods here if needed
}
