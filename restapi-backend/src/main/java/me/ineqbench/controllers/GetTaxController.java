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
import me.ineqbench.dao.TaxDAO;
import me.ineqbench.dbRequestPOJOs.Range;
import me.ineqbench.dbResponsePOJOs.ResponseTuplePOJO;

//Provides the Tax data to the front end (HTTP GET Restful Request)
@RestController
public class GetTaxController {

    @CrossOrigin
    @RequestMapping(value="/getTax", method = RequestMethod.GET)
    //Get Tax ClientResponsePOJO
    public  ClientResponsePOJO getTax(@RequestParam(value="numberOfPeople") int numberOfPeople, @RequestParam(value="ageGroup") int[] ageGroup,
    		@RequestParam(value="gender") String gender, @RequestParam(value="locality") String locality){
    	
    	ApplicationContext context = new ClassPathXmlApplicationContext("Spring-Module.xml");
    	TaxDAO taxDAO = (TaxDAO)context.getBean("taxDAO");
    
    	ResponseTuplePOJO taxDBResponse = taxDAO.findData(gender, new Range(ageGroup[0],ageGroup[1]),locality);
    	ClientResponsePOJO estimate = Analyser.getEstimate(taxDBResponse, numberOfPeople);
    	return estimate;
    }	
 
}
