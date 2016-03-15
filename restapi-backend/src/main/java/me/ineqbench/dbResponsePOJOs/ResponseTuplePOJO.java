package me.ineqbench.dbResponsePOJOs;

//Component
//Component Benefits: provides a uniform DB Response from all procedures 
//for all Requests allowing back end to pass the responsibility to the Analyzer component
//to be processed in the same way regardless of the Deprivation criterion
//Component Obligations: set the total population and deprivation fields
public class ResponseTuplePOJO {
	private int totalPopulation;
	private int totalDeprived;

	public ResponseTuplePOJO() {
	}

	public ResponseTuplePOJO(int totalPopulation, int totalDeprived) {
		super();
		this.totalPopulation = totalPopulation;
		this.totalDeprived = totalDeprived;
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

}
