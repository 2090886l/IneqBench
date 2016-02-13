package me.ineqbench.controllers.dao;

import java.sql.Types;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Component;

import me.ineqbench.dao.LivingInDeprivedAreaDAO;
import me.ineqbench.dbResponsePOJOs.ResponseTuplePOJO;
import me.ineqbench.mappers.ResponseMapper;

//Even though all DAOs implementations are essentially with the same signature 
//Separate interfaces provided for each of them in case later
//requirements are changed to provide easier and more flexible
//maintenance

//Component
//Component Benefits: provide data for Living in Deprived Area
//Component Obligation: requires age range, sex and locality
@Component
public class JdbcLivingInDeprivedAreaDAO implements LivingInDeprivedAreaDAO{


	private SimpleJdbcCall jdbcCall;
	
	private void setJdbcCall() {
		//Get driver bean and inject in jdbc
		ApplicationContext context = new ClassPathXmlApplicationContext("Spring-Module.xml");
		DataSource dataSource = (DataSource)context.getBean("dataSource");
		
		jdbcCall = new SimpleJdbcCall(dataSource)
	    .withoutProcedureColumnMetaDataAccess()
	    .withProcedureName("getDeprivedArea")
	    .returningResultSet("livingInDeprivedArea", new ResponseMapper());
	}
	
	@Override 
	public ResponseTuplePOJO findData(int ageGroupStart, int ageGroupEnd, 
			String gender, String locality) {
		setJdbcCall();
		
		jdbcCall.declareParameters(new SqlParameter("start_age", Types.INTEGER));
		jdbcCall.declareParameters(new SqlParameter("end_age", Types.INTEGER));
		jdbcCall.declareParameters(new SqlParameter("sexIn", Types.CHAR));
		jdbcCall.declareParameters(new SqlParameter("locality", Types.CHAR));
		
		Map mapResult = jdbcCall.execute(ageGroupStart,
				ageGroupEnd,
				gender,
				locality);
		
		List<ResponseTuplePOJO> result = (List<ResponseTuplePOJO>)mapResult.get("livingInDeprivedArea");
		return result.get(0);
}

}
