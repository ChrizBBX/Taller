--DROP DATABASE Taller
CREATE DATABASE Taller
GO
USE Taller
GO

CREATE SCHEMA acce
GO
CREATE SCHEMA tllr
GO
CREATE SCHEMA gral
GO
--************CREACION TABLA ROLES******************--
CREATE TABLE acce.tbRoles(
	role_ID					INT IDENTITY,
	role_Nombre				NVARCHAR(100) NOT NULL,
	role_UserCreacion		INT NOT NULL,
	role_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_role_FechaCreacion DEFAULT(GETDATE()),
	role_UserModificacion	INT,
	role_FechaModificacion	DATETIME,
	role_Estado				BIT NOT NULL CONSTRAINT DF_role_Estado DEFAULT(1)
	CONSTRAINT PK_acce_tbRoles_role_ID PRIMARY KEY(role_ID)
);

GO

--***********CREACION TABLA PANTALLAS*****************---
CREATE TABLE acce.tbPantallas(
	pant_ID					INT IDENTITY,
	pant_Nombre				NVARCHAR(100) NOT NULL,
	pant_Url				NVARCHAR(300) NOT NULL,
	pant_Menu				NVARCHAR(300) NOT NULL,
	pant_HtmlID				NVARCHAR(80) NOT NULL,
	pant_UserCreacion		INT NOT NULL,
	pant_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_pant_FechaCreacion DEFAULT(GETDATE()),
	pant_UserModificacion	INT,
	pant_FechaModificacion	DATETIME,
	pant_Estado				BIT NOT NULL CONSTRAINT DF_pant_Estado DEFAULT(1)
	CONSTRAINT PK_acce_tbPantallas_pant_ID PRIMARY KEY(pant_ID)
);
GO

--***********CREACION TABLA ROLES/PANTALLA*****************---
CREATE TABLE acce.tbPantallasPorRoles(
	pantrole_ID					INT IDENTITY,
	role_ID						INT NOT NULL,
	pant_ID						INT NOT NULL,
	pantrole_UserCreacion		INT NOT NULL,
	pantrole_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_pantrole_FechaCreacion DEFAULT(GETDATE()),
	pantrole_UserModificacion	INT,
	pantrole_FechaModificacion	DATETIME,
	pantrole_Estado				BIT NOT NULL CONSTRAINT DF_pantrole_Estado DEFAULT(1)
	CONSTRAINT FK_acce_tbPantallasPorRoles_acce_tbRoles_role_ID FOREIGN KEY(role_ID) REFERENCES acce.tbRoles(role_ID),
	CONSTRAINT FK_acce_tbPantallasPorRoles_acce_tbPantallas_pant_ID FOREIGN KEY(pant_ID)	REFERENCES acce.tbPantallas(pant_ID),
	CONSTRAINT PK_acce_tbPantallasPorRoles_pantrole_ID PRIMARY KEY(pantrole_ID),
);
GO

--****************CREACION TABLA USUARIOS****************--
CREATE TABLE acce.tbUsuarios(
	user_ID 				INT IDENTITY(1,1),
	user_NombreUsuario		NVARCHAR(100) NOT NULL,
	user_Contrasena			NVARCHAR(MAX) NOT NULL,
	user_EsAdmin			BIT,
	role_ID					INT,
	empe_ID					INT,
	user_UserCreacion		INT,
	user_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_user_FechaCreacion DEFAULT(GETDATE()),
	user_UserModificacion	INT,
	user_FechaModificacion	DATETIME,
	user_Estado				BIT NOT NULL CONSTRAINT DF_user_Estado DEFAULT(1)
	CONSTRAINT PK_acce_tbUsuarios_user_ID  PRIMARY KEY(user_ID),
);

--********* PROCEDIMIENTO INSERTAR USUARIOS ADMIN**************--
GO
CREATE OR ALTER PROCEDURE acce.UDP_InsertUsuario
	@user_NombreUsuario NVARCHAR(100),	@user_Contrasena NVARCHAR(200),
	@user_EsAdmin BIT,					@role_ID INT, 
	@empe_ID INT										
AS
BEGIN
	DECLARE @password NVARCHAR(MAX)=(SELECT HASHBYTES('Sha2_512', @user_Contrasena));

	INSERT acce.tbUsuarios(user_NombreUsuario, user_Contrasena, user_EsAdmin, role_ID, empe_ID, user_UserCreacion)
	VALUES(@user_NombreUsuario, @password, @user_EsAdmin, @role_ID, @empe_ID, 1);
END;


GO
EXEC acce.UDP_InsertUsuario 'admin', '123', 1, NULL, 1;

--********* AGREGAR CAMPOS AUDITORIA**************--
GO
ALTER TABLE acce.tbRoles
ADD CONSTRAINT FK_acce_tbRoles_acce_tbUsuarios_role_UserCreacion_user_ID 	FOREIGN KEY(role_UserCreacion) REFERENCES acce.tbUsuarios(user_ID),
	CONSTRAINT FK_acce_tbRoles_acce_tbUsuarios_role_UserModificacion_user_ID 	FOREIGN KEY(role_UserModificacion) REFERENCES acce.tbUsuarios(user_ID);

	GO
INSERT INTO acce.tbRoles(role_Nombre, role_UserCreacion)
VALUES ('Mecanico', 1)


--********* AGREGAR CAMPO ROL, AUDITORIA**************--
GO
ALTER TABLE [acce].[tbUsuarios]
ADD CONSTRAINT FK_acce_tbUsuarios_acce_tbUsuarios_user_UserCreacion_user_ID  FOREIGN KEY(user_UserCreacion) REFERENCES acce.tbUsuarios([user_ID]),
	CONSTRAINT FK_acce_tbUsuarios_acce_tbUsuarios_user_UserModificacion_user_ID  FOREIGN KEY(user_UserModificacion) REFERENCES acce.tbUsuarios([user_ID]),
	CONSTRAINT FK_acce_tbUsuarios_acce_tbRoles_role_ID FOREIGN KEY(role_ID) REFERENCES acce.tbRoles(role_ID)

GO 
ALTER TABLE [acce].[tbPantallasPorRoles]
ADD CONSTRAINT FK_acce_tbPantallasPorRoles_acce_tbUsuarios_pantrole_UserCreacion_user_ID FOREIGN KEY([pantrole_UserCreacion]) REFERENCES acce.tbUsuarios([user_ID]),
	CONSTRAINT FK_acce_tbPantallasPorRoles_acce_tbUsuarios_pantrole_UserModificacion_user_ID FOREIGN KEY([pantrole_UserModificacion]) REFERENCES acce.tbUsuarios([user_ID])


--********TABLA DEPARTAMENTO****************---
GO
CREATE TABLE [gral].[tbDepartamentos](
	depa_ID  					CHAR(2) NOT NULL,
	depa_Nombre 				NVARCHAR(100) NOT NULL,
	depa_UserCreacion			INT NOT NULL,
	depa_FechaCreacion			DATETIME NOT NULL CONSTRAINT DF_depa_FechaCreacion DEFAULT(GETDATE()),
	depa_UserModificacion		INT,
	depa_FechaModificacion		DATETIME,
	depa_Estado					BIT NOT NULL CONSTRAINT DF_depa_Estado DEFAULT(1)
	CONSTRAINT PK_gral_tbDepartamentos_depa_ID 									PRIMARY KEY(depa_ID),
	CONSTRAINT FK_gral_tbDepartamentos_acce_tbUsuarios_depa_UserCreacion_user_ID  		FOREIGN KEY(depa_UserCreacion) 		REFERENCES acce.tbUsuarios(user_ID),
	CONSTRAINT FK_gral_tbDepartamentos_acce_tbUsuarios_depa_UserModificacion_user_ID  	FOREIGN KEY(depa_UserModificacion) 	REFERENCES acce.tbUsuarios(user_ID)
);


--********TABLA MUNICIPIO****************---
GO
CREATE TABLE gral.tbMunicipios(
	muni_ID					CHAR(4)	NOT NULL,
	muni_Nombre				NVARCHAR(80) NOT NULL,
	depa_ID					CHAR(2)	NOT NULL,
	muni_UserCreacion		INT	NOT NULL,
	muni_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_muni_FechaCreacion DEFAULT(GETDATE()),
	muni_UserModificacion	INT,
	muni_FechaModificacion	DATETIME,
	muni_Estado				BIT	NOT NULL CONSTRAINT DF_muni_Estado DEFAULT(1)
	CONSTRAINT PK_gral_tbMunicipios_muni_ID 										PRIMARY KEY(muni_ID),
	CONSTRAINT FK_gral_tbMunicipios_gral_tbDepartamentos_depa_ID 						FOREIGN KEY (depa_ID) 						REFERENCES gral.tbDepartamentos(depa_ID),
	CONSTRAINT FK_gral_tbMunicipios_acce_tbUsuarios_muni_UserCreacion_user_ID  		FOREIGN KEY(muni_UserCreacion) 				REFERENCES acce.tbUsuarios(user_ID),
	CONSTRAINT FK_gral_tbMunicipios_acce_tbUsuarios_muni_UserModificacion_user_ID  	FOREIGN KEY(muni_UserModificacion) 			REFERENCES acce.tbUsuarios(user_ID)
);

CREATE TABLE gral.tbMetodosPago
(
	meto_ID					INT IDENTITY,
	meto_Nombre				NVARCHAR(100)NOT NULL,
	meto_UserCreacion		INT NOT NULL,
	meto_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_meto_FechaCreacion DEFAULT(GETDATE()),
	meto_UserModificacion	INT,
	meto_FechaModificacion	DATETIME,
	meto_Estado				BIT NOT NULL CONSTRAINT DF_meto_Estado DEFAULT(1)
	CONSTRAINT PK_tllr_tbMetodosPago_meto_ID 													PRIMARY KEY(meto_ID),
	CONSTRAINT FK_tllr_tbMetodosPago_acce_tbUsuarios_meto_UserCreacion_user_ID  				FOREIGN KEY(meto_UserCreacion) 			REFERENCES acce.tbUsuarios(user_ID),
	CONSTRAINT FK_tllr_tbMetodosPago_acce_tbUsuarios_meto_UserModificacion_user_ID  			FOREIGN KEY(meto_UserModificacion) 		REFERENCES acce.tbUsuarios(user_ID)
);

CREATE TABLE gral.tbEstadosCiviles
(
	estacivi_ID					INT IDENTITY,
	estacivi_Nombre				NVARCHAR(50),
	estacivi_UserCreacion			INT NOT NULL,
	estacivi_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_estacivi_FechaCreacion DEFAULT(GETDATE()),
	estacivi_UserModificacion		INT,
	estacivi_FechaModificacion	DATETIME,
	estacivi_Estado				BIT NOT NULL CONSTRAINT DF_estacivi_Estado DEFAULT(1)
   
   CONSTRAINT PK_gral_tbEstadosCiviles 												PRIMARY KEY(estacivi_ID),
   CONSTRAINT FK_gral_tbEstadosCiviles_acce_tbUsuarios_estacivi_UserCreacion_user_ID  	FOREIGN KEY(estacivi_UserCreacion) 		REFERENCES acce.tbUsuarios(user_ID),
   CONSTRAINT FK_gral_tbEstadosCiviles_acce_tbUsuarios_estacivi_UserModificacion_user_ID  FOREIGN KEY(estacivi_UserModificacion) 	REFERENCES acce.tbUsuarios(user_ID)
);

CREATE TABLE tllr.tbProveedores
(
	prov_ID						INT IDENTITY,
	prov_Rut				    VARCHAR(14) NOT NULL,
	prov_Nombre					NVARCHAR(200) NOT NULL,
	prov_CorreoElectronico      NVARCHAR(200) NOT NULL,
	prov_Telefono				NVARCHAR(15)NOT NULL,
	prov_Dirrecion              NVARCHAR(150) NOT NULL,
	prov_UserCreacion			INT NOT NULL,
	prov_FechaCreacion			DATETIME NOT NULL CONSTRAINT DF_prov_FechaCreacion DEFAULT(GETDATE()),
	prov_UserModificacion		INT,
	prov_FechaModificacion		DATETIME,
	prov_Estado					BIT NOT NULL CONSTRAINT DF_prov_Estado DEFAULT(1)

	CONSTRAINT PK_tllr_tbProveedores_prov_ID												PRIMARY KEY(prov_ID),
	CONSTRAINT FK_tllr_tbProveedores_acce_tbUsuarios_prov_UserCreacion_user_ID  			FOREIGN KEY(prov_UserCreacion) 		REFERENCES acce.tbUsuarios(user_ID),
	CONSTRAINT  FK_tllr_tbProveedores_acce_tbUsuarios_prov_UserModificacion_user_ID 		FOREIGN KEY(prov_UserModificacion) 	REFERENCES acce.tbUsuarios(user_ID)
);

--***************TABLA SucursalES*************************--
GO
CREATE TABLE tllr.tbSucursales(
    sucu_ID                             INT IDENTITY(1,1), 
    sucu_Descripcion                    NVARCHAR(200) NOT NULL,
    muni_ID                             CHAR(4),
	sucu_DireccionExacta				NVARCHAR(500) NOT NULL,
    sucu_FechaCreacion					DATETIME NOT NULL DEFAULT GETDATE(),
    sucu_UserCreacion					INT not null,
    sucu_FechaModificacion				DATETIME,
    sucu_UserModificacion				INT,
    sucu_Estado							BIT NOT NULL DEFAULT 1,

    CONSTRAINT PK_tllr_tbSucursales_sucu_ID PRIMARY KEY(sucu_ID),
	CONSTRAINT FK_tllr_gral_tbSucursales_muni_ID FOREIGN KEY (muni_ID) REFERENCES gral.tbMunicipios (muni_ID),
	CONSTRAINT FK_tllr_acce_tbSucursales_sucu_UserCreacion FOREIGN KEY (sucu_UserCreacion) REFERENCES acce.tbUsuarios (user_ID),
	CONSTRAINT FK_tllr_acce_tbSucursales_sucu_UserModificacion FOREIGN KEY (sucu_UserModificacion) REFERENCES acce.tbUsuarios (user_ID)
);
GO
CREATE TABLE tllr.tbMarcas
(
marc_ID	INT IDENTITY (1,1),
marc_Nombre NVARCHAR (300) NOT NULL,
marc_FechaCreacion DATETIME DEFAULT GETDATE(),
marc_UserCreacion INT,
marc_FechaModificacion DATETIME,
marc_UserModificacion INT,
marc_Estado BIT NOT NULL DEFAULT 1,

CONSTRAINT PK_tllr_tbMarcas_marc_ID PRIMARY KEY (marc_ID),
CONSTRAINT FK_tllr_acce_tbMarcas_marc_UserCreacion FOREIGN KEY (marc_UserCreacion) REFERENCES acce.tbUsuarios (user_ID),
CONSTRAINT FK_tllr_acce_tbMarcas_marc_UserModificacion FOREIGN KEY (marc_UserModificacion) REFERENCES acce.tbUsuarios (user_ID)
)


CREATE TABLE tllr.tbModelos
(
mode_ID INT IDENTITY(1,1),
marc_ID INT NOT NULL,
mode_Nombre NVARCHAR(300) NOT NULL,
mode_FechaCreacion DATETIME DEFAULT GETDATE(),
mode_UserCreacion INT,
mode_FechaModificacion DATETIME,
mode_UserModificacion INT,
mode_Estado BIT NOT NULL DEFAULT 1,

CONSTRAINT PK_tllr_mode_ID PRIMARY KEY (mode_ID),
CONSTRAINT FK_tllr_tbModelos_marc_ID FOREIGN KEY (marc_ID) REFERENCES tllr.tbMarcas (marc_ID),
CONSTRAINT FK_tllr_acce_mode_UserCreacion FOREIGN KEY (mode_UserCreacion) REFERENCES acce.tbUsuarios (user_ID),
CONSTRAINT FK_tllr_acce_mode_UserModificacion FOREIGN KEY (mode_UserModificacion) REFERENCES acce.tbUsuarios (user_ID)
)

CREATE TABLE tllr.tbVehiculos
(
vehi_ID INT IDENTITY (1,1),
mode_ID INT NOT NULL,
vehi_Matricula VARCHAR(7),
vehi_anio VARCHAR(4),
vehi_FechaCreacion DATETIME DEFAULT GETDATE(),
vehi_UserCreacion INT, 
vehi_FechaModificacion DATETIME,
vehi_UserModificacion INT,
vehi_Estado BIT NOT NULL DEFAULT 1,

CONSTRAINT PK_tllr_tbVehiculos_vehi_ID PRIMARY KEY (vehi_ID),
CONSTRAINT FK_tllr_tbVehiculos_mode_ID FOREIGN KEY (mode_ID) REFERENCES tllr.tbModelos (mode_ID), 
CONSTRAINT FK_tllr_acce_tbVehiculos_vehi_UserCreacion FOREIGN KEY (vehi_UserCreacion) REFERENCES acce.tbUsuarios (user_ID),
CONSTRAINT FK_tllr_acce_tbVehiculos_vehi_UserModificacion FOREIGN KEY (vehi_UserModificacion) REFERENCES acce.tbUsuarios (user_ID)
)

CREATE TABLE tllr.tbClientes
(
	clie_ID INT IDENTITY (1,1),
	clie_Nombres NVARCHAR(500) NOT NULL,
	clie_Apellidos NVARCHAR(500) NOT NULL,
	clie_Sexo CHAR NOT NULL,
	clie_FechaNacimiento DATETIME NOT NULL,
	clie_Telefono NVARCHAR(20),
	clie_CorreoElectronico NVARCHAR(500),
	muni_ID CHAR(4),
	clie_FechaCreacion DATETIME DEFAULT GETDATE(),
	clie_UserCreacion INT,
	clie_FechaModificacion DATETIME,
	clie_UserModificacion INT,
	clie_Estado BIT NOT NULL DEFAULT 1,

CONSTRAINT PK_tllr_tbClientes_clie_ID PRIMARY KEY (clie_ID),
CONSTRAINT FK_tllr_gral_tbClientes_muni_ID FOREIGN KEY (muni_ID) REFERENCES gral.tbMunicipios (muni_ID),
CONSTRAINT FK_tllr_acce_tbClientes_clie_UserCreacion FOREIGN KEY (clie_UserCreacion) REFERENCES acce.tbUsuarios (user_ID),
CONSTRAINT FK_tllr_acce_tbClientes_clie_UserModificacion FOREIGN KEY (clie_UserModificacion) REFERENCES acce.tbUsuarios (user_ID)
)

CREATE TABLE tllr.tbRepuestos(
     resp_ID           INT IDENTITY(1,1),
	 resp_Descripcion  NVARCHAR(150) NOT NULL,
	 resp_Precio       DECIMAL(18,2) NOT NULL,
	 resp_Stock		   INT DEFAULT 0 NOT NULL,
	 prov_ID           INT NOT NULL,
	 marc_ID           INT NOT NULL,
	 resp_Anio         CHAR(4) NOT NULL,
	 resp_FechaCreacion DATETIME DEFAULT GETDATE(),
	 resp_UserCreacion INT,
	 resp_FechaModificacion DATETIME,
	 resp_UserModificacion INT,
 	 resp_Estado BIT NOT NULL DEFAULT 1
	 CONSTRAINT PK_tllr_tbRepuestos_resp_ID PRIMARY KEY (resp_ID),
	 CONSTRAINT FK_tllr_tRepuestos_prov_ID_tllr_tbProveedores FOREIGN KEY (prov_ID) REFERENCES tllr.tbProveedores(prov_ID),
	 CONSTRAINT FK_tllr_tRepuestos_marc_ID_tllr_tbMarcas FOREIGN KEY (marc_ID) REFERENCES tllr.tbMarcas(marc_ID),
	 CONSTRAINT FK_tllr_acce_tbRepuestos_resp_UserCreacion FOREIGN KEY (resp_UserCreacion) REFERENCES acce.tbUsuarios (user_ID),
     CONSTRAINT FK_tllr_acce_tbRepuestos_resp_UserModificacion FOREIGN KEY (resp_UserModificacion) REFERENCES acce.tbUsuarios (user_ID)
);


CREATE TABLE tllr.tbServicios(
     serv_ID                  INT IDENTITY(1,1),
	 serv_Descripcion         NVARCHAR(250),
	 serv_Precio		      DECIMAL(18,2) NULL,
	 serv_FechaCreacion       DATETIME DEFAULT GETDATE(),
	 serv_UserCreacion        INT,
	 serv_FechaModificacion   DATETIME,
	 serv_UserModificacion    INT,
	 serv_Estado              BIT NOT NULL DEFAULT 1
	CONSTRAINT PK_serv_ID_tllr_tbServicios PRIMARY KEY (serv_ID),
	CONSTRAINT FK_tllr_acce_tbServicios_serv_UserCreacion FOREIGN KEY (serv_UserCreacion) REFERENCES acce.tbUsuarios (user_ID),
    CONSTRAINT FK_tllr_acce_tbServicios_serv_UserModificacion FOREIGN KEY (serv_UserModificacion) REFERENCES acce.tbUsuarios (user_ID)
);

--TABLA VENTAS
CREATE TABLE tllr.tbVentas(
    vent_Id					INT IDENTITY(1,1),
	clie_ID	                INT NOT NULL,
	meto_ID					INT NOT NULL,
	sucu_ID					INT NOT NULL,
	vent_UserCreacion 	    INT NOT NULL,
	vent_FechaCreacion      DATETIME DEFAULT GETDATE(), 
	vent_UserModificacion	INT,
	vent_FechaModificacion  DATETIME
	CONSTRAINT PK_tllr_tbVentas_vent_Id PRIMARY KEY (vent_Id)
    CONSTRAINT FK_tllr_tbVentas_clie_Id_ABRR_tbClientes_clie_Id FOREIGN KEY (clie_ID) REFERENCES tllr.tbClientes(clie_ID),
	CONSTRAINT FK_tllr_tbVentas_sucu_Id_ABRR_tbSucursales_sucu_Id FOREIGN KEY (sucu_ID) REFERENCES tllr.tbSucursales(sucu_ID),
	CONSTRAINT FK_tllr_acce_tbVentas_vent_UserCreacion FOREIGN KEY (vent_UserCreacion) REFERENCES acce.tbUsuarios (user_ID),
    CONSTRAINT FK_tllr_acce_tbVentas_vent_UserModificacion FOREIGN KEY (vent_UserModificacion) REFERENCES acce.tbUsuarios (user_ID),
	CONSTRAINT FK_tllr_tbVentas_meto_ID FOREIGN KEY (meto_ID) REFERENCES gral.tbMetodosPago(meto_ID)
);
GO

--TABLA DETALLES VENTAS
CREATE TABLE tllr.tbDetallesventas(
   deve_ID					INT IDENTITY(1,1),
   vent_ID					INT NOT NULL,
   vehi_ID					INT NULL,
   serv_ID                  INT NULL,
   resp_ID                  INT NULL,
   deve_Cantidad            INT NOT NULL,
   deve_Precioventa         DECIMAL(18,2) NOT NULL,
   deve_UserCreacion		INT NOT NULL,
   deve_FechaCreacion       DATETIME DEFAULT GETDATE(), 
   deve_UserModificacion	INT,
   deve_FechaModificacion   DATETIME
   CONSTRAINT PK_tllr_tbDetallesventas_deve_ID PRIMARY KEY (deve_ID),
   CONSTRAINT FK_tllr_tbDetallesventas_serv_ID_tllr_tbServicios_serv_ID FOREIGN KEY (serv_ID) REFERENCES tllr.tbServicios(serv_ID),
   CONSTRAINT FK_tllr_tbDetallesventas_vent_ID_tllr_tbVentas_vent_ID FOREIGN KEY (vent_ID) REFERENCES tllr.tbVentas(vent_ID),
   CONSTRAINT FK_tllr_tbDetallesventas_resp_ID_tllr_tbVentas_resp_ID FOREIGN KEY (resp_ID) REFERENCES tllr.tbRepuestos(resp_ID),
   CONSTRAINT FK_tllr_tbDetallesventas_vehi_UserCreacion FOREIGN KEY (deve_UserCreacion) REFERENCES acce.tbUsuarios (user_ID),
   CONSTRAINT FK_tllr_tbDetallesventas_vehi_UserModificacion FOREIGN KEY (deve_UserModificacion) REFERENCES acce.tbUsuarios (user_ID),
   CONSTRAINT FK_tllr_tbDetallesventas_vehi_ID	FOREIGN KEY (vehi_ID) REFERENCES  tllr.tbVehiculos (vehi_ID)
);
GO

CREATE TABLE tllr.tbCompras(
   comp_ID					INT IDENTITY(1,1),
   prov_ID					INT NOT NULL,
   comp_Fecha               DATE NOT NULL,
   comp_Descuento			DECIMAL(18,2),
   comp_MontoFinal          DECIMAL (18,2) NOT NULL,
   comp_Estado              BIT DEFAULT 1,
   comp_UserCreacion	    INT NOT NULL,
   comp_FechaCreacion       DATETIME DEFAULT GETDATE(),
   comp_UserModificacion	INT,
   comp_FechaModificacion   DATETIME
   CONSTRAINT PK_tllr_tbCompras_comp_ID PRIMARY KEY (comp_ID),
   CONSTRAINT FK_tllr_tbCompras_tllr_tbProveedores_prov_ID FOREIGN KEY (prov_ID) REFERENCES tllr.tbProveedores(prov_ID),
   CONSTRAINT FK_tllr_acce_tbCompras_comp_UserCreacion FOREIGN KEY (comp_UserCreacion) REFERENCES acce.tbUsuarios (user_ID),
   CONSTRAINT FK_tllr_acce_tbCompras_comp_UserModificacion FOREIGN KEY (comp_UserModificacion) REFERENCES acce.tbUsuarios (user_ID) 
);
GO

CREATE TABLE tllr.tbDetallesCompras(
	deco_ID					INT IDENTITY(1,1),
	comp_ID					INT NOT NULL,
	resp_ID                 INT NOT NULL,
	deco_Cantidad			INT NOT NULL,
	deco_Preciocompra		DECIMAL(18,2) NOT NULL,
	deco_MontoTotal			DECIMAL(18,2) ,
	deco_Estado				BIT DEFAULT 1,
	deco_UserCreacion		INT NOT NULL,
	deco_FechaCreacion      DATETIME DEFAULT GETDATE(),
	deco_UserModificacion	INT,
	deco_FechaModificacion  DATETIME
	CONSTRAINT PK_tllr_tbDetallesCompras_deco_ID PRIMARY KEY (deco_ID),
	CONSTRAINT FK_tllr_tbDetallesCompras_comp_ID_tllr_tbCompras_comp_ID FOREIGN KEY (comp_ID) REFERENCES tllr.tbCompras (comp_ID),
    CONSTRAINT FK_tllr_tbDetallesCompras_resp_ID_tllr_tbCompras_resp_ID FOREIGN KEY (resp_ID) REFERENCES tllr.tbRepuestos(resp_ID),
	CONSTRAINT FK_tllr_acce_tbDetallesCompras_deco_UserCreacion FOREIGN KEY (deco_UserCreacion) REFERENCES acce.tbUsuarios (user_ID),
    CONSTRAINT FK_tllr_acce_tbDetallesCompras_deco_UserModificacion FOREIGN KEY (deco_UserModificacion) REFERENCES acce.tbUsuarios (user_ID)
);
GO

CREATE TABLE tllr.tbClientePorVehiculo(
    clvh_ID                 INT IDENTITY(1,1),
	clie_ID                 INT NOT NULL,
	vehi_ID                 INT NOT NULL,
	clvh_Estado				BIT DEFAULT 1,
	clvh_UserCreacion		INT NOT NULL,
	clvh_FechaCreacion      DATETIME DEFAULT GETDATE(),
	clvh_UserModificacion	INT,
	clvh_FechaModificacion  DATETIME
	CONSTRAINT PK_clvh_ID_tllr_tbClientePorVehiculo PRIMARY KEY (clvh_ID),
	CONSTRAINT FK_clvh_ID_tllr_tbClientePorVehiculo_clie_ID_tbClientes FOREIGN KEY (clie_ID) REFERENCES tllr.tbClientes(clie_ID),
    CONSTRAINT FK_clvh_ID_tllr_tbClientePorVehiculo_vehi_ID_tbVehiculos FOREIGN KEY (vehi_ID) REFERENCES tllr.tbVehiculos(vehi_ID),
	CONSTRAINT FK_tllr_acce_tbClientePorVehiculo_clvh_UserCreacion FOREIGN KEY (clvh_UserCreacion) REFERENCES acce.tbUsuarios (user_ID),
    CONSTRAINT FK_tllr_acce_tbClientePorVehiculo_clvh_UserModificacion FOREIGN KEY (clvh_UserModificacion) REFERENCES acce.tbUsuarios (user_ID)
);


CREATE TABLE tllr.tbEmpleados(
	empe_Id						INT IDENTITY(1,1),
	empe_Nombres				NVARCHAR(100)	NOT NULL,
	empe_Apellidos				NVARCHAR(100)	NOT NULL,
	empe_Identidad				VARCHAR(13)		NOT NULL,
	empe_FechaNacimiento		DATE			NOT NULL,
	empe_Sexo					CHAR(1)			NOT NULL,
	estacivi_Id					INT				NOT NULL,
	muni_Id						CHAR(4)			NOT NULL,
	empe_Direccion				NVARCHAR(250)	NOT NULL,
	empe_Telefono				NVARCHAR(15)	NOT NULL,
	empe_CorreoElectronico		NVARCHAR(200)	NOT NULL,
	sucu_Id						INT				NOT NULL,
	empe_UsuCreacion			INT				NOT NULL,
	empe_FechaCreacion			DATETIME		NOT NULL CONSTRAINT DF_empe_FechaCreacion DEFAULT(GETDATE()),
	empe_UsuModificacion		INT,
	empe_FechaModificacion		DATETIME,
	empe_Estado					BIT NOT NULL CONSTRAINT DF_empe_Estado DEFAULT(1),
	
	CONSTRAINT PK_maqu_tbEmpleados_empe_Id 										PRIMARY KEY(empe_Id),
	CONSTRAINT CK_maqu_tbEmpleados_empe_Sexo									CHECK(empe_sexo IN ('F', 'M')),
	CONSTRAINT FK_maqu_tbEmpleados_gral_tbEstadosCiviles_estacivi_Id			FOREIGN KEY(estacivi_Id)					REFERENCES gral.tbEstadosCiviles(estacivi_Id),			
	CONSTRAINT FK_maqu_tbEmpleados_gral_tbMunicipios_muni_Id					FOREIGN KEY(muni_Id)						REFERENCES gral.tbMunicipios(muni_Id),
	CONSTRAINT FK_maqu_tbEmpleados_acce_tbUsuarios_UserCreate					FOREIGN KEY(empe_UsuCreacion)				REFERENCES acce.tbUsuarios(user_Id),
	CONSTRAINT FK_maqu_tbEmpleados_acce_tbUsuarios_UserUpdate					FOREIGN KEY(empe_UsuModificacion)			REFERENCES acce.tbUsuarios(user_Id),
	CONSTRAINT FK_maqu_tbEmpleados_maqu_tbSucursales_sucu_Id					FOREIGN KEY(sucu_Id)						REFERENCES tllr.tbSucursales(sucu_Id)		
);

ALTER TABLE acce.tbUsuarios ADD CONSTRAINT FK_acce_tbUsuarios_empe_ID_tllr_tbEmpleados_empe_Id FOREIGN KEY (empe_ID) REFERENCES tllr.tbEmpleados(empe_Id)


/*Insertar Usuarios*/
GO
CREATE OR ALTER PROCEDURE acce.UDP_acce_tbUsuarios_Insert
	@user_NombreUsuario NVARCHAR(150),
	@user_Contrasena NVARCHAR(MAX),
	@user_EsAdmin BIT,
	@role_Id INT, 
	@empe_Id INT,
	@user_usuCreacion INT
AS 
BEGIN
	
	BEGIN TRY
		
		DECLARE @password NVARCHAR(MAX)=(SELECT HASHBYTES('Sha2_512', @user_Contrasena));

		IF NOT EXISTS (SELECT * FROM acce.tbUsuarios
						WHERE @user_NombreUsuario = user_NombreUsuario)
		BEGIN
			INSERT INTO acce.tbUsuarios
			VALUES(@user_NombreUsuario,@password,@user_EsAdmin,@role_Id,@empe_Id,@user_usuCreacion,GETDATE(),NULL,NULL,1)

			SELECT 1
		END
		ELSE IF EXISTS (SELECT * FROM acce.tbUsuarios
						WHERE @user_NombreUsuario = user_NombreUsuario
							  AND user_Estado = 1)
			SELECT 2
		ELSE
			BEGIN
				UPDATE acce.tbUsuarios
				SET user_Estado = 1,
					user_Contrasena = @password,
					user_EsAdmin = @user_EsAdmin,
					role_Id = @role_Id,
					empe_Id = @empe_Id
				WHERE user_NombreUsuario = @user_NombreUsuario

				SELECT 1
			END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH 
END

--Iniciar sesion
GO
CREATE OR ALTER PROCEDURE UDP_Login
	@user_Nombre NVARCHAR(100), @user_Contrasena NVARCHAR(200)
AS
BEGIN

	DECLARE @contraEncriptada NVARCHAR(MAX) = HASHBYTES('SHA2_512', @user_Contrasena);

	SELECT [user_Id], [user_NombreUsuario], [role_Id],empe.sucu_Id,user_EsAdmin
	FROM [acce].[tbUsuarios] [user] INNER JOIN tllr.tbEmpleados empe
	ON [user].empe_ID = empe.empe_Id
	WHERE [user_Contrasena] = @contraEncriptada
	AND [user_NombreUsuario] = @user_Nombre
	AND [user_Estado] = 1
END
GO

/*Usuarios*/

/*Usuarios View*/
GO
CREATE OR ALTER VIEW acce.VW_tbUsuarios 
AS
SELECT [user].user_ID, [user].user_NombreUsuario, 
[user].user_Contrasena, [user].user_EsAdmin, 
[user].role_ID, [user].empe_ID, 
empe.empe_Nombres, rol.role_Nombre,
[user].user_UserCreacion,[user1].user_NombreUsuario AS user_UserCreacion_Nombre, [user].user_FechaCreacion, 
[user].user_UserModificacion,[user2].user_NombreUsuario AS user_UserModificacion_Nombre,[user].user_FechaModificacion, 
[user].user_Estado
FROM [acce].[tbUsuarios] [user] INNER JOIN acce.tbUsuarios [user1] 
ON [user].user_UserCreacion = user1.user_ID  LEFT JOIN acce.tbUsuarios [user2]
ON [user].user_UserModificacion = user2.user_ID INNER JOIN tllr.tbEmpleados empe
ON [user].empe_ID = empe.empe_Id  INNER JOIN acce.tbRoles rol
on [user].role_ID = rol.role_ID
WHERE [user].user_Estado = 1

/*Usuarios View UDP*/
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbUsuarios_VW
AS
BEGIN
SELECT * FROM acce.VW_tbUsuarios 
END

/*Estados Civiles*/

/*Estados Civiles View*/
GO
CREATE VIEW gral.VW_tbEstadosCiviles
AS
SELECT estacivi_ID, estacivi_Nombre, 
estacivi_UserCreacion,[user1].user_NombreUsuario AS estacivi_UserCreacion_Nombre, estacivi_FechaCreacion, 
estacivi_UserModificacion,[user2].user_NombreUsuario AS estacivi_UserModificacion_Nombre, estacivi_FechaModificacion, 
estacivi_Estado
FROM [gral].[tbEstadosCiviles] estacivi INNER JOIN acce.tbUsuarios [user1]
ON estacivi.estacivi_UserCreacion = user1.user_ID  LEFT JOIN acce.tbUsuarios [user2]
ON estacivi.estacivi_UserModificacion = user2.user_ID
WHERE estacivi.estacivi_Estado = 1

/*Estados Civiles UDP*/
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbEstadosCiviles_VW
AS
BEGIN
SELECT * FROM gral.VW_tbEstadosCiviles
END	

/*Metodos de Pago*/

/*Metodos de pago View*/
GO
CREATE VIEW gral.VW_tbMetodosPago
AS
SELECT meto_ID, meto_Nombre,
meto_UserCreacion,[user1].user_NombreUsuario AS meto_UserCreacion_Nombre, meto_FechaCreacion, 
meto_UserModificacion,[user2].user_NombreUsuario AS meto_UserModificacion_Nombre, meto_FechaModificacion, 
meto_Estado
FROM [gral].[tbMetodosPago] meto INNER JOIN acce.tbUsuarios [user1]
ON meto.meto_UserCreacion = user1.user_ID  LEFT JOIN acce.tbUsuarios [user2]
ON meto.meto_UserModificacion = user2.user_ID
WHERE meto_Estado = 1

/*Metodos de pago View UDP*/
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbMetodosPago_VW
AS
BEGIN
SELECT * FROM gral.VW_tbMetodosPago
END

/*Clientes*/

/*Clientes View*/
GO
CREATE OR ALTER VIEW tllr.VW_tbClientes
AS
SELECT clie_ID,
clie_Nombres, clie_Apellidos, 
clie_Sexo, clie_FechaNacimiento, 
clie_Telefono, clie_CorreoElectronico, 
clie.muni_ID, muni.muni_Nombre, depa.depa_ID, depa.depa_Nombre, clie_FechaCreacion, 
clie_UserCreacion,[user1].user_NombreUsuario AS clie_UserCreacion_Nombre, clie_FechaModificacion, 
clie_UserModificacion,[user2].user_NombreUsuario AS clie_UserModificacion_Nombre, clie_Estado
FROM [tllr].[tbClientes] clie INNER JOIN acce.tbUsuarios [user1]
ON clie.clie_UserCreacion = user1.user_ID  LEFT JOIN acce.tbUsuarios [user2]
ON clie.clie_UserModificacion = user2.user_ID INNER JOIN gral.tbMunicipios muni
ON clie.muni_ID = muni.muni_ID  INNER JOIN gral.tbDepartamentos depa
ON muni.depa_ID = depa.depa_ID
WHERE clie_Estado = 1

/*Clientes View UDP*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbClientes_VW
AS
BEGIN
SELECT * FROM tllr.VW_tbClientes
END

/*Marcas*/

/*Marcas View*/
GO
CREATE VIEW tllr.VW_tbMarcas
AS
SELECT marc_ID, marc_Nombre, 
marc_FechaCreacion, marc_UserCreacion,[user1].user_NombreUsuario AS marc_UserCreacion_Nombre, 
marc_FechaModificacion, marc_UserModificacion,[user1].user_NombreUsuario AS marc_UserModificacion_Nombre, 
marc_Estado 
FROM [tllr].[tbMarcas] marc INNER JOIN acce.tbUsuarios [user1]
ON marc.marc_UserCreacion = user1.user_ID  LEFT JOIN acce.tbUsuarios [user2]
ON marc.marc_UserModificacion = user2.user_ID
WHERE marc_Estado = 1

/*Marcas View UDP*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbMarcas_VW
AS
BEGIN
SELECT * FROM tllr.VW_tbMarcas
END

/*Marcas Insert*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbMarcas_Insert
	@marc_Nombre NVARCHAR(300),
	@marc_UserCreacion INT
AS
BEGIN
	BEGIN TRY
		IF EXISTS(SELECT marc_Nombre FROM tllr.tbMarcas WHERE marc_Nombre = @marc_Nombre AND marc_Estado = 0)
		BEGIN
			UPDATE tllr.tbMarcas
			SET marc_Estado = 1
			WHERE marc_Nombre = @marc_Nombre
			SELECT '2'
		END
		ELSE IF NOT EXISTS (SELECT marc_Nombre FROM tllr.tbMarcas WHERE marc_Nombre = @marc_Nombre)
			BEGIN
			INSERT INTO tllr.tbMarcas([marc_Nombre], [marc_FechaCreacion], [marc_UserCreacion], [marc_FechaModificacion], [marc_UserModificacion], [marc_Estado])
			VALUES(@marc_Nombre,GETDATE(),@marc_UserCreacion,NULL,NULL,1)
			SELECT '1'
			END	
			ELSE 
			SELECT '3'
	END TRY
	BEGIN CATCH
	SELECT '0'
	END CATCH
END

/*Marcas Update*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbMarcas_Update
@marc_ID INT,
@marc_Nombre NVARCHAR(300),
@marc_UserModificacion INT
AS
BEGIN
BEGIN TRY
	IF NOT EXISTS (SELECT marc_Nombre FROM tllr.tbMarcas WHERE marc_ID != @marc_ID AND marc_Nombre = @marc_Nombre)
		BEGIN
			UPDATE tllr.tbMarcas
			SET marc_Nombre = @marc_Nombre,
			marc_UserModificacion = @marc_UserModificacion,
			marc_FechaModificacion = GETDATE()
			WHERE marc_ID = @marc_ID
			SELECT '1'
		END
		ELSE 
		SELECT '2'
END TRY
BEGIN CATCH
SELECT '0'
END CATCH
END

/*Marcas Delete*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbMarcas_Delete
@marc_ID INT
AS
BEGIN
	BEGIN TRY
	IF EXISTS (SELECT marc_ID FROM tbModelos WHERE marc_ID = @marc_ID AND mode_Estado = 1)
	BEGIN
	SELECT '3'
	END
	ELSE
	UPDATE tllr.tbMarcas
	SET marc_Estado = 0
	WHERE marc_ID = @marc_ID
	SELECT '1'
	END TRY
	BEGIN CATCH
	SELECT '0'
	END CATCH
END

/*Modelos*/

/*Modelos View*/
GO
CREATE VIEW tllr.VW_Modelos
AS
SELECT mode_ID, mode.marc_ID,marc.marc_Nombre, 
mode_Nombre, mode_FechaCreacion, 
mode_UserCreacion,[user1].user_NombreUsuario AS mode_UserCreacion_Nombre, mode_FechaModificacion, 
mode_UserModificacion,[user2].user_NombreUsuario AS mode_UserModificaciones_Nombre, mode_Estado 
FROM [tllr].[tbModelos] mode INNER JOIN acce.tbUsuarios [user1]
ON mode.mode_UserCreacion = user1.user_ID  LEFT JOIN acce.tbUsuarios [user2]
ON mode.mode_UserModificacion = user2.user_ID INNER JOIN tllr.tbMarcas marc 
ON mode.marc_ID = marc.marc_ID
WHERE mode_Estado = 1

/*Modelos View UDP*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbModelos_VW
AS
BEGIN
SELECT * FROM tllr.VW_Modelos
END

/*Modelos Insert*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbModelos_Insert 
@marc_ID INT,
@mode_Nombre NVARCHAR(300),
@mode_UserCreacion INT
AS
BEGIN
BEGIN TRY
IF NOT EXISTS (SELECT mode_Nombre FROM tllr.tbModelos WHERE mode_Nombre = @mode_Nombre)
	BEGIN
	INSERT INTO tllr.tbModelos ([marc_ID], [mode_Nombre], 
	[mode_FechaCreacion], [mode_UserCreacion], 
	[mode_FechaModificacion], [mode_UserModificacion], 
	[mode_Estado])
	VALUES (@marc_ID,@mode_Nombre,GETDATE(),@mode_UserCreacion,NULL,NULL,1)
	SELECT '1'
	END
	ELSE 
	SELECT '2'
END TRY
BEGIN CATCH
	SELECT '0'
END CATCH
END

/*Modelos Update*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbModelos_Update
@mode_ID INT,
@marc_ID INT,
@mode_Nombre NVARCHAR(300),
@mode_UserModificacion INT
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT mode_Nombre FROM tllr.tbModelos WHERE mode_ID != @mode_ID AND mode_Nombre = @mode_Nombre)
		BEGIN
		UPDATE tllr.tbModelos
		SET marc_ID = @marc_ID,
			mode_Nombre = @mode_Nombre,
			mode_UserModificacion = @mode_UserModificacion,
			mode_FechaModificacion = GETDATE()
		WHERE mode_ID = @mode_ID
			SELECT '1'
		END
		ELSE
			SELECT '2'
	END TRY
	BEGIN CATCH
	SELECT '0'
	END CATCH
END

/*Modelos Delete*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbModelos_Delete
@mode_ID INT
AS
BEGIN
	BEGIN TRY
	IF EXISTS (SELECT mode_ID FROM tllr.tbVehiculos WHERE mode_ID = @mode_ID AND vehi_Estado = 1)
	BEGIN
	SELECT '3'
	END
	ELSE
		UPDATE tllr.tbModelos
		SET mode_Estado = 0 
		WHERE mode_ID = @mode_ID
		SELECT '1'
	END TRY
	BEGIN CATCH
		SELECT '0'
	END CATCH
END


/*Proveedores*/


/*Provedores View*/
GO
CREATE VIEW tllr.VW_tbProveedores
AS
SELECT prov_ID,prov_Rut, prov_Nombre, 
prov_CorreoElectronico, prov_Telefono, 
prov_Dirrecion, prov_UserCreacion,[user1].user_NombreUsuario AS prov_UserCreacion_Nombre, 
prov_FechaCreacion, prov_UserModificacion,[user2].user_NombreUsuario AS prov_UserModificacion_Nombre, 
prov_FechaModificacion, prov_Estado  
FROM [tllr].[tbProveedores] prov INNER JOIN acce.tbUsuarios [user1]
ON prov.prov_UserCreacion = user1.user_ID  LEFT JOIN acce.tbUsuarios [user2]
ON prov.prov_UserModificacion = user2.user_ID
WHERE prov_Estado = 1

/*Proveedores View UDP*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbProveedores_VW
AS
BEGIN
SELECT * FROM tllr.VW_tbProveedores
END

/*Proveedores Insert*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbProveedores_Insert
@prov_Rut VARCHAR(14),
@prov_Nombre NVARCHAR(200),
@prov_CorreoElectronico NVARCHAR(200),
@prov_Telefono NVARCHAR(15),
@prov_Direccion NVARCHAR(150),
@prov_UserCreacion	INT
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT prov_Nombre FROM tllr.tbProveedores WHERE prov_Nombre = @prov_Nombre)
		BEGIN 
		INSERT INTO tllr.tbProveedores ([prov_Rut], [prov_Nombre], [prov_CorreoElectronico], [prov_Telefono], [prov_Dirrecion], [prov_UserCreacion], [prov_FechaCreacion], [prov_UserModificacion], [prov_FechaModificacion], [prov_Estado])
		VALUES (@prov_Rut,@prov_Nombre,@prov_CorreoElectronico,@prov_Telefono,@prov_Direccion,@prov_UserCreacion,GETDATE(),NULL,NULL,1)
		SELECT '1'
		END
		ELSE 
		SELECT '2'
	END TRY
	BEGIN CATCH
	SELECT '0'
	END CATCH
END

/*Proveedores Update*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbProveedores_Update
@prov_ID INT,
@prov_Rut VARCHAR(14),
@prov_Nombre NVARCHAR(200),
@prov_CorreoElectronico NVARCHAR(200),
@prov_Telefono NVARCHAR(15),
@prov_Direccion NVARCHAR(150),
@prov_UserModificacion INT
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT prov_Nombre FROM tllr.tbProveedores WHERE prov_ID != @prov_ID AND prov_Rut = @prov_Rut)
			BEGIN
			UPDATE tllr.tbProveedores
			SET prov_Rut = @prov_Rut,
				prov_Nombre = @prov_Nombre,
				prov_CorreoElectronico = @prov_CorreoElectronico,
				prov_Telefono = @prov_Telefono,
				prov_Dirrecion = @prov_Direccion,
				prov_UserModificacion = @prov_UserModificacion,
				prov_FechaModificacion = GETDATE()
			WHERE prov_ID  = @prov_ID
			SELECT	'1'
			END
			ELSE
			SELECT  '2'
	END TRY
	BEGIN CATCH
			SELECT '0'
	END CATCH
END

/*Proveedores Delete*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbProveedores_Delete
@prov_ID INT
AS
BEGIN
	BEGIN TRY
IF EXISTS(SELECT prov_ID FROM tllr.tbRepuestos WHERE prov_ID = @prov_ID AND resp_Estado = 1)
BEGIN
SELECT '3'
END
ELSE
		UPDATE tllr.tbProveedores	
		SET prov_Estado = 0
		WHERE prov_ID = @prov_ID
		SELECT '1'
	END TRY
	BEGIN CATCH
		SELECT '0'
	END CATCH
END

/*Repuestos*/

/*Repuestos View*/
GO
CREATE VIEW tllr.VW_tbRepuestos
AS
SELECT resp_ID,resp_Stock,resp_Descripcion, 
resp_Precio, resp.prov_ID,prov_Nombre, 
resp.marc_ID,marc.marc_Nombre, resp_Anio, 
resp_FechaCreacion, resp_UserCreacion,[user1].user_NombreUsuario AS resp_UserCreacion_Nombre, 
resp_FechaModificacion, resp_UserModificacion,[user2].user_NombreUsuario AS resp_UserModificacion_Nombre, 
resp_Estado 
FROM [tllr].[tbRepuestos] resp INNER JOIN acce.tbUsuarios [user1]
ON resp.resp_UserCreacion = user1.user_ID  LEFT JOIN acce.tbUsuarios [user2]
ON resp.resp_UserModificacion = user2.user_ID INNER JOIN tllr.tbProveedores prov
ON prov.prov_ID = resp.prov_ID INNER JOIN tllr.tbMarcas marc
ON resp.marc_ID = marc.marc_ID
WHERE resp_Estado = 1 

/*Repuestos View UDP*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbRepuestos_VW
AS
BEGIN
SELECT * FROM tllr.VW_tbRepuestos
END

/*Repuestos Insert*/
GO 
CREATE OR ALTER PROCEDURE tllr.UDP_tbRepuestos_Insert
@resp_Descripcion NVARCHAR(150),
@resp_Precio DECIMAL (18,2),
@prov_ID INT,
@marc_ID INT,
@resp_Anio CHAR(4),
@resp_UserCreacion INT,
@resp_Stock INT
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT resp_Descripcion FROM tllr.tbRepuestos WHERE resp_Descripcion = @resp_Descripcion AND resp_Anio = @resp_Anio)
			BEGIN
				INSERT INTO tllr.tbRepuestos ([resp_Descripcion], [resp_Precio], [prov_ID], [marc_ID], [resp_Anio], [resp_FechaCreacion], [resp_UserCreacion], [resp_FechaModificacion], [resp_UserModificacion], [resp_Estado],[resp_Stock])
				VALUES (@resp_Descripcion,@resp_Precio,@prov_ID,@marc_ID,@resp_Anio,GETDATE(),@resp_UserCreacion,NULL,NULL,1,@resp_Stock)
			SELECT '1'
			END
			ELSE
			SELECT '2'
	END TRY
	BEGIN CATCH
		SELECT '0'
	END CATCH
END

/*Repuestos Update*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbRespuestos_Udpate
@resp_ID INT,
@resp_Descripcion NVARCHAR(150),
@resp_Precio DECIMAL (18,2),
@prov_ID INT,
@marc_ID INT,
@resp_Anio CHAR(4),
@resp_UserModificacion INT
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT resp_Descripcion FROM tllr.tbRepuestos WHERE resp_ID != @resp_ID AND resp_Descripcion = @resp_Descripcion)
			BEGIN
				UPDATE tllr.tbRepuestos
				SET resp_Descripcion = @resp_Descripcion,
					resp_Precio = @resp_Precio,
					prov_ID = @prov_ID,
					marc_ID = @marc_ID,
					resp_Anio = @resp_Anio,
					resp_UserModificacion = @resp_UserModificacion,
					resp_FechaModificacion = GETDATE()
				WHERE resp_ID = @resp_ID
					SELECT '1'
			END
			ELSE
					SELECT '2'
	END TRY
	BEGIN CATCH
	SELECT '0'
	END CATCH
END

/*Repuestos Delete*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbRepuestos_Delete
@resp_ID INT
AS
BEGIN
 BEGIN TRY
	UPDATE tllr.tbRepuestos
	SET resp_Estado = 0
	WHERE resp_ID = @resp_ID
	SELECT '1'
 END TRY
 BEGIN CATCH
	SELECT '0'
 END CATCH
END

/*Servicios*/

/*Servicios View*/
GO
CREATE VIEW tllr.VW_tbServicios
AS
SELECT serv_ID, serv_Descripcion,serv_Precio,
serv_FechaCreacion, serv_UserCreacion,[user1].user_NombreUsuario AS serv_UserCreacion_Nombre, 
serv_FechaModificacion, serv_UserModificacion,[user2].user_NombreUsuario AS serv_UserModificacion_Nombre, 
serv_Estado 
FROM [tllr].[tbServicios] serv INNER JOIN acce.tbUsuarios [user1]
ON serv.serv_UserCreacion = user1.user_ID  LEFT JOIN acce.tbUsuarios [user2]
ON serv.serv_UserModificacion = user2.user_ID

/*Servicios View UDP*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbServicios_VW
AS
SELECT * FROM tllr.VW_tbServicios
WHERE serv_Estado = 1

/*Servicios Insert*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbServicios_Insert
@serv_Descripcion NVARCHAR(250),
@serv_Precio DECIMAL(18,2),
@serv_UserCreacion INT
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT serv_Descripcion FROM tllr.tbServicios WHERE serv_Descripcion = @serv_Descripcion)
			BEGIN
			INSERT INTO tllr.tbServicios ([serv_Descripcion],serv_Precio,[serv_FechaCreacion], [serv_UserCreacion], [serv_FechaModificacion], [serv_UserModificacion], [serv_Estado])
			VALUES (@serv_Descripcion,@serv_Precio,GETDATE(),@serv_UserCreacion,NULL,NULL,1)
			SELECT '1'
			END
			ELSE
			SELECT '2'
	END TRY
	BEGIN CATCH
		SELECT '0'
	END CATCH
END

/*Servicios Update*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbServicios_Update
@serv_ID INT,
@serv_Descripcion NVARCHAR(250),
@serv_Precio DECIMAL(18,2),
@serv_UserModificacion INT
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT serv_Descripcion FROM tllr.tbServicios WHERE serv_ID != @serv_ID AND serv_Descripcion = @serv_Descripcion)
			BEGIN
			UPDATE tllr.tbServicios
			SET serv_Descripcion = @serv_Descripcion,
			    serv_Precio = @serv_Precio,
				serv_UserModificacion = @serv_UserModificacion,
				serv_FechaModificacion = GETDATE()
			WHERE 
				serv_ID = @serv_ID

							SELECT '1'
			END
			ELSE
			SELECT '2'
	END TRY
	BEGIN CATCH
	SELECT '0'
	END CATCH
END

/*Servicios Delete*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbServicios_Delete
@serv_ID INT
AS
BEGIN
	BEGIN TRY
		UPDATE tllr.tbServicios 
		SET serv_Estado = 0
		WHERE serv_ID = @serv_ID
		SELECT '1'
	END TRY
	BEGIN CATCH
		SELECT '0'
	END CATCH
END

/*Sucursales*/
GO
CREATE VIEW tllr.VW_tbSucursales
AS
SELECT sucu_ID, sucu_Descripcion, 
muni.depa_ID,depa.depa_Nombre,sucu.muni_ID,muni.muni_Nombre, sucu_DireccionExacta, 
sucu_FechaCreacion, sucu_UserCreacion,[user1].user_NombreUsuario AS sucu_UserCreacion_Nombre, 
sucu_FechaModificacion, sucu_UserModificacion,[user2].user_NombreUsuario AS sucu_UserModificacion_Nombre, 
sucu_Estado 
FROM [tllr].[tbSucursales] sucu INNER JOIN acce.tbUsuarios [user1]
ON sucu.sucu_UserCreacion = user1.user_ID  LEFT JOIN acce.tbUsuarios [user2]
ON sucu.sucu_UserModificacion = user2.user_ID INNER JOIN gral.tbMunicipios muni
ON sucu.muni_ID = muni.muni_ID  INNER JOIN gral.tbDepartamentos depa
ON muni.depa_ID = depa.depa_ID

/*Sucursales View UDP*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbSucursales_VW
AS
BEGIN
SELECT * FROM tllr.VW_tbSucursales
WHERE sucu_Estado = 1
END

/*Sucursales Insert*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbSucursales_Insert
@sucu_Descripcion NVARCHAR(200),
@muni_ID CHAR(4),
@sucu_DireccionExacta NVARCHAR(500),
@sucu_UserCreacion INT
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT sucu_Descripcion FROM tllr.tbSucursales WHERE sucu_Descripcion = @sucu_Descripcion)
			BEGIN
				INSERT INTO tllr.tbSucursales ([sucu_Descripcion], [muni_ID], [sucu_DireccionExacta], [sucu_FechaCreacion], [sucu_UserCreacion], [sucu_FechaModificacion], [sucu_UserModificacion], [sucu_Estado])
				VALUES (@sucu_Descripcion,@muni_ID,@sucu_DireccionExacta,GETDATE(),@sucu_UserCreacion,NULL,NULL,1)
				SELECT '1'
			END
			ELSE
			SELECT '2'
	END TRY
	BEGIN CATCH
		SELECT '0'
	END CATCH
END

/*Sucursales Update*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbSucursales_Update
@sucu_ID INT,
@sucu_Descripcion NVARCHAR(200),
@muni_ID CHAR(4),
@sucu_DireccionExacta NVARCHAR(500),
@sucu_UserModificacion INT
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS(SELECT sucu_Descripcion FROM tllr.tbSucursales WHERE sucu_ID != @sucu_ID AND sucu_Descripcion = @sucu_Descripcion)
		BEGIN
			UPDATE tllr.tbSucursales
			SET	sucu_Descripcion = @sucu_Descripcion,
				muni_ID = @muni_ID,
				sucu_DireccionExacta = @sucu_DireccionExacta,
				sucu_UserModificacion = @sucu_UserModificacion,
				sucu_FechaModificacion = GETDATE()
			WHERE sucu_ID = @sucu_ID
			SELECT '1'
		END
		ELSE
		SELECT '2'
	END TRY
	BEGIN CATCH
		SELECT '0'
	END CATCH
END

/*Sucursales Delete*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbSucursales_Delete
@sucu_ID INT
AS
BEGIN
	BEGIN TRY
		UPDATE tllr.tbSucursales
		SET sucu_Estado = 0
		WHERE sucu_ID = @sucu_ID
		SELECT '1'
	END TRY
	BEGIN CATCH
		SELECT '0'
	END CATCH
END

/*Vehiculos*/

/*Vehiculos View*/
GO
CREATE VIEW tllr.VW_tbVehiculos
AS
SELECT vehi_ID, vehi.mode_ID,mode.mode_Nombre,CONCAT(mode.mode_Nombre,'(',vehi_Matricula,')') AS Modelo_Matricula,
vehi_Matricula, 
vehi_anio, vehi_FechaCreacion, 
vehi_UserCreacion,[user1].user_NombreUsuario AS vehi_UserCreacion_Nombre, vehi_FechaModificacion, 
vehi_UserModificacion,[user2].user_NombreUsuario AS vehi_UserModificacion_Nombre, vehi_Estado
FROM [tllr].[tbVehiculos] vehi INNER JOIN acce.tbUsuarios [user1]
ON vehi.vehi_UserCreacion = user1.user_ID  LEFT JOIN acce.tbUsuarios [user2]
ON vehi.vehi_UserModificacion = user2.user_ID INNER JOIN tllr.tbModelos mode
ON vehi.mode_ID = mode.mode_ID
WHERE vehi_Estado = 1

/*Vehiculos View UDP*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbVehiculos_VW
AS
BEGIN
SELECT * FROM tllr.VW_tbVehiculos
WHERE vehi_Estado = 1
END	

/*Vehiculos Insert*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbVehiculos_Insert
@mode_ID INT,
@vehi_Matricula VARCHAR(7),
@vehi_anio VARCHAR(4),
@vehi_UserCreacion INT
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT vehi_Matricula FROM tllr.tbVehiculos WHERE vehi_Matricula = @vehi_Matricula)
			BEGIN
				INSERT INTO tllr.tbVehiculos ([mode_ID], [vehi_Matricula], [vehi_anio], [vehi_FechaCreacion], [vehi_UserCreacion], [vehi_FechaModificacion], [vehi_UserModificacion], [vehi_Estado])
				VALUES (@mode_ID,@vehi_Matricula,@vehi_anio,GETDATE(),@vehi_UserCreacion,NULL,NULL,1)
				SELECT '1'
			END
			ELSE
			SELECT '2'
	END TRY
	BEGIN CATCH
	SELECT '0'
	END CATCH
END

/*Vehiculos Update*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbVehiculos_Update
@vehi_ID INT,
@mode_ID INT,
@vehi_Matricula VARCHAR(7),
@vehi_anio VARCHAR(4),
@vehi_UserModificacion INT
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT vehi_Matricula FROM tllr.tbVehiculos WHERE vehi_ID != @vehi_ID AND vehi_Matricula = @vehi_Matricula)
			BEGIN
				UPDATE tllr.tbVehiculos
				SET mode_ID = @mode_ID,
					vehi_Matricula = @vehi_Matricula,
					vehi_anio = @vehi_anio,
					vehi_UserModificacion = @vehi_UserModificacion,
					vehi_FechaModificacion = GETDATE()
				WHERE vehi_ID = @vehi_ID
				SELECT '1'
			END
			ELSE
			SELECT '2'
	END TRY
	BEGIN CATCH
	SELECT '0'
	END CATCH
END

/*Vehiculos Delete*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbVehiculos_Delete
@vehi_ID INT
AS
BEGIN
	BEGIN TRY
IF EXISTS (SELECT vehi_ID FROM tllr.tbClientePorVehiculo WHERE vehi_ID = @vehi_ID AND clvh_Estado = 1)
BEGIN
SELECT '3'
END
ELSE
		UPDATE tllr.tbVehiculos
		SET vehi_Estado = 0
		WHERE vehi_ID = @vehi_ID
		SELECT '1'
	END TRY
	BEGIN CATCH
		SELECT '0'
	END CATCH
END

/*Ventas*/

/*Ventas View*/
GO
CREATE OR ALTER VIEW tllr.VW_tbVentas
AS
SELECT vent_Id,
vent.clie_ID,clie.clie_Nombres,vent.meto_ID,meto.meto_Nombre,vent.sucu_ID,sucu.sucu_Descripcion, 
vent_UserCreacion,[user1].user_NombreUsuario AS vent_UserCreacion_Nombre, vent_FechaCreacion, 
vent_UserModificacion,[user2].user_NombreUsuario AS vent_UserModificacion_Nombre, vent_FechaModificacion,(SELECT sum(deve.deve_Precioventa) FROM tllr.tbDetallesventas deve WHERE deve.vent_ID = vent.vent_Id) AS subtotal,0.15 as IVA,
(SELECT sum(deve.deve_Precioventa) * 0.15 FROM tllr.tbDetallesventas deve WHERE deve.vent_ID = vent.vent_Id) AS impuesto,
(SELECT (sum(deve.deve_Precioventa) * 0.15) +  (SELECT sum(deve.deve_Precioventa) FROM tllr.tbDetallesventas deve WHERE deve.vent_ID = vent.vent_Id) FROM tllr.tbDetallesventas deve WHERE deve.vent_ID = vent.vent_Id) AS total
FROM [tllr].[tbVentas] vent INNER JOIN acce.tbUsuarios [user1]
ON vent.vent_UserCreacion = user1.user_ID  LEFT JOIN acce.tbUsuarios [user2]
ON vent.vent_UserModificacion = user2.user_ID INNER JOIN tllr.tbClientes clie
ON vent.clie_ID = clie.clie_ID INNER JOIN tllr.tbSucursales sucu
ON vent.sucu_ID = sucu.sucu_ID INNER JOIN gral.tbMetodosPago meto
ON vent.meto_ID = meto.meto_ID INNER JOIN tllr.tbVehiculos vehi
ON vehi.vehi_ID = 

/*Ventas View UDP*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbVentas_VW
AS
BEGIN
SELECT * FROM tllr.VW_tbVentas
END		

/*ventas x id*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbVentas_By_ID
@vent_ID INT
AS
BEGIN
SELECT * FROM tllr.VW_tbVentas WHERE vent_ID = @vent_ID
END

/*Ventas Insert*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbVentas_Insert
@clie_ID INT,
@meto_ID INT,
@sucu_ID INT,
@vent_UserCreacion INT
AS
BEGIN
	BEGIN TRY
		INSERT INTO tbVentas ([clie_ID],[sucu_ID], [vent_UserCreacion], [vent_FechaCreacion], [vent_UserModificacion], [vent_FechaModificacion], [meto_ID])
		VALUES (@clie_ID,@sucu_ID,@vent_UserCreacion,GETDATE(),NULL,NULL,@meto_ID)
		SELECT SCOPE_IDENTITY()
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END

/*Ventas Detalles View*/
GO
CREATE OR ALTER VIEW tllr.VW_tbDetallesventas
AS
SELECT deve.[deve_ID], deve.[vent_ID], deve.vehi_ID, vehi.mode_ID, vehi.vehi_Matricula,
CASE WHEN deve.[serv_ID] IS NULL THEN COALESCE(resp.resp_Descripcion, '')
ELSE COALESCE(serv.serv_Descripcion, '') END AS [Descripcion],
deve.[serv_ID], serv.serv_Descripcion, deve.[resp_ID], resp.resp_Descripcion,
deve.[deve_Cantidad], deve.[deve_Precioventa], deve.[deve_UserCreacion],
deve.[deve_FechaCreacion], deve.[deve_UserModificacion], deve.[deve_FechaModificacion],
-- Calcular el subtotal, impuesto (IVA) y total
CAST(deve.deve_Cantidad * deve.deve_Precioventa AS DECIMAL(18,2)) AS [Subtotal],
CAST(deve.deve_Cantidad * deve.deve_Precioventa * 0.15 AS DECIMAL(18,2)) AS [IVA],
CAST(deve.deve_Cantidad * deve.deve_Precioventa * 1.15 AS DECIMAL(18,2)) AS [Total]
FROM tllr.tbDetallesventas deve
LEFT JOIN tllr.tbServicios serv ON deve.serv_ID = serv.serv_ID
LEFT JOIN tllr.tbRepuestos resp ON deve.resp_ID = resp.resp_ID
INNER JOIN tllr.tbVehiculos vehi ON deve.vehi_ID = vehi.vehi_ID

/*VentasDetalles View UDP*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbDetallesventas_VW
AS
BEGIN
SELECT * FROM tllr.VW_tbDetallesventas
END

/*VentaDetalles TemporalView*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbDetallesventas_Temp
@vent_ID INT
AS
SELECT * FROM tllr.VW_tbDetallesventas WHERE vent_ID = @vent_ID
GO

/*VentasDetalles Insert*/
GO
CREATE OR ALTER PROCEDURE [tllr].[UDP_tbDetallesventas_Insert]
    @vent_ID INT,
    @vehi_ID INT,
    @serv_ID INT,
    @resp_ID INT,
    @deve_Cantidad INT,
    @deve_UserCreacion INT
AS
BEGIN
    DECLARE @deve_PrecioVenta DECIMAL(18,2)

    BEGIN TRY
        IF @serv_ID IS NOT NULL
        BEGIN
            SET @deve_PrecioVenta = (SELECT serv_Precio FROM tllr.tbServicios WHERE serv_ID = @serv_ID) * @deve_Cantidad
        END
        ELSE
        BEGIN
            -- Verificar si hay suficiente stock del repuesto
            DECLARE @resp_Stock INT
            SET @resp_Stock = (SELECT resp_Stock FROM tllr.tbRepuestos WHERE resp_ID = @resp_ID)
            
            IF @resp_Stock >= @deve_Cantidad
            BEGIN
                SET @deve_PrecioVenta = (SELECT resp_Precio FROM tllr.tbRepuestos WHERE resp_ID = @resp_ID) * @deve_Cantidad
                
                -- Actualizar el stock de repuestos
                UPDATE tllr.tbRepuestos SET resp_Stock = resp_Stock - @deve_Cantidad WHERE resp_ID = @resp_ID
            END
            ELSE
            BEGIN
                SELECT '2'
            END
        END
    END TRY
    BEGIN CATCH
        SELECT '0'
        RETURN
    END CATCH

    -- Verificar si ya existe un registro con los mismos par�metros
    IF EXISTS (SELECT 1 FROM tllr.tbDetallesventas WHERE vent_ID = @vent_ID AND ((serv_ID IS NOT NULL AND serv_ID = @serv_ID) OR (resp_ID IS NOT NULL AND resp_ID = @resp_ID)))
    BEGIN
        -- Actualizar la cantidad del registro existente
        UPDATE tllr.tbDetallesventas 
        SET deve_Cantidad = deve_Cantidad + @deve_Cantidad,
            deve_PrecioVenta = deve_PrecioVenta + @deve_PrecioVenta
        WHERE vent_ID = @vent_ID AND ((serv_ID IS NOT NULL AND serv_ID = @serv_ID) OR (resp_ID IS NOT NULL AND resp_ID = @resp_ID))
        SELECT '1'
    END
    ELSE
    BEGIN
        -- Insertar un nuevo registro
        INSERT INTO tllr.tbDetallesventas
        VALUES (@vent_ID,@vehi_ID,@serv_ID,@resp_ID,@deve_Cantidad,@deve_PrecioVenta,@deve_UserCreacion,GETDATE(),NULL,NULL)
        SELECT '1'
    END
END

/*Venta Detalles Delete*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbDetallesventas_Delete
@deve_ID INT 
AS
BEGIN
BEGIN TRY
DELETE tllr.tbDetallesventas
WHERE deve_ID = @deve_ID 
SELECT '1'
END TRY
BEGIN CATCH
SELECT '0'
END CATCH
END

/*Roles View*/
GO
CREATE OR ALTER VIEW acce.VW_tbRoles
AS
SELECT role.[role_ID], [role_Nombre], 
[role_UserCreacion],[user1].user_NombreUsuario AS role_UserCreacion_Nombre, [role_FechaCreacion], 
[role_UserModificacion],[user2].user_NombreUsuario AS role_UserModificacion_Nombre, [role_FechaModificacion], 
[role_Estado]
FROM acce.tbRoles role INNER JOIN acce.tbUsuarios [user1]
ON role.role_UserCreacion = user1.user_ID LEFT JOIN acce.tbUsuarios [user2]
ON role.role_UserModificacion = user2.user_ID
WHERE role_Estado = 1

/*Roles View UDP*/
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbRoles_VW
AS
BEGIN
SELECT * FROM tllr.VW_tbRoles
WHERE role_Estado = 1
END

/*Roles Insert*/
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbRoles_Insert
@role_Nombre NVARCHAR(100),
@role_UserCreacion INT
AS
BEGIN
BEGIN TRY
IF NOT EXISTS (SELECT role_Nombre FROM acce.tbRoles WHERE role_Nombre = @role_Nombre)	
	BEGIN
		INSERT INTO acce.tbRoles ([role_Nombre], [role_UserCreacion], [role_FechaCreacion], [role_UserModificacion], [role_FechaModificacion], [role_Estado])
		VALUES (@role_Nombre,@role_UserCreacion,GETDATE(),NULL,NULL,1)
		SELECT SCOPE_IDENTITY()
	END
	ELSE
		BEGIN
		SELECT 2
		END
END TRY
BEGIN CATCH
SELECT 0
END CATCH
END

/*Roles update*/
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbRoles_Update
@role_ID INT,
@role_Nombre NVARCHAR(100),
@role_UserModificacion INT
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT role_Nombre FROM acce.tbRoles WHERE role_ID != @role_ID AND role_Nombre = @role_Nombre)
	BEGIN
		UPDATE acce.tbRoles
			SET role_Nombre = @role_Nombre,
			role_UserModificacion = @role_UserModificacion,
			role_FechaModificacion = GETDATE()
			WHERE role_ID = @role_ID
			SELECT '1'
	END
	ELSE
	BEGIN
			SELECT '2'
	END
	END TRY
	BEGIN CATCH
		SELECT '0'
	END CATCH
END

/*Roles Delete*/
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbRoles_Delete
@role_ID INT 
AS
BEGIN
	BEGIN TRY
		UPDATE acce.tbRoles
		SET role_Estado = 0 
		WHERE role_ID = @role_ID
		SELECT '1'
	END TRY
	BEGIN CATCH
		SELECT '0'
	END CATCH
END

/*Pantallas*/
/*Pantalla Select*/
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbPantallas_Select
AS
BEGIN
SELECT * FROM acce.tbPantallas
END



/*RolesXPantalla*/

/*RolesXPantalla View*/
GO
CREATE OR ALTER VIEW acce.VW_tbPantallasPorRoles
AS
SELECT [pantrole_ID], [role_ID], pantrole.[pant_ID],pant.pant_Nombre,pant_Url,[pant_Menu],[pant_HtmlID] ,[pantrole_UserCreacion], 
[pantrole_FechaCreacion], [pantrole_UserModificacion],
[pantrole_FechaModificacion], [pantrole_Estado]
FROM [acce].[tbPantallasPorRoles] pantrole INNER JOIN acce.tbPantallas pant
ON pantrole.pant_ID = pant.pant_ID

/*RolesXPantalla By role Id*/
	GO
	CREATE OR ALTER PROCEDURE acce.UDP_tbPantallaPorRolesByRoleID
	@role_ID INT
	AS
	BEGIN
	SELECT pant_ID
	FROM acce.VW_tbPantallasPorRoles
	WHERE role_ID = @role_ID
	END	

/*RolesXPantalla Insert*/
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbPantallasPorRoles_Insert
@role_ID INT,
@pant_ID INT,
@pantrole_UserCreacion INT
AS
BEGIN
	BEGIN TRY
	INSERT INTO acce.tbPantallasPorRoles([role_ID], 
	[pant_ID], [pantrole_UserCreacion], 
	[pantrole_FechaCreacion], [pantrole_UserModificacion], 
	[pantrole_FechaModificacion], [pantrole_Estado])
	VALUES(@role_ID,@pant_ID,@pantrole_UserCreacion,GETDATE(),NULL,NULL,1)
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END

/*RolesXPantalla Insert*/
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbPantallasPorRoles_Delete
@role_ID INT
AS
BEGIN
	BEGIN TRY
		DELETE acce.tbPantallasPorRoles
		WHERE role_ID = @role_ID
		SELECT '1'
	END TRY
	BEGIN CATCH
	SELECT '2'
	END CATCH
END
/*Empleados*/

/*Empelados View*/
GO
CREATE OR ALTER VIEW tllr.VW_tbEmpleados
AS
SELECT empe.[empe_Id], [empe_Nombres], 
[empe_Apellidos], [empe_Identidad], 
[empe_FechaNacimiento], [empe_Sexo], 
empe.[estacivi_ID],estacivi.estacivi_Nombre, empe.[muni_Id],muni.muni_Nombre,depto.depa_ID,depto.depa_Nombre
[empe_Direccion], [empe_Telefono], 
[empe_CorreoElectronico], empe.[sucu_Id],sucu.sucu_Descripcion, 
[empe_UsuCreacion],[user1].user_NombreUsuario AS empe_UserCreacion_Nombre, [empe_FechaCreacion], 
[empe_UsuModificacion],[user2].user_NombreUsuario AS empe_UserModificacion_Nombre, [empe_FechaModificacion], 
[empe_Estado] 
FROM [tllr].[tbEmpleados] empe INNER JOIN acce.tbUsuarios [user1]
ON empe.empe_UsuCreacion = user1.user_ID LEFT JOIN acce.tbUsuarios [user2]
ON empe.empe_UsuModificacion = user2.user_ID INNER JOIN [gral].[tbEstadosCiviles] estacivi
ON empe.[estacivi_ID] = estacivi.estacivi_ID INNER JOIN gral.tbMunicipios muni
ON empe.muni_Id = muni.muni_ID INNER JOIN tllr.tbSucursales sucu
ON empe.sucu_ID = sucu.sucu_ID INNER JOIN gral.tbDepartamentos depto
ON muni.depa_ID = depto.depa_ID
WHERE [empe_Estado] = 1

/*Empleados View UDP*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbEmpleados_VW
AS
BEGIN
SELECT * FROM tllr.VW_tbEmpleados
END

/*Compras*/

/*Compras View*/
GO
CREATE VIEW tllr.VW_tbCompras
AS
SELECT [comp_ID], comp.[prov_ID],prov.prov_Nombre, 
[comp_Fecha], [comp_Descuento], 
[comp_MontoFinal], [comp_Estado], 
[comp_UserCreacion],[user1].user_NombreUsuario AS comp_UserCreacion_Nombre, [comp_FechaCreacion], 
[comp_UserModificacion],[user2].user_NombreUsuario AS comp_UserModificacion_Nombre, [comp_FechaModificacion] 
FROM [tllr].[tbCompras] comp INNER JOIN acce.tbUsuarios [user1]
ON comp.comp_UserCreacion = user1.user_ID LEFT JOIN acce.tbUsuarios [user2]
ON comp.comp_UserModificacion = user2.user_ID INNER JOIN tllr.tbProveedores prov
ON comp.prov_ID = prov.prov_ID

/*Compras View UDP*/
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbCompras_VW
AS
BEGIN
SELECT * FROM tllr.VW_tbCompras
END
GO


--******************************************UDP tbMunicipios*********************************************--
CREATE OR ALTER PROCEDURE GRAL.UDP_tbMunicipios_LlenarMunicipiosPorDepto
	@depa_ID	INT
AS
BEGIN
	SELECT	 [muni_ID],
			 [muni_Nombre]
	FROM	 gral.tbMunicipios
	WHERE	 [depa_ID] = @depa_ID	
END
GO

--******************************************UDP /tbMunicipios*********************************************--

--******************************************UDP tbDepartamentos*********************************************--
CREATE OR ALTER PROCEDURE GRAL.UDP_tbDepartamentos_LlenarDepartamentos
	@depa_ID	INT
AS
BEGIN
	SELECT	 [depa_ID],
			 [depa_Nombre]
	FROM	gral.tbDepartamentos
END
GO

--******************************************UDP tbDepartamentos*********************************************--
--******************************************UDP tbEmpleados*********************************************--
CREATE OR ALTER PROCEDURE tllr.UDP_tbEmpleado_InsertarEmpleados
	  @empe_Nombres            NVARCHAR(150),
	  @empe_Apellidos          NVARCHAR(150),
	  @empe_Identidad          VARCHAR(13),
	  @empe_FechaNacimiento    DATE,
	  @empe_Sexo               CHAR(1),
	  @estacivi_Id             INT,
	  @muni_Id                 CHAR(4),    
	  @empe_Direccion          NVARCHAR(150),
	  @empe_Telefono           NVARCHAR(150),
	  @empe_CorreoElectronico  NVARCHAR(150),
	  @sucu_Id                 INT
AS
BEGIN
 BEGIN TRY 
   IF NOT EXISTS (SELECT empe_Identidad FROM tllr.tbEmpleados WHERE empe_Identidad = @empe_Identidad )
   BEGIN
     INSERT INTO tllr.tbEmpleados([empe_Nombres],[empe_Apellidos],[empe_Identidad],[empe_FechaNacimiento],[empe_Sexo],[estacivi_Id],[muni_Id],[empe_Direccion],[empe_Telefono],[empe_CorreoElectronico],[sucu_Id],[empe_UsuCreacion])
	VALUES (@empe_Nombres,@empe_Apellidos,@empe_Identidad,@empe_FechaNacimiento,@empe_Sexo,@estacivi_Id,@muni_Id,@empe_Direccion,@empe_Telefono,@empe_CorreoElectronico,@sucu_Id,1)
		SELECT '1'
   END
   ELSE
    SELECT '2'
 END TRY 
 BEGIN CATCH
    SELECT '0'
 END CATCH
END
GO

CREATE OR ALTER PROCEDURE tllr.UDP_tbEmpleado_ListarEmpleados
	@empe_Id	INT
AS
BEGIN
	SELECT	 [empe_Id],
			 [empe_Nombres]
	FROM	[tllr].[tbEmpleados]
END
GO

CREATE OR ALTER PROCEDURE tllr.UDP_tbRoles_ListarRoles
	@role_ID	INT
AS
BEGIN
	SELECT	 [role_ID],
			 [role_Nombre]
	FROM	[acce].[tbRoles]
END
GO

CREATE OR ALTER PROCEDURE tllr.UDP_tbEmpleado_ActualizarEmpleados
      @empe_ID                 INT, 
      @empe_Nombres            NVARCHAR(150),
	  @empe_Apellidos          NVARCHAR(150),
	  @empe_Identidad          VARCHAR(13),
	  @empe_FechaNacimiento    DATE,
	  @empe_Sexo               CHAR(1),
	  @estacivi_Id             INT,
	  @muni_Id                 CHAR(4),    
	  @empe_Direccion          NVARCHAR(150),
	  @empe_Telefono           NVARCHAR(150),
	  @empe_CorreoElectronico  NVARCHAR(150),
	  @sucu_Id                 INT
AS
BEGIN
   BEGIN TRY 
       IF NOT EXISTS (SELECT empe_Identidad FROM tllr.tbEmpleados WHERE empe_Id != @empe_ID AND empe_Identidad = @empe_Identidad)
		 BEGIN
		  UPDATE tllr.tbEmpleados 
		  SET   empe_Nombres = @empe_Nombres,
		        empe_Apellidos = @empe_Apellidos,
				empe_Identidad = @empe_Identidad,
				empe_FechaNacimiento = @empe_FechaNacimiento,
				empe_Sexo = @empe_Sexo,
				estacivi_Id = @estacivi_Id,
				muni_Id = @muni_Id,
				empe_Direccion = @empe_Direccion,
				empe_CorreoElectronico = @empe_CorreoElectronico,
				empe_Telefono = @empe_Telefono,
				sucu_Id = @sucu_Id
		WHERE   empe_Id = @empe_ID
		SELECT '1'
        END
        ELSE 
        SELECT '2'
   END TRY 
   BEGIN CATCH
          SELECT '0'
   END CATCH
END 
GO 

CREATE OR ALTER PROCEDURE acce.UDP_tbEmpleados_Delete
   @empe_Id INT
AS
BEGIN
    BEGIN TRY
        UPDATE [tllr].[tbEmpleados]
        SET [empe_Estado] = 0
        WHERE empe_Id = @empe_Id
        SELECT '1'
    END TRY
    BEGIN CATCH
        SELECT '0'
    END CATCH
END
--****************************************UDP tbEmpleados*****************************************************--
--/Usuarios Update/
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbUsuarios_Insert
	@user_NombreUsuario NVARCHAR(150),
	@user_Contraseña NVARCHAR(200),
	@role_ID INT,
	@empe_ID INT
AS
BEGIN
    BEGIN TRY
        IF NOT EXISTS (SELECT user_NombreUsuario FROM acce.tbUsuarios WHERE user_NombreUsuario = @user_NombreUsuario)
        BEGIN 
		DECLARE @Pass AS NVARCHAR(MAX);
		SET @Pass = CONVERT(NVARCHAR(MAX), HASHBYTES('sha2_512', @user_Contraseña), 2);
        INSERT INTO acce.tbUsuarios ([user_NombreUsuario], [user_Contrasena], [role_ID], [empe_ID],[user_UserCreacion])
        VALUES (@user_NombreUsuario,@Pass,@role_ID,@empe_ID,1)
        SELECT '1'
        END
        ELSE 
        SELECT '2'
    END TRY
    BEGIN CATCH
    SELECT '0'
    END CATCH
END
--/Usuarios Update/
GO
CREATE OR ALTER PROCEDURE acce.UDP_Usuarios_Update
@user_NombreUsuario NVARCHAR(150),
@role_ID INT,
@empe_ID INT,
@user_ID INT 
AS
BEGIN
    BEGIN TRY
        IF NOT EXISTS (SELECT user_NombreUsuario FROM acce.tbUsuarios WHERE user_NombreUsuario = @user_NombreUsuario)
            BEGIN
            UPDATE acce.tbUsuarios
            SET [user_NombreUsuario] = @user_NombreUsuario,
                [role_ID] = @role_ID,
                [empe_ID] = @empe_ID,
                [user_UserModificacion] = 1,
                [user_FechaModificacion] = GETDATE()
            WHERE user_ID  = @user_ID
            SELECT    '1'
            END
            ELSE
            SELECT  '2'
    END TRY
    BEGIN CATCH
            SELECT '0'
    END CATCH
END
--/Usuarios Delete/
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbUsuarios_Delete
@user_ID INT
AS
BEGIN
    BEGIN TRY
        UPDATE acce.tbUsuarios
        SET [user_Estado] = 0
        WHERE user_ID = @user_ID
        SELECT '1'
    END TRY
    BEGIN CATCH
        SELECT '0'
    END CATCH
END
--*********************************************UDP /tbClientes**************************************--
--Clientes CREATE 
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbClientes_Insert
	@clie_Nombres NVARCHAR(150),
	@clie_Apellidos NVARCHAR(200),
	@clie_Sexo  CHAR(1),
	@clie_FechaNacimiento DATETIME,
	@clie_Telefono NVARCHAR(20),
	@clie_CorreoElectronico NVARCHAR(50),
	@muni_ID  INT
AS
BEGIN
    BEGIN TRY
        INSERT INTO tllr.tbClientes ([clie_Nombres], [clie_Apellidos], [clie_Sexo], [clie_FechaNacimiento], [clie_Telefono],[clie_CorreoElectronico],[muni_ID],[clie_UserCreacion])
        VALUES (@clie_Nombres,@clie_Apellidos,@clie_Sexo,@clie_FechaNacimiento,@clie_Telefono,@clie_CorreoElectronico,@muni_ID,1)
        SELECT '1'     
    END TRY
    BEGIN CATCH
    SELECT '0'
    END CATCH
END

--Clientes UPDATE
GO
CREATE OR ALTER PROCEDURE tllr.UDP_tbClientes_Update
	@clie_ID  INT,
	@clie_Nombres NVARCHAR(150),
	@clie_Apellidos NVARCHAR(200),
	@clie_Sexo  CHAR(1),
	@clie_FechaNacimiento DATE,
	@clie_Telefono NVARCHAR(20),
	@clie_CorreoElectronico NVARCHAR(50),
	@muni_ID  INT
AS
BEGIN
    BEGIN TRY          
            UPDATE tllr.tbClientes
            SET [clie_Nombres] = @clie_Nombres,
                [clie_Apellidos] = @clie_Apellidos,
                [clie_Sexo] = @clie_Sexo,
                [clie_FechaNacimiento] = @clie_FechaNacimiento,
                [clie_Telefono] = @clie_Telefono,
				[clie_CorreoElectronico] = @clie_CorreoElectronico,
                [muni_ID] = @muni_ID,
                [clie_UserModificacion] = 1,
                [clie_FechaModificacion] = GETDATE()
            WHERE  [clie_ID] = @clie_ID
            SELECT    '1'
    END TRY
    BEGIN CATCH
            SELECT '0'
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE tllr.UDP_tbClientes_Delete
@clie_ID INT
AS
BEGIN
    BEGIN TRY
        UPDATE [tllr].[tbClientes]
        SET [clie_Estado] = 0
        WHERE clie_ID = @clie_ID
        SELECT '1'
    END TRY
    BEGIN CATCH
        SELECT '0'
    END CATCH
END
--********************************************UDP /tbClientes***************************************--
--********************************************UDP /tbEstadosCiviles*********************************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbEstadosCiviles_Insert
   @estacivi_Nombre NVARCHAR(50)
AS
BEGIN
    BEGIN TRY
        IF NOT EXISTS (SELECT estacivi_Nombre FROM gral.tbEstadosCiviles WHERE estacivi_Nombre = @estacivi_Nombre)
        BEGIN 
        INSERT INTO gral.tbEstadosCiviles ([estacivi_Nombre],[estacivi_UserCreacion])
        VALUES (@estacivi_Nombre,1)
        SELECT '1'
        END
        ELSE 
        SELECT '2'
    END TRY
    BEGIN CATCH
    SELECT '0'
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE gral.UDP_tbEstadosCiviles_Update
@estacivi_ID     INT,
@estacivi_Nombre NVARCHAR(50)
AS
BEGIN
    BEGIN TRY
        IF NOT EXISTS (SELECT estacivi_Nombre FROM gral.tbEstadosCiviles WHERE estacivi_Nombre = @estacivi_Nombre)
            BEGIN
            UPDATE gral.tbEstadosCiviles
            SET estacivi_Nombre = @estacivi_Nombre,
                [estacivi_UserModificacion] = 1,
                [estacivi_FechaModificacion] = GETDATE()
            WHERE [estacivi_ID]  = @estacivi_ID
            SELECT    '1'
            END
            ELSE
            SELECT  '2'
    END TRY
    BEGIN CATCH
            SELECT '0'
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE gral.UDP_tbEstadosCiviles_Delete
@estacivi_ID     INT
AS
BEGIN
    BEGIN TRY
        UPDATE gral.tbEstadosCiviles
        SET [estacivi_Estado] = 0
        WHERE estacivi_ID = @estacivi_ID
        SELECT '1'
    END TRY
    BEGIN CATCH
        SELECT '0'
    END CATCH
END


--********************************************UDP /tbEstadosCiviles*********************************--
--********************************************UDP /tbMetodosPago************************************--
go
CREATE OR ALTER PROCEDURE gral.UDP_tbMetodosdePago_Insert
		@meto_Nombre NVARCHAR(100)
AS
BEGIN
    BEGIN TRY
        IF NOT EXISTS (SELECT [meto_Nombre] FROM gral.tbMetodosPago WHERE [meto_Nombre] = @meto_Nombre)
        BEGIN 
        INSERT INTO gral.tbMetodosPago ([meto_Nombre],[meto_UserCreacion])
        VALUES (@meto_Nombre,1)
        SELECT '1'
        END
        ELSE 
        SELECT '2'
    END TRY
    BEGIN CATCH
    SELECT '0'
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE gral.UDP_tbMetodosdePago_Update
   @meto_ID      INT,
   @meto_Nombre  NVARCHAR(150)
AS
BEGIN
    BEGIN TRY
        IF NOT EXISTS (SELECT [meto_Nombre] FROM gral.tbMetodosPago WHERE [meto_Nombre] = @meto_Nombre)
            BEGIN
            UPDATE gral.tbMetodosPago
            SET [meto_Nombre] = @meto_Nombre,
                [meto_UserModificacion] = 1,
                 [meto_FechaModificacion]= GETDATE()
            WHERE  [meto_ID] = @meto_ID
            SELECT    '1'
            END
            ELSE
            SELECT  '2'
    END TRY
    BEGIN CATCH
            SELECT '0'
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE gral.UDP_tbMetodosPago_Delete
 @meto_ID INT
AS
BEGIN
    BEGIN TRY
        UPDATE [gral].[tbMetodosPago]
        SET [meto_Estado] = 0
        WHERE [meto_ID] = @meto_ID
        SELECT '1'
    END TRY
    BEGIN CATCH
        SELECT '0'
    END CATCH
END
GO
--********************************************UDP /tbMetodosPago************************************--
--********************************************UDP Grafica*******************************************--
CREATE OR ALTER VIEW tllr.VW_ServiciosMasSolicitados
AS
SELECT TOP 5
    s.serv_Descripcion,
    COUNT(*) AS CantidadServicios
FROM tllr.tbServicios s
INNER JOIN tllr.tbDetallesventas d ON s.serv_ID = d.serv_ID
GROUP BY s.serv_ID, s.serv_Descripcion
ORDER BY CantidadServicios DESC;
GO

CREATE OR ALTER PROCEDURE tllr.SP_GetServiciosMasSolicitados
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM tllr.VW_ServiciosMasSolicitados;
END;
GO

CREATE OR ALTER VIEW tllr.vwClientesConMasVehiculos 
AS
SELECT TOP 5
    c.clie_ID,
    c.clie_Nombres,
    COUNT(cv.vehi_ID) AS total_vehiculos
FROM 
    tllr.tbClienteS c
    JOIN tllr.tbClientePorVehiculo cv ON c.clie_ID = cv.clie_ID
GROUP BY 
    c.clie_ID,
    c.clie_Nombres
ORDER BY 
    total_vehiculos DESC;
GO
	
CREATE OR ALTER PROCEDURE tllr.SP_GetClientesConMasVehiculos 
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM tllr.vwClientesConMasVehiculos;
END;
GO

CREATE VIEW tllr.vwTopProveedores 
AS
SELECT 
    p.prov_Nombre, 
    COUNT(r.resp_ID) AS TotalRepuestos 
FROM 
    tllr.tbProveedores p 
    INNER JOIN tllr.tbRepuestos r ON p.prov_ID = r.prov_ID 
WHERE 
    p.prov_Estado = 1 
    AND r.resp_Estado = 1 
GROUP BY 
    p.prov_Nombre 
HAVING 
    COUNT(r.resp_ID) > 10;
GO

CREATE PROCEDURE tllr.uspGetTopProveedores
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM tllr.vwTopProveedores;
END;
--********************************************UDP Grafica*******************************************--
GO 
CREATE OR ALTER PROCEDURE acce.tbRolesPorPantallaMenu
	@role_ID	INT,
	@esAdmin	BIT
AS
BEGIN
	IF @esAdmin = 1
		BEGIN
			SELECT DISTINCT pant_Id, pant_Nombre, pant_Url, pant_Menu, pant_HtmlId, @role_Id AS role_Id, @esAdmin AS esAdmin
			FROM [acce].[tbPantallas] 
		END
	ELSE
		SELECT DISTINCT T1.pant_Id, pant_Nombre, pant_Url, pant_Menu, pant_HtmlId, @role_Id AS role_Id, @esAdmin AS esAdmin
		FROM [acce].[tbPantallas] T1 INNER JOIN [acce].[tbPantallasPorRoles] T2
		ON T1.pant_Id = T2.pant_Id
		WHERE role_Id = @role_Id
END


/*User Recover*/
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbUsuarios_Recover
@user_NombreUsuario NVARCHAR(100),
@user_Contrasena NVARCHAR(MAX)
AS
BEGIN
BEGIN TRY
DECLARE @contraEncriptada NVARCHAR(MAX) = HASHBYTES('SHA2_512', @user_Contrasena);
IF EXISTS(SELECT user_NombreUsuario FROM acce.tbUsuarios WHERE user_NombreUsuario = @user_NombreUsuario)
	BEGIN
	UPDATE acce.tbUsuarios
SET user_Contrasena = @contraEncriptada
SELECT '1'
	END
	ELSE
	SELECT '2'
END TRY
BEGIN CATCH
SELECT '0'
END CATCH
END


