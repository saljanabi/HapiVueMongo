CREATE TABLE `users` (
    `id` int(11) NOT NULL, 
    `username` varchar(180) COLLATE utf8_unicode_ci NOT NULL, 
    `email` varchar(180) COLLATE utf8_unicode_ci NOT NULL, 
    `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
INSERT INTO `users` 
(`id`, `username`, `email`, `password`) VALUES (1, 'azertyuiop', 'azertyuiop@test.com', 'azertyuiop'), (2, 'azertyuiop', 'test@test.com', 'passworddetest');