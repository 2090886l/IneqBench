package me.ineqbench.dao.impl;

import java.sql.Types;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;

import me.ineqbench.dao.EducationalAttainmentDAO;
import me.ineqbench.dbRequestPOJOs.Range;
import me.ineqbench.dbResponsePOJOs.ResponseTuplePOJO;
import me.ineqbench.mappers.ResponseMapper;

//Even though all DAOs implementations are essentially with the same signature 
//Separate interfaces provided for each of them in case later
//requirements are changed to provide easier and more flexible
//maintenance

//Component
//Component Benefits: provide data for educational attainment
//Component Obligation: requires age range and sex
public class JdbcEducationalAttainmentDAO implements EducationalAttainmentDAO{
	
	private DataSource dataSource;
	private SimpleJdbcCall jdbcCall;
	
	public void setDataSource(DataSource dataSource) {
	 
		jdbcCall = new SimpleJdbcCall(dataSource)
	    .withoutProcedureColumnMetaDataAccess()
	    .withProcedureName("getQualificationOutput")
	    .returningResultSet("educationalAttainment", new ResponseMapper());
	}

	@Override 
	public List<ResponseTuplePOJO> findData(String gender, Range range) {
    
		jdbcCall.declareParameters(new SqlParameter("start_age", Types.INTEGER));
		jdbcCall.declareParameters(new SqlParameter("end_age", Types.INTEGER));
		jdbcCall.declareParameters(new SqlParameter("sexIn", Types.CHAR));
		
		Map mapResult = jdbcCall.execute(range.getStartOfRange(),range.getEndOfRange(),gender);
		List<ResponseTuplePOJO> result = (List<ResponseTuplePOJO>)mapResult.get("educationalAttainment");
		return result;
	}
	
}