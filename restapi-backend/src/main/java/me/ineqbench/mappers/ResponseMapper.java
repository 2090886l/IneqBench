package me.ineqbench.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import me.ineqbench.dbResponsePOJOs.ResponseTuplePOJO;

// Maps relation received from db from rows to a ResponseTuplePOJO object representing the tuple
public class ResponseMapper implements RowMapper<ResponseTuplePOJO> {

	public ResponseTuplePOJO mapRow(ResultSet rs, int rowNum) throws SQLException {
		ResponseTuplePOJO ethnicityTuple = new ResponseTuplePOJO();
		ethnicityTuple.setTotalDeprived(rs.getInt("totalDeprived"));
		ethnicityTuple.setTotalPopulation(rs.getInt("totalPopulation"));

		return ethnicityTuple;
	}
}
