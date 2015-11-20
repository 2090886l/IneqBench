package me.ineqbench.hello;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import me.ineqbench.customer.dao.CustomerDAO;
import me.ineqbench.customer.model.Customer;

@RestController
public class GetCustomersTestController {
	
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
    
    @RequestMapping(value="/addCustomer", method = RequestMethod.POST)
    public Customer addCustomer(@RequestParam(value="name") String name, @RequestParam(value="age") Integer age) {
    	
	    	ApplicationContext context = new ClassPathXmlApplicationContext("Spring-Module.xml");
	    	 
	        CustomerDAO customerDAO = (CustomerDAO) context.getBean("customerDAO");
	        Customer customer = new Customer(name, age);
	        return customerDAO.insert(customer);
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
