DROP PROCEDURE IF EXISTS getCarOutput;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getCarOutput`(IN start_age int(2), IN end_age int(2), IN sexIn VARCHAR(25), IN locality VARCHAR(25))
/* procedure for getting those without cars
gets totalPopulation using the totalPopulation function
and totalDeprived from CAR_AVAILABILITY
*/

BEGIN
SELECT (
	SELECT totalPopulation(start_age,end_age,sexIn,locality)) AS 'totalPopulation',

(SELECT REPLACE(FORMAT((SUM(NO_CAR))*(SELECT  SUM(PERCENT)/100
FROM POP_AGE_PERCENT
WHERE AGE BETWEEN start_age AND end_age),0),',','') -- estimating age group size from POP_AGE_PERCENT
FROM CAR_AVAILABILITY
WHERE SEX = sexIn -- filtering by gender
AND AGE != 'Total'
AND (locality = "Dumfries & Galloway" -- if locality is D&G, no need to filter by locality (using datazone)
	OR DATA_ZONE in (SELECT Datazone FROM GEOGRAPHY_LOOKUP WHERE locality = GEOGRAPHY_LOOKUP.Locality)  )
) AS 'totalDeprived';
END
