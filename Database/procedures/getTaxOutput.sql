DROP PROCEDURE IF EXISTS getTaxOutput;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getTaxOutput`(IN start_age int(2), IN end_age int(2), IN sexIn VARCHAR(25), IN locality VARCHAR(25))
BEGIN
/* procedure for getting those living in A or B tax band houses
gets totalPopulation using the totalPopulation function
and totalDeprived from LONG_TERM_HEALTH_CONDITION
*/
SELECT (
	SELECT totalPopulation(start_age,end_age,sexIn,locality)) AS 'totalPopulation',
	(SELECT REPLACE( FORMAT ( ( SUM(A)+SUM(B) )*
        (SELECT SUM(PERCENT)/100 FROM POP_AGE_PERCENT WHERE AGE BETWEEN start_age AND end_age)* -- estimate age group size using POP_AGE_PERCENT
		(SELECT (PERCENT/100) FROM POP_GENDER_PERCENT WHERE GENDER=sexIn), 0) ,',','') -- estimate gender group size using POP_GENDER_PERCENT
		FROM TAX_BAND
        WHERE (locality = "Dumfries & Galloway" -- if the locality is D&G we don't need to filter by locality using GEOGRAPHY_LOOKUP postcodes
			OR POST_CODE in (SELECT Postcode FROM GEOGRAPHY_LOOKUP WHERE locality = GEOGRAPHY_LOOKUP.Locality)  )
        ) AS 'totalDeprived';
END
