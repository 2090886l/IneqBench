package me.ineqbench.customer.dao;

import java.util.List;

import me.ineqbench.dbRequestPOJOs.Gender;
import me.ineqbench.dbRequestPOJOs.Range;
import me.ineqbench.dbResponsePOJOs.EthnicityResponseTuplePOJO;

public interface EthnicityDAO {
	public List<EthnicityResponseTuplePOJO> findData(String gender, Range range);
}

