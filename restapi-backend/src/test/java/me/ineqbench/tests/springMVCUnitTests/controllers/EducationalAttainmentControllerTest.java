package me.ineqbench.tests.springMVCUnitTests.controllers;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import me.ineqbench.controllers.dao.JdbcEducationalAttainmentDAO;
import me.ineqbench.dbResponsePOJOs.ResponseTuplePOJO;
import me.ineqbench.tests.builders.ClientRequestBuilder;
import me.ineqbench.tests.builders.DBResponseBuilder;
import me.ineqbench.tests.util.ClientRequestPOJO;
import me.ineqbench.tests.util.TestUtil;

@RunWith(SpringJUnit4ClassRunner.class)
// Spring-Test-Module is the test environment - mirror of the Spring-Module
// environment
// used only for testing purposes
@ContextConfiguration(locations = { "classpath:Spring-Test-Module.xml" })
@WebAppConfiguration
public class EducationalAttainmentControllerTest {

	private MockMvc mockMvc;

	@Autowired
	private JdbcEducationalAttainmentDAO educationalDAO;

	@Autowired
	private WebApplicationContext webApplicationContext;

	@Before
	public void setUp() {
		// We have to reset our mock between tests because the mock objects
		// are managed by the Spring container. If we do not reset them,
		// stubbing and verified behavior will "leak" from one test to another.

		Mockito.reset(educationalDAO);

		// Get the mock builder from the WebApplicationContext Spring container
		mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
	}

	@Test
	public void findEducationalAttainment__ShouldMapRequestToController() throws Exception {

		ResponseTuplePOJO response = DBResponseBuilder.getDBMockResponse();

		// Avoid "data clumps", unfortunately EducationalAttainmentDAO interface
		// method
		// findData gets only primitive params - explain why in interface doc
		ClientRequestPOJO clientRequest = ClientRequestBuilder.getRequestObject();

		// Configure mockito to return "response" when findData called
		when(educationalDAO.findData(clientRequest.getAgeGroupStart(), clientRequest.getAgeGroupEnd(),
				clientRequest.getGender(), clientRequest.getLocality())).thenReturn(response);

		// exec request
		mockMvc.perform(
				get("/getEducationalAttainment/{numberOfPeople}/{ageGroupStart}/{ageGroupEnd}/{gender}/{locality}",
						clientRequest.getNumberOfPeople(), clientRequest.getAgeGroupStart(),
						clientRequest.getAgeGroupEnd(), clientRequest.getGender(), clientRequest.getLocality())
								.accept(TestUtil.APPLICATION_JSON_UTF8))
				.andExpect(status().isOk());

		verify(educationalDAO, times(1)).findData(clientRequest.getAgeGroupStart(), clientRequest.getAgeGroupEnd(),
				clientRequest.getGender(), clientRequest.getLocality());
		verifyNoMoreInteractions(educationalDAO);
	}
}
