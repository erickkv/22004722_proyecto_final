

create table usuarios (
	id int primary key not null auto_increment,
	nombre varchar(30) not null unique,
    pass varchar(60) not null
);

create table productos (
	cod varchar(20) not null primary key,
    nombre varchar(40),
    descripcion varchar(60),
    cod_cat varchar(20),
    foreign key (cod_cat) references categorias(cod),
    existencias int
);

create table categorias (
	cod varchar(20) not null primary key,
    nombre_categoria varchar(30)
);

create table proveedores (
	id int not null primary key auto_increment,
    nombre varchar(40)
);

create table provs_prods (
	id int not null primary key auto_increment,
    cod_prod varchar(20),
    foreign key (cod_prod) references productos (cod),
    id_prov int,
    foreign key (id_prov) references proveedores (id)
);

insert into categorias values
	("hig", "higiene"),
	("hog", "articulos para el hogar"),
	("bebs", "bebidas"),
	("carn", "carnes"),
	("vers", "verduras, vegetales y frutas"),
    ("limp", "articulos de limpieza");
    
insert into productos values
	("carn-pol-pech-01", "pechuga pio rey", "pechuga de pollo libra", "carn", 10),
    ("carn-res-lom-01", "lomito", "lomito de res, libra", "carn",  10),
    ("pap-hig-01", "papel higienico scotch", "papel higienico scotch unidad", "hig", 10),
    ("hog-lamp-01", "lampara ovalada", "lampara ovalada 60cms kit", "hog", 5),
    ("bebs-col-loc-355-la", "cola-loca 355ml lata", "gaseosa cola-loca 355ml lata", "bebs", 50),
    ("bebs-pepno-355-la", "pepno 355ml lata", "gaseosa pepno 355ml lata", "bebs", 20),
    ("det-liq-001", "detergente liquido durotel", "detergente liquido 200ml durotel botella", "limp", 10),
    ("lech-oz", "lechuga", "lechuga (onzas)", "vers", 10);
    
insert into proveedores values 
	(null, "pio-rey"),
    (null, "multicarnes"),
    (null, "vacacortes"),
    (null, "michael scotch"),
    (null, "lamparas aladin"),
    (null, "cola-loca guatemala"),
    (null, "amber"),
    (null, "limpiolin"),
    (null, "la troca");

insert into provs_prods values
	(null, "carn-pol-pech-01", 1),
    (null, "carn-res-lom-01", 3),
    (null, "pap-hig-01", 4),
    (null, "hog-lamp-01", 5),
    (null, "bebs-col-loc-355-la", 6),
    (null, "bebs-pepno-355-la", 7),
    (null, "det-liq-001", 8),
    (null, "lech-oz", 9);
    
insert into proveedores values
	(null, "vendedores-de-pepno-2");
    
insert into provs_prods values
	(null, "bebs-pepno-355-la", 10)
    
