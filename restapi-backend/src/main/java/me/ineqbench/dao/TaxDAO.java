package me.ineqbench.dao;

import java.util.List;

import me.ineqbench.dbRequestPOJOs.Range;
import me.ineqbench.dbResponsePOJOs.ResponseTuplePOJO;

//Even though all DAOs are essentially with the same signature 
//Separate interfaces provided for each of them in case later
//requirements are changed to provide easier and more flexible
//maintenance
public interface TaxDAO {
	public ResponseTuplePOJO findData(String gender, Range range, String locality);
}
