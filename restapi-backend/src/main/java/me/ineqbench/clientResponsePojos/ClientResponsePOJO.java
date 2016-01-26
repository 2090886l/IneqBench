package me.ineqbench.clientResponsePojos;

public class ClientResponsePOJO {
	private int totalPopulation;
	private int totalDeprived;
	private double upperRange;
	private double lowerRange;
	private double estimate;
	
	public ClientResponsePOJO(int totalPopulation, int totalDeprived, double upperRange, double lowerRange,
			double estimate) {
		super();
		this.totalPopulation = totalPopulation;
		this.totalDeprived = totalDeprived;
		this.upperRange = upperRange;
		this.lowerRange = lowerRange;
		this.estimate = estimate;
	}
	
	public int getTotalPopulation() {
		return totalPopulation;
	}
	public void setTotalPopulation(int totalPopulation) {
		this.totalPopulation = totalPopulation;
	}
	public int getTotalDeprived() {
		return totalDeprived;
	}
	public void setTotalDeprived(int totalDeprived) {
		this.totalDeprived = totalDeprived;
	}
	public double getUpperRange() {
		return upperRange;
	}
	public void setUpperRange(double upperRange) {
		this.upperRange = upperRange;
	}
	public double getLowerRange() {
		return lowerRange;
	}
	public void setLowerRange(double lowerRange) {
		this.lowerRange = lowerRange;
	}
	public double getEstimate() {
		return estimate;
	}
	public void setEstimate(double estimate) {
		this.estimate = estimate;
	}
	
}
