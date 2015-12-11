package me.ineqbench.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import me.ineqbench.dbResponsePOJOs.EthnicityResponseTuplePOJO;

public class EthnicityResponseMapper implements RowMapper<EthnicityResponseTuplePOJO> {
   public EthnicityResponseTuplePOJO mapRow(ResultSet rs, int rowNum) throws SQLException {
	   EthnicityResponseTuplePOJO ethnicityTuple = new EthnicityResponseTuplePOJO();
	   ethnicityTuple.setTotalDeprived(rs.getInt("totalDeprived"));
	   ethnicityTuple.setTotalPopulation(rs.getInt("totalPopulation"));
      return ethnicityTuple;
   }
}