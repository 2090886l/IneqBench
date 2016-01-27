package me.ineqbench.analyst;

import java.util.List;

import me.ineqbench.clientResponsePojos.ClientResponsePOJO;
import me.ineqbench.dbResponsePOJOs.ResponseTuplePOJO;

public class Analyser {
	private static double rate;
	private static double expectedDeprived;
	private static double upper;
	private static double lower;
	private static double upperRange;
	private static double lowerRange;
	
	public static ClientResponsePOJO getEstimate(List<ResponseTuplePOJO> ethnicityDBREsponse, int numberOfPeople){
		int totalPopulation = ethnicityDBREsponse.get(0).getTotalPopulation();
		int totalDeprived = ethnicityDBREsponse.get(0).getTotalDeprived();
		rate = totalDeprived/((double)totalPopulation);
    	expectedDeprived = rate*numberOfPeople;
    	upper = (2*expectedDeprived+(1.96*1.96)+(1.96*Math.sqrt(1.96*1.96+4*expectedDeprived*(1-rate))))/(2*(numberOfPeople+1.96*1.96));
    	lower = (2*expectedDeprived+(1.96*1.96)-(1.96*Math.sqrt(1.96*1.96+4*expectedDeprived*(1-rate))))/(2*(numberOfPeople+1.96*1.96));
    	upperRange = numberOfPeople*upper;
    	lowerRange = numberOfPeople*lower;
    	return new ClientResponsePOJO(totalPopulation,totalDeprived,upperRange,lowerRange,expectedDeprived);
	}
}