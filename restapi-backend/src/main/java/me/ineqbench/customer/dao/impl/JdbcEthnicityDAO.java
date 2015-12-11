package me.ineqbench.customer.dao.impl;

import java.sql.Types;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;

import me.ineqbench.customer.dao.EthnicityDAO;
import me.ineqbench.dbRequestPOJOs.Gender;
import me.ineqbench.dbRequestPOJOs.Range;
import me.ineqbench.dbResponsePOJOs.EthnicityResponseTuplePOJO;
import me.ineqbench.mappers.EthnicityResponseMapper;

public class JdbcEthnicityDAO implements EthnicityDAO{
	
	private DataSource dataSource;
	private SimpleJdbcCall jdbcCall;
	
//	public void setDataSource(DataSource dataSource){
//		this.dataSource = dataSource;
//		this.jdbcCall =  new SimpleJdbcCall(dataSource).
//                withProcedureName("getEthnicityData");
//	}
	
	public void setDataSource(DataSource dataSource) {
	 
		jdbcCall = new SimpleJdbcCall(dataSource)
	    .withoutProcedureColumnMetaDataAccess()
	    .withProcedureName("getOutput")
	    .returningResultSet("ethnicityData", new EthnicityResponseMapper());
	}

	//source :https://numberformat.wordpress.com/2010/05/20/calling-stored-procedures-using-spring-2-5-simplejdbccall/
	@Override 
	public List<EthnicityResponseTuplePOJO> findData(String gender, Range range) {
//		String SQL = "select * from Student";
//	      
//	      List <Student> students = jdbcTemplateObject.query(SQL, 
//	                                      new StudentMapper());
//	      return students;
//	      
		jdbcCall.declareParameters(new SqlParameter("start_age", Types.INTEGER));
		jdbcCall.declareParameters(new SqlParameter("end_age", Types.INTEGER));
		jdbcCall.declareParameters(new SqlParameter("sexIn", Types.CHAR));
		Map mapResult = jdbcCall.execute(range.getStartOfRange(),range.getEndOfRange(),gender);
		List<EthnicityResponseTuplePOJO> result = (List<EthnicityResponseTuplePOJO>)mapResult.get("ethnicityData");
		return result;
	}
	
}
