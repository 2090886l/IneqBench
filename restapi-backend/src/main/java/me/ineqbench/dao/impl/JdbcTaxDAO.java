package me.ineqbench.dao.impl;

import java.sql.Types;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;

import me.ineqbench.dao.TaxDAO;
import me.ineqbench.dbRequestPOJOs.Range;
import me.ineqbench.dbResponsePOJOs.ResponseTuplePOJO;
import me.ineqbench.mappers.ResponseMapper;

//Even though all DAOs implementations are essentially with the same signature 
//Separate interfaces provided for each of them in case later
//requirements are changed to provide easier and more flexible
//maintenance

//Component
//Component Benefits: provide data for tax bands
//Component Obligation: requires age range and sex
public class JdbcTaxDAO implements TaxDAO{
	
	private DataSource dataSource;
	private SimpleJdbcCall jdbcCall;
	
	public void setDataSource(DataSource dataSource) {
	 
		jdbcCall = new SimpleJdbcCall(dataSource)
	    .withoutProcedureColumnMetaDataAccess()
	    .withProcedureName("getTaxOutput")
	    .returningResultSet("taxOutput", new ResponseMapper());
	}

	@Override 
	public List<ResponseTuplePOJO> findData(String gender, Range range, String locality) {
    
		jdbcCall.declareParameters(new SqlParameter("start_age", Types.INTEGER));
		jdbcCall.declareParameters(new SqlParameter("end_age", Types.INTEGER));
		jdbcCall.declareParameters(new SqlParameter("sexIn", Types.CHAR));
		jdbcCall.declareParameters(new SqlParameter("locality", Types.CHAR));
		
		Map mapResult = jdbcCall.execute(range.getStartOfRange(),range.getEndOfRange(),gender,locality);
		List<ResponseTuplePOJO> result = (List<ResponseTuplePOJO>)mapResult.get("taxOutput");
		return result;
	}
	
}