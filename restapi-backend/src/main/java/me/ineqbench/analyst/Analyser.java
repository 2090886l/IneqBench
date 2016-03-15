package me.ineqbench.analyst;

import me.ineqbench.clientResponsePojos.ClientResponsePOJO;
import me.ineqbench.dbResponsePOJOs.ResponseTuplePOJO;

//The class / component responsible for evaluating the probability equation
//Component benefits: provide total population, total deprived, upper and lower range and expected deprived
//Component obligations: requires number of people, and data received from procedure for total population and deprived
public class Analyser {
	private static double rate;
	private static double expectedDeprived;
	private static double upper;
	private static double lower;
	private static double upperRange;
	private static double lowerRange;

	public static ClientResponsePOJO getEstimate(ResponseTuplePOJO ethnicityDBREsponse, int numberOfPeople) {
		int totalPopulation = ethnicityDBREsponse.getTotalPopulation();
		int totalDeprived = ethnicityDBREsponse.getTotalDeprived();

		rate = totalDeprived / ((double) totalPopulation);
		expectedDeprived = rate * numberOfPeople;
		upper = (2 * expectedDeprived + (1.96 * 1.96)
				+ (1.96 * Math.sqrt(1.96 * 1.96 + 4 * expectedDeprived * (1 - rate))))
				/ (2 * (numberOfPeople + 1.96 * 1.96));
		lower = (2 * expectedDeprived + (1.96 * 1.96)
				- (1.96 * Math.sqrt(1.96 * 1.96 + 4 * expectedDeprived * (1 - rate))))
				/ (2 * (numberOfPeople + 1.96 * 1.96));
		upperRange = numberOfPeople * upper;
		lowerRange = numberOfPeople * lower;
		return new ClientResponsePOJO(totalPopulation, totalDeprived, upperRange, lowerRange, expectedDeprived);
	}
}
