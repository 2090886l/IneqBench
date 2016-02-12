package me.ineqbench.dbRequestPOJOs;

//Better abstraction for DAO DB Requests
//Currently cannot be used due to Spring MVC and Mockito limitations
//more info in me.ineqbench.dao interfaces doc
public enum Gender {
	Male("Males:"), Female("Females:"),All("All People:");
	
	private String toString;
	 
	private Gender(String toString) {
		this.toString = toString;
	}
}
