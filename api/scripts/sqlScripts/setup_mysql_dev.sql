
-- Crea una db llamada bsale_test
-- Un usuario llamado bsale_test (en localhost)
-- bsale_test Tendra todos los privilegios en  bsale_test (solo para esa db)
-- El query manejara errores

SET GLOBAL validate_password.policy=LOW;
CREATE DATABASE IF NOT EXISTS bsale_test;
CREATE USER IF NOT EXISTS 'bsale_test'@'localhost' IDENTIFIED BY 'bsale_test';
GRANT ALL PRIVILEGES ON bsale_test.* TO 'bsale_test'@'localhost';
FLUSH PRIVILEGES;