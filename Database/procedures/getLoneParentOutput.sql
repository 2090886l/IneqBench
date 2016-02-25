DROP PROCEDURE IF EXISTS getLoneParentOutput;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getLoneParentOutput`(IN start_age int(2), IN end_age int(2), IN sexIn VARCHAR(25), IN locality VARCHAR(25))
BEGIN
SELECT (
	SELECT totalPopulation(start_age,end_age,sexIn,locality)) AS 'totalPopulation',

(SELECT REPLACE(FORMAT(TOTAL
*( 
	SELECT totalPopulation(start_age,end_age,sexIn,locality)
	/ (SELECT totalPopulation(start_age,end_age,sexIn,'Dumfries & Galloway'))
)
*(SELECT  SUM(PERCENT)/100
FROM POP_AGE_PERCENT
WHERE AGE BETWEEN start_age AND end_age),0),',','')
FROM LONE_PARENTS_WITH_DEPENDANT_CHILDREN
WHERE SEX = sexIn
) AS 'totalDeprived';
END
