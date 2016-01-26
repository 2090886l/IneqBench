package me.ineqbench.customer.dao;

import java.util.List;

import me.ineqbench.dbRequestPOJOs.Range;
import me.ineqbench.dbResponsePOJOs.ResponseTuplePOJO;

public interface TransportDAO {
	public List<ResponseTuplePOJO> findData(String gender, Range range);
}
