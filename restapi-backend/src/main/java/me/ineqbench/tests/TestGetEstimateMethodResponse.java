package me.ineqbench.tests;

/**
 * Tests if static method testGetEstimate in Analyser class returns
 * the response with correct estimates.
 * @author Mindaugas Ribakauskas
 */
import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import me.ineqbench.analyst.Analyser;
import me.ineqbench.clientResponsePojos.ClientResponsePOJO;
import me.ineqbench.dbResponsePOJOs.ResponseTuplePOJO;

public class TestGetEstimateMethodResponse {
	
	Analyser analyser;
	ClientResponsePOJO responsePOJO;
	ResponseTuplePOJO responseTuple;
	List<ResponseTuplePOJO> responseList;

	@Before
	public void setUp() throws Exception {
		analyser = new Analyser();
		responseTuple = new ResponseTuplePOJO();
		responseList = new ArrayList<ResponseTuplePOJO>();
		responseTuple.setTotalDeprived(45);
		responseTuple.setTotalPopulation(180);
		responseList.add(responseTuple);
		responsePOJO = Analyser.getEstimate(responseList, 500);
	}

	@After
	public void tearDown() throws Exception {
		analyser = null;
	}

	@Test
	public void testUpperRange() {
		double result = responsePOJO.getUpperRange();
		assertEquals(result, 145, 1); // round to the nearest integer
	}
	
	@Test
	public void testLowerRange() {
		double result = responsePOJO.getLowerRange();
		assertEquals(result, 107, 1);
	}
	
	@Test
	public void testEstimate() {
		double result = responsePOJO.getEstimate();
		assertEquals(result, 125, 1);
	}
	
}
