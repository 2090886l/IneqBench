package me.ineqbench.tests.springMVCUnitTests.analyser;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import me.ineqbench.analyst.Analyser;
import me.ineqbench.clientResponsePojos.ClientResponsePOJO;
import me.ineqbench.dbResponsePOJOs.ResponseTuplePOJO;

//Tests the Equation giving the benchmarking estimates
public class AnalyserTest {

	private ResponseTuplePOJO dbResponse;
	private int numberOfPeople;

	private ClientResponsePOJO clientExpResponse;

	@Before
	public void setUp() {
		dbResponse = new ResponseTuplePOJO(50000, 200);
		numberOfPeople = 500;
		clientExpResponse = new ClientResponsePOJO(50000, 200, 7.2330, 0.5488, 2);
	}

	@Test
	public void testSalutationMessage() {
		ClientResponsePOJO estimates = Analyser.getEstimate(dbResponse, numberOfPeople);

		// Add epsilons as asserEquals(String,double,double) has been deprecated
		assertEquals("Expects  for Estimate", estimates.getEstimate(), clientExpResponse.getEstimate(), 0.5);
		assertEquals("Expects  for Lower Range", estimates.getLowerRange(), clientExpResponse.getLowerRange(), 0.2);
		assertEquals("Expects  for Upper Range", estimates.getUpperRange(), clientExpResponse.getUpperRange(), 0.2);
		assertEquals("Expects  for Total Deprived", estimates.getTotalDeprived(), clientExpResponse.getTotalDeprived());
		assertEquals("Expects  for Total Population", estimates.getTotalPopulation(),
				clientExpResponse.getTotalPopulation());
	}
}
