package me.ineqbench.tests.IntegrationTests;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import me.ineqbench.controllers.dao.JdbcUnemployedDAO;
import me.ineqbench.dbResponsePOJOs.ResponseTuplePOJO;
import me.ineqbench.tests.builders.ClientRequestBuilder;
import me.ineqbench.tests.builders.DBResponseBuilder;
import me.ineqbench.tests.util.ClientRequestPOJO;
@RunWith(SpringJUnit4ClassRunner.class)
// Spring-Test-Module is the test environment - mirror of the Spring-Module environment
// used only for testing purposes 
@ContextConfiguration(locations = {"classpath:Spring-Test-DAO-Module.xml"})
@WebAppConfiguration
public class JdbcUnemployedTest {
 
    @Autowired
    private JdbcUnemployedDAO unemployedDAO;
    
 
    @Before
    public void setUp() {
    }
    
    @Test
    public void findData_ShouldCallProcAndGetExpResult() throws Exception {
    	
    	ResponseTuplePOJO response = DBResponseBuilder.getDBMockResponse();
    	
        //Avoid "data clumps", unfortunately Unemployed DAO interface method
    	//findData gets only primitive params - explain why in interface doc 
       ClientRequestPOJO clientRequest = ClientRequestBuilder.getRequestObject();
       ResponseTuplePOJO dbResponse = unemployedDAO.findData(clientRequest.getAgeGroupStart(), clientRequest.getAgeGroupEnd(),
    		   clientRequest.getGender(), clientRequest.getLocality());
       
       ResponseTuplePOJO dbResponseExpected = new ResponseTuplePOJO(24870,866);
       
       assertEquals("Expect 0 for total deprived",dbResponseExpected.getTotalDeprived(),dbResponse.getTotalDeprived());
       assertEquals("Expect 0 for total population",dbResponseExpected.getTotalPopulation(),dbResponse.getTotalPopulation());
    }
}


