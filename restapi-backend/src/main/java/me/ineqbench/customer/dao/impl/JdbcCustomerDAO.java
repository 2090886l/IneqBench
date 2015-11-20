package me.ineqbench.customer.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;

import javax.sql.DataSource;
import me.ineqbench.customer.dao.CustomerDAO;
import me.ineqbench.customer.model.Customer;

public class JdbcCustomerDAO implements CustomerDAO
{
	private DataSource dataSource;
	
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	
	public Customer insert(Customer customer){
		
		if(customer.getCustId() != 0){
			throw new RuntimeException("Customer ID is not empty"); 
		}
		
		String sql = "INSERT INTO CUSTOMER " +
				"(NAME, AGE) VALUES (?, ?)";
		Connection conn = null;
		
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql);
			//ps.setInt(1, customer.getCustId());
			ps.setString(1, customer.getName());
			ps.setInt(2, customer.getAge());
			ps.executeUpdate();
			ps.close();
			
		} catch (SQLException e) {
			throw new RuntimeException(e);
			
		} finally {
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {}
			}
		}
		
		
		return customer;
	}
	
	public Customer findByCustomerId(int custId){
		
		String sql = "SELECT * FROM CUSTOMER WHERE CUST_ID = ?";
		
		Connection conn = null;
		
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1, custId);
			Customer customer = null;
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				customer = new Customer(
					rs.getInt("CUST_ID"),
					rs.getString("NAME"), 
					rs.getInt("Age")
				);
			}
			rs.close();
			ps.close();
			return customer;
		} catch (SQLException e) {
			throw new RuntimeException(e);
		} finally {
			if (conn != null) {
				try {
				conn.close();
				} catch (SQLException e) {}
			}
		}
	}
	
	public LinkedList<Customer> findByCustomerName(String name){
		
		String sql = "SELECT * FROM CUSTOMER WHERE NAME = ?";
		
		Connection conn = null;
		
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, name);
			ResultSet rs = ps.executeQuery();
			LinkedList<Customer> customers = new LinkedList<Customer>();
			while (rs.next()) {
				customers.add(new Customer(
					rs.getInt("CUST_ID"),
					rs.getString("NAME"), 
					rs.getInt("Age")
				));
			}
			rs.close();
			ps.close();
			return customers;
		} catch (SQLException e) {
			throw new RuntimeException(e);
		} finally {
			if (conn != null) {
				try {
				conn.close();
				} catch (SQLException e) {}
			}
		}
	}

	public Boolean deleteByCustomerId(int custId) {
		
		String sql = "DELETE FROM CUSTOMER WHERE CUST_ID = ?";
		
		Connection conn = null;
		
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1, custId);
			int rs = ps.executeUpdate();
			
			ps.close();
			return rs != 0; 
		} catch (SQLException e) {
			throw new RuntimeException(e);
		} finally {
			if (conn != null) {
				try {
				conn.close();
				} catch (SQLException e) {}
			}
		}
	}
}