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
import me.ineqbench.customer.dao.EthnicityDAO;
import me.ineqbench.dbRequestPOJOs.Range;
import me.ineqbench.dbResponsePOJOs.ResponseTuplePOJO;

@RestController
public class GetEthnicityController {

    @CrossOrigin
    @RequestMapping(value="/getEthnicity", method = RequestMethod.GET)
    //EthnicityClientResponsePOJO
    public  ClientResponsePOJO getEthnicityData(@RequestParam(value="numberOfPeople") int numberOfPeople, @RequestParam(value="ageGroup") int[] ageGroup,
    		@RequestParam(value="gender") String gender){
    	System.out.println("in getEthnicity");
    	ApplicationContext context = new ClassPathXmlApplicationContext("Spring-Module.xml");
    	EthnicityDAO ethnicityDAO = (EthnicityDAO)context.getBean("ethnicityDAO");
    	//Temporary
    	List<ResponseTuplePOJO> ethnicityDBREsponse = ethnicityDAO.findData(gender, new Range(ageGroup[0],ageGroup[1]));
    	ClientResponsePOJO estimate = Analyser.getEstimate(ethnicityDBREsponse, numberOfPeople);
    	return estimate;
    }


}
