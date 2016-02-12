package me.ineqbench.clientRequestPojos;

public class ClientRequestPOJO {
	private String gender;
	private int ageGroupStart;
	private int ageGroupEnd;
	
	public ClientRequestPOJO(String gender, int ageGroupStart, int ageGroupEnd) {
		super();
		this.gender = gender;
		this.ageGroupStart = ageGroupStart;
		this.ageGroupEnd = ageGroupEnd;
	}
	
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public int getAgeGroupStart() {
		return ageGroupStart;
	}
	public void setAgeGroupStart(int ageGroupStart) {
		this.ageGroupStart = ageGroupStart;
	}
	public int getAgeGroupEnd() {
		return ageGroupEnd;
	}
	public void setAgeGroupEnd(int ageGroupEnd) {
		this.ageGroupEnd = ageGroupEnd;
	}
	
}
