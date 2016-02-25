package me.ineqbench.tests.IntegrationTests;


import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import me.ineqbench.controllers.dao.JdbcUnpaidCarersDAO;
import me.ineqbench.dbResponsePOJOs.ResponseTuplePOJO;
import me.ineqbench.tests.builders.ClientRequestBuilder;
import me.ineqbench.tests.builders.DBResponseBuilder;
import me.ineqbench.tests.util.ClientRequestPOJO;
@RunWith(SpringJUnit4ClassRunner.class)
// Spring-Test-Module is the test environment - mirror of the Spring-Module environment
// used only for testing purposes 
@ContextConfiguration(locations = {"classpath:Spring-Test-DAO-Module.xml"})
@WebAppConfiguration
public class JdbcUnpaidCarersDAOTest {
 
    @Autowired
    private JdbcUnpaidCarersDAO unpaidCarersDAO;
    
 
    @Before
    public void setUp() {
    }
    
    @Test
    public void findData_ShouldCallProcAndGetExpResult() throws Exception {
    	
    	ResponseTuplePOJO response = DBResponseBuilder.getDBMockResponse();
    	
        //Avoid "data clumps", unfortunately Unpaid Carer DAO interface method
    	//findData gets only primitive params - explain why in interface doc 
       ClientRequestPOJO clientRequest = ClientRequestBuilder.getRequestObject();
       ResponseTuplePOJO dbResponse = unpaidCarersDAO.findData(clientRequest.getAgeGroupStart(), clientRequest.getAgeGroupEnd(),
    		   clientRequest.getGender(), clientRequest.getLocality());
       
       ResponseTuplePOJO dbResponseExpected = new ResponseTuplePOJO(24870,2408);
       
       assertEquals("Expects for total deprived",dbResponseExpected.getTotalDeprived(),dbResponse.getTotalDeprived());
       assertEquals("Expects for total population",dbResponseExpected.getTotalPopulation(),dbResponse.getTotalPopulation());
    }
}

