
INSERT INTO usuario(login, senha) VALUES ('comum','$2a$10$pFGmCr1w3IzEKl2RjVqi1e7XRO2hNGtu08g9/2tpIAciro4.jd5QW');
INSERT INTO usuario(login, senha) VALUES ('admin','$2a$10$pFGmCr1w3IzEKl2RjVqi1e7XRO2hNGtu08g9/2tpIAciro4.jd5QW');

INSERT INTO perfil (perfil_enum) values ('USER');
INSERT INTO perfil (perfil_enum) values ('ADMIN');

INSERT INTO usuario_perfis values (1,1);

INSERT INTO usuario_perfis values (2,1);
INSERT INTO usuario_perfis values (2,2);