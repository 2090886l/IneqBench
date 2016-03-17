DROP PROCEDURE IF EXISTS getLivingAreaOutput;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getLivingAreaOutput`(IN start_age int(2), IN end_age int(2), IN sexIn VARCHAR(25), IN locality VARCHAR(25))
/* procedure for getting those in poor conditions
gets totalPopulation from SIMD_LOCAL_QUINTILES
and totalDeprived from SIMD_LOCAL_QUINTILES ( quintiles 1 and 2)
*/
BEGIN
	SELECT
	(SELECT
	REPLACE(FORMAT(SUM( -- the table is broken into columns based on locality, and the correct column needs to be selected via the locality variable
    (CASE WHEN locality = 'Dumfries & Galloway' then DumfriesGalloway
             WHEN locality = 'Nithsdale' then Nithsdale
             WHEN locality = 'Stewartry' then Stewartry
             WHEN locality = 'Annandale & Eskdale' then AnnandaleEskdale
             WHEN locality = 'Wigtownshire' then Wigtownshire
        end)
    )*
        (SELECT SUM(PERCENT)/100 FROM POP_AGE_PERCENT WHERE AGE BETWEEN start_age AND end_age)* -- estimate age group size using POP_AGE_PERCENT
		(SELECT (PERCENT/100) FROM POP_GENDER_PERCENT WHERE GENDER=sexIn), 0) ,',','') -- estimate gender group size using POP_GENDER_PERCENT
		FROM SIMD_LOCAL_QUINTILES 
        ) AS 'totalPopulation',    
    
	(SELECT
	REPLACE(FORMAT(SUM( -- the table is broken into columns based on locality, and the correct column needs to be selected via the locality variable
		(CASE WHEN locality = 'Dumfries & Galloway' then DumfriesGalloway
             WHEN locality = 'Nithsdale' then Nithsdale
             WHEN locality = 'Stewartry' then Stewartry
             WHEN locality = 'Annandale & Eskdale' then AnnandaleEskdale
             WHEN locality = 'Wigtownshire' then Wigtownshire
        end)
    )*
        (SELECT SUM(PERCENT)/100 FROM POP_AGE_PERCENT WHERE AGE BETWEEN start_age AND end_age)* -- estimate age group size using POP_AGE_PERCENT
		(SELECT (PERCENT/100) FROM POP_GENDER_PERCENT WHERE GENDER=sexIn), 0) ,',','') -- estimate gender group size using POP_GENDER_PERCENT
		FROM SIMD_LOCAL_QUINTILES 
        WHERE QUINTILE < 3) AS 'totalDeprived';
END
