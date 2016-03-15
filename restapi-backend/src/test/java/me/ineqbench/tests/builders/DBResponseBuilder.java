package me.ineqbench.tests.builders;

import me.ineqbench.dbResponsePOJOs.ResponseTuplePOJO;

public class DBResponseBuilder {
	public static ResponseTuplePOJO getDBMockResponse() {
		ResponseTuplePOJO response = new ResponseTuplePOJO();
		response.setTotalDeprived(100);
		response.setTotalPopulation(1000);
		return response;
	}
}
