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
	prov_Nombre					NVARCHAR(200) NOT NULL,
	prov_CorreoElectronico      NVARCHAR(200) NOT NULL,
	prov_Telefono				NVARCHAR(15)NOT NULL,
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
clie_Id INT NOT NULL,
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
vehi_ID INT NOT NULL,
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
CONSTRAINT FK_tllr_tbClientes_vehi_ID FOREIGN KEY (vehi_ID) REFERENCES tllr.tbVehiculos (vehi_ID),
CONSTRAINT FK_tllr_gral_tbClientes_muni_ID FOREIGN KEY (muni_ID) REFERENCES gral.tbMunicipios (muni_ID),
CONSTRAINT FK_tllr_acce_tbClientes_clie_UserCreacion FOREIGN KEY (clie_UserCreacion) REFERENCES acce.tbUsuarios (user_ID),
CONSTRAINT FK_tllr_acce_tbClientes_clie_UserModificacion FOREIGN KEY (clie_UserModificacion) REFERENCES acce.tbUsuarios (user_ID)
)

/*Añadir constraint de vehiculos con cliente*/
ALTER TABLE tllr.tbVehiculos
ADD CONSTRAINT FK_tllr_tbVehiculos_clie_ID FOREIGN KEY (clie_ID) REFERENCES tllr.tbClientes (clie_ID)


