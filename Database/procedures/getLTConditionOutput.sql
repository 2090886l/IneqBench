DELIMITER ;;
CREATE DEFINER=`ineqbench_user`@`%` PROCEDURE `getLTConditionOutput`(IN start_age int(2), IN end_age int(2), IN sexIn VARCHAR(25), IN locality VARCHAR(25))
BEGIN SELECT (

SELECT REPLACE(FORMAT(SUM(TOTAL)*(SELECT SUM(PERCENT)/100
FROM POP_AGE_PERCENT WHERE AGE BETWEEN start_age AND end_age)*
		(SELECT (PERCENT/100) FROM POP_GENDER_PERCENT WHERE GENDER=sexIn),0),',','')

FROM LONG_TERM_CONDITIONS WHERE AGE = 'All People'
	AND (locality = "Dumfries & Galloway" 
	OR DATA_ZONE in (SELECT Datazone FROM GEOGRAPHY_LOOKUP WHERE locality = GEOGRAPHY_LOOKUP.Locality)  )
) AS 'totalPopulation',

(SELECT REPLACE(FORMAT((SUM(SEVERE) + SUM(MILD))*(
SELECT SUM(PERCENT)/100 FROM POP_AGE_PERCENT WHERE AGE BETWEEN start_age AND end_age)*
		(SELECT (PERCENT/100) FROM POP_GENDER_PERCENT WHERE GENDER=sexIn),0),',','')
FROM LONG_TERM_CONDITIONS WHERE AGE = 'All people'
	AND (locality = "Dumfries & Galloway" 
	OR DATA_ZONE in (SELECT Datazone FROM GEOGRAPHY_LOOKUP WHERE locality = GEOGRAPHY_LOOKUP.Locality)  )
) AS 'totalDeprived'; END ;;
DELIMITER ;
