package me.ineqbench.dbRequestPOJOs;

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
