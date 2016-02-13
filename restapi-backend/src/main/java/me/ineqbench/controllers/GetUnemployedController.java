package me.ineqbench.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import me.ineqbench.analyst.Analyser;
import me.ineqbench.clientResponsePojos.ClientResponsePOJO;
import me.ineqbench.controllers.dao.JdbcUnemployedDAO;
import me.ineqbench.dbResponsePOJOs.ResponseTuplePOJO;


//Provides the Unemployed data to the front end (HTTP GET Restful Request)
@RestController
public class GetUnemployedController {

	@Autowired
	JdbcUnemployedDAO unemployedDAO;

	@CrossOrigin
    @RequestMapping(value="/getUnemployed/{numberOfPeople}/{ageGroupStart}/{ageGroupEnd}/{gender}/{locality}", 
    	method = RequestMethod.GET)
    ////Get Unemployed ClientResponsePOJO
    public  ClientResponsePOJO getUnemployedData(@PathVariable(value="numberOfPeople") int numberOfPeople, @PathVariable(value="ageGroupStart") int ageGroupStart,
    		 @PathVariable(value="ageGroupEnd") int ageGroupEnd,@PathVariable(value="gender") String gender, @PathVariable(value="locality") String locality){
		
		ResponseTuplePOJO unemployedDBREsponse = unemployedDAO.findData(ageGroupStart, ageGroupEnd, gender, locality);
    	ClientResponsePOJO estimate = Analyser.getEstimate(unemployedDBREsponse, numberOfPeople);
    	return estimate;
    }

}

