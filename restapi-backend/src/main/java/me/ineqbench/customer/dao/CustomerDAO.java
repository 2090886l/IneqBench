package me.ineqbench.customer.dao;

import java.util.LinkedList;

import me.ineqbench.customer.model.Customer;

public interface CustomerDAO 
{
	public Customer insert(Customer customer);
	public Customer findByCustomerId(int custId);
	public LinkedList<Customer> findByCustomerName(String name);
	public Boolean deleteByCustomerId(int custId);
}