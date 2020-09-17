create database MiBOT;

grant all privileges on MiBOT.* to 'MiBOT'@'%' identified by 'PabloListe1';

create table users
(
    code   int unsigned auto_increment
        primary key,
    name   varchar(250) not null,
    tag    varchar(250) not null,
    userID varchar(250) not null,
    time   datetime     not null
);

create table commands
(
    code       int unsigned auto_increment
        primary key,
    command    varchar(250) not null,
    authorCode int unsigned not null,
    channel    varchar(250) not null,
    server     varchar(250) not null,
    time       datetime     not null,
    constraint authorCode
        foreign key (authorCode) references users (code)
            on update cascade on delete cascade
);

