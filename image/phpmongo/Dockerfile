FROM php:7.0-fpm

RUN apt-get update && apt-get install -y zip unzip git libmcrypt-dev  
RUN apt-get install -y autoconf pkg-config libssl-dev
RUN pecl install mongodb-1.2.2
RUN docker-php-ext-install bcmath
RUN echo "extension=mongodb.so" > /usr/local/etc/php/conf.d/mongodb.ini
RUN docker-php-ext-install mcrypt

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN chown -R www-data:www-data /var/www
RUN chmod 755 /var/www
WORKDIR /var/www
