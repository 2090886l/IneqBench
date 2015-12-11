package me.ineqbench.util;

public class EthinicityCache {
	private static int numberOfPeople;
	
	public static int getNumberOfPeople() {
		return numberOfPeople;
	}

	public static void setNumberOfPeople(int numberOfPeople) {
		EthinicityCache.numberOfPeople = numberOfPeople;
	}

}
