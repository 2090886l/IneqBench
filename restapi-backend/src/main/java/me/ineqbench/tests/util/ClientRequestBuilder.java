package me.ineqbench.tests.util;

public class ClientRequestBuilder {
	public static ClientRequestPOJO getRequestObject(){
		return new ClientRequestPOJO(500, 10, 20, "All:", "Wigtownshire");
	}
}
