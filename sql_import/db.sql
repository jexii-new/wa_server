-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 04 Jan 2022 pada 01.09
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
(31, 'test grup', '...', 'test123');

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

-- --------------------------------------------------------

--
-- Struktur dari tabel `kampanyes`
--

CREATE TABLE `kampanyes` (
  `id` int(2) NOT NULL,
  `judul` varchar(255) DEFAULT NULL,
  `grup_id` int(11) NOT NULL,
  `pesan` text NOT NULL,
  `lampiran` varchar(255) DEFAULT NULL,
  `tipe` varchar(255) NOT NULL,
  `nilai` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `kampanyes_detail`
--

CREATE TABLE `kampanyes_detail` (
  `id` int(11) NOT NULL,
  `kontak_id` int(11) NOT NULL,
  `campaign_id` int(11) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `message_id` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `lisensi` text NOT NULL,
  `forward` varchar(15) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT untuk tabel `grup_details`
--
ALTER TABLE `grup_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT untuk tabel `kampanyes`
--
ALTER TABLE `kampanyes`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT untuk tabel `kampanyes_detail`
--
ALTER TABLE `kampanyes_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT untuk tabel `kontaks`
--
ALTER TABLE `kontaks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `owner`
--
ALTER TABLE `owner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `setting_grups`
--
ALTER TABLE `setting_grups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
