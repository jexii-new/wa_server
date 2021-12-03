-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 30 Nov 2021 pada 10.33
-- Versi server: 10.4.19-MariaDB
-- Versi PHP: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wa_services`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `owner`
--

CREATE TABLE `owner` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `nomor` varchar(255) NOT NULL,
  `status` varchar(1) DEFAULT NULL,
  `subscribe` varchar(255) DEFAULT NULL,
  `unsubscribe` varchar(255) DEFAULT NULL,
  `session` text DEFAULT NULL,
  `api_key` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `domain` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `owner`
--

INSERT INTO `owner` (`id`, `nama`, `nomor`, `status`, `subscribe`, `unsubscribe`, `session`, `api_key`, `password`, `domain`) VALUES
(700, 'imron', '6285882843337@whatsapp.net', NULL, 'dafar', 'stop', '{\n	\"clientID\": \"pG0jcqods8dmSuwpgkZbcg==\",\n	\"serverToken\": \"1@45dIesydG62ToCDb66sEyfYvU2749CP9eZYoAfqdpwZP8k236OxKe0Zcqk/OqdcOQptuliLMKN28ng==\",\n	\"clientToken\": \"cZxLiYZV+nBpiocNSjvlVFgsWAsPZoZG5vNZZDqGIEk=\",\n	\"encKey\": \"DWGng712Psz+sSvXZwgRUCdM3N4p+bZQH5KCmqAmkJA=\",\n	\"macKey\": \"0id/2LrEY9Kw3HcnPC3pVJO33lf/MGpsUATGb0HM2vI=\"\n}', '2WEXPDW-F6G45J5-GT9CMGT-RH6577R', '$2b$10$BMUBzN7FCzjTI.oI4Aqj3.jbIBrZnSuk6JvJsG3OjiCzauu7ws.m2', 'http://localhost:5000');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `owner`
--
ALTER TABLE `owner`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `owner`
--
ALTER TABLE `owner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=701;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
