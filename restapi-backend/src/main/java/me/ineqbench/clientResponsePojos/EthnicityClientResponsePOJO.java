package me.ineqbench.clientResponsePojos;

public class EthnicityClientResponsePOJO {
	private int totalDeprived;
	private double rate;
	private double q;
	private double upper;
	private double lower;
	private double estimate;
	
	public double getEstimate() {
		return estimate;
	}
	public void setEstimate(double estimate) {
		this.estimate = estimate;
	}
	public int getTotalDeprived() {
		return totalDeprived;
	}
	public void setTotalDeprived(int totalDeprived) {
		this.totalDeprived = totalDeprived;
	}
	public double getRate() {
		return rate;
	}
	public void setRate(double rate) {
		this.rate = rate;
	}
	public double getQ() {
		return q;
	}
	public void setQ(double q) {
		this.q = q;
	}
	public double getUpper() {
		return upper;
	}
	public void setUpper(double upper) {
		this.upper = upper;
	}
	public double getLower() {
		return lower;
	}
	public void setLower(double lower) {
		this.lower = lower;
	}
	public EthnicityClientResponsePOJO(int totalDeprived, double rate, double q, double upper, double lower,
			double estimate) {
		super();
		this.totalDeprived = totalDeprived;
		this.rate = rate;
		this.q = q;
		this.upper = upper;
		this.lower = lower;
		this.estimate = estimate;
	}
	
	
	
}
