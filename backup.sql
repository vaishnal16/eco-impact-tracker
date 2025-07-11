-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: eco_tracker
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('af99d73a-515f-42ea-8970-3b93aadbf594','90d0eceb25853e0240fe83b7481f2576e17c216f98e34dc493810c5a5c0767d6','2025-07-05 15:42:19.773','20250705154219_init',NULL,NULL,'2025-07-05 15:42:19.416',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activity_logs`
--

DROP TABLE IF EXISTS `activity_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `habit_id` int NOT NULL,
  `logged_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `points` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `activity_logs_user_id_fkey` (`user_id`),
  KEY `activity_logs_habit_id_fkey` (`habit_id`),
  CONSTRAINT `activity_logs_habit_id_fkey` FOREIGN KEY (`habit_id`) REFERENCES `habits` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `activity_logs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_logs`
--

LOCK TABLES `activity_logs` WRITE;
/*!40000 ALTER TABLE `activity_logs` DISABLE KEYS */;
INSERT INTO `activity_logs` VALUES (1,3,4,'2025-07-06 15:34:24','Did reduce water usage on Sun Jul 06 2025.',10),(2,3,2,'2025-07-05 15:34:24','Did recycle household waste on Sat Jul 05 2025.',12),(3,3,3,'2025-07-04 15:34:24','Did plant a tree on Fri Jul 04 2025.',50),(4,3,5,'2025-07-03 15:34:24','Did cycle to work on Thu Jul 03 2025.',20),(5,3,1,'2025-07-02 15:34:24','Did use public transport on Wed Jul 02 2025.',15),(6,4,2,'2025-07-06 15:34:24','Did recycle household waste on Sun Jul 06 2025.',12),(7,4,3,'2025-07-05 15:34:24','Did plant a tree on Sat Jul 05 2025.',50),(8,4,5,'2025-07-04 15:34:24','Did cycle to work on Fri Jul 04 2025.',20),(9,4,1,'2025-07-03 15:34:24','Did use public transport on Thu Jul 03 2025.',15),(10,4,4,'2025-07-02 15:34:24','Did reduce water usage on Wed Jul 02 2025.',10),(11,5,3,'2025-07-06 15:34:24','Did plant a tree on Sun Jul 06 2025.',50),(12,5,5,'2025-07-05 15:34:24','Did cycle to work on Sat Jul 05 2025.',20),(13,5,1,'2025-07-04 15:34:24','Did use public transport on Fri Jul 04 2025.',15),(14,5,4,'2025-07-03 15:34:24','Did reduce water usage on Thu Jul 03 2025.',10),(15,5,2,'2025-07-02 15:34:24','Did recycle household waste on Wed Jul 02 2025.',12),(16,3,3,'2025-07-06 15:43:48','I have planted a tree',50);
/*!40000 ALTER TABLE `activity_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `badges`
--

DROP TABLE IF EXISTS `badges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `badges` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `points_threshold` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `badges_name_key` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `badges`
--

LOCK TABLES `badges` WRITE;
/*!40000 ALTER TABLE `badges` DISABLE KEYS */;
INSERT INTO `badges` VALUES (1,'Sapling','Earn 300 eco points','/badges/sapling.svg',300),(2,'Forest Guardian','Earn 1000 eco points','/badges/forest-guardian.svg',1000),(3,'Seedling','Earn 100 eco points','/badges/seedling.svg',100),(4,'Tree Hugger','Earn 600 eco points','/badges/tree-hugger.svg',600);
/*!40000 ALTER TABLE `badges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habits`
--

DROP TABLE IF EXISTS `habits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `points_value` int NOT NULL DEFAULT '10',
  `carbon_saving_kg` decimal(5,2) NOT NULL DEFAULT '0.00',
  `waste_saving_kg` decimal(5,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `habits_name_key` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habits`
--

LOCK TABLES `habits` WRITE;
/*!40000 ALTER TABLE `habits` DISABLE KEYS */;
INSERT INTO `habits` VALUES (1,'Use public transport','Take a bus/train/tram instead of driving.',15,1.00,0.00),(2,'Recycle household waste','Separate and recycle paper, plastic, and glass.',12,0.00,2.00),(3,'Plant a tree','Planting a new tree or caring for an existing one.',50,5.00,0.00),(4,'Reduce water usage','Shorten your shower or reuse grey water.',10,0.00,0.50),(5,'Cycle to work','Commute by bicycle instead of using a car.',20,1.50,0.00);
/*!40000 ALTER TABLE `habits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_badges`
--

DROP TABLE IF EXISTS `user_badges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_badges` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `badge_id` int NOT NULL,
  `achieved_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_badges_user_id_badge_id_key` (`user_id`,`badge_id`),
  KEY `user_badges_badge_id_fkey` (`badge_id`),
  CONSTRAINT `user_badges_badge_id_fkey` FOREIGN KEY (`badge_id`) REFERENCES `badges` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `user_badges_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_badges`
--

LOCK TABLES `user_badges` WRITE;
/*!40000 ALTER TABLE `user_badges` DISABLE KEYS */;
INSERT INTO `user_badges` VALUES (1,3,3,'2025-07-06 15:34:24'),(2,4,3,'2025-07-06 15:34:24'),(3,5,3,'2025-07-06 15:34:24');
/*!40000 ALTER TABLE `user_badges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_points` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'alice.green@example.com','$2b$10$CBRuFzX0Av5nlRckgdiB3OEDsSl4KApjoKaea6t51rEG7YOpTf/j.','Alice Green',157,'2025-07-06 15:34:24','2025-07-06 15:43:48'),(4,'bob.brown@example.com','$2b$10$CBRuFzX0Av5nlRckgdiB3OEDsSl4KApjoKaea6t51rEG7YOpTf/j.','Bob Brown',107,'2025-07-06 15:34:24','2025-07-06 15:34:24'),(5,'charlie.earth@example.com','$2b$10$CBRuFzX0Av5nlRckgdiB3OEDsSl4KApjoKaea6t51rEG7YOpTf/j.','Charlie Earth',107,'2025-07-06 15:34:24','2025-07-06 15:34:24');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-07  0:18:30
