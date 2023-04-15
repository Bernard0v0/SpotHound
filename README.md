# SpotHound
mysql database build up

create database if not exists SpotHound;
use spothound;
create table if not exists User(
user_id int not null auto_increment primary key,
user_name varchar(255) not null,
password varchar(255) not null,
email varchar(255) not null
);
create table if not exists parkingSpot(
spot_id int not null auto_increment primary key,
user_id int not null,
address varchar(255) not null,
latitude float not null,
longitude float not null,
image_url varchar(255),
description varchar(255),
spot_type enum('Light','Normal','Large') not null default 'Normal',
created_time DATETIME not null,
last_updated_time DATETIME not null,
is_verified bool not null default false,
foreign key(user_id) references User(user_id)
on delete cascade);
create table if not exists bookingLessor(
reference_id int not null auto_increment primary key,
spot_id int not null,
user_id int not null, #lessor's id
start_time DATETIME not null,
end_time DATETIME not null,
total_price float not null,
created_time DATETIME not null,
foreign key(spot_id) references parkingSpot(spot_id),
foreign key(user_id) references User(user_id)
);
create table if not exists bookingLease(
reference_id int not null auto_increment primary key,
spot_id int not null,
user_id int not null, #lease's id
start_time DATETIME not null,
end_time DATETIME not null,
total_price float not null,
created_time DATETIME not null,
foreign key(spot_id) references parkingSpot(spot_id),
foreign key(user_id) references User(user_id)
);
create table if not exists timeslot(
time_slot_id int not null auto_increment primary key,
spot_id int not null,
start_time DATETIME not null,
end_time DATETIME not null,
total_price float not null,
foreign key(spot_id) references parkingSpot(spot_id)
);
create unique index user_id on bookingLease(user_id);
create unique index user_id on bookingLessor(user_id);
create unique index spot_id on timeslot(spot_id);
create unique index time_slot_id on timeslot(time_slot_id);
