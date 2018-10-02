FROM php:7.0-fpm

RUN apt-get update && apt-get install -y zip unzip git libmcrypt-dev mysql-client 
RUN docker-php-ext-install mcrypt pdo pdo_mysql

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www
RUN chown -R www-data:www-data /var/www
RUN chmod 755 /var/www
