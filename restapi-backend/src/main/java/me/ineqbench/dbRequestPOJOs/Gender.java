package me.ineqbench.dbRequestPOJOs;

//Better abstraction for DAO DB Requests
public enum Gender {
	Male("Males:"), Female("Females:"),All("All People:");
	
	private String toString;
	 
	private Gender(String toString) {
		this.toString = toString;
	}
}
