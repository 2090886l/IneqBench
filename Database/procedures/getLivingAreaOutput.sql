CREATE DEFINER=`root`@`localhost` PROCEDURE `getLivingAreaOutput`(IN start_age int(2), IN end_age int(2), IN sexIn VARCHAR(25), IN locality VARCHAR(25))
BEGIN
	SELECT
	(SELECT
	REPLACE(FORMAT(SUM(
    (CASE WHEN locality = 'Dumfries & Galloway' then DumfriesGalloway
             WHEN locality = 'Nithsdale' then Nithsdale
             WHEN locality = 'Stewartry' then Stewartry
             WHEN locality = 'Annandale & Eskdale' then AnnandaleEskdale
             WHEN locality = 'Wigtownshire' then Wigtownshire
        end)
    )*
        (SELECT SUM(PERCENT)/100 FROM POP_AGE_PERCENT WHERE AGE BETWEEN start_age AND end_age)*
		(SELECT (PERCENT/100) FROM POP_GENDER_PERCENT WHERE GENDER=sexIn), 0) ,',','')
		FROM SIMD_LOCAL_QUINTILES 
        ) AS 'totalPopulation',    
    
	(SELECT
	REPLACE(FORMAT(SUM(
		(CASE WHEN locality = 'Dumfries & Galloway' then DumfriesGalloway
             WHEN locality = 'Nithsdale' then Nithsdale
             WHEN locality = 'Stewartry' then Stewartry
             WHEN locality = 'Annandale & Eskdale' then AnnandaleEskdale
             WHEN locality = 'Wigtownshire' then Wigtownshire
        end)
    )*
        (SELECT SUM(PERCENT)/100 FROM POP_AGE_PERCENT WHERE AGE BETWEEN start_age AND end_age)*
		(SELECT (PERCENT/100) FROM POP_GENDER_PERCENT WHERE GENDER=sexIn), 0) ,',','')
		FROM SIMD_LOCAL_QUINTILES 
        WHERE QUINTILE < 3) AS 'totalDeprived';
END
