USE `file_sharing_application_bd`;

CREATE TABLE `file` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `path` VARCHAR(255) NOT NULL,
  `size` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `path` (`path` ASC));

CREATE TABLE `user` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `username` VARCHAR(25) NOT NULL,
  `password` CHAR(60) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username` (`username` ASC));

CREATE TABLE `file_permission` (
  `user_id` BIGINT UNSIGNED NOT NULL,
  `file_id` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `file_id`),
  INDEX `fk_file_permission_file1_idx` (`file_id` ASC),
  CONSTRAINT `fk_file_permission_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `file_sharing_application_bd`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_file_permission_file1`
    FOREIGN KEY (`file_id`)
    REFERENCES `file_sharing_application_bd`.`file` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

CREATE TABLE `file_owner` (
  `file_id` BIGINT UNSIGNED NOT NULL,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`file_id`, `user_id`),
  INDEX `fk_file_owner_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_file_owner_file1`
    FOREIGN KEY (`file_id`)
    REFERENCES `file_sharing_application_bd`.`file` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_file_owner_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `file_sharing_application_bd`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
