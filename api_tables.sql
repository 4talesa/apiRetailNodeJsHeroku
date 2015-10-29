SET timezone = 'America/Los_Angeles';

create table api_user (_id integer, id text, name text, password text, profession text);

CREATE SEQUENCE api_user_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;

ALTER TABLE api_user ALTER COLUMN _id SET DEFAULT NEXTVAL('api_user_id_seq');

create table store (_id integer, id text, name text, pictureUrl text, address text);

CREATE SEQUENCE store_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;

ALTER TABLE store ALTER COLUMN _id SET DEFAULT NEXTVAL('store_id_seq');

create table product (_id integer, id text, name text, pictureUrl text, detail text);

CREATE SEQUENCE product_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;

ALTER TABLE product ALTER COLUMN _id SET DEFAULT NEXTVAL('product_id_seq');

create table category (_id integer, id text, name text, pictureUrl text, detail text);

CREATE SEQUENCE category_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;

ALTER TABLE category ALTER COLUMN _id SET DEFAULT NEXTVAL('category_id_seq');

create table productStore (_id integer, id text, idProduct text, idStore text);

CREATE SEQUENCE productStore_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;

ALTER TABLE productStore ALTER COLUMN _id SET DEFAULT NEXTVAL('productStore_id_seq');

create table productCategory (_id integer, id text, idProduct text, idCategory text);

CREATE SEQUENCE productCategory_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;

ALTER TABLE productStore ALTER COLUMN _id SET DEFAULT NEXTVAL('productCategory_id_seq');

create table shoppingCart (_id integer, id text, idStore text, idUser text, status text, idPaymentMethod text);

CREATE SEQUENCE shoppingCart_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;

ALTER TABLE shoppingCart ALTER COLUMN _id SET DEFAULT NEXTVAL('shoppingCart_id_seq');

create table shoppingCartItem (_id integer, id text, idShoppingCart text, idProduct text, status text, amountRequested numeric, amountPurchased numeric);

CREATE SEQUENCE shoppingCartItem_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;

ALTER TABLE shoppingCartItem ALTER COLUMN _id SET DEFAULT NEXTVAL('shoppingCartItem_id_seq');

create table purchase (_id integer, id text, idStore text, idUser text, status text, idPaymentMethod text);

CREATE SEQUENCE purchase_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;

ALTER TABLE purchase ALTER COLUMN _id SET DEFAULT NEXTVAL('purchase_id_seq');

create table purchaseItem (_id integer, id text, idpurchase text, idProduct text, status text, amountRequested numeric, amountPurchased numeric);

CREATE SEQUENCE purchaseItem_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;

ALTER TABLE purchaseItem ALTER COLUMN _id SET DEFAULT NEXTVAL('purchaseItem_id_seq');

create table paymentMethod (_id integer, id text, name text, pictureUrl text, detail text);

CREATE SEQUENCE paymentMethod_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1;

ALTER TABLE paymentMethod ALTER COLUMN _id SET DEFAULT NEXTVAL('paymentMethod_id_seq');

update category set name = 'category_'||_id, pictureUrl = 'pictureUrl_'||_id, detail = 'detail_'||_id;

select * from purchase;