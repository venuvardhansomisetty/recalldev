package com.recalldev.backend.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.recalldev.backend.model.Card;
import com.recalldev.backend.repository.CardRepository;
import com.recalldev.backend.service.SpacedRepetition;

@RestController
@RequestMapping("/api/cards")
@CrossOrigin(origins = "*")
public class CardController {

    private final CardRepository cardRepository;
    private final SpacedRepetition spacedRepetition;

    public CardController(CardRepository cardRepository, SpacedRepetition spacedRepetition) {
        this.cardRepository = cardRepository;
        this.spacedRepetition = spacedRepetition;
    }

    // GET /api/cards?userId=1  -> all cards of this user
    @GetMapping
    public List<Card> getAllCards(@RequestParam Long userId) {
        return cardRepository.findByUserId(userId);
    }

    // GET /api/cards/due?userId=1  -> only cards to revise today
    @GetMapping("/due")
    public List<Card> getDueCards(@RequestParam Long userId) {
        return cardRepository.findByUserIdAndNextReviewDateLessThanEqual(userId, LocalDate.now());

    }

    // POST /api/cards  -> add a new card
    @PostMapping
    public Card addCard(@RequestBody Card card) {
        return cardRepository.save(card);
    }

    // DELETE /api/cards/5  -> delete card number 5
    @DeleteMapping("/{id}")
    public void deleteCard(@PathVariable Long id) {
        cardRepository.deleteById(id);
    }

    // PUT /api/cards/5/review?rating=4  -> user rated card 5
    @PutMapping("/{id}/review")
    public Card reviewCard(@PathVariable Long id, @RequestParam int rating) {
        Card card = cardRepository.findById(id).orElseThrow();
        spacedRepetition.update(card, rating);
        return cardRepository.save(card);
    }
}