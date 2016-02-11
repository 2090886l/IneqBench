DELIMITER ;;
CREATE DEFINER=`ineqbench_user`@`%` PROCEDURE `getBenefitsOutput`(IN start_age int(2), IN end_age int(2), IN sexIn VARCHAR(25), IN locality VARCHAR(25))
BEGIN
SELECT (
	SELECT REPLACE(FORMAT(SUM(ALL_PEOPLE)*(SELECT  SUM(PERCENT)/100
		FROM POP_AGE_PERCENT
		WHERE AGE BETWEEN start_age AND end_age),0),',','')
		FROM ETHNIC_GROUP as e
		WHERE SEX = sexIn
		AND AGE != 'Total'
			AND( locality = "Dumfries & Galloway" 
			OR POSTCODE in (SELECT SUBSTRING(Postcode,1, LENGTH( e.POSTCODE )) 
				FROM GEOGRAPHY_LOOKUP WHERE locality = GEOGRAPHY_LOOKUP.Locality)  )
        ) AS 'totalPopulation',
        
    (SELECT
		REPLACE(FORMAT( BENEFITS 
        *( 
		(SELECT SUM(ALL_PEOPLE) FROM ETHNIC_GROUP as e2 WHERE SEX=sexIN AND AGE != 'Total' AND 
			( locality = "Dumfries & Galloway" 
				OR POSTCODE in (SELECT SUBSTRING(Postcode,1, LENGTH( e2.POSTCODE )) 
					FROM GEOGRAPHY_LOOKUP WHERE locality = GEOGRAPHY_LOOKUP.Locality)) )
		/ (SELECT SUM(ALL_PEOPLE) FROM ETHNIC_GROUP WHERE SEX = sexIN AND AGE != 'Total')
		)
        *(SELECT SUM(PERCENT)/100 FROM POP_AGE_PERCENT WHERE AGE BETWEEN start_age AND end_age),0),',','')
		FROM BENEFIT_TOTALS WHERE GENDER=sexIn) AS 'totalDeprived';
END ;;
DELIMITER ;
