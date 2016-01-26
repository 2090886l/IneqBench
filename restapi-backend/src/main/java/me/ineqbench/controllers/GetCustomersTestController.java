package me.ineqbench.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
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
import me.ineqbench.customer.dao.CustomerDAO;
import me.ineqbench.customer.dao.EthnicityDAO;
import me.ineqbench.customer.dao.TransportDAO;
import me.ineqbench.customer.model.Customer;
import me.ineqbench.dbRequestPOJOs.Range;
import me.ineqbench.dbResponsePOJOs.ResponseTuplePOJO;

@RestController
public class GetCustomersTestController {
	
	@CrossOrigin
    @RequestMapping(value="/getCustomerById", method = RequestMethod.GET)
    public Customer getByCustomerId(@RequestParam(value="id") Integer id) {
    	
	    	ApplicationContext context = new ClassPathXmlApplicationContext("Spring-Module.xml");
	        CustomerDAO customerDAO = (CustomerDAO) context.getBean("customerDAO");
	    	 
	        Customer customer1 = customerDAO.findByCustomerId(id);
	        return customer1; 
	}
    
    @RequestMapping(value="/getCustomerByName", method = RequestMethod.GET)
    public LinkedList<Customer> getByCustomerName(@RequestParam(value="name") String name) {
    	
	    	ApplicationContext context = new ClassPathXmlApplicationContext("Spring-Module.xml");
	        CustomerDAO customerDAO = (CustomerDAO) context.getBean("customerDAO");
	    	 
	        LinkedList<Customer> customers = customerDAO.findByCustomerName(name);
	        return customers; 
	}
    @CrossOrigin
    @RequestMapping(value="/addCustomer", method = RequestMethod.POST)
    public Customer addCustomer(@RequestParam(value="name") String name, @RequestParam(value="age") Integer age) {
    	System.out.println("in addCustomer");
	    	ApplicationContext context = new ClassPathXmlApplicationContext("Spring-Module.xml");
	    	 
	        CustomerDAO customerDAO = (CustomerDAO) context.getBean("customerDAO");
	        Customer customer = new Customer(name, age);
	        return customerDAO.insert(customer);
	}
    
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
    
    @CrossOrigin
    @RequestMapping(value="/getTransport", method = RequestMethod.GET)
    //TransportClientResponsePOJO
    public  ClientResponsePOJO getTransportData(@RequestParam(value="numberOfPeople") int numberOfPeople, @RequestParam(value="ageGroup") int[] ageGroup,
    		@RequestParam(value="gender") String gender){
    	System.out.println("in getEthnicity");
    	ApplicationContext context = new ClassPathXmlApplicationContext("Spring-Module.xml");
    	TransportDAO transportDAO = (TransportDAO)context.getBean("transportDAO");
    	//Temporary
    	List<ResponseTuplePOJO> transportDBREsponse = transportDAO.findData(gender, new Range(ageGroup[0],ageGroup[1]));
    	
    	ClientResponsePOJO estimate = Analyser.getEstimate(transportDBREsponse, numberOfPeople);
    	return estimate;
    }
    
    @SuppressWarnings("serial")
	@RequestMapping(value="/deleteCustomer", method = RequestMethod.DELETE)
    public HashMap<String,Boolean> deleteCustomer(@RequestParam(value="id") Integer id) {
    	
	    	ApplicationContext context = new ClassPathXmlApplicationContext("Spring-Module.xml");
	    	 
	        CustomerDAO customerDAO = (CustomerDAO) context.getBean("customerDAO");
	        return new HashMap<String, Boolean>(){{
	            put("result",customerDAO.deleteByCustomerId(id));}}; 
	}
}
