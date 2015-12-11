package me.ineqbench.controllers;

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

import me.ineqbench.clientResponsePojos.EthnicityClientResponsePOJO;
import me.ineqbench.customer.dao.CustomerDAO;
import me.ineqbench.customer.dao.EthnicityDAO;
import me.ineqbench.customer.model.Customer;
import me.ineqbench.dbRequestPOJOs.Gender;
import me.ineqbench.dbRequestPOJOs.Range;
import me.ineqbench.dbResponsePOJOs.EthnicityResponseTuplePOJO;
import me.ineqbench.util.EthinicityCache;

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
    public  EthnicityClientResponsePOJO getEthnicityData(@RequestParam(value="numberOfPeople") int numberOfPeople, @RequestParam(value="ageGroup") int[] ageGroup,
    		@RequestParam(value="gender") String gender){
    	System.out.println("in getEthnicity");
    	ApplicationContext context = new ClassPathXmlApplicationContext("Spring-Module.xml");
    	EthnicityDAO ethnicityDAO = (EthnicityDAO)context.getBean("ethnicityDAO");

    	List<EthnicityResponseTuplePOJO> ethnicityDBREsponse = ethnicityDAO.findData(gender, new Range(ageGroup[0],ageGroup[1]));
    	double rate = ethnicityDBREsponse.get(0).getTotalDeprived()/((double)ethnicityDBREsponse.get(0).getTotalPopulation());
    	double expectedDeprived = rate*numberOfPeople;
    	double upper = (2*expectedDeprived+(1.96*1.96)+(1.96*Math.sqrt(1.96*1.96+4*expectedDeprived*(1/rate))))/(2*(numberOfPeople+1.96*1.96));
    	double lower = (2*expectedDeprived+(1.96*1.96)-(1.96*Math.sqrt(1.96*1.96+4*expectedDeprived*(1/rate))))/(2*(numberOfPeople+1.96*1.96));
    	EthnicityClientResponsePOJO ethnicityClientResponsePOJO = new EthnicityClientResponsePOJO(ethnicityDBREsponse.get(0).getTotalDeprived(),rate,
    			1/rate,upper,lower,expectedDeprived);
    	return ethnicityClientResponsePOJO;
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
