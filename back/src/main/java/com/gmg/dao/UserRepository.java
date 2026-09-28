package com.gmg.dao;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.gmg.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUserId(String userId);

    boolean existsByUserId(String userId);
}
