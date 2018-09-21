# Derived from official mysql image (our base image)
FROM mariadb
# Add a database
COPY ./sql-scripts/ /docker-entrypoint-initdb.d/
