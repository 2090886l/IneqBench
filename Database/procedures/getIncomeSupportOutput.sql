DROP PROCEDURE IF EXISTS getIncomeSupportOutput;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getIncomeSupportOutput`(IN start_age int(2),
										   IN end_age int(2),
                                           IN sexIn VARCHAR(25),
                                           IN locality VARCHAR(25))
BEGIN
SELECT (
	SELECT totalPopulation(start_age,end_age,sexIn,locality)) AS 'totalPopulation',
    (
    SELECT FORMAT(totalPopulation(start_age,end_age,sexIn,locality)*
		(SELECT TOTAL
         FROM INCOME_SUPPORT
         WHERE SEX = sexIn)/100,0)
    ) AS totalDeprived;
END
