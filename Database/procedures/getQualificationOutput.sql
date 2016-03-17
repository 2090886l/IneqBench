DROP PROCEDURE IF EXISTS getQualificationOutput;
CREATE DEFINER=`ineqbench_user`@`%` PROCEDURE `getQualificationOutput`(IN start_age int(2), IN end_age int(2), IN sexIn VARCHAR(25), IN locality VARCHAR(25))
/* procedure for getting those without educational qualification
gets totalPopulation using the totalPopulation function
and totalDeprived from QUALIFICATIONS
*/
BEGIN
	SELECT(
	SELECT totalPopulation(start_age,end_age,sexIn,locality)) AS 'totalPopulation',
    (SELECT
		REPLACE(FORMAT(SUM( NO_QUALIFICATIONS )*
        (SELECT SUM(PERCENT)/100 FROM POP_AGE_PERCENT WHERE AGE BETWEEN start_age AND end_age),0),',','') -- estimate age group size using POP_AGE_PERCENT
		FROM QUALIFICATIONS WHERE SEX = sexIN AND AGE = 'Total' -- filter by gender
			AND (locality = "Dumfries & Galloway" -- if locality is D&G we don't need to filter by locality using GEOGRAPHY_LOOKUP datazones
			OR DATA_ZONE in (SELECT Datazone FROM GEOGRAPHY_LOOKUP WHERE locality = GEOGRAPHY_LOOKUP.Locality)  )
        ) AS 'totalDeprived';
END
