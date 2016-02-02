package me.ineqbench.dao;

import java.util.List;

import me.ineqbench.dbRequestPOJOs.Range;
import me.ineqbench.dbResponsePOJOs.ResponseTuplePOJO;

public interface MentalHealthAndWellbeingDAO {
	public List<ResponseTuplePOJO> findData(String gender, Range range);
}
