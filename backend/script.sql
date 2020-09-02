create mydb;
use mydb;


create table tb_lista_negra (
	id_lista_negra		int primary key auto_increment,
    nm_pessoa			varchar(100),
    ds_motivo			varchar(200),
    dt_inclusao			datetime
);

alter table tb_lista_negra 
	    add ds_local varchar(100);

alter table tb_lista_negra 
	    add ds_foto varchar(100) default 'user.png';


select * from tb_lista_negra;

-- ##################################################################################

create table tb_lista_fofa (
	id_lista_fofa			int primary key auto_increment,
    nm_fofura				varchar(100) not null,
    ds_porque				varchar(200) not null,
    bt_colocaria_potinho	bool,
    dt_niver				date not null
);

insert into tb_lista_fofa (nm_fofura, ds_porque, bt_colocaria_potinho, dt_niver)
					values ('Bruno', 'Muito lindo lindo', true, '1989-10-22');

select * from tb_lista_fofa;


-- ##################################################################################


create table tb_memelation (
	id_memelation			int primary key auto_increment,
    nm_autor				varchar(100) not null,
    ds_categoria			varchar(50)  not null,
    ds_hashtags				varchar(200) not null,
    bt_maior				bool 		 not null,
    img_meme				varchar(100) not null,
    dt_inclusao				datetime     not null
);


-- ##################################################################################



create table tb_login (
	id_login			int primary key auto_increment,
    ds_login			varchar(100),
    ds_senha			varchar(200),
    dt_inclusao			datetime
);




