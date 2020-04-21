package com.lunchtime.controllers;

import com.lunchtime.models.JwtPersonDetails;
import com.lunchtime.security.TokenHistory;
import com.lunchtime.service.dto.RegisterPerson;
import com.lunchtime.service.dto.PersonDto;
import com.lunchtime.service.dto.PersonPassDto;
import com.lunchtime.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.NonUniqueResultException;
import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/persons")
public class PersonController {
    private final PersonService personService;
    private final AuthController authController;
    private final TokenHistory tokenHistory;

    @PostMapping
    public ResponseEntity<?> createPerson(
        @Valid @RequestBody RegisterPerson registerPerson) throws Exception {

        if (registerPerson.getId() != null) {
            return ResponseEntity.badRequest()
                .build();
        }

        PersonDto personDto = null;
        try {
            personDto = personService.saveRegisterPerson(registerPerson);
        } catch (NonUniqueResultException nue) {
            return ResponseEntity.status(Integer.parseInt(nue.getMessage())).build();
        } catch (Exception e) {
            e.printStackTrace();
        }


        if (personDto != null) {
            JwtPersonDetails jwtPersonDetails = new JwtPersonDetails(
                registerPerson.getEmail(), registerPerson.getPassword());
            authController.createAuthenticationToken(jwtPersonDetails);
            String token = tokenHistory.getTokenList().remove(0);
            return ResponseEntity.ok(token);

        }
        return null;
    }

    @PutMapping
    public ResponseEntity<PersonDto> update(@Valid @RequestBody PersonDto personDto) {
        PersonDto result = personService.updatePerson(personDto);
        if (result != null) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/password")
    public ResponseEntity<Void> updatePassword(@Valid @RequestBody PersonPassDto personPassDto) {
        PersonPassDto result;
        try {
            result = personService.updatePassword(personPassDto);
        } catch (Exception e) {
            return ResponseEntity.noContent().build();
        }
        if (result != null) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("{id}")
    public ResponseEntity<PersonDto> getPersonById(@PathVariable Long id) {
        PersonDto personDto = personService.getPersonDtoById(id);
        if (personDto != null) {
            return ResponseEntity.ok()
                .body(personDto);
        }
        return ResponseEntity.notFound()
            .build();
    }
}
