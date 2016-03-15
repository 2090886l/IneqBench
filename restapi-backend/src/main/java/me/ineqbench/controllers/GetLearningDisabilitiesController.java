package me.ineqbench.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import me.ineqbench.analyst.Analyser;
import me.ineqbench.clientResponsePojos.ClientResponsePOJO;
import me.ineqbench.controllers.dao.JdbcLearningDisabilitiesDAO;
import me.ineqbench.dbResponsePOJOs.ResponseTuplePOJO;

//Provides the Learning Disabilities data to the front end (HTTP GET Restful Request)
@RestController
public class GetLearningDisabilitiesController {

	@Autowired
	JdbcLearningDisabilitiesDAO learningDisabilitiesDAO;

	@CrossOrigin
	@RequestMapping(value = "/getLearningDisabilities/{numberOfPeople}/{ageGroupStart}/{ageGroupEnd}/{gender}/{locality}", method = RequestMethod.GET)
	//// Get Learning Disabilities ClientResponsePOJO
	public ClientResponsePOJO getLearningDisabilitiesData(@PathVariable(value = "numberOfPeople") int numberOfPeople,
			@PathVariable(value = "ageGroupStart") int ageGroupStart,
			@PathVariable(value = "ageGroupEnd") int ageGroupEnd, @PathVariable(value = "gender") String gender,
			@PathVariable(value = "locality") String locality) {
		
		//Get response from DB
		ResponseTuplePOJO learningDissabilitiesDBREsponse = learningDisabilitiesDAO.findData(ageGroupStart, ageGroupEnd,
				gender, locality);
		
		//Calculate estimates for DB response		
		ClientResponsePOJO estimate = Analyser.getEstimate(learningDissabilitiesDBREsponse, numberOfPeople);
		return estimate;
	}

}
