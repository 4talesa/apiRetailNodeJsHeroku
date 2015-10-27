create table api_user (_id integer, id text, name text, password text, profession text);

CREATE SEQUENCE api_user_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;

ALTER TABLE api_user ALTER COLUMN _id SET DEFAULT NEXTVAL('api_user_id_seq');

insert into api_user (id, name, password, profession) values (1, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (2, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (3, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (4, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (5, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (6, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (7, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (8, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (9, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (10, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (11, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (12, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (13, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (14, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (15, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (16, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (17, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (18, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (19, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (20, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (21, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (22, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (23, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (24, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (25, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (26, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (27, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (28, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (29, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (30, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (31, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (32, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (33, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (34, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (35, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (36, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (37, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (38, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (39, 'test 1', '******', 'testing');
insert into api_user (id, name, password, profession) values (40, 'test 1', '******', 'testing');

update api_user set name = 'person '||id;

select * from api_user;