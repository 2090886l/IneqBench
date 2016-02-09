DELIMITER ;;
CREATE DEFINER=`ineqbench_user`@`%` PROCEDURE `getQualificationOutput`(IN start_age int(2), IN end_age int(2), IN sexIn VARCHAR(25), IN locality VARCHAR(25))
BEGIN
	SELECT
	(SELECT
		REPLACE(FORMAT(SUM(TOTAL_PEOPLE)*
        (SELECT SUM(PERCENT)/100 FROM POP_AGE_PERCENT WHERE AGE BETWEEN start_age AND end_age),0),',','')
		FROM QUALIFICATIONS WHERE SEX = sexIN AND AGE = 'Total'
			AND (locality = "Dumfries & Galloway" 
			OR DATA_ZONE in (SELECT Datazone FROM GEOGRAPHY_LOOKUP WHERE locality = GEOGRAPHY_LOOKUP.Locality)  )
        ) AS 'totalPopulation',
    (SELECT
		REPLACE(FORMAT(SUM( NO_QUALIFICATIONS )*
        (SELECT SUM(PERCENT)/100 FROM POP_AGE_PERCENT WHERE AGE BETWEEN start_age AND end_age),0),',','')
		FROM QUALIFICATIONS WHERE SEX = sexIN AND AGE = 'Total'
			AND (locality = "Dumfries & Galloway" 
			OR DATA_ZONE in (SELECT Datazone FROM GEOGRAPHY_LOOKUP WHERE locality = GEOGRAPHY_LOOKUP.Locality)  )
        ) AS 'totalDeprived';
END ;;
DELIMITER ;
