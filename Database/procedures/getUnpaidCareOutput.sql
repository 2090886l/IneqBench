DROP PROCEDURE IF EXISTS getUnpaidCareOutput;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getUnpaidCareOutput`(IN start_age int(2), IN end_age int(2), IN sexIn VARCHAR(25), IN locality VARCHAR(25))
/* procedure for getting those who provide unpaid care
gets totalPopulation using the totalPopulation function
and totalDeprived from UNPAID_CARE
*/
BEGIN
	SELECT (
	SELECT totalPopulation(start_age,end_age,sexIn,locality)) AS 'totalPopulation',
    (SELECT
		REPLACE(FORMAT((SUM('1-19_HOURS_CARE')+SUM('20-49_HOURS_CARE')+SUM('50_PLUS_HOURS_CARE'))*
        (SELECT SUM(PERCENT)/100 FROM POP_AGE_PERCENT WHERE AGE BETWEEN start_age AND end_age)* -- estimate age group size using POP_AGE_PERCENT
		(SELECT (PERCENT/100) FROM POP_GENDER_PERCENT WHERE GENDER=sexIn),0),',','') -- estimate gender group size using POP_GENDER_PERCENT
		FROM UNPAID_CARE
			WHERE (locality = "Dumfries & Galloway" -- if locality is D&G we don't need to filter by locality using GEOGRAPHY_LOOKUP datazones
			OR DATA_ZONE in (SELECT Datazone FROM GEOGRAPHY_LOOKUP WHERE locality = GEOGRAPHY_LOOKUP.Locality)  )
        ) AS 'totalDeprived';
END
