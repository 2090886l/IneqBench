package me.ineqbench.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import me.ineqbench.dbResponsePOJOs.ResponseTuplePOJO;

public class ResponseMapper implements RowMapper<ResponseTuplePOJO> {
//TODO: ALEX change the name of this one you understand svn status
   public ResponseTuplePOJO mapRow(ResultSet rs, int rowNum) throws SQLException {
	   ResponseTuplePOJO ethnicityTuple = new ResponseTuplePOJO();
	   ethnicityTuple.setTotalDeprived(rs.getInt("totalDeprived"));
	   ethnicityTuple.setTotalPopulation(rs.getInt("totalPopulation"));
      return ethnicityTuple;
   }
}

//EthnicityResponseMapper