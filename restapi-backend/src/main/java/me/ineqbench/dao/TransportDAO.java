package me.ineqbench.dao;

import java.util.List;

import me.ineqbench.dbRequestPOJOs.Range;
import me.ineqbench.dbResponsePOJOs.ResponseTuplePOJO;

//Even though all DAOs are essentially with the same signature 
//Separate interfaces provided for each of them in case later
//requirements are changed to provide easier and more flexible
//maintenance
public interface TransportDAO {
	public ResponseTuplePOJO findData(int ageGroupStart, int ageGroupEnd, 
			String gender, String locality); 
}
