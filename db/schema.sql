DROP TABLE IF EXISTS products;

CREATE TABLE IF NOT EXISTS products (
  id serial not null,
  name varchar(50) not null,
  stocks int not null
);

DROP TABLE IF EXISTS history;

CREATE TABLE IF NOT EXISTS history (
  id serial not null,
  invoice varchar(100) not null,
  company varchar(100) not null,
  phone varchar(100) not null,
  address text not null,
  email varchar(100) not null,
  createAt date,
  total int not null
);

DROP TABLE IF EXISTS selldetails;

CREATE TABLE IF NOT EXISTS selldetails(
  id serial not null,
  history_id int not null,
  name varchar(50) not null,
  count int not null,
  price numeric not null,
  total numeric not null
);

-- psql -U yuchen -d neway -a -f db/schema.sql