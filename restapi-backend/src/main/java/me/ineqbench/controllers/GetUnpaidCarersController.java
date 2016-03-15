package me.ineqbench.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import me.ineqbench.analyst.Analyser;
import me.ineqbench.clientResponsePojos.ClientResponsePOJO;
import me.ineqbench.controllers.dao.JdbcUnpaidCarersDAO;
import me.ineqbench.dbResponsePOJOs.ResponseTuplePOJO;

//Provides the Unpaid Carers data to the front end (HTTP GET Restful Request)
@RestController
public class GetUnpaidCarersController {

	@Autowired
	JdbcUnpaidCarersDAO unpaidCarerDAO;

	@CrossOrigin
	@RequestMapping(value = "/getUnpaidCarers/{numberOfPeople}/{ageGroupStart}/{ageGroupEnd}/{gender}/{locality}", method = RequestMethod.GET)
	//// Get Unpaid Carer ClientResponsePOJO
	public ClientResponsePOJO getUnpaidCarerData(@PathVariable(value = "numberOfPeople") int numberOfPeople,
			@PathVariable(value = "ageGroupStart") int ageGroupStart,
			@PathVariable(value = "ageGroupEnd") int ageGroupEnd, @PathVariable(value = "gender") String gender,
			@PathVariable(value = "locality") String locality) {
		
		//Get response from DB
		ResponseTuplePOJO unpaidCarerDBREsponse = unpaidCarerDAO.findData(ageGroupStart, ageGroupEnd, gender, locality);
		
		//Calculate estimates for DB response		
		ClientResponsePOJO estimate = Analyser.getEstimate(unpaidCarerDBREsponse, numberOfPeople);
		return estimate;
	}

}
