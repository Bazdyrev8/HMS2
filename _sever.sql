-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Ноя 23 2015 г., 22:53
-- Версия сервера: 5.5.43-37.2
-- Версия PHP: 5.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `nextel_sever`
--

-- --------------------------------------------------------

--
-- Структура таблицы `sensor`
--

CREATE TABLE IF NOT EXISTS `sensor` (
  `pir1` int(2) NOT NULL,
  `pir2` int(2) NOT NULL,
  `rele1` int(2) NOT NULL,
  `light` int(2) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `sensor`
--

INSERT INTO `sensor` (`pir1`, `pir2`, `rele1`, `light`) VALUES
(0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `settings`
--

CREATE TABLE IF NOT EXISTS `settings` (
  `id` varchar(50) NOT NULL,
  `value` tinytext NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `settings`
--

INSERT INTO `settings` (`id`, `value`) VALUES
('connection', '1448308376'),
('reboot', '1448308255'),
('ram', '848');

-- --------------------------------------------------------

--
-- Структура таблицы `stat`
--

CREATE TABLE IF NOT EXISTS `statistics` (
`id` int(20) NOT NULL,
  `temp` int(5) NOT NULL,
  `hum` int(5) NOT NULL,
  `time` int(10) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

--
-- Индексы таблицы `stat`
--
ALTER TABLE `stat`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `id_2` (`id`), ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `stat`
--
ALTER TABLE `stat`
MODIFY `id` int(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
