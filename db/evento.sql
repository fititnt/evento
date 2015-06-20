-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.0.11-MariaDB-1~precise-log - mariadb.org binary distribution
-- OS do Servidor:               debian-linux-gnu
-- HeidiSQL Versão:              9.1.0.4867
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Copiando estrutura para tabela evento.event
CREATE TABLE IF NOT EXISTS `event` (
  `id` bigint(20) unsigned NOT NULL,
  `name` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `is_date_only` tinyint(4) NOT NULL,
  `timezone` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `location` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `start_time` datetime NOT NULL,
  `updated_time` datetime NOT NULL,
  `owner_id` bigint(20) unsigned NOT NULL,
  `owner_name` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `venue_city` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `venue_country` varchar(24) COLLATE utf8_unicode_ci NOT NULL,
  `venue_latitude` float NOT NULL,
  `venue_longitude` float NOT NULL,
  `venue_state` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `venue_street` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `venue_id` bigint(20) unsigned NOT NULL,
  `crawler_last_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `latlon` (`venue_latitude`,`venue_longitude`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela evento.event: ~0 rows (aproximadamente)
DELETE FROM `event`;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
/*!40000 ALTER TABLE `event` ENABLE KEYS */;


-- Copiando estrutura para tabela evento.search_event
CREATE TABLE IF NOT EXISTS `search_event` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(80) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `location` varchar(60) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `searched_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `pertinent` tinyint(4) NOT NULL DEFAULT '1' COMMENT 'É pertinente para pesquisa? Deve ser ignorado completamente?',
  `needmoreinfo` tinyint(4) NOT NULL DEFAULT '1' COMMENT 'Se requer pesquisa especifica do evento',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela evento.search_event: ~0 rows (aproximadamente)
DELETE FROM `search_event`;
/*!40000 ALTER TABLE `search_event` DISABLE KEYS */;
/*!40000 ALTER TABLE `search_event` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
