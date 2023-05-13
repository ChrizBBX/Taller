USE Taller

--INSERT TABLA ROLES

INSERT INTO acce.tbRoles(role_Nombre,role_UserCreacion)
VALUES 
       ('Vendedor',1),
       ('Administrador',1),
	   ('Recepcionista',1),
	   ('Digitador',1)

--INSERT TABLA PANTALLAS

INSERT INTO acce.tbPantallas(pant_Nombre,pant_Url,pant_Menu,pant_HtmlID,pant_UserCreacion)
VALUES ('Estados Civiles','/EstadoCivil/Listado','General','estadoscivilesItem',1),
       ('Clientes', '/Clientes/Listado', 'Taller', 'clientesItem', 1),
	   ('Empleados', '/Empleados/Listado','Taller', 'empleadosItem', 1),
	   ('Métodos de Pago', '/MetodosPago/Listado', 'General', 'metodosItem', 1),
	   ('Proveedores', '/Proveedor/Listado', 'Taller', 'proveedoresItem', 1),
	   ('Usuarios', '/Usuario/Listado', 'Acceso', 'usuariosItem', 1),
	   ('Sucursales', '/Sucursal/Listado', 'Taller', 'sucursalesItem', 1),
	   ('Vehiculos', '/Vehiculos/Listado', 'Taller', 'vehiculosItem', 1),
	   ('Ventas', '/Ventas/Listado', 'Taller', 'ventasItem', 1),
	   ('Detalles Ventas', '/DetalleVentas/Listado', 'Taller', 'detallesventasItem', 1),
	   ('Compras', '/Compras/Listado', 'Taller', 'comprasItem', 1),
	   ('Detalles Compras', '/DetallesCompras/Listado', 'Taller', 'detallescomprasItem', 1),
	   ('Cliente Por Vehiculo', '/ClientePorVehiculo/Listado', 'Taller', 'clienteporvehiculoItem', 1),
	   ('Marcas', '/Marcas/Listado', 'Taller', 'marcasItem', 1),
	   ('Modelos', '/Modelos/Listado', 'Taller', 'modelosItem', 1),
	   ('Repuestos', '/Repuestos/Listado', 'Taller', 'repuestosItem', 1),
	   ('Servicios', '/Servicios/Listado', 'Taller', 'serviciosItem', 1)

--INSERT TABLA PATALLAS POR ROLES

INSERT INTO acce.tbPantallasPorRoles(role_ID,pant_ID,pantrole_UserCreacion)
VALUES (1,8,1),
       (1,14,1),
	   (1,15,1),
	   (1,13,1),
       (2,16,1),
       (2,9,1),
	   (2,10,1),
	   (2,11,1),
	   (2,12,1),
	   (2,4,1),
	   (3,1,1),
	   (3,2,1),
	   (3,3,1),
	   (3,4,1),
	   (3,5,1),
	   (3,6,1),
	   (3,7,1),
	   (3,8,1),
	   (3,9,1),
	   (3,10,1),
	   (3,11,1),
	   (3,12,1),
	   (3,13,1),
	   (3,14,1),
	   (3,15,1),
	   (3,16,1),
	   (3,17,1),
	   (4,14,1),
	   (4,2,1),
	   (4,17,1),
       (5,2,1),
	   (5,3,1),
	   (5,6,1),
	   (5,7,1),
	   (5,5,1)

--INSERTS DEPARTAMENTOS
INSERT INTO  gral.tbDepartamentos(depa_ID,depa_Nombre,depa_UserCreacion)
VALUES ('01', 'Atlántida',1);
GO

INSERT INTO  gral.tbDepartamentos(depa_ID,depa_Nombre,depa_UserCreacion)
VALUES ('02', 'Colón',1);
GO

INSERT INTO  gral.tbDepartamentos(depa_ID,depa_Nombre,depa_UserCreacion)
VALUES ('03', 'Comayagua',1);
GO

INSERT INTO  gral.tbDepartamentos(depa_ID,depa_Nombre,depa_UserCreacion)  
VALUES ('04', 'Copán',1);
GO

INSERT INTO  gral.tbDepartamentos(depa_ID,depa_Nombre,depa_UserCreacion)  
VALUES ('05', 'Cortés',1);
GO

INSERT INTO  gral.tbDepartamentos(depa_ID,depa_Nombre,depa_UserCreacion)  
VALUES ('06', 'Choluteca',1);
GO

INSERT INTO  gral.tbDepartamentos(depa_ID,depa_Nombre,depa_UserCreacion) 
VALUES ('07', 'El Paraíso',1);
GO

INSERT INTO  gral.tbDepartamentos(depa_ID,depa_Nombre,depa_UserCreacion)
VALUES ('08', 'Francisco Morazán',1);
GO

INSERT INTO  gral.tbDepartamentos(depa_ID,depa_Nombre,depa_UserCreacion)
VALUES ('09', 'Gracias a Dios',1);
GO

INSERT INTO  gral.tbDepartamentos(depa_ID,depa_Nombre,depa_UserCreacion)
VALUES ('10', 'Intibucá',1);
GO

INSERT INTO  gral.tbDepartamentos(depa_ID,depa_Nombre,depa_UserCreacion)
VALUES ('11', 'Islas de la Bahía',1);
GO

INSERT INTO  gral.tbDepartamentos(depa_ID,depa_Nombre,depa_UserCreacion)
VALUES ('12', 'La Paz',1);
GO

INSERT INTO  gral.tbDepartamentos(depa_ID,depa_Nombre,depa_UserCreacion)
VALUES ('13', 'Lempira',1);
GO

INSERT INTO  gral.tbDepartamentos(depa_ID,depa_Nombre,depa_UserCreacion)
VALUES ('14', 'Ocotepeque',1);
GO

INSERT INTO  gral.tbDepartamentos(depa_ID,depa_Nombre,depa_UserCreacion)
VALUES ('15', 'Olancho',1);
GO

INSERT INTO  gral.tbDepartamentos(depa_ID,depa_Nombre,depa_UserCreacion)
VALUES ('16', 'Santa Bárbara',1);
GO

INSERT INTO  gral.tbDepartamentos(depa_ID,depa_Nombre,depa_UserCreacion)
VALUES ('17', 'Valle',1);
GO

INSERT INTO  gral.tbDepartamentos(depa_ID,depa_Nombre,depa_UserCreacion)
VALUES ('18', 'Yoro',1);
GO

--INSERTS MUNICIPIOS

INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0101','La Ceiba','01',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0102','El Porvenir','01',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0103','Esparta','01',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0104','Jutiapa','01',1);
GO
INSERT INTO  gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0105','La Masica','01',1);
GO
INSERT INTO  gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0106','San Francisco','01',1);
GO
INSERT INTO  gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0107','Tela','01',1);
GO
INSERT INTO  gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0108','Arizona','01',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0201','Trujillo','02',1);
GO
INSERT INTO  gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0202','Balfate','02',1);
GO
INSERT INTO  gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0203','Iriona','02',1);
GO
INSERT INTO  gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0204','Limón','02',1);
GO
INSERT INTO  gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0205','Sabá','02',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0206','Santa Fe','02',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0207','Santa Rosa de Aguán','02',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0208','Sonaguera','02',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0209','Tocoa','02',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0210','Bonito Oriental','02',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0301','Comayagua','03',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0302','Ajuterique','03',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0303','El Rosario','03',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0304','Esquías','03',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0305','Humuya','03',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0306','La Libertad','03',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0307','Lamaní','03',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0308','La Trinidad','03',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0309','Lejamaní','03',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0310','Meámbar','03',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0311','Minas de Oro','03',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0312','Ojos de Agua','03',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0313','San Jerónimo','03',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0314','San José de Comayagua','03',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0315','San José del Potrero','03',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0316','San Luis','03',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0317','San Sebastián','03',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0318','Siguatepeque','03',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0319','Villa de San Antonio','03',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0320','Las Lajas','03',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0321','Taulabé','03',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0401','Santa Rosa de Copán','04',1);
 GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0402','Cabañas','04',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0403','Concepción','04',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0404','Copán Ruinas','04',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0405','Corquín','04',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0406','Cucuyagua','04',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0407','Dolores','04',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0408','Dulce Nombre','04',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0409','El Paraíso','04',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0410','Florida','04',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0411','La Jigua','04',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0412','La Unión','04',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0413','Nueva Arcadia','04',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0414','San Agustín','04',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0415','San ANTONIO','04',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0416','San Jerónimo','04',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0417','San José','04',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0418','San Juan de Opoa','04',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0419','San Nicolás','04',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0420','San Pedro','04',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0421','Santa Rita','04',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0422','Trinidad de Copán','04',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0423','Veracruz','04',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0501','San Pedro Sula','05',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0502','Choloma','05',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0503','Omoa','05',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0504','Pimienta','05',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0505','Potrerillos','05',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0506','Puerto Cortés','05',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0507','San Antonio de Cortés','05',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0508','San Francisco de Yojoa','05',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0509','San Manuel','05',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0510','Santa Cruz de Yojoa','05',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0511','Villanueva','05',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0512','La Lima','05',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0601','Choluteca','06',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0602','Apacilagua','06',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0603','Concepción de María','06',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0604','Duyure','06',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0605','El Corpus','06',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0606','El Triunfo','06',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0607','Marcovia','06',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])	
VALUES('0608','Morolica','06',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0609','Namasigüe','06',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0610','Orocuina','06',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0611','Pespire','06',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0612','San Antonio de Flores','06',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0613','San Isidro','06',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0614','San José','06',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0615','San Marcos de Colón','06',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0616','Santa Ana de Yusguare,','06',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0701','Yuscarán','07',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0702','Alauca','07',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0703','Danlí','07',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0704','El Paraíso','07',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0705','"Güinope','07',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0706','Jacaleapa','07',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0707','Liure','07',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0708','Morocelí','07',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0709','Oropolí','07',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0710','Potrerillos','07',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0711','San Antonio de Flores','07',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0712','San Lucas','07',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0713','San Matías','07',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0714','Soledad','07',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0715','Teupasenti','07',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0716','Texiguat','07',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0717','Vado Ancho','07',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0718','Yauyupe','07',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0719','Trojes','07',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0801','Distrito Central (Tegucigalpa y Comayaguela)','08',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0802','Alubarén','08',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0803','Cedros','08',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0804','Curarén','08',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0805','El Porvenir','08',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0806','Guaimaca','08',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0807','La Libertad','08',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0808','La Venta','08',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0809','Lepaterique','08',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0810','Maraita','08',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0811','Marale','08',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0812','Nueva Armenia','08',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0813','Ojojona','08',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0814','Orica (Francisco Morazan)','08',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0815','Reitoca','08',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0816','Sabanagrande','08',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0817','San Antonio de Oriente','08',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0818','San Buenaventura','08',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0819','San Ignacio','08',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0820','San Juan de Flores o como se le conoce Cantarrana','08',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0821','San Miguelito','08',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0822','Santa Ana','08',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0823','Santa Lucía','08',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0824','Talanga','08',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0825','Tatumbla','08',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0826','Valle de Ángeles','08',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0827','Villa de San Francisco','08',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0828','Vallecillo','08',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0901','Puerto Lempira','09',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0902','Brus Laguna','09',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0903','Ahuas','09',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0904','Juan Francisco Bulnes','09',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('0905','Ramón Villeda Morales','09',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('0906','Wampusirpe','09',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1001','La Esperanza','10',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1002','Camasca','10',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1003','Colomoncagua','10',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1004','Concepción','10',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1005','Dolores','10',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1006','Intibucá','10',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1007','Jesús de Otoro','10',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1008','Magdalena','10',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1009','Masaguara','10',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1010','San Antonio','10',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1011','San Isidro','10',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1012','San Juan','10',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1013','San Marcos de la Sierra','10',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1014','San Miguel Guancapla','10',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1015','Santa Lucía','10',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1016','Yamaranguila','10',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1017','San Francisco de Opalaca','10',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1101','Roatán','11',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1102','Guanaja','11',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1103','José Santos Guardiola','11',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1104','Utila','11',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1201','La Paz','12',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1202','Aguanqueterique','12',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1203','Cabañas','12',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1204','Cane','12',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1205','Chinacla','12',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1206','Guajiquiro','12',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1207','Lauterique','12',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1208','Marcala','12',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1209','Mercedes de Oriente','12',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1210','Opatoro','12',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1211','San Antonio del Norte','12',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1212','San José','12',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1213','San Juan','12',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1214','San Pedro de Tutule','12',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1215','Santa Ana','12',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1216','Santa Elena','12',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1217','Santa María','12',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1218','Santiago de Puringla','12',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1219','Yarula','12',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1301','Gracias','13',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1302','Belén','13',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1303','Candelaria','13',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1304','Cololaca','13',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1305','Erandique','13',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1306','Gualcince','13',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1307','Guarita','13',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1308','La Campa','13',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1309','La Iguala','13',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1310','LaS Flores','13',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1311','La Unión','13',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1312','La Virtud','13',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1313','Lepaera','13',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1314','Mapulaca','13',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1315','Piraera','13',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1316','San Andrés','13',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1317','San Francisco','13',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1318','San Juan Guarita','13',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1319','San Manuel Colohete','13',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1320','San Rafael','13',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1321','San Sebastián','13',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1322','Santa Cruz','13',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1323','Talgua','13',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1324','Tambla','13',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1325','Tomalá','13',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1326','Valladolid','13',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1327','Virginia','13',1);
GO
INSERT INTO GRAL.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1328','San Marcos de Caiquín','13',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1401','Nueva Ocotepeque','14',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1402','Belén Gualcho','14',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1403','Concepción','14',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1404','Dolores Merendón','14',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1405','Fraternidad','14',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1406','La Encarnación','14',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1407','La Labor','14',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1408','Lucerna','14',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1409','Mercedes','14',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1410','San Fernando','14',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1411','San Francisco del Valle','14',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1412','San Jorge','14',1);
 GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1413','San Marcos','14',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1414','Santa Fe','14',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1415','Sensenti','14',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1416','Sinuapa','14',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1501','Juticalpa','15',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1502','Campamento','15',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1503','Catacamas','15',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1504','Concordia','15',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1505','Dulce Nombre de Culmí','15',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1506','El Rosario','15',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1507','Esquipulas del Norte','15',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1508','Gualaco','15',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1509','Guarizama','15',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1510','GUATA','15',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1511','Guayape','15',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1512','Jano','15',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1513','La UNIÓN','15',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1514','Mangulile','15',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1515','Manto','15',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1516','Salamá','15',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1517','San Esteban','15',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1518','San Francisco de Becerra','15',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1519','San Francisco de la Paz','15',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1520','Santa María del Real','15',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1521','Silca','15',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1522','Yocón','15',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1523','Patuca','15',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1601','Santa Bárbara','16',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1602','Arada','16',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1603','Atima','16',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1604','Azacualpa','16',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1605','Ceguaca','16',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1606','San José de las Colinas','16',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1607','Concepción del Norte','16',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1608','Concepción del Sur','16',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1609','Chinda','16',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1610','El Níspero','16',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1611','Gualala','16',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1612','Ilama','16',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1613','Macuelizo','16',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1614','Naranjito','16',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1615','Nuevo Celilac','16',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1616','Petoa','16',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1617','Protección','16',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1618','Quimistán','16',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1619','San Francisco de Ojuera','16',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1620','San Luis','16',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1621','San Marcos','16',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1622','San Nicolás','16',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1623','San Pedro Zacapa','16',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1624','Santa Rita','16',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1625','San Vicente Centenario','16',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1626','Trinidad','16',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1627','LaS Vegas','16',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1628','Nueva Frontera','16',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1701','Nacaome','17',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1702','Alianza','17',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1703','Amapala','17',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1704','Aramecina','17',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1705','Caridad','17',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1706','Goascorán','17',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1707','Langue','17',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1708','San Francisco de Coray','17',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1709','San Lorenzo','17',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1801','Yoro','18',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1802','Arenal','18',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1803','El Negrito','18',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1804','El Progreso','18',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1805','Jocón','18',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1806','Morazán','18',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1807','Olanchito','18',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1808','Santa Rita','18',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1809','Sulaco','18',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion])
VALUES('1810','Victoria','18',1);
GO
INSERT INTO gral.tbMunicipios([muni_ID],[muni_Nombre],[depa_ID],[muni_UserCreacion]) 
VALUES('1811','Yorito','18',1);


--INSERTS ESTADO CIVIL
INSERT INTO gral.tbEstadosCiviles([estacivi_Nombre],[estacivi_UserCreacion])
VALUES('Soltero(a)',1),
      ('Casado(a)',1),
	  ('Divorciado(a)',1),
      ('Union Libre',1),
	  ('Viudo(a)',1)
GO

--INSERTS METODO PAGOS

INSERT INTO gral.tbMetodosPago([meto_Nombre],[meto_UserCreacion])
VALUES ('Efectivo',1),
       ('Tranferencia',1),
	   ('Tarjeta',1),
	   ('Depositivo',1)

--INSERTS PROVEEDORES

INSERT INTO tllr.tbProveedores(prov_Rut,[prov_Nombre],[prov_CorreoElectronico],[prov_Telefono],[prov_Dirrecion],[prov_UserCreacion])
VALUES('05051992168540','Carolina Nicolle','carolina64@gmail.com', '3132-3334','Col. Edilberto Solano',  1)
GO

INSERT INTO tllr.tbProveedores(prov_Rut,[prov_Nombre],[prov_CorreoElectronico],[prov_Telefono],[prov_Dirrecion],[prov_UserCreacion])
VALUES('08011998254871','Javier Alejandro','javi85@gmail.com', '9192-9394','Col. Trincheras',  1);
GO

INSERT INTO tllr.tbProveedores(prov_Rut,[prov_Nombre],[prov_CorreoElectronico],[prov_Telefono],[prov_Dirrecion],[prov_UserCreacion])
VALUES('14061995162542','Juan Fabricio', 'juan@gmail.com',  '9493-9291', 'Col. Trejo',1);
GO

INSERT INTO tllr.tbProveedores(prov_Rut,[prov_Nombre],[prov_CorreoElectronico],[prov_Telefono],[prov_Dirrecion],[prov_UserCreacion])
VALUES('07012001948573','Mario Roberto','mario9@gmail.com', '8182-8384','Col. Satelite',  1);
GO

INSERT INTO tllr.tbProveedores(prov_Rut,[prov_Nombre],[prov_CorreoElectronico],[prov_Telefono],[prov_Dirrecion],[prov_UserCreacion])
VALUES('05032002084514','Allan Manuel', 'allma844@gmail.com','3433-3231', 'Col. Rivera Hernandez',  1);
GO

INSERT INTO tllr.tbProveedores(prov_Rut,[prov_Nombre],[prov_CorreoElectronico],[prov_Telefono],[prov_Dirrecion],[prov_UserCreacion])
VALUES('17062003168456','Sonny Eduardo', 'sonny74@gmail.com', '9091-9293','Res. Villas Makey',  1);
GO

INSERT INTO tllr.tbProveedores(prov_Rut,[prov_Nombre],[prov_CorreoElectronico],[prov_Telefono],[prov_Dirrecion],[prov_UserCreacion])
VALUES('08042001141515', 'Maria Stephanie', 'marist@gmail.com', '8081-8283','Col. Kennedy',  1);
GO

INSERT INTO tllr.tbProveedores(prov_Rut,[prov_Nombre],[prov_CorreoElectronico],[prov_Telefono],[prov_Dirrecion],[prov_UserCreacion])
VALUES('05012000139878', 'Roger Alexander','roger@gmail.com',  '9392-9190','Col. Fesitranh', 1);
GO

INSERT INTO tllr.tbProveedores(prov_Rut,[prov_Nombre],[prov_CorreoElectronico],[prov_Telefono],[prov_Dirrecion],[prov_UserCreacion])
VALUES( '11071999198457','Nadia Jiovanessy','nadiaji99@gmail.com',  '3332-3130','Col. Ideal', 1);
GO

INSERT INTO tllr.tbProveedores(prov_Rut,[prov_Nombre],[prov_CorreoElectronico],[prov_Telefono],[prov_Dirrecion],[prov_UserCreacion])
VALUES('15082003245169', 'Santos Domingo','santosdomin85@gmail.com',  '9192-9397','Col. Rio Blanco', 1);
GO

INSERT INTO tllr.tbProveedores(prov_Rut,[prov_Nombre],[prov_CorreoElectronico],[prov_Telefono],[prov_Dirrecion],[prov_UserCreacion])
VALUES('06131998178530', 'Jose Miguel',  'josemiguel45@gmail.com',  '9965-1235','Res. Campisa',1);
GO

--INSERTS TABLA SUCURSALES
INSERT INTO tllr.tbSucursales([sucu_Descripcion],[muni_ID],[sucu_DireccionExacta],[sucu_UserCreacion])
VALUES('Sucursal Pedregal','0501','colonia pedregal, a la par de la U',1);
GO

INSERT INTO tllr.tbSucursales([sucu_Descripcion],[muni_ID],[sucu_DireccionExacta],[sucu_UserCreacion])
VALUES('Sucursal Rivera','0802','Colonia nueva villa, bloque 20, calle 15',1);
GO

INSERT INTO tllr.tbSucursales([sucu_Descripcion],[muni_ID],[sucu_DireccionExacta],[sucu_UserCreacion])
VALUES('Sucursal Montaña grande','0701','Calle valero, avenido 2, colonia miguel juan',1);
GO

INSERT INTO tllr.tbSucursales([sucu_Descripcion],[muni_ID],[sucu_DireccionExacta],[sucu_UserCreacion])
VALUES('Sucursal el denque','0102','Calle aguan, colonia aguan etapa 3',1);
GO

INSERT INTO tllr.tbSucursales([sucu_Descripcion],[muni_ID],[sucu_DireccionExacta],[sucu_UserCreacion])
VALUES('Sucursal Galeria del valle','0501','Centro Comercial Galerias mall',1);
GO

INSERT INTO tllr.tbSucursales([sucu_Descripcion],[muni_ID],[sucu_DireccionExacta],[sucu_UserCreacion])
VALUES('Sucursal Nuevo san Juan','0106','Colonia nueva san juan',1);
GO

INSERT INTO tllr.tbSucursales([sucu_Descripcion],[muni_ID],[sucu_DireccionExacta],[sucu_UserCreacion])
VALUES('Sucursal RoatanIslandBay','1101','Colonia playa bonita convio a west bay',1);
GO

INSERT INTO tllr.tbSucursales([sucu_Descripcion],[muni_ID],[sucu_DireccionExacta],[sucu_UserCreacion])
VALUES('Sucursal Choloma Centro','0502','Choloma centro frente a mall solecito brilla',1);
GO

INSERT INTO tllr.tbSucursales([sucu_Descripcion],[muni_ID],[sucu_DireccionExacta],[sucu_UserCreacion])
VALUES('Sucursal Casa de Alex','0502','La casa de alex, a la par de a saber donde XD',1);
GO

INSERT INTO tllr.tbSucursales([sucu_Descripcion],[muni_ID],[sucu_DireccionExacta],[sucu_UserCreacion])
VALUES('Sucursal Casa de Ian','0502','La casa de Ian, sobre el monte olimpo vive con ZEUS',1);
GO

INSERT INTO tllr.tbSucursales([sucu_Descripcion],[muni_ID],[sucu_DireccionExacta],[sucu_UserCreacion])
VALUES('Sucursal La lima','0501','La lima centro frente a la municipalidad',1);
GO

--INSERTS TABLA MARCAS
INSERT INTO tllr.tbMarcas([marc_Nombre],marc_UserCreacion)
VALUES ('BMW',1),
       ('Audi',1),
	   ('Hyundai',1),
	   ('Honda',1),
	   ('Ford',1),
	   ('Toyota',1),
	   ('Volkswagen',1),
	   ('Fiat',1),
	   ('Jeep',1),
	   ('Kia',1),
	   ('Chevrolet',1)

--INSERTS TABLA MODELOS
INSERT INTO tllr.tbModelos(marc_ID,mode_Nombre,mode_UserCreacion)
VALUES (1,'Serie 2 Gran Tourer',1),
	   (2,'A6 Allroad Quattro',1),
	   (3,'Elantra',1),
	   (4,'Civic',1),
	   (5,'Mustang',1),
	   (6,'Tacoma',1),
	   (7,'Nivus',1),
	   (8,'Punto',1),
	   (9,'Grand Cherokee',1),
	   (10,'Picanto',1),
	   (11,'Camaro',1)

INSERT INTO tllr.tbClientes([clie_Nombres],[clie_Apellidos],[clie_Sexo],[clie_FechaNacimiento],[clie_Telefono],[clie_CorreoElectronico],[muni_ID],[clie_UserCreacion])
VALUES('Mágdaly Zúniga',' Alvarado','F', '04-02-1992','3339-6645', 'magdalyz22@gmail.com', '0801',1);
GO

INSERT INTO tllr.tbClientes([clie_Nombres],[clie_Apellidos],[clie_Sexo],[clie_FechaNacimiento],[clie_Telefono],[clie_CorreoElectronico],[muni_ID],[clie_UserCreacion])
VALUES('Javier Eduardo',' López','M', '05-05-2001', '9821-4819', 'javslopez7@gmail.com','0501', 1);
GO

INSERT INTO tllr.tbClientes([clie_Nombres],[clie_Apellidos],[clie_Sexo],[clie_FechaNacimiento],[clie_Telefono],[clie_CorreoElectronico],[muni_ID],[clie_UserCreacion])
VALUES( 'Juan David',' Molina','M', '06-04-2001', '9451-9231', 'juanmolinasagastume@gmail.com','0501', 1);
GO

INSERT INTO tllr.tbClientes([clie_Nombres],[clie_Apellidos],[clie_Sexo],[clie_FechaNacimiento],[clie_Telefono],[clie_CorreoElectronico],[muni_ID],[clie_UserCreacion])
VALUES( 'Ian Alexander','Hernandez', 'M', '02-06-1995', '9471-3500','ianh8902@gmail.com', '1804', 1);
GO

INSERT INTO tllr.tbClientes([clie_Nombres],[clie_Apellidos],[clie_Sexo],[clie_FechaNacimiento],[clie_Telefono],[clie_CorreoElectronico],[muni_ID],[clie_UserCreacion])
VALUES( 'Axel Dario',' Rivera','M',  '04-03-2001', '3165-0161', 'axeldm05@gmail.com','0503', 1);
GO

INSERT INTO tllr.tbClientes([clie_Nombres],[clie_Apellidos],[clie_Sexo],[clie_FechaNacimiento],[clie_Telefono],[clie_CorreoElectronico],[muni_ID],[clie_UserCreacion])
VALUES( 'Juan Alberto','Centeno', 'M',  '07-08-2005', '9498-8747', 'juancsabillon06@gmail.com','0501', 1);
GO

INSERT INTO tllr.tbClientes([clie_Nombres],[clie_Apellidos],[clie_Sexo],[clie_FechaNacimiento],[clie_Telefono],[clie_CorreoElectronico],[muni_ID],[clie_UserCreacion])
VALUES('Eder Jesus ','Sánchez','M',   '06-08-2000', '9617-8153', 'ederjSanchez22@gmail.com','0502', 1);
GO

INSERT INTO tllr.tbClientes([clie_Nombres],[clie_Apellidos],[clie_Sexo],[clie_FechaNacimiento],[clie_Telefono],[clie_CorreoElectronico],[muni_ID],[clie_UserCreacion])
VALUES( 'Alex Efrain',' Castro','M', '05-03-1999', '3198-0431', 'alexefraincastro4@gmail.com','0502',  1);
GO

INSERT INTO tllr.tbClientes([clie_Nombres],[clie_Apellidos],[clie_Sexo],[clie_FechaNacimiento],[clie_Telefono],[clie_CorreoElectronico],[muni_ID],[clie_UserCreacion])
VALUES(  'Sarai Elizabeth',' Quintanilla','F',  '05-04-2005', '3352-9652', 'saraieqp@gmail.com','0501', 1);
GO

--INSERTS TABLA VEHICULOS

INSERT INTO tllr.tbVehiculos ([mode_ID],[vehi_Matricula],[vehi_UserCreacion])
VALUES (1,'BAB1234',1),
       (2,'HNA8956',1),
	   (3,'BAS4561',1),
	   (4,'HNA1235',1),
	   (5,'MNS9584',1),
	   (6,'ZAA7894',1),
	   (7,'DFG5698',1),
	   (8,'ASD5684',1),
	   (9,'ZXC5684',1),
	   (10,'ABB6587',1),
	   (11,'ASD1256',1)

--INSERT TABLA REPUESTOS
INSERT INTO tllr.tbRepuestos([resp_Descripcion],[resp_Precio],[prov_ID],[marc_ID],[resp_Anio],[resp_UserCreacion])
VALUES ('Batería Deka de tornillo 12 voltios 950 CCA 13 X 6.75',4745.90,1,1,'2005',1),
       ('Bujía denso Iridium',285.50,2,5,'2004',1),
	   ('Disco de clutch 14 x 1 3/4 alto-pastilla, resorte',2984.80,3,6,'2013',1),
	   ('Hoja 1 delantera Hyundai',544.05,4,3,'2006',1),
	   ('Cuarto 85W140 MP Gear Lube Phillips 66',199,5,4,'2009',1)

--INSERT TABLA SERVICIOS 
INSERT INTO tllr.tbServicios(serv_Descripcion,serv_Precio,serv_UserCreacion)
VALUES ('Mecánica',800,1),
       ('Electricidad automotriz',100,1),
	   ('Escáner',300,1),
	   ('Estética automotriz',1500,1),
	   ('Hojalatería',500,1),
	   ('Pintura',1400,1),
	   ('Cambio de aceite y filtro',900,1),
	   ('Venta y montaje de llantas',5000,1),
	   ('Ajuste del clutch',2500,1),
	   ('Revisión de las luces y los faros',400,1)

----INSERT TABLA VENTAS
--INSERT INTO tllr.tbVentas(vent_Fecha,clie_ID,vent_Descuento,vent_MontoFinal,sucu_ID,vent_UserCreacion)
--VALUES (GETDATE(),1,NULL,0,1,1),
--       (GETDATE(),2,NULL,0,1,1),
--	   (GETDATE(),3,NULL,0,1,1),
--	   (GETDATE(),4,NULL,0,1,1),
--	   (GETDATE(),5,NULL,0,1,1),
--	   (GETDATE(),6,NULL,0,1,1),
--	   (GETDATE(),7,NULL,0,1,1),
--	   (GETDATE(),8,NULL,0,1,1),
--	   (GETDATE(),9,NULL,0,1,1)

----INSERT TABLA DETALLES VENTAS
--DECLARE @Precioventa AS DECIMAL(18,2);
--SELECT @Precioventa = resp_Precio FROM tllr.tbRepuestos WHERE [resp_ID] = 1
--INSERT INTO tllr.tbDetallesventas(vent_ID,serv_ID,resp_ID,deve_Cantidad,deve_Precioventa,deve_MontoTotal,deve_UserCreacion)
--VALUES (1,1,1,8,@Precioventa,NULL,1)
--GO

--DECLARE @Precioventa AS DECIMAL(18,2);
--SELECT @Precioventa = resp_Precio FROM tllr.tbRepuestos WHERE [resp_ID] = 2
--INSERT INTO tllr.tbDetallesventas(vent_ID,serv_ID,resp_ID,deve_Cantidad,deve_Precioventa,deve_MontoTotal,deve_UserCreacion)
--VALUES (2,2,2,9,@Precioventa,NULL,1)
--GO

--DECLARE @Precioventa AS DECIMAL(18,2);
--SELECT @Precioventa = resp_Precio FROM tllr.tbRepuestos WHERE [resp_ID] = 3
--INSERT INTO tllr.tbDetallesventas(vent_ID,serv_ID,resp_ID,deve_Cantidad,deve_Precioventa,deve_MontoTotal,deve_UserCreacion)
--VALUES (3,3,3,10,@Precioventa,NULL,1)
--GO

--DECLARE @Precioventa AS DECIMAL(18,2);
--SELECT @Precioventa = resp_Precio FROM tllr.tbRepuestos WHERE [resp_ID] = 4
--INSERT INTO tllr.tbDetallesventas(vent_ID,serv_ID,resp_ID,deve_Cantidad,deve_Precioventa,deve_MontoTotal,deve_UserCreacion)
--VALUES (4,4,4,7,@Precioventa,NULL,1)
--GO

--DECLARE @Precioventa AS DECIMAL(18,2);
--SELECT @Precioventa = resp_Precio FROM tllr.tbRepuestos WHERE [resp_ID] = 5
--INSERT INTO tllr.tbDetallesventas(vent_ID,serv_ID,resp_ID,deve_Cantidad,deve_Precioventa,deve_MontoTotal,deve_UserCreacion)
--VALUES (5,5,5,12,@Precioventa,NULL,1)
--GO

--INSERT INTO COMPRAS
INSERT INTO tllr.tbCompras(prov_ID,comp_Fecha,comp_Descuento,comp_MontoFinal,[comp_UserCreacion])
VALUES (1,GETDATE(),NULL,0,1),
       (2,GETDATE(),NULL,0,1),
	   (3,GETDATE(),NULL,0,1),
	   (4,GETDATE(),NULL,0,1),
	   (5,GETDATE(),NULL,0,1)

--INSERT TABLA DETALLE COMPRA
INSERT INTO tllr.tbDetallesCompras([comp_ID],[resp_ID],[deco_Cantidad],[deco_Preciocompra],[deco_MontoTotal],[deco_UserCreacion])
VALUES (1,1,50,25.00,NULL,1),
       (2,2,62,90.00,NULL,1),
	   (3,3,84,2000.00,NULL,1),
	   (4,4,96,845.00,NULL,1),
	   (5,5,65,1545.00,NULL,1)

--INSERT TABLA EMPLEADOS

INSERT INTO tllr.tbEmpleados(empe_Nombres,empe_Apellidos,empe_Identidad,empe_FechaNacimiento,empe_Sexo,estacivi_Id,muni_Id,empe_Direccion,empe_Telefono,empe_CorreoElectronico,sucu_Id,empe_UsuCreacion)
VALUES( 'Ian Alexander', 'Hernandez Escobar','1884200105691','10-05-2001', 'M', 1,'0501','3ra Ave Sur, Col. 2 de Mrazo', '9471-3500', 'ianh8902@gmail.com', 1, 1);
GO

INSERT INTO tllr.tbEmpleados(empe_Nombres,empe_Apellidos,empe_Identidad,empe_FechaNacimiento,empe_Sexo,estacivi_Id,muni_Id,empe_Direccion,empe_Telefono,empe_CorreoElectronico,sucu_Id,empe_UsuCreacion)
VALUES( 'Axel Dario', 'Rivera Murillo','0501200209630','03-05-2002', 'M', 2,'0802','4ta Ave. Norte, Frente al Supermercado la Antorcha', '3165-0161', 'axeldm05@gmail.com', 2, 1);
GO

INSERT INTO tllr.tbEmpleados(empe_Nombres,empe_Apellidos,empe_Identidad,empe_FechaNacimiento,empe_Sexo,estacivi_Id,muni_Id,empe_Direccion,empe_Telefono,empe_CorreoElectronico,sucu_Id,empe_UsuCreacion)
VALUES( 'Jose Miguel', 'Murcia Castro', '0613199817853','03-11-1998','M', 2,'0701','Entre 4ta Calle y 5ta Calle, Ave. Sur, Col. Los Olivos', '3831-3029', 'miguel.castro@gmail.com', 3, 1);
GO

INSERT INTO tllr.tbEmpleados(empe_Nombres,empe_Apellidos,empe_Identidad,empe_FechaNacimiento,empe_Sexo,estacivi_Id,muni_Id,empe_Direccion,empe_Telefono,empe_CorreoElectronico,sucu_Id,empe_UsuCreacion)
VALUES( 'Noe Edil', 'Barnica Ramos', '1801200000010','05-05-2000','M', 1,'0102','Entre 5ta Calle y 6ta Calle, Ave Norte', '8925-8314', 'noe3@gmail.com', 4, 1 );
GO

INSERT INTO tllr.tbEmpleados(empe_Nombres,empe_Apellidos,empe_Identidad,empe_FechaNacimiento,empe_Sexo,estacivi_Id,muni_Id,empe_Direccion,empe_Telefono,empe_CorreoElectronico,sucu_Id,empe_UsuCreacion)
VALUES( 'Loany Michelle', 'Paz Guerra','0501200110543','03-06-2001', 'F', 4,'0501','Col. Primavera, Frente a la Municipalidad', '8586-2314', 'loany15@gmail.com', 5,1);
GO

INSERT INTO tllr.tbEmpleados(empe_Nombres,empe_Apellidos,empe_Identidad,empe_FechaNacimiento,empe_Sexo,estacivi_Id,muni_Id,empe_Direccion,empe_Telefono,empe_CorreoElectronico,sucu_Id,empe_UsuCreacion)
VALUES( 'Daniel Enrique', 'Matamoros De la O','0409199934517','04-08-1999', 'M', 5,'0106','Res. Campisa','9991-4436', 'enrique.99@gmail.com', 6, 1 );
GO

INSERT INTO tllr.tbEmpleados(empe_Nombres,empe_Apellidos,empe_Identidad,empe_FechaNacimiento,empe_Sexo,estacivi_Id,muni_Id,empe_Direccion,empe_Telefono,empe_CorreoElectronico,sucu_Id,empe_UsuCreacion)
VALUES( 'Andrea Nicolle', 'Crivelli Zamorano','0503200207911', '10-07-2002','F', 1,'1101','Res. Quintas Marta Elena',  '3915-1658', 'nicolle29@gmail.com', 7, 1 );
GO

INSERT INTO tllr.tbEmpleados(empe_Nombres,empe_Apellidos,empe_Identidad,empe_FechaNacimiento,empe_Sexo,estacivi_Id,muni_Id,empe_Direccion,empe_Telefono,empe_CorreoElectronico,sucu_Id,empe_UsuCreacion)
VALUES( 'Mágdaly', 'Zúniga Alvarado','0607199301185','11-04-1993', 'F', 3,'0502','Res. Cerro Verde', '3339-6645', 'magdalyz22@gmail.com', 8,1 );
GO

INSERT INTO tllr.tbEmpleados(empe_Nombres,empe_Apellidos,empe_Identidad,empe_FechaNacimiento,empe_Sexo,estacivi_Id,muni_Id,empe_Direccion,empe_Telefono,empe_CorreoElectronico,sucu_Id,empe_UsuCreacion)
VALUES( 'Javier Eduardo', 'López','0501200506681','03-09-2005', 'M', 3,'0502','Res. Los Olivos', '9821-4819', 'javslopez7@gmail.com', 9, 1 );
GO

INSERT INTO tllr.tbEmpleados(empe_Nombres,empe_Apellidos,empe_Identidad,empe_FechaNacimiento,empe_Sexo,estacivi_Id,muni_Id,empe_Direccion,empe_Telefono,empe_CorreoElectronico,sucu_Id,empe_UsuCreacion)
VALUES( 'Juan David', 'Molina Sagastume','1615200500062','02-06-2005', 'M', 1,'0502','Res. Los 3 Hermanos',  '9451-9231', 'juanmolinasagastume@gmail.com', 10, 1 );
GO

INSERT INTO tllr.tbEmpleados(empe_Nombres,empe_Apellidos,empe_Identidad,empe_FechaNacimiento,empe_Sexo,estacivi_Id,muni_Id,empe_Direccion,empe_Telefono,empe_CorreoElectronico,sucu_Id,empe_UsuCreacion)
VALUES('Eder Jesus', 'Sanchez Mantinez','1615200500069', '04-08-2002', 'M', 2,'0501','Ave Sur, 4ta Calle, Col. Esperanza',  '9858-7548', 'eder85@hotmail.com', 11, 1 );
GO

--INSERT TABLA USUARIOS
DECLARE @Pass AS NVARCHAR(MAX), @Clave AS NVARCHAR(250);
SET @Clave = '12345';
SET @Pass = CONVERT(NVARCHAR(MAX), HASHBYTES('sha2_512', @Clave),2)

INSERT INTO acce.tbUsuarios([user_NombreUsuario],[user_Contrasena],[user_EsAdmin],[role_ID],[empe_ID],[user_UserCreacion])
VALUES('IanH', @Pass, 1, 3,1,1);
GO

DECLARE @Pass AS NVARCHAR(MAX), @Clave AS NVARCHAR(250);
SET @Clave = '2023';
SET @Pass = CONVERT(NVARCHAR(MAX), HASHBYTES('sha2_512', @Clave),2)

INSERT INTO ACCE.tbUsuarios([user_NombreUsuario],[user_Contrasena],[user_EsAdmin],[role_ID],[empe_ID],[user_UserCreacion])
VALUES('Eder', @Pass, 0,1,11,1);
GO

DECLARE @Pass AS NVARCHAR(MAX), @Clave AS NVARCHAR(250);
SET @Clave = 'juans123'
SET @Pass = CONVERT (NVARCHAR(MAX), HASHBYTES('sha2_512',@Clave),2)

INSERT INTO ACCE.tbUsuarios([user_NombreUsuario],[user_Contrasena],[user_EsAdmin],[role_ID],[empe_ID],[user_UserCreacion])
VALUES('Juana', @Pass, 0,2,3,1);
GO

DECLARE @Pass AS NVARCHAR(MAX), @Clave AS NVARCHAR(250);
SET @Clave = 'nimodo'
SET @Pass = CONVERT (NVARCHAR(MAX), HASHBYTES('sha2_512',@Clave),2)

INSERT INTO ACCE.tbUsuarios([user_NombreUsuario],[user_Contrasena],[user_EsAdmin],[role_ID],[empe_ID],[user_UserCreacion])
VALUES('elysH', @Pass, 0,4,5,1 );
GO

DECLARE @Pass AS NVARCHAR(MAX), @Clave AS NVARCHAR(250);
SET @Clave = 'axel'
SET @Pass = CONVERT (NVARCHAR(MAX), HASHBYTES('sha2_512',@Clave),2)

INSERT INTO ACCE.tbUsuarios([user_NombreUsuario],[user_Contrasena],[user_EsAdmin],[role_ID],[empe_ID],[user_UserCreacion])
VALUES('axel', @Pass, 0,5,2,1 );
GO

INSERT INTO [tllr].[tbClientePorVehiculo]([clie_ID],[vehi_ID],[clvh_UserCreacion])
VALUES  (1,1,1),
        (1,2,1),
		(1,3,1),
		(1,4,1),
		(1,5,1),
		(2,1,1),
		(2,4,1),
		(2,5,1),
		(2,6,1),
		(3,5,1),
		(3,11,1),
		(3,6,1),
		(4,8,1),
		(4,2,1),
		(5,9,1)