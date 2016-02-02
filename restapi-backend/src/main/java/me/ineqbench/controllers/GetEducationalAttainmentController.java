package me.ineqbench.controllers;

import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import me.ineqbench.analyst.Analyser;
import me.ineqbench.clientResponsePojos.ClientResponsePOJO;
import me.ineqbench.dao.EducationalAttainmentDAO;
import me.ineqbench.dbRequestPOJOs.Range;
import me.ineqbench.dbResponsePOJOs.ResponseTuplePOJO;

// Provides the Educational Attainment data to the front end (HTTP GET Restful Request)
@RestController
public class GetEducationalAttainmentController {

    @CrossOrigin
    @RequestMapping(value="/getEducationalAttainment", method = RequestMethod.GET)
  //Get Educational Attainment ClientResponsePOJO
    public  ClientResponsePOJO getEducationalAttainment(@RequestParam(value="numberOfPeople") int numberOfPeople, @RequestParam(value="ageGroup") int[] ageGroup,
    		@RequestParam(value="gender") String gender){
    	
    	ApplicationContext context = new ClassPathXmlApplicationContext("Spring-Module.xml");
    	EducationalAttainmentDAO educationalAttainmentDAO = (EducationalAttainmentDAO)context.getBean("educationalAttainmentDAO");
    	
    	List<ResponseTuplePOJO> educationalAttainmentDBResponse = educationalAttainmentDAO.findData(gender, new Range(ageGroup[0],ageGroup[1]));
    	ClientResponsePOJO estimate = Analyser.getEstimate(educationalAttainmentDBResponse, numberOfPeople);
    	return estimate;
    }	

}

