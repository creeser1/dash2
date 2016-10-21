-- phpMyAdmin SQL Dump
-- version 4.6.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 21, 2016 at 07:38 AM
-- Server version: 5.7.14
-- PHP Version: 7.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `exampleapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `pguser`
--

CREATE TABLE `pguser` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `hash` text NOT NULL,
  `salt` text,
  `expires` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `role` text NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pguser`
--

INSERT INTO `pguser` (`id`, `username`, `hash`, `salt`, `expires`, `role`, `status`, `created`, `modified`) VALUES
(28, 'chris', '$2y$10$mx19ici1y/gTbCqqJ5tgwepGWklI.EFUVGsnUGdaJiR3SXIXu9SGa', '$2y$10$9ZZcliGAvJfyhcIIaWPA5OmwycSZtywURhp/1WQViN7WaiWMrR48a', '2016-10-18 16:32:51', 'admin', 1, '2016-09-19 17:44:48', '2016-10-18 15:32:51'),
(29, 'roy', '$2y$10$f7EmLuM9Kt.rP.9c.UN.9u0kBln6wQ03m5mnaBfTBCYTFbk1TwBjS', '$2y$10$tJZkvYauh6wOmgWczgvHvekmYH.n2PquqinkkH.zJfuHbDlHpXK3e', '2016-10-20 21:28:59', 'editor', 1, '2016-10-20 16:54:32', '2016-10-20 20:28:59'),
(30, 'erin', '$2y$10$KULLUOYwoRk1JGmRQtMbBOPUKZ1ocgfKSl29RcupX1jYkijj06mBa', '$2y$10$r.yADrsEuL/qpKLzGktviOLuvDCRxHcblzdteQkFSvbzFSLmrfwC6', '2016-10-20 17:59:30', 'editor', 1, '2016-10-20 16:59:03', '2016-10-20 16:59:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pguser`
--
ALTER TABLE `pguser`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`(64));

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pguser`
--
ALTER TABLE `pguser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
