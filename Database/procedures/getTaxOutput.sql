CREATE DEFINER=`root`@`localhost` PROCEDURE `getTaxOutput`(IN start_age int(2), IN end_age int(2), IN sexIn VARCHAR(25), IN locality VARCHAR(25))
BEGIN

SELECT (
	SELECT totalPopulation(start_age,end_age,sexIn,locality)) AS 'totalPopulation',
	(SELECT REPLACE( FORMAT ( ( SUM(A)+SUM(B) )*
        (SELECT SUM(PERCENT)/100 FROM POP_AGE_PERCENT WHERE AGE BETWEEN start_age AND end_age)*
		(SELECT (PERCENT/100) FROM POP_GENDER_PERCENT WHERE GENDER=sexIn), 0) ,',','')
		FROM TAX_BAND
        WHERE (locality = "Dumfries & Galloway" 
			OR POST_CODE in (SELECT Postcode FROM GEOGRAPHY_LOOKUP WHERE locality = GEOGRAPHY_LOOKUP.Locality)  )
        ) AS 'totalDeprived';
END
