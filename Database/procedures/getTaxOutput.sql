DROP PROCEDURE IF EXISTS getTaxOutput;

CREATE DEFINER=`root`@`localhost` PROCEDURE `getTaxOutput`(IN start_age int(2), IN end_age int(2), IN sexIn VARCHAR(25), IN locality VARCHAR(25))
BEGIN
/* procedure for getting those living in A or B tax band houses
gets totalPopulation from summing the totals for all households
and totalDeprived from TAX_BAND
NOTE: THIS RETURNS VALUES IN TERMS OF HOUSEHOLDS, NOT PEOPLE
*/
SELECT (
	SELECT REPLACE( FORMAT ( ( SUM(A)+SUM(B)+SUM(C)+SUM(D)+SUM(E)+SUM(F)+SUM(G)+SUM(H) )*
        (SELECT SUM(PERCENT)/100 FROM POP_AGE_PERCENT WHERE AGE BETWEEN start_age AND end_age)* -- estimate age group size using POP_AGE_PERCENT
		(SELECT (PERCENT/100) FROM POP_GENDER_PERCENT WHERE GENDER=sexIn), 0) ,',','') -- estimate gender group size using POP_GENDER_PERCENT
		FROM TAX_BAND
			WHERE (locality = "Dumfries & Galloway" 
			OR POST_CODE in (SELECT Postcode FROM GEOGRAPHY_LOOKUP WHERE locality = GEOGRAPHY_LOOKUP.Locality)  )
        ) AS 'totalPopulation',
	(SELECT REPLACE( FORMAT ( ( SUM(A)+SUM(B) )*
        (SELECT SUM(PERCENT)/100 FROM POP_AGE_PERCENT WHERE AGE BETWEEN start_age AND end_age)*  -- estimate age group size using POP_AGE_PERCENT
		(SELECT (PERCENT/100) FROM POP_GENDER_PERCENT WHERE GENDER=sexIn), 0) ,',','')  -- estimate gender group size using POP_GENDER_PERCENT
		FROM TAX_BAND
        WHERE (locality = "Dumfries & Galloway" 
			OR POST_CODE in (SELECT Postcode FROM GEOGRAPHY_LOOKUP WHERE locality = GEOGRAPHY_LOOKUP.Locality)  )
        ) AS 'totalDeprived';
END
