package me.ineqbench.hello;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import me.ineqbench.customer.dao.CustomerDAO;
import me.ineqbench.customer.model.Customer;

public class CustomerTestApp
{
    public static void random( String[] args )
    {
    	ApplicationContext context = 
    		new ClassPathXmlApplicationContext("Spring-Module.xml");
    	 
        CustomerDAO customerDAO = (CustomerDAO) context.getBean("customerDAO");
        Customer customer = new Customer(1, "mkyong",28);
        customerDAO.insert(customer);
    	
        Customer customer1 = customerDAO.findByCustomerId(1);
        System.out.println(customer1);
        
    }
}