package me.ineqbench.dbRequestPOJOs;

//Better abstraction for DAO DB Requests
//Currently cannot be used due to Spring MVC and Mockito limitations
//more info in me.ineqbench.dao interfaces doc
public class Range {
	private int startOfRange;
	private int endOfRange;
	
	
	public Range(int startOfRange, int endOfRange) {
		super();
		this.startOfRange = startOfRange;
		this.endOfRange = endOfRange;
	}
	
	public int getStartOfRange() {
		return startOfRange;
	}
	public void setStartOfRange(int startOfRange) {
		this.startOfRange = startOfRange;
	}
	public int getEndOfRange() {
		return endOfRange;
	}
	public void setEndOfRange(int endOfRange) {
		this.endOfRange = endOfRange;
	}
}
