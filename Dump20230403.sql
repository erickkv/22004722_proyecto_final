-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: punto_de_venta
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `cod` varchar(20) NOT NULL,
  `nombre_categoria` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`cod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES ('bebs','bebidas'),('carn','carnes'),('hig','higiene'),('hog','articulos para el hogar'),('limp','articulos de limpieza'),('vers','verduras, vegetales y frutas');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cod_prod` varchar(20) DEFAULT NULL,
  `id_prov` int DEFAULT NULL,
  `cant` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cod_prod` (`cod_prod`),
  KEY `id_prov` (`id_prov`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`cod_prod`) REFERENCES `productos` (`cod`),
  CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`id_prov`) REFERENCES `proveedores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (1,'bebs-pepno-355-la',7,2);
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `cod` varchar(20) NOT NULL,
  `nombre` varchar(40) DEFAULT NULL,
  `descripcion` varchar(60) DEFAULT NULL,
  `cod_cat` varchar(20) DEFAULT NULL,
  `existencias` int DEFAULT NULL,
  PRIMARY KEY (`cod`),
  KEY `cod_cat` (`cod_cat`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`cod_cat`) REFERENCES `categorias` (`cod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES ('bebs-col-loc-355-la','cola-loca 355ml lata','gaseosa cola-loca 355ml lata','bebs',50),('bebs-pepno-355-la','pepno 355ml lata','gaseosa pepno 355ml lata','bebs',20),('carn-pol-pech-01','pechuga pio rey','pechuga de pollo libra','carn',10),('carn-res-lom-01','lomito','lomito de res, libra','carn',10),('det-liq-001','detergente liquido durotel','detergente liquido 200ml durotel botella','limp',10),('hog-lamp-01','lampara ovalada','lampara ovalada 60cms kit','hog',5),('lech-oz','lechuga','lechuga (onzas)','vers',10),('pap-hig-01','papel higienico scotch','papel higienico scotch unidad','hig',10);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
INSERT INTO `proveedores` VALUES (1,'pio-rey'),(2,'multicarnes'),(3,'vacacortes'),(4,'michael scotch'),(5,'lamparas aladin'),(6,'cola-loca guatemala'),(7,'amber'),(8,'limpiolin'),(9,'la troca'),(10,'vendedores-de-pepno-2');
/*!40000 ALTER TABLE `proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provs_prods`
--

DROP TABLE IF EXISTS `provs_prods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provs_prods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cod_prod` varchar(20) DEFAULT NULL,
  `id_prov` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cod_prod` (`cod_prod`),
  KEY `id_prov` (`id_prov`),
  CONSTRAINT `provs_prods_ibfk_1` FOREIGN KEY (`cod_prod`) REFERENCES `productos` (`cod`),
  CONSTRAINT `provs_prods_ibfk_2` FOREIGN KEY (`id_prov`) REFERENCES `proveedores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provs_prods`
--

LOCK TABLES `provs_prods` WRITE;
/*!40000 ALTER TABLE `provs_prods` DISABLE KEYS */;
INSERT INTO `provs_prods` VALUES (1,'carn-pol-pech-01',1),(2,'carn-res-lom-01',3),(3,'pap-hig-01',4),(4,'hog-lamp-01',5),(5,'bebs-col-loc-355-la',6),(6,'bebs-pepno-355-la',7),(7,'det-liq-001',8),(8,'lech-oz',9),(9,'bebs-pepno-355-la',10);
/*!40000 ALTER TABLE `provs_prods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  `pass` varchar(70) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'usuario','$2b$10$46oYHS4dRLjaBG8UXmgIeeuVgw/NzjQAIg7RJpahej41Bbnr3VnOO');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-03 21:04:02
