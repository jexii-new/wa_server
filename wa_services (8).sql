-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 06 Des 2021 pada 14.01
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
(25, 'vip', 'lklj', 'test');

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

--
-- Dumping data untuk tabel `grup_details`
--

INSERT INTO `grup_details` (`id`, `kontak_id`, `grup_id`, `date`, `status_grup`) VALUES
(219, 157, 25, '2021-12-06 17:49:43', '1');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kampanyes`
--

CREATE TABLE `kampanyes` (
  `id` int(2) NOT NULL,
  `grup_id` int(11) NOT NULL,
  `pesan` text NOT NULL,
  `tipe` varchar(255) NOT NULL,
  `nilai` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `kampanyes`
--

INSERT INTO `kampanyes` (`id`, `grup_id`, `pesan`, `tipe`, `nilai`, `createdAt`) VALUES
(229, 25, '@sapaan @nama\r\n \r\n[PESAN ANDA DI SINI]\r\n----------\r\n \r\nAnda menerima pesan ini karena telah terdaftar di *@grup*, Anda dapat berhenti kapan saja dengan mengetikkan *@unsubscribe#@code*.  ', 'broadcast', '0', '2021-12-06 16:01:00');

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
(332, 145, 217);

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

--
-- Dumping data untuk tabel `kontaks`
--

INSERT INTO `kontaks` (`id`, `nama`, `alamat`, `status`, `nomor`, `date`, `sapaan`) VALUES
(157, 'imron', 'kendal', 1, '6285882843337', '2021-12-06 17:49:43', 'Pak');

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

--
-- Dumping data untuk tabel `owner`
--

INSERT INTO `owner` (`id`, `nama`, `nomor`, `status`, `subscribe`, `unsubscribe`, `session`, `api_key`, `password`, `domain`, `username`, `product_code`, `lisensi`) VALUES
(713, NULL, '6285882843337@whatsapp.net', NULL, 'daftar', 'stop', NULL, NULL, '$2b$10$JQTCc28W5gh/lA1/k3LQJ.Hpp/RkkonLsuxLjPldo3bLqQ0lRMLay', 'http://localhost:5000', 'imron', '0002', 'vzTIlEl57TgXuin');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT untuk tabel `grup_details`
--
ALTER TABLE `grup_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=220;

--
-- AUTO_INCREMENT untuk tabel `kampanyes`
--
ALTER TABLE `kampanyes`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=230;

--
-- AUTO_INCREMENT untuk tabel `kampanyes_detail`
--
ALTER TABLE `kampanyes_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=347;

--
-- AUTO_INCREMENT untuk tabel `kontaks`
--
ALTER TABLE `kontaks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=158;

--
-- AUTO_INCREMENT untuk tabel `owner`
--
ALTER TABLE `owner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=714;

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
