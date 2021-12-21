-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
<<<<<<< HEAD
-- Waktu pembuatan: 21 Des 2021 pada 12.18
=======
-- Waktu pembuatan: 10 Des 2021 pada 18.09
>>>>>>> b778027af5504d6ffe4fb8b234ed4e07bbbe4a07
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
-- Struktur dari tabel `grups`
--

CREATE TABLE `grups` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `deskripsi` text NOT NULL,
  `code` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `grups`
--

INSERT INTO `grups` (`id`, `nama`, `deskripsi`, `code`) VALUES
<<<<<<< HEAD
(27, 'honey', '....', 'h1'),
(28, 'test', 'lkjlj', 'test123');
=======
(25, 'Grup1', 'contoh grup', 'g1');
>>>>>>> b778027af5504d6ffe4fb8b234ed4e07bbbe4a07

-- --------------------------------------------------------

--
-- Struktur dari tabel `grup_details`
--

CREATE TABLE `grup_details` (
  `id` int(11) NOT NULL,
  `kontak_id` int(11) NOT NULL,
  `grup_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `status_grup` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

<<<<<<< HEAD
--
-- Dumping data untuk tabel `grup_details`
--

INSERT INTO `grup_details` (`id`, `kontak_id`, `grup_id`, `date`, `status_grup`) VALUES
(227, 163, 27, '2021-12-13 10:56:04', '1'),
(228, 164, 28, '2021-12-16 18:31:54', '1'),
(230, 166, 28, '2021-12-21 14:30:06', '1'),
(231, 165, 28, '2021-12-21 14:42:59', '1'),
(232, 167, 28, '2021-12-21 14:43:30', '1');

=======
>>>>>>> b778027af5504d6ffe4fb8b234ed4e07bbbe4a07
-- --------------------------------------------------------

--
-- Struktur dari tabel `kampanyes`
--

CREATE TABLE `kampanyes` (
  `id` int(2) NOT NULL,
<<<<<<< HEAD
  `judul` varchar(255) DEFAULT NULL,
=======
>>>>>>> b778027af5504d6ffe4fb8b234ed4e07bbbe4a07
  `grup_id` int(11) NOT NULL,
  `pesan` text NOT NULL,
  `tipe` varchar(255) NOT NULL,
  `nilai` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

<<<<<<< HEAD
--
-- Dumping data untuk tabel `kampanyes`
--

INSERT INTO `kampanyes` (`id`, `judul`, `grup_id`, `pesan`, `tipe`, `nilai`, `createdAt`) VALUES
(263, 'test', 27, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *honey*, Anda dapat berhenti kapan saja dengan mengetikkan *stop#h1*.                                   ', 'minutes', '2', '2021-12-21 13:18:30'),
(266, 'test', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.  ', 'broadcast', '0', '2021-12-21 13:45:00'),
(267, 'lsdkgl;dfkgj', 27, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 13:49:57'),
(268, 'test', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 13:53:29'),
(269, 'asd', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 13:54:18'),
(270, 'tes', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 13:55:02'),
(271, 'asda', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 13:57:41'),
(272, 'asd', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 13:58:46'),
(273, 'test', 27, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.  ', 'broadcast', '0', '2021-12-21 14:01:08'),
(274, 'resrsrsr', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 14:02:40'),
(275, 'asdas', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 14:03:36'),
(276, 'test', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 14:05:13'),
(277, 'sgd', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 14:05:32'),
(278, 'asd', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 14:06:01'),
(279, 'lkasdjfk', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 14:07:48'),
(280, '2,3,4,5,6', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 14:09:46'),
(281, 'test', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 14:10:22'),
(282, 'test', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 14:13:01'),
(283, '', 28, '@sapaan @nama\r\n \r\ntest spin time\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 14:30:30'),
(284, 'test ', 28, '@sapaan @nama\r\n \r\ntest spin\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 14:32:26'),
(285, 'test', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 14:37:30'),
(286, 'test 123', 28, '@sapaan @nama\r\n \r\ntest 123\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 14:41:32'),
(287, 'test', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 14:47:15'),
(288, 'dsdsdsdsd', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 14:49:24'),
(289, 'kjhkjh', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 14:50:58'),
(290, 'kjhkj', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 14:51:54'),
(291, 'test 123', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 14:54:47'),
(292, 'lkjlkj', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 14:55:44'),
(293, 'lkjlkj', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 14:57:04'),
(294, 'lkjlkj', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 14:58:56'),
(295, 'oioiuoiu', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 15:00:06'),
(296, 'test', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 15:02:52'),
(297, 'test', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 15:03:41'),
(298, 'basis data', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 15:08:20'),
(299, 'wewer', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 15:10:03'),
(300, 'test', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 15:16:24'),
(301, 'test', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 15:17:53'),
(302, 'egsgsg', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 15:19:23'),
(303, 'test', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 15:20:54'),
(304, 'test 123', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 18:04:09'),
(305, 'lkjlkj', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 18:05:29'),
(306, 'asdasd', 28, '[halo,hai,test]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 18:06:20'),
(307, 'jlkjlkj', 28, '[halo,hai,test]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 18:08:46'),
(308, 'test 123', 28, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 18:10:32'),
(309, 'test ', 28, '\r\n[halo,hai,test]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 18:11:03'),
(310, 'test 123', 28, '[halo,hai,test]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.', 'broadcast', '0', '2021-12-21 18:12:35');

=======
>>>>>>> b778027af5504d6ffe4fb8b234ed4e07bbbe4a07
-- --------------------------------------------------------

--
-- Struktur dari tabel `kampanyes_detail`
--

CREATE TABLE `kampanyes_detail` (
  `id` int(11) NOT NULL,
  `kontak_id` int(11) NOT NULL,
  `campaign_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `kampanyes_detail`
--

INSERT INTO `kampanyes_detail` (`id`, `kontak_id`, `campaign_id`) VALUES
(328, 145, 214),
(329, 147, 214),
(330, 145, 213),
(331, 145, 218),
<<<<<<< HEAD
(332, 145, 217),
(347, 162, 240),
(348, 162, 241),
(349, 163, 244),
(350, 163, 243),
(351, 163, 247),
(352, 163, 245),
(353, 163, 263);
=======
(332, 145, 217);
>>>>>>> b778027af5504d6ffe4fb8b234ed4e07bbbe4a07

-- --------------------------------------------------------

--
-- Struktur dari tabel `kontaks`
--

CREATE TABLE `kontaks` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `nomor` varchar(255) NOT NULL,
  `date` datetime DEFAULT NULL,
  `sapaan` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

<<<<<<< HEAD
--
-- Dumping data untuk tabel `kontaks`
--

INSERT INTO `kontaks` (`id`, `nama`, `alamat`, `status`, `nomor`, `date`, `sapaan`) VALUES
(163, 'sayang', 'kendal', 1, '6289636930959', '2021-12-13 10:56:04', 'Kak'),
(164, 'imron', 'kendal', 1, '6285882843337', '2021-12-16 18:31:54', 'Pak'),
(165, 'husein', 'pati', 1, '6282154926482', '2021-12-21 14:29:41', 'Kak'),
(166, 'asrofi', 'getas', 1, '6281311661479', '2021-12-21 14:30:05', 'Pak'),
(167, 'la', 'kendal', 1, '6288216692275', '2021-12-21 14:43:30', 'Pak');

=======
>>>>>>> b778027af5504d6ffe4fb8b234ed4e07bbbe4a07
-- --------------------------------------------------------

--
-- Struktur dari tabel `owner`
--

CREATE TABLE `owner` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `nomor` varchar(255) NOT NULL,
  `status` varchar(1) DEFAULT NULL,
  `subscribe` varchar(255) DEFAULT NULL,
  `unsubscribe` varchar(255) DEFAULT NULL,
  `session` text DEFAULT NULL,
  `api_key` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `domain` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `product_code` varchar(255) NOT NULL,
  `lisensi` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

<<<<<<< HEAD
--
-- Dumping data untuk tabel `owner`
--

INSERT INTO `owner` (`id`, `nama`, `nomor`, `status`, `subscribe`, `unsubscribe`, `session`, `api_key`, `password`, `domain`, `username`, `product_code`, `lisensi`) VALUES
(3, 'Muhamad Imron', '6285882843337@s.whatsapp.net', '1', 'daftar', 'stop', '{\n	\"clientID\": \"JFEZlBLUftYCZHCTPGO+1A==\",\n	\"serverToken\": \"1@qMev7Pv19WxHW5VKP+hQ2OdLejbnOHa1rEUMtPxaxm4eYf23u/+5GiujerphdyE9z8kZSqwl5cQf6g==\",\n	\"clientToken\": \"U9NmNrzsw0kz81pK98AaYfaUTsEVpqSwk8VOCAnzNQw=\",\n	\"encKey\": \"aVRgzVwtcyK7lHBAdoJEHLcw3wIz6wAgEzQW3nJYrkM=\",\n	\"macKey\": \"rmPKng5dObpO3mxgBScxyDyCI/9pFXsP6nS2cxf1jzA=\"\n}', '6GPZQQ1-TN5MQCA-PT4GE98-12K12HT', 'imron123', 'http://localhost:5000', 'imron', '0002', '8OM9HRvTfKIuhqs');

=======
>>>>>>> b778027af5504d6ffe4fb8b234ed4e07bbbe4a07
-- --------------------------------------------------------

--
-- Struktur dari tabel `setting_grups`
--

CREATE TABLE `setting_grups` (
  `id` int(11) NOT NULL,
  `grup_id` int(11) NOT NULL,
  `grup_out_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `grups`
--
ALTER TABLE `grups`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `grup_details`
--
ALTER TABLE `grup_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `grup_details_fk0` (`kontak_id`),
  ADD KEY `grup_details_fk1` (`grup_id`);

--
-- Indeks untuk tabel `kampanyes`
--
ALTER TABLE `kampanyes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kampanyes_fk0` (`grup_id`);

--
-- Indeks untuk tabel `kampanyes_detail`
--
ALTER TABLE `kampanyes_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `kontaks`
--
ALTER TABLE `kontaks`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `owner`
--
ALTER TABLE `owner`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `setting_grups`
--
ALTER TABLE `setting_grups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `setting_grups_fk0` (`grup_id`),
  ADD KEY `setting_grups_fk1` (`grup_out_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `grups`
--
ALTER TABLE `grups`
<<<<<<< HEAD
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
=======
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
>>>>>>> b778027af5504d6ffe4fb8b234ed4e07bbbe4a07

--
-- AUTO_INCREMENT untuk tabel `grup_details`
--
ALTER TABLE `grup_details`
<<<<<<< HEAD
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=233;
=======
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=222;
>>>>>>> b778027af5504d6ffe4fb8b234ed4e07bbbe4a07

--
-- AUTO_INCREMENT untuk tabel `kampanyes`
--
ALTER TABLE `kampanyes`
<<<<<<< HEAD
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=311;
=======
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=230;
>>>>>>> b778027af5504d6ffe4fb8b234ed4e07bbbe4a07

--
-- AUTO_INCREMENT untuk tabel `kampanyes_detail`
--
ALTER TABLE `kampanyes_detail`
<<<<<<< HEAD
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=354;
=======
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=347;
>>>>>>> b778027af5504d6ffe4fb8b234ed4e07bbbe4a07

--
-- AUTO_INCREMENT untuk tabel `kontaks`
--
ALTER TABLE `kontaks`
<<<<<<< HEAD
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=168;
=======
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=160;
>>>>>>> b778027af5504d6ffe4fb8b234ed4e07bbbe4a07

--
-- AUTO_INCREMENT untuk tabel `owner`
--
ALTER TABLE `owner`
<<<<<<< HEAD
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
=======
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
>>>>>>> b778027af5504d6ffe4fb8b234ed4e07bbbe4a07

--
-- AUTO_INCREMENT untuk tabel `setting_grups`
--
ALTER TABLE `setting_grups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `grup_details`
--
ALTER TABLE `grup_details`
  ADD CONSTRAINT `grup_details_fk0` FOREIGN KEY (`kontak_id`) REFERENCES `kontaks` (`id`),
  ADD CONSTRAINT `grup_details_fk1` FOREIGN KEY (`grup_id`) REFERENCES `grups` (`id`);

--
-- Ketidakleluasaan untuk tabel `kampanyes`
--
ALTER TABLE `kampanyes`
  ADD CONSTRAINT `kampanyes_fk0` FOREIGN KEY (`grup_id`) REFERENCES `grups` (`id`);

--
-- Ketidakleluasaan untuk tabel `setting_grups`
--
ALTER TABLE `setting_grups`
  ADD CONSTRAINT `setting_grups_fk0` FOREIGN KEY (`grup_id`) REFERENCES `grups` (`id`),
  ADD CONSTRAINT `setting_grups_fk1` FOREIGN KEY (`grup_out_id`) REFERENCES `grups` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
