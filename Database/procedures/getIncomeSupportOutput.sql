DROP PROCEDURE IF EXISTS getIncomeSupportOutput;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getIncomeSupportOutput`(IN start_age int(2),
										   IN end_age int(2),
                                           IN sexIn VARCHAR(25),
                                           IN locality VARCHAR(25))
/* procedure for getting those receiving in work benefits
gets totalPopulation using the totalPopulation function
and totalDeprived from INCOME_SUPPORT
*/
BEGIN
SELECT (
	SELECT totalPopulation(start_age,end_age,sexIn,locality)) AS 'totalPopulation',
    (
    SELECT FORMAT(totalPopulation(start_age,end_age,sexIn,locality)* -- get group size from totalPopulation
		(SELECT TOTAL
         FROM INCOME_SUPPORT
         WHERE SEX = sexIn)/100,0) -- filter by gender
    ) AS totalDeprived;
END
