package me.ineqbench.tests.builders;

import me.ineqbench.tests.util.ClientRequestPOJO;

//Decrease code repetition
//Same request object for all test cases for the different deprivation criteria
//to enforce consistent testing
public class ClientRequestBuilder {
	public static ClientRequestPOJO getRequestObject() {
		return new ClientRequestPOJO(5000, 10, 80, "All People:", "Wigtownshire");
	}
}
