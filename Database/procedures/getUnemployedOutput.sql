DROP PROCEDURE IF EXISTS getUnemployedOutput;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getUnemployedOutput`(IN start_age int(2), IN end_age int(2), IN sexIn VARCHAR(25), IN locality VARCHAR(25))
/* procedure for getting the unemployed
gets totalPopulation using the totalPopulation function
and totalDeprived from UNEMPLOYED
*/
BEGIN
	SELECT (
	SELECT totalPopulation(start_age,end_age,sexIn,locality)) AS 'totalPopulation',
    (SELECT
		REPLACE(FORMAT(SUM(UNEMPLOYED)*
        (SELECT SUM(PERCENT)/100 FROM POP_AGE_PERCENT WHERE AGE BETWEEN start_age AND end_age)* -- estimate age group size using POP_AGE_PERCENT
		(SELECT (PERCENT/100) FROM POP_GENDER_PERCENT WHERE GENDER=sexIn),0),',','') -- estimate gender group size using POP_GENDER_PERCENT
		FROM UNEMPLOYED 
        WHERE (locality = "Dumfries & Galloway" -- if locality is D&G we don't need to filter by locality using GEOGRAPHY_LOOKUP datazones
			OR DATA_ZONE in (SELECT Datazone FROM GEOGRAPHY_LOOKUP WHERE locality = GEOGRAPHY_LOOKUP.Locality)  ))
		AS 'totalDeprived';
END
