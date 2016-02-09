-- MySQL dump 10.13  Distrib 5.5.47, for debian-linux-gnu (x86_64)
--
-- Host: mikeharling.co.uk    Database: ineq_bench
-- ------------------------------------------------------
-- Server version	5.5.45-cll-lve

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `BENEFIT_TOTALS`
--

DROP TABLE IF EXISTS `BENEFIT_TOTALS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BENEFIT_TOTALS` (
  `GENDER` varchar(45) DEFAULT NULL,
  `BENEFITS` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `CAR_AVAILABILITY`
--

DROP TABLE IF EXISTS `CAR_AVAILABILITY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CAR_AVAILABILITY` (
  `DATA_ZONE` varchar(11) DEFAULT NULL,
  `SEX` varchar(45) DEFAULT NULL,
  `AGE` varchar(45) DEFAULT NULL,
  `ALL_PEOPLE` int(11) DEFAULT NULL,
  `NO_CAR` int(11) DEFAULT NULL,
  `ONE_CAR` int(11) DEFAULT NULL,
  `TWO_MORE` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ETHNIC_GROUP`
--

DROP TABLE IF EXISTS `ETHNIC_GROUP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ETHNIC_GROUP` (
  `POSTCODE` text,
  `SEX` text,
  `AGE` text,
  `ALL_PEOPLE` int(11) DEFAULT NULL,
  `WHITE_TOTAL` int(11) DEFAULT NULL,
  `WHITE_SCOTTISH` int(11) DEFAULT NULL,
  `WHITE_OTHER_BRITISH` int(11) DEFAULT NULL,
  `WHITE_IRISH` int(11) DEFAULT NULL,
  `WHITE_TRAVELLER` int(11) DEFAULT NULL,
  `WHITE_POLISH` int(11) DEFAULT NULL,
  `WHITE_OTHER_WHITE` int(11) DEFAULT NULL,
  `MIXED_ETHNIC_GROUPS` int(11) DEFAULT NULL,
  `ASIAN_TOTAL` int(11) DEFAULT NULL,
  `ASIAN_PAKISTANI` int(11) DEFAULT NULL,
  `ASIAN_INDIAN` int(11) DEFAULT NULL,
  `ASIAN_BANGLADESHI` int(11) DEFAULT NULL,
  `ASIAN_CHINESE` int(11) DEFAULT NULL,
  `ASIAN_OTHER` int(11) DEFAULT NULL,
  `AFRICAN_TOTAL` int(11) DEFAULT NULL,
  `AFRICAN` int(11) DEFAULT NULL,
  `AFRICAN_OTHER` int(11) DEFAULT NULL,
  `CARIBBEAN_TOTAL` int(11) DEFAULT NULL,
  `CARIBBEAN_BRITISH` int(11) DEFAULT NULL,
  `CARIBBEAN_BLACK` int(11) DEFAULT NULL,
  `CARIBBEAN_OTHER` int(11) DEFAULT NULL,
  `OTHER_TOTAL` int(11) DEFAULT NULL,
  `OTHER_ARAB` int(11) DEFAULT NULL,
  `OTHER_OTHER` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `FUEL_POVERTY`
--

DROP TABLE IF EXISTS `FUEL_POVERTY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FUEL_POVERTY` (
  `DATA_ZONE` varchar(11) DEFAULT NULL,
  `HEATING_CONDITION` varchar(45) DEFAULT NULL,
  `OCCUPANCY_RATING` varchar(45) DEFAULT NULL,
  `ALL_PEOPLE_IN_HOUSEHOLDS` int(11) DEFAULT NULL,
  `0-15` int(11) DEFAULT NULL,
  `16-24` int(11) DEFAULT NULL,
  `25-34` int(11) DEFAULT NULL,
  `35-49` int(11) DEFAULT NULL,
  `50-64` int(11) DEFAULT NULL,
  `65_PLUS` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `GEOGRAPHY_LOOKUP`
--

DROP TABLE IF EXISTS `GEOGRAPHY_LOOKUP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GEOGRAPHY_LOOKUP` (
  `Postcode` varchar(10) DEFAULT NULL,
  `Datazone` varchar(11) DEFAULT NULL,
  `Datazone_pop` int(11) DEFAULT NULL,
  `IZ2011_Code` varchar(11) DEFAULT NULL,
  `IZ2011_Name` varchar(45) DEFAULT NULL,
  `Local_Authority_Code` int(11) DEFAULT NULL,
  `Local_Authority_Name` varchar(45) DEFAULT NULL,
  `CHP_Code` varchar(11) DEFAULT NULL,
  `CHP_Name` varchar(100) DEFAULT NULL,
  `HB_Code` varchar(11) DEFAULT NULL,
  `HB_Name` varchar(45) DEFAULT NULL,
  `Locality` varchar(45) DEFAULT NULL,
  `LHP_Code` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `IN_WORK_BENEFITS`
--

DROP TABLE IF EXISTS `IN_WORK_BENEFITS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `IN_WORK_BENEFITS` (
  `Age` varchar(20) DEFAULT NULL,
  `Males:` int(11) DEFAULT NULL,
  `Females:` int(11) DEFAULT NULL,
  `All People:` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `LONE_PARENTS_WITH_DEPENDANT_CHILDREN`
--

DROP TABLE IF EXISTS `LONE_PARENTS_WITH_DEPENDANT_CHILDREN`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LONE_PARENTS_WITH_DEPENDANT_CHILDREN` (
  `SEX` varchar(25) DEFAULT NULL,
  `TOTAL` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `LONG_TERM_CONDITIONS`
--

DROP TABLE IF EXISTS `LONG_TERM_CONDITIONS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LONG_TERM_CONDITIONS` (
  `DATA_ZONE` varchar(11) DEFAULT NULL,
  `AGE` varchar(45) DEFAULT NULL,
  `TOTAL` int(11) DEFAULT NULL,
  `SEVERE` int(11) DEFAULT NULL,
  `MILD` int(11) DEFAULT NULL,
  `NO_CONDITION` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `LONG_TERM_HEALTH_CONDITION`
--

DROP TABLE IF EXISTS `LONG_TERM_HEALTH_CONDITION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LONG_TERM_HEALTH_CONDITION` (
  `DATA_ZONE` varchar(11) NOT NULL,
  `ALL_PEOPLE` int(11) DEFAULT NULL,
  `NO_CONDITION` int(11) DEFAULT NULL,
  `SOME_CONDITION` int(11) DEFAULT NULL,
  `DEAFNESS` int(11) DEFAULT NULL,
  `BLINDNESS` int(11) DEFAULT NULL,
  `LEARNING_DISABILITY` int(11) DEFAULT NULL,
  `LEARNING_DIFICULTY` int(11) DEFAULT NULL,
  `DEVELOPMENT_DISORDER` int(11) DEFAULT NULL,
  `PHYSICAL_DISORDER` int(11) DEFAULT NULL,
  `MENTAL_CONDITION` int(11) DEFAULT NULL,
  `OTHER` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `POP_AGE_PERCENT`
--

DROP TABLE IF EXISTS `POP_AGE_PERCENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `POP_AGE_PERCENT` (
  `AGE` int(11) DEFAULT NULL,
  `PERCENT` double DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `POP_GENDER_PERCENT`
--

DROP TABLE IF EXISTS `POP_GENDER_PERCENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `POP_GENDER_PERCENT` (
  `GENDER` varchar(45) DEFAULT NULL,
  `PERCENT` double DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `QUALIFICATIONS`
--

DROP TABLE IF EXISTS `QUALIFICATIONS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `QUALIFICATIONS` (
  `DATA_ZONE` varchar(11) DEFAULT NULL,
  `SEX` varchar(45) DEFAULT NULL,
  `AGE` varchar(45) DEFAULT NULL,
  `TOTAL_PEOPLE` int(11) DEFAULT NULL,
  `NO_QUALIFICATIONS` int(11) DEFAULT NULL,
  `LEVEL_1` int(11) DEFAULT NULL,
  `LEVEL_2` int(11) DEFAULT NULL,
  `LEVEL_3` int(11) DEFAULT NULL,
  `LEVEL_4_PLUS` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SCHOOL_DISTANCE`
--

DROP TABLE IF EXISTS `SCHOOL_DISTANCE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SCHOOL_DISTANCE` (
  `DATA_ZONE` varchar(11) DEFAULT NULL,
  `TOTAL` int(11) DEFAULT NULL,
  `HOMESCHOOLED` int(11) DEFAULT NULL,
  `LESS_2KM` int(11) DEFAULT NULL,
  `2KM-5KM` int(11) DEFAULT NULL,
  `5KM-10KM` int(11) DEFAULT NULL,
  `10KM-20KM` int(11) DEFAULT NULL,
  `20KM-30KM` int(11) DEFAULT NULL,
  `30KM-40KM` int(11) DEFAULT NULL,
  `40KM-60KM` int(11) DEFAULT NULL,
  `60KM_PLUS` int(11) DEFAULT NULL,
  `OTHER` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SIMD_LOCAL_QUINTILES`
--

DROP TABLE IF EXISTS `SIMD_LOCAL_QUINTILES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SIMD_LOCAL_QUINTILES` (
  `QUINTILE` int(11) DEFAULT NULL,
  `Annandale & Eskdale` varchar(45) DEFAULT NULL,
  `Nithsdale` varchar(45) DEFAULT NULL,
  `Stewartry` varchar(45) DEFAULT NULL,
  `Wigtownshire` varchar(45) DEFAULT NULL,
  `Dumfries & Galloway` varchar(45) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SIMD_NATIONAL_QUINTILES`
--

DROP TABLE IF EXISTS `SIMD_NATIONAL_QUINTILES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SIMD_NATIONAL_QUINTILES` (
  `QUINTILE` int(11) DEFAULT NULL,
  `Annandale & Eskdale` varchar(45) DEFAULT NULL,
  `Nithsdale` varchar(45) DEFAULT NULL,
  `Stewartry` varchar(45) DEFAULT NULL,
  `Wigtownshire` varchar(45) DEFAULT NULL,
  `Dumfries & Galloway` varchar(45) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `TAX_BAND`
--

DROP TABLE IF EXISTS `TAX_BAND`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TAX_BAND` (
  `POST_CODE` varchar(10) NOT NULL,
  `A` int(11) DEFAULT NULL,
  `B` int(11) DEFAULT NULL,
  `C` int(11) DEFAULT NULL,
  `D` int(11) DEFAULT NULL,
  `E` int(11) DEFAULT NULL,
  `F` int(11) DEFAULT NULL,
  `G` int(11) DEFAULT NULL,
  `H` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `UNPAID_CARE`
--

DROP TABLE IF EXISTS `UNPAID_CARE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UNPAID_CARE` (
  `DATA_ZONE` varchar(11) DEFAULT NULL,
  `TOTAL` int(11) DEFAULT NULL,
  `SEVERE_DISABILITY` int(11) DEFAULT NULL,
  `MILD_DISABILITY` int(11) DEFAULT NULL,
  `NO_DISABILITY` int(11) DEFAULT NULL,
  `SEVERE_DISABILITY_16-64` int(11) DEFAULT NULL,
  `MILD_DISABILITY_16-64` int(11) DEFAULT NULL,
  `NO_DISABILITY_16-64` int(11) DEFAULT NULL,
  `HEALTH_VERY_GOOD` int(11) DEFAULT NULL,
  `HEALTH_GOOD` int(11) DEFAULT NULL,
  `HEALTH_FAIR` int(11) DEFAULT NULL,
  `HEALTH_BAD` int(11) DEFAULT NULL,
  `HEALTH_VERY_BAD` int(11) DEFAULT NULL,
  `NO_UNPAID_CARE` int(11) DEFAULT NULL,
  `1-19_HOURS_CARE` int(11) DEFAULT NULL,
  `20-49_HOURS_CARE` int(11) DEFAULT NULL,
  `50_PLUS_HOURS_CARE` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-02-09 13:51:29
