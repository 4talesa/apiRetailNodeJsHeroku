SET timezone = 'America/Los_Angeles';

create table api_user (_id integer, id text, name text, password text, profession text, postDate timestamp with time zone, putDate timestamp with time zone, deleteDate timestamp with time zone);

CREATE SEQUENCE api_user_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;

ALTER TABLE api_user ALTER COLUMN _id SET DEFAULT NEXTVAL('api_user_id_seq');

create table store (_id integer, id text, name text, pictureUrl text, address text, postDate timestamp with time zone, putDate timestamp with time zone, deleteDate timestamp with time zone);

CREATE SEQUENCE store_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;

ALTER TABLE store ALTER COLUMN _id SET DEFAULT NEXTVAL('store_id_seq');

ALTER TABLE store ADD COLUMN postalCode text;

create table product (_id integer, id text, name text, pictureUrl text, detail text, postDate timestamp with time zone, putDate timestamp with time zone, deleteDate timestamp with time zone);

CREATE SEQUENCE product_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;

ALTER TABLE product ALTER COLUMN _id SET DEFAULT NEXTVAL('product_id_seq');

ALTER TABLE product ADD COLUMN unit text;

create table category (_id integer, id text, name text, pictureUrl text, detail text, postDate timestamp with time zone, putDate timestamp with time zone, deleteDate timestamp with time zone);

CREATE SEQUENCE category_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;

ALTER TABLE category ALTER COLUMN _id SET DEFAULT NEXTVAL('category_id_seq');

create table productStore (_id integer, id text, idProduct text, idStore text, postDate timestamp with time zone, putDate timestamp with time zone, deleteDate timestamp with time zone);

CREATE SEQUENCE productStore_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;

ALTER TABLE productStore ALTER COLUMN _id SET DEFAULT NEXTVAL('productStore_id_seq');

ALTER TABLE productStore ADD COLUMN price numeric;

create table productCategory (_id integer, id text, idProduct text, idCategory text, postDate timestamp with time zone, putDate timestamp with time zone, deleteDate timestamp with time zone);

CREATE SEQUENCE productCategory_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;

ALTER TABLE productStore ALTER COLUMN _id SET DEFAULT NEXTVAL('productCategory_id_seq');

create table shoppingCart (_id integer, id text, idStore text, idUser text, status text, idPaymentMethod text, postDate timestamp with time zone, putDate timestamp with time zone, deleteDate timestamp with time zone);

CREATE SEQUENCE shoppingCart_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;

ALTER TABLE shoppingCart ALTER COLUMN _id SET DEFAULT NEXTVAL('shoppingCart_id_seq');

create table shoppingCartItem (_id integer, id text, idShoppingCart text, idProduct text, status text, amountRequested numeric, amountPurchased numeric, postDate timestamp with time zone, putDate timestamp with time zone, deleteDate timestamp with time zone);

CREATE SEQUENCE shoppingCartItem_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;

ALTER TABLE shoppingCartItem ALTER COLUMN _id SET DEFAULT NEXTVAL('shoppingCartItem_id_seq');

create table purchase (_id integer, id text, idStore text, idUser text, status text, idPaymentMethod text, postDate timestamp with time zone, putDate timestamp with time zone, deleteDate timestamp with time zone);

CREATE SEQUENCE purchase_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;

ALTER TABLE purchase ALTER COLUMN _id SET DEFAULT NEXTVAL('purchase_id_seq');

create table purchaseItem (_id integer, id text, idpurchase text, idProduct text, status text, amountRequested numeric, amountPurchased numeric, postDate timestamp with time zone, putDate timestamp with time zone, deleteDate timestamp with time zone);

CREATE SEQUENCE purchaseItem_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;

ALTER TABLE purchaseItem ALTER COLUMN _id SET DEFAULT NEXTVAL('purchaseItem_id_seq');

create table paymentMethod (_id integer, id text, name text, pictureUrl text, detail text, postDate timestamp with time zone, putDate timestamp with time zone, deleteDate timestamp with time zone);

CREATE SEQUENCE paymentMethod_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;

ALTER TABLE paymentMethod ALTER COLUMN _id SET DEFAULT NEXTVAL('paymentMethod_id_seq');

create table reward (_id integer, id text, name text, amount numeric, pictureUrl text, detail text, postDate timestamp with time zone, putDate timestamp with time zone, deleteDate timestamp with time zone);

CREATE SEQUENCE reward_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;

ALTER TABLE reward ALTER COLUMN _id SET DEFAULT NEXTVAL('reward_id_seq');

create table grantAuth (_id integer, access_token text, token_type text, state text, scope text, expires_in integer, clientID text, redirectURI text, postDate timestamp with time zone, putDate timestamp with time zone, deleteDate timestamp with time zone);

CREATE SEQUENCE grantAuth_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;

ALTER TABLE grantAuth ALTER COLUMN _id SET DEFAULT NEXTVAL('grantAuth_id_seq');

create table token (_id integer, access_token text, token_type text, state text, scope text, expires_in integer, clientID text, redirectURI text, postDate timestamp with time zone, putDate timestamp with time zone, deleteDate timestamp with time zone);

CREATE SEQUENCE token_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;

ALTER TABLE token ALTER COLUMN _id SET DEFAULT NEXTVAL('token_id_seq');

create table api_log (_id integer, originalUrl text, url text, body text, postDate timestamp with time zone, putDate timestamp with time zone, deleteDate timestamp with time zone);

CREATE SEQUENCE api_log_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;

ALTER TABLE api_log ALTER COLUMN _id SET DEFAULT NEXTVAL('api_log_id_seq');

SELECT * FROM api_log;
SELECT * FROM token where access_token = '123456' and (current_timestamp < postDate + (expires_in ||' seconds')::interval)

select now() as now, coalesce(null,now()) as now_coalesce, current_timestamp as current_time_, current_timestamp + (20 ||' seconds')::interval as current_time_less_20_sec, current_timestamp + (20 ||' minutes')::interval;

delete from token;
select * from token;
select * from grantAuth;
insert into token (access_token, token_type, state, scope, clientID, redirectURI, expires_in, postDate) values ('123456','bearer', 'active', 'retailapp',60, now())
insert into grantAuth (access_grantAuth, grantAuth_type, state, scope, expires_in, postDate) values ('123456','bearer', 'active', 'retailapp',60, now())

ALTER TABLE token add IdClient text;
ALTER TABLE token add redirectURI text;
ALTER TABLE token add idUser text;

drop table token;
drop sequence token_id_seq;
drop table grantAuth;
drop sequence grantAuth_id_seq;

update api_user set token = 'token'||_id;
update category set name = 'category_'||_id, pictureUrl = 'pictureUrl_'||_id, detail = 'detail_'||_id;

select * from purchase;


select * from productcategory;
delete from productcategory where idproduct is null;

update product set unit = 'each';