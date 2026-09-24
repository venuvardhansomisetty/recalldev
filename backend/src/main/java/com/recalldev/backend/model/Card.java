package com.recalldev.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Card {

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public String getQuestion() {
        return question;
    }
    public void setQuestion(String question) {
        this.question = question;
    }
    public String getAnswer() {
        return answer;
    }
    public void setAnswer(String answer) {
        this.answer = answer;
    }
    public String getTag() {
        return tag;
    }
    public void setTag(String tag) {
        this.tag = tag;
    }
    public double getEaseFactor() {
        return easeFactor;
    }
    public void setEaseFactor(double easeFactor) {
        this.easeFactor = easeFactor;
    }
    public int getIntervalDays() {
        return intervalDays;
    }
    public void setIntervalDays(int intervalDays) {
        this.intervalDays = intervalDays;
    }
    public int getRepetitions() {
        return repetitions;
    }
    public void setRepetitions(int repetitions) {
        this.repetitions = repetitions;
    }
    public LocalDate getNextReviewDate() {
        return nextReviewDate;
    }
    public void setNextReviewDate(LocalDate nextReviewDate) {
        this.nextReviewDate = nextReviewDate;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String question;

    @Column(columnDefinition = "TEXT")
    private String answer;

    private String tag;
    private double easeFactor = 2.5;
    private int intervalDays = 0;
    private int repetitions = 0;
    private LocalDate nextReviewDate = LocalDate.now();
}