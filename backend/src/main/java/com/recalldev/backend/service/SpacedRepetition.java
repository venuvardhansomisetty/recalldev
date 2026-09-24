package com.recalldev.backend.service;

import com.recalldev.backend.model.Card;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

@Service
public class SpacedRepetition {

    // rating: 1 = Again, 3 = Hard, 4 = Good, 5 = Easy
    public void update(Card card, int rating) {

        if (rating < 3) {
            // forgot it: start again, show tomorrow
            card.setRepetitions(0);
            card.setIntervalDays(1);
        } else {
            if (card.getRepetitions() == 0) {
                card.setIntervalDays(1);
            } else if (card.getRepetitions() == 1) {
                card.setIntervalDays(6);
            } else {
                card.setIntervalDays((int) Math.round(card.getIntervalDays() * card.getEaseFactor()));
            }
            card.setRepetitions(card.getRepetitions() + 1);
        }

        // make the card easier or harder depending on the rating (never below 1.3)
        double ease = card.getEaseFactor() + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02));
        card.setEaseFactor(Math.max(1.3, ease));

        card.setNextReviewDate(LocalDate.now().plusDays(card.getIntervalDays()));
    }
}