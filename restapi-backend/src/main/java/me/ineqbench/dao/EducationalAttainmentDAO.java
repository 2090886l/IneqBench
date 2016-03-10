package me.ineqbench.dao;

import java.util.List;

import me.ineqbench.dbResponsePOJOs.ResponseTuplePOJO;

//Even though all DAOs are essentially with the same signature 
//Separate interfaces provided for each of them in case later
//requirements are changed to provide easier and more flexible
//maintenance

//Note: Initially ClientRequestPOJO object was used for storing client
//request data but unfortunately (even though is a better system design
//practice compared to the long list of parameters data clumps
//is not possible to be implemented in this was as Mockite the 
//framework testing the application creating mocks cannot identify
//that both function calls are the same when it mocks the findData call
//due to separate Application and Test application context - Spring MVC 
//limitation - trade-off nothing can be done about it
public interface EducationalAttainmentDAO {
	public ResponseTuplePOJO findData(int ageGroupStart, int ageGroupEnd,
			String gender, String locality);
}
