create table user
(
user_id   int auto_increment
primary key,
user_name varchar(255) not null,
password  varchar(255) not null,
email     varchar(255) not null
);

create table parkingspot
(
spot_id           int auto_increment
primary key,
user_id           int                                                not null,
address           varchar(255)                                       not null,
latitude          float(13, 5)                                       null,
longitude         float(13, 5)                                       null,
image_url         varchar(255)                                       null,
description       varchar(255)                                       null,
spot_type         enum ('Light', 'Normal', 'Large') default 'Normal' not null,
created_time      datetime                                           not null,
last_updated_time datetime                                           not null,
is_verified       tinyint(1)                        default 0        not null,
is_valid          tinyint(1)                        default 0        not null,
constraint parkingspot_ibfk_1
foreign key (user_id) references user (user_id)
on delete cascade
);

create table booking
(
reference_id int auto_increment
primary key,
spot_id      int          not null,
spot_address varchar(255) not null,
lessor_id    int          not null,
lease_id     int          not null,
start_time   datetime     not null,
end_time     datetime     not null,
total_price  float(15, 2) null,
created_time datetime     not null,
constraint booking_ibfk_1
foreign key (spot_id) references parkingspot (spot_id)
);

create index spot_id
on booking (spot_id);

create index user_id
on parkingspot (user_id);

create table timeslot
(
time_slot_id      int auto_increment
primary key,
spot_id           int         not null,
start_time        datetime    not null,
end_time          datetime    not null,
price_per_quarter float(5, 2) null,
constraint timeslot_parkingspot_spot_id_fk
foreign key (spot_id) references parkingspot (spot_id)
);

