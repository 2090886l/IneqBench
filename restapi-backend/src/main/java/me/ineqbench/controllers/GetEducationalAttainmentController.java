package me.ineqbench.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import me.ineqbench.analyst.Analyser;
import me.ineqbench.clientResponsePojos.ClientResponsePOJO;
import me.ineqbench.dao.impl.JdbcEducationalAttainmentDAO;
import me.ineqbench.dbResponsePOJOs.ResponseTuplePOJO;

// Provides the Educational Attainment data to the front end (HTTP GET Restful Request)
@RestController
public class GetEducationalAttainmentController {
//	@Autowired
	JdbcEducationalAttainmentDAO educationalAttainmentDAO;
	
	@CrossOrigin
    @RequestMapping(value="/getEducationalAttainment", method = RequestMethod.GET)
  //Get Educational Attainment ClientResponsePOJO
    public  ClientResponsePOJO getEducationalAttainment(@RequestParam(value="numberOfPeople") int numberOfPeople, @RequestParam(value="ageGroup") int[] ageGroup,
    		@RequestParam(value="gender") String gender){
    	
//    	ResponseTuplePOJO educationalAttainmentDBResponse = educationalAttainmentDAO.findData(gender, ageGroup[0],ageGroup[1]);
//    	ClientResponsePOJO estimate = Analyser.getEstimate(educationalAttainmentDBResponse, numberOfPeople);
//    	return estimate;
		return null;
    }	

}

