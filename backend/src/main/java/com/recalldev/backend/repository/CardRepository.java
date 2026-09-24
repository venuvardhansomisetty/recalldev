package com.recalldev.backend.repository;

import com.recalldev.backend.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface CardRepository extends JpaRepository<Card, Long> {

    List<Card> findByUserId(Long userId);

    List<Card> findByUserIdAndNextReviewDateLessThanEqual(Long userId, LocalDate date);
}