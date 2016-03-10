package me.ineqbench.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import me.ineqbench.analyst.Analyser;
import me.ineqbench.clientResponsePojos.ClientResponsePOJO;
import me.ineqbench.controllers.dao.JdbcEthnicityDAO;
import me.ineqbench.controllers.dao.JdbcFuelPovertyDAO;
import me.ineqbench.dao.FuelPovertyDAO;
import me.ineqbench.dbResponsePOJOs.ResponseTuplePOJO;

//Provides the Fuel Poverty data to the front end (HTTP GET Restful Request)
@RestController
public class GetFuelPovertyController {

	@Autowired
	JdbcFuelPovertyDAO fuelPovertyDAO;

	@CrossOrigin
    @RequestMapping(value="/getFuelPoverty/{numberOfPeople}/{ageGroupStart}/{ageGroupEnd}/{gender}/{locality}", 
    	method = RequestMethod.GET)
    ////Get Ethnicity ClientResponsePOJO
    public  ClientResponsePOJO getFuelPovertyData(@PathVariable(value="numberOfPeople") int numberOfPeople, @PathVariable(value="ageGroupStart") int ageGroupStart,
    		 @PathVariable(value="ageGroupEnd") int ageGroupEnd,@PathVariable(value="gender") String gender, @PathVariable(value="locality") String locality){
		
		ResponseTuplePOJO fuelPoverrtDBREsponse = fuelPovertyDAO.findData(ageGroupStart, ageGroupEnd, gender, locality);
    	ClientResponsePOJO estimate = Analyser.getEstimate(fuelPoverrtDBREsponse, numberOfPeople);
    	return estimate;
    }
 
}
