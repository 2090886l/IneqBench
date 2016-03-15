package me.ineqbench.tests.util;

import java.nio.charset.Charset;

import org.springframework.http.MediaType;

//Miscellaneous class for test utils
public class TestUtil {
	// set http exchange data type
	public static final MediaType APPLICATION_JSON_UTF8 = new MediaType(MediaType.APPLICATION_JSON.getType(),
			MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));
}