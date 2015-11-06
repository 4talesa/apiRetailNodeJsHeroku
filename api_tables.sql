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

create table product (_id integer, id text, name text, pictureUrl text, detail text, postDate timestamp with time zone, putDate timestamp with time zone, deleteDate timestamp with time zone);

CREATE SEQUENCE product_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;

ALTER TABLE product ALTER COLUMN _id SET DEFAULT NEXTVAL('product_id_seq');

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

create table token (_id integer, idUser text, expireDate timestamp with time zone);

CREATE SEQUENCE token_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;

ALTER TABLE token ALTER COLUMN _id SET DEFAULT NEXTVAL('token_id_seq');

select now(), coalesce(null,now()), current_timestamp + (20 ||' minutes')::interval;

delete from token;
select * from token;
insert into token (idUser, expireDate) values (1,current_timestamp + (2 ||' minutes')::interval) RETURNING _id, idUser, expireDate

ALTER TABLE api_user ADD postDate timestamp with time zone;ALTER TABLE api_user  ADD putDate timestamp with time zone;ALTER TABLE api_user  ADD deleteDate timestamp with time zone;
ALTER TABLE store ADD postDate timestamp with time zone;ALTER TABLE store  ADD putDate timestamp with time zone;ALTER TABLE store  ADD deleteDate timestamp with time zone;
ALTER TABLE product ADD postDate timestamp with time zone;ALTER TABLE product  ADD putDate timestamp with time zone;ALTER TABLE product  ADD deleteDate timestamp with time zone;
ALTER TABLE productStore ADD postDate timestamp with time zone;ALTER TABLE productStore  ADD putDate timestamp with time zone;ALTER TABLE productStore  ADD deleteDate timestamp with time zone;
ALTER TABLE category ADD postDate timestamp with time zone;ALTER TABLE category  ADD putDate timestamp with time zone;ALTER TABLE category  ADD deleteDate timestamp with time zone;
ALTER TABLE productCategory ADD postDate timestamp with time zone;ALTER TABLE productCategory  ADD putDate timestamp with time zone;ALTER TABLE productCategory  ADD deleteDate timestamp with time zone;
ALTER TABLE purchase ADD postDate timestamp with time zone;ALTER TABLE purchase  ADD putDate timestamp with time zone;ALTER TABLE purchase  ADD deleteDate timestamp with time zone;
ALTER TABLE purchaseItem ADD postDate timestamp with time zone;ALTER TABLE purchaseItem  ADD putDate timestamp with time zone;ALTER TABLE purchaseItem  ADD deleteDate timestamp with time zone;
ALTER TABLE paymentMethod ADD postDate timestamp with time zone;ALTER TABLE paymentMethod  ADD putDate timestamp with time zone;ALTER TABLE paymentMethod  ADD deleteDate timestamp with time zone;
ALTER TABLE shoppingCart ADD postDate timestamp with time zone;ALTER TABLE shoppingCart  ADD putDate timestamp with time zone;ALTER TABLE shoppingCart  ADD deleteDate timestamp with time zone;
ALTER TABLE shoppingCartItem ADD postDate timestamp with time zone;ALTER TABLE shoppingCartItem  ADD putDate timestamp with time zone;ALTER TABLE shoppingCartItem  ADD deleteDate timestamp with time zone;
ALTER TABLE api_user ADD token text;

update api_user set token = 'token'||_id;
update category set name = 'category_'||_id, pictureUrl = 'pictureUrl_'||_id, detail = 'detail_'||_id;

select * from purchase;

-- Facebook App: RetailApp
-- App ID: 989851321053452
-- App Secret: ccaf3d121fcc0e76da9c5bda605d41f5