package me.ineqbench.tests.builders;

import me.ineqbench.tests.util.ClientRequestPOJO;

public class ClientRequestBuilder {
	public static ClientRequestPOJO getRequestObject(){
		return new ClientRequestPOJO(5000, 10, 80, "All People:", "Wigtownshire");
	}
}
