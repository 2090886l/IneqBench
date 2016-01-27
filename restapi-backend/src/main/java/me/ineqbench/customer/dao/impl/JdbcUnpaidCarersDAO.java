package me.ineqbench.customer.dao.impl;

import java.sql.Types;
import java.util.List;
import java.util.Map;
import java.util.jar.Pack200.Unpacker;

import javax.sql.DataSource;

import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;

import me.ineqbench.customer.dao.TransportDAO;
import me.ineqbench.customer.dao.UnpaidCarersDAO;
import me.ineqbench.dbRequestPOJOs.Range;
import me.ineqbench.dbResponsePOJOs.ResponseTuplePOJO;
import me.ineqbench.mappers.EthnicityResponseMapper;

public class JdbcUnpaidCarersDAO implements UnpaidCarersDAO{
	
	private DataSource dataSource;
	private SimpleJdbcCall jdbcCall;

	
	public void setDataSource(DataSource dataSource) {
	 
		jdbcCall = new SimpleJdbcCall(dataSource)
	    .withoutProcedureColumnMetaDataAccess()
	    .withProcedureName("getUnpaidCareOutput")
	    .returningResultSet("unpaidCarers", new EthnicityResponseMapper());
	}

	@Override 
	public List<ResponseTuplePOJO> findData(String gender, Range range) {
    
		Map mapResult = jdbcCall.execute(range.getStartOfRange(),range.getEndOfRange(),gender);
		List<ResponseTuplePOJO> result = (List<ResponseTuplePOJO>)mapResult.get("unpaidCarers");
		return result;
	}
	
}
