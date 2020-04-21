package com.lunchtime.controllers;

import com.lunchtime.security.TokenHistory;
import com.lunchtime.service.dto.PersonDto;
import com.lunchtime.service.dto.PersonPassDto;
import com.lunchtime.service.PersonService;
import com.lunchtime.stub.PersonServiceStub;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;

@RunWith(SpringJUnit4ClassRunner.class)
public class PersonControllerTest {
    @Mock
    private PersonService mockPersonService;

    private PersonController personControllerUnderTest;
    private AuthController authController = new AuthController();
    private TokenHistory tokenHistory = new TokenHistory();
    private PersonDto personDto;

    @Before
    public void setUp() {
        initMocks(this);
        personControllerUnderTest = new PersonController(
            mockPersonService, authController, tokenHistory);
        personDto = PersonDto.builder()
            .id(1)
            .name("NewName")
            .phoneNumber("+380991112233")
            .email("name@gmail.com")
            .build();
    }

    @Test
    public void testUpdate() throws Exception {
        final ResponseEntity<PersonDto> result = personControllerUnderTest.update(personDto);
        verify(mockPersonService).updatePerson(personDto);
        verifyNoMoreInteractions(mockPersonService);
        Assertions.assertNotNull(result);
    }

    @Test
    public void testUpdatePassword() throws Exception {
        PersonPassDto personPassDto = new PersonPassDto();
        personPassDto.setId(1);
        personPassDto.setOldPassword("oldPass");
        personPassDto.setPassword("oldPass");
        personPassDto.setName("NewName");
        personPassDto.setPhoneNumber("+380991112233");

        personControllerUnderTest.updatePassword(personPassDto);

        verify(mockPersonService).updatePassword(personPassDto);
        verifyNoMoreInteractions(mockPersonService);
    }

    @Test
    public void testGetPersonDto() throws Exception {
        when(mockPersonService.getPersonDtoById(0L)).thenReturn(personDto);
        personControllerUnderTest.getPersonById(0L);
        verify(mockPersonService, times(1)).getPersonDtoById(0L);
        verifyNoMoreInteractions(mockPersonService);
    }
}
