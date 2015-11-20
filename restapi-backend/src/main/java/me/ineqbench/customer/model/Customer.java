package me.ineqbench.customer.model;

public class Customer 
{
	int custId;
	String name;
	int age;
	//getter and setter methods
	
	public Customer(int newCustId, String newName, int newAge){
		custId = newCustId; 
		name = newName; 
		age = newAge; 
	}
	
	public Customer(String newName, int newAge){
		custId = 0;
		name = newName; 
		age = newAge; 
	}
	
	public int getCustId() {
		return custId; 
	}
	
	public String getName() {
		return name; 
	}
	
	public int getAge() {
		return age; 
	}
	
	public void setCustId(int newCustId){
		custId = newCustId; 
	}

	public void setName(String newName){
		name = newName; 
	}
	
	public void setAge(int newAge){
		age = newAge; 
	}
	
}