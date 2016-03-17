DROP PROCEDURE IF EXISTS getEthnicOutput;
CREATE DEFINER=`ineqbench_user`@`%` PROCEDURE `getEthnicOutput`(IN start_age int(2), IN end_age int(2), IN sexIn VARCHAR(25), IN locality VARCHAR(25))
/* procedure for getting south asians, black afro-carribeans, and gypsies/travelers =
gets totalPopulation using the totalPopulation function
and totalDeprived from ETHNIC_GROUP
*/
BEGIN
SELECT (
	SELECT totalPopulation(start_age,end_age,sexIn,locality)) AS 'totalPopulation',

(SELECT FORMAT((SUM(WHITE_TRAVELLER) + SUM(ASIAN_PAKISTANI) + SUM(ASIAN_INDIAN) + 
SUM(ASIAN_BANGLADESHI) + SUM(CARIBBEAN_BRITISH) +
SUM(CARIBBEAN_BLACK))*(SELECT  SUM(PERCENT)/100
FROM POP_AGE_PERCENT
WHERE AGE BETWEEN start_age AND end_age),0) -- estimating age group size from POP_AGE_PERCENT
FROM ETHNIC_GROUP AS e
WHERE SEX = sexIn -- filtering by gender
AND AGE != 'Total'
	AND( locality = "Dumfries & Galloway" -- if locality is D&G, no need to filter by locality using postcode
	OR POSTCODE in (SELECT SUBSTRING(Postcode,1, LENGTH( e.POSTCODE )) FROM GEOGRAPHY_LOOKUP WHERE locality = GEOGRAPHY_LOOKUP.Locality)  )
) AS 'totalDeprived';
END
