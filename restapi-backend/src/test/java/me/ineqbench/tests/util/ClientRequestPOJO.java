package me.ineqbench.tests.util;

// Simple ClientRequest POJO to avoid data clumps
//gathering the client (front end) request received during http get request
public class ClientRequestPOJO {
	private int numberOfPeople;
	private int ageGroupStart;
	private int ageGroupEnd;
	private String gender;
	private String locality;

	public ClientRequestPOJO(int numberOfPeople, int ageGroupStart, int ageGroupEnd, String gender, String locality) {
		super();
		this.numberOfPeople = numberOfPeople;
		this.ageGroupStart = ageGroupStart;
		this.ageGroupEnd = ageGroupEnd;
		this.gender = gender;
		this.locality = locality;
	}

	public int getNumberOfPeople() {
		return numberOfPeople;
	}

	public int getAgeGroupStart() {
		return ageGroupStart;
	}

	public int getAgeGroupEnd() {
		return ageGroupEnd;
	}

	public String getGender() {
		return gender;
	}

	public String getLocality() {
		return locality;
	}

}
