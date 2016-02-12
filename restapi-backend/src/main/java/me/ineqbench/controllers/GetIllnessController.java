package me.ineqbench.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import me.ineqbench.analyst.Analyser;
import me.ineqbench.clientResponsePojos.ClientResponsePOJO;
import me.ineqbench.controllers.dao.JdbcIllnessDAO;
import me.ineqbench.dbResponsePOJOs.ResponseTuplePOJO;

//Provides the Illness data to the front end (HTTP GET Restful Request)
@RestController
public class GetIllnessController {
	
	@Autowired
	JdbcIllnessDAO illnessDAO;

	@CrossOrigin
    @RequestMapping(value="/getIllness/{numberOfPeople}/{ageGroupStart}/{ageGroupEnd}/{gender}/{locality}", 
    	method = RequestMethod.GET)
    ////Get Illness ClientResponsePOJO
    public  ClientResponsePOJO getIllnessData(@PathVariable(value="numberOfPeople") int numberOfPeople, @PathVariable(value="ageGroupStart") int ageGroupStart,
    		 @PathVariable(value="ageGroupEnd") int ageGroupEnd,@PathVariable(value="gender") String gender, @PathVariable(value="locality") String locality){
		
		ResponseTuplePOJO illnessDBREsponse = illnessDAO.findData(ageGroupStart, ageGroupEnd, gender, locality);
    	ClientResponsePOJO estimate = Analyser.getEstimate(illnessDBREsponse, numberOfPeople);
    	return estimate;
    }
}

