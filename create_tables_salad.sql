CREATE TABLE posts (
  uid int(11) NOT NULL,
  creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  postId int(11) NOT NULL UNIQUE AUTO_INCREMENT,
  content blob
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE users (
  `uid` int(11) NOT NULL UNIQUE AUTO_INCREMENT,
  `creationDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `forename` varchar(50) DEFAULT NULL,
  `surname` varchar(60) DEFAULT NULL,
  `email` varchar(70) NOT NULL,
  `password` char(56) DEFAULT NULL,
  `verified` tinyint(1) DEFAULT '0',
  `verification` char(56) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT '0',
  `blocked` tinyint(1) DEFAULT '0',
  `posts` VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;