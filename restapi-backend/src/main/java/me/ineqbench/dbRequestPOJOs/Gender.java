package me.ineqbench.dbRequestPOJOs;

public enum Gender {
	Male("Males:"), Female("Females:"),All("All People:");
	
	private String toString;
	 
	private Gender(String toString) {
		this.toString = toString;
	}
}
