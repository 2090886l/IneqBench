DROP PROCEDURE IF EXISTS getFuelPovertyOutput;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getFuelPovertyOutput`(IN start_age int(2), IN end_age int(2), IN sexIn VARCHAR(25), IN locality VARCHAR(25) )
/* procedure for getting homes without central heating
gets totalPopulation using the totalPopulation function
and totalDeprived from HEATING_CONDITION
*/
BEGIN
	SELECT (
	SELECT totalPopulation(start_age,end_age,sexIn,locality)) AS 'totalPopulation',
    (SELECT
		REPLACE(FORMAT(SUM(ALL_PEOPLE_IN_HOUSEHOLDS)*
        (SELECT SUM(PERCENT)/100 FROM POP_AGE_PERCENT WHERE AGE BETWEEN start_age AND end_age)* -- estimating age group size from POP_AGE_PERCENT
		(SELECT (PERCENT/100) FROM POP_GENDER_PERCENT WHERE GENDER=sexIn),0),',','') -- estimating gender group size from POP_GENDER_PERCENT
		FROM FUEL_POVERTY WHERE HEATING_CONDITION = 'Does not have central heating:' AND OCCUPANCY_RATING = 'Total'
		AND (locality = "Dumfries & Galloway" -- if locality is D&G, we don't need to filter by locality using datazone
			OR DATA_ZONE in (SELECT Datazone FROM GEOGRAPHY_LOOKUP WHERE locality = GEOGRAPHY_LOOKUP.Locality)  ))
		AS 'totalDeprived';
END
