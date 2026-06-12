-- ==========================================================
-- Generated: 2026-06-11 20:30:00
-- DO NOT EDIT — run: npm run build
-- ==========================================================

-- ==========================================================
-- RESET COMPLETO — elimina todo y recarga desde schema/
-- Usar solo en entornos vacíos o de desarrollo.
-- ==========================================================

DO $$ DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS public.' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
END $$;


-- [schema] ------------------------------------------------
-- ==========================================================
-- SCHEMA LOAD ORDER
-- Rutas siempre desde la raíz del proyecto. Dependencias primero.
-- ==========================================================


-- [schema > catalogos] ------------------------------------

-- [schema > catalogos > tipos-organizaciones] -------------
CREATE TABLE tipos_organizaciones (
    id_tipo    SERIAL,
    nombre     VARCHAR(100)    NOT NULL UNIQUE,
    es_propio  BOOLEAN         DEFAULT TRUE,           -- TRUE si el tipo fue agregado por el sistema, no del catálogo original
    PRIMARY KEY (id_tipo)
);

INSERT INTO tipos_organizaciones (nombre, es_propio) VALUES
('Cooperación internacional Bilateral', false),
('Cooperación internacional Multilateral', false),
('ONG/Fundación nacional', false),
('ONG/Fundación internacional', false),
('Empresa privada', false);


-- [/schema > catalogos > tipos-organizaciones]


-- [schema > catalogos > areas-desarrollo] -----------------
CREATE TABLE areas_desarrollo (
    id_area  SERIAL,
    nombre   VARCHAR(100)    NOT NULL UNIQUE,
    PRIMARY KEY (id_area)
);

INSERT INTO areas_desarrollo (nombre) VALUES
('Ecoturismo'),
('Restauración ecológica'),
('Apoyo legal y administrativo para la protección de territorios'),
('Educación');


-- [/schema > catalogos > areas-desarrollo]


-- [schema > catalogos > practicas-agricolas] --------------
CREATE TABLE practicas_agricolas (
    id_practica  SERIAL,
    nombre       VARCHAR(100)    NOT NULL,
    es_propio    BOOLEAN         DEFAULT TRUE,         -- TRUE si la práctica fue agregada por el sistema, no del catálogo original
    PRIMARY KEY (id_practica)
);

INSERT INTO practicas_agricolas (nombre, es_propio) VALUES
('Acai', false),
('Castaña', false),
('Cacao silvestre', false),
('Plantas medicinales', false),
('Paraba frente roja', false),
('Camu Camu', false),
('Miel', false);


-- [/schema > catalogos > practicas-agricolas]


-- [schema > catalogos > especies-animales] ----------------
CREATE TABLE especies_animales (
    id_especie  SERIAL,
    nombre      VARCHAR(100)    NOT NULL,
    es_propio   BOOLEAN         DEFAULT TRUE,          -- TRUE si la especie fue agregada por el sistema, no del catálogo original
    PRIMARY KEY (id_especie)
);

INSERT INTO especies_animales (nombre, es_propio) VALUES
('Jaguar', false),
('Bufeo', false),
('Oso andino', false),
('Paraba barba azul', false),
('Paraba frente roja', false),
('Ninguno', false),
('Águila harpía', false);


-- [/schema > catalogos > especies-animales]


-- [schema > catalogos > ayudas] ---------------------------
CREATE TABLE ayudas (
    id_ayuda   SERIAL,
    nombre     VARCHAR(150)    NOT NULL,
    es_propio  BOOLEAN         DEFAULT TRUE,           -- TRUE si la ayuda fue agregada por el sistema, no del catálogo original
    PRIMARY KEY (id_ayuda)
);

INSERT INTO ayudas (nombre, es_propio) VALUES
('Donaciones', false),
('Financiero', false),
('Capacitaciones', false),
('Fortalecimiento de organizaciones sociales', false),
('Investigaciones', false),
('Construcción/refacción de infraestructura', false);


-- [/schema > catalogos > ayudas]


-- [schema > catalogos > actores-municipales] --------------
CREATE TABLE actores_municipales (
    id_actor   SERIAL,
    nombre     VARCHAR(150)    NOT NULL,
    es_propio  BOOLEAN         DEFAULT TRUE,           -- TRUE si el actor fue agregado por el sistema, no del catálogo original
    PRIMARY KEY (id_actor)
);

INSERT INTO actores_municipales (nombre, es_propio) VALUES
('Gobiernos municipales', false),
('Financiero', false),
('Capacitaciones', false),
('Fortalecimiento de organizaciones sociales', false),
('Actores privados', false);


-- [/schema > catalogos > actores-municipales]


-- [schema > catalogos > tipos-proyectos] ------------------
CREATE TABLE tipos_proyectos (
    id_tipo    SERIAL,
    nombre     VARCHAR(200)    NOT NULL UNIQUE,
    es_propio  BOOLEAN         NOT NULL DEFAULT TRUE,  -- TRUE si el tipo fue agregado por el sistema, no del catálogo original
    PRIMARY KEY (id_tipo)
);

INSERT INTO tipos_proyectos (nombre, es_propio) VALUES
('Áreas protegidas', false),
('Conservación de bosques', false),
('Restauración ecológica', false),
('Conservación y aprovechamiento de bosques', false),
('Desarrollo productivo sostenible', false),
('Conservación de especies', false),
('Manejo sostenible', false),
('Ecoturismo', false),
('Apoyo legal y administrativo para la protección de territorios', false),
('Educación', false);


-- [/schema > catalogos > tipos-proyectos]


-- [schema > catalogos > areas] ----------------------------
CREATE TABLE areas (
    id_area  SERIAL,
    nombre   VARCHAR(100)    NOT NULL,
    PRIMARY KEY (id_area)
);

INSERT INTO areas (nombre) VALUES
('Conservacion'),
('Desarrollo de comunidades indigenas');


-- [/schema > catalogos > areas]


-- [schema > catalogos > motivos] --------------------------
CREATE TABLE motivos (
    id_motivo  SERIAL,
    nombre     VARCHAR(100)    NOT NULL,
    es_propio  BOOLEAN         NOT NULL DEFAULT TRUE,  -- TRUE si el motivo fue agregado por el sistema, no del catálogo original
    PRIMARY KEY (id_motivo)
);

INSERT INTO motivos (nombre, es_propio) VALUES
('Responsabilidad Social', false),
('Interés económico-productivo', false),
('Imagen institucional', false);


-- [/schema > catalogos > motivos]


-- [schema > catalogos > apoyos] ---------------------------
CREATE TABLE apoyos (
    id_apoyo   SERIAL,
    nombre     VARCHAR(100)    NOT NULL,
    es_propio  BOOLEAN         NOT NULL DEFAULT TRUE,  -- TRUE si el apoyo fue agregado por el sistema, no del catálogo original
    PRIMARY KEY (id_apoyo)
);

INSERT INTO apoyos (nombre, es_propio) VALUES
('Donaciones', false),
('Financiero', false),
('Logistico', false),
('Talento Humano', false),
('Investigaciones', false);


-- [/schema > catalogos > apoyos]


-- [schema > catalogos > ods] ------------------------------
CREATE TABLE ods (
    id_ods  SERIAL,
    nombre  VARCHAR(100)    NOT NULL,
    PRIMARY KEY (id_ods)
);

INSERT INTO ods (nombre) VALUES
('Fin de la pobreza'),
('Hambre cero'),
('Salud y bienestar'),
('Educacion de calidad'),
('Igualdad de genero'),
('Agua limpia y saneamiento'),
('Energia asequible y no contaminante'),
('Trabajo decente y crecimiento economico'),
('Industria, innovacion e infraestructura'),
('Reduccion de las desigualdades'),
('Ciudades y comunidades sostenibles'),
('Produccion y consumo responsables'),
('Accion por el clima'),
('Vida submarina'),
('Vida de ecosistemas terrestres'),
('Paz, justicia e instituciones solidas'),
('Alianzas para lograr los objetivos');


-- [/schema > catalogos > ods]


-- [schema > catalogos > formas-juridicas] -----------------
CREATE TABLE formas_juridicas (
    id_forma   SERIAL,
    nombre     VARCHAR(100)    NOT NULL,
    es_propio  BOOLEAN         NOT NULL DEFAULT TRUE,  -- TRUE si la forma jurídica fue agregada por el sistema, no del catálogo original
    PRIMARY KEY (id_forma)
);

INSERT INTO formas_juridicas (nombre, es_propio) VALUES
('S.R.L', false),
('S.A', false),
('Empresa individual', false);


-- [/schema > catalogos > formas-juridicas]


-- [/schema > catalogos]


-- [schema > ubicaciones-geograficas] ----------------------

-- [schema > ubicaciones-geograficas > departamentos] ------
CREATE TABLE departamentos (
    id_departamento  SERIAL,
    nombre           VARCHAR(100)    NOT NULL,
    amazonico        BOOLEAN         NOT NULL,         -- TRUE si el departamento forma parte de la Amazonía boliviana
    PRIMARY KEY (id_departamento)
);

INSERT INTO departamentos (id_departamento, nombre, amazonico) VALUES
(1, 'Pando', TRUE),
(2, 'Beni', TRUE),
(3, 'La Paz', TRUE),
(4, 'Cochabamba', TRUE),
(5, 'Santa Cruz', TRUE),
(6, 'Oruro', FALSE),
(7, 'Potosi', FALSE),
(8, 'Chuquisaca', FALSE),
(9, 'Tarija', FALSE);


-- [/schema > ubicaciones-geograficas > departamentos]


-- [schema > ubicaciones-geograficas > municipios] ---------
CREATE TABLE municipios (
    id_municipio     SERIAL,
    id_departamento  INT             NOT NULL,         -- departamento al que pertenece el municipio
    nombre           VARCHAR(100)    NOT NULL,
    PRIMARY KEY (id_municipio),
    FOREIGN KEY (id_departamento) REFERENCES departamentos(id_departamento)
);

INSERT INTO municipios (id_municipio, nombre, id_departamento) VALUES
(1, 'Cobija', 1),
(2, 'Porvenir', 1),
(3, 'Bolpebra', 1),
(4, 'Bella Flor', 1),
(5, 'Puerto Rico', 1),
(6, 'San Pedro', 1),
(7, 'Filadelfia', 1),
(8, 'Puerto Gonzalo Moreno', 1),
(9, 'San Lorenzo', 1),
(10, 'Sena', 1),
(11, 'Santa Rosa', 1),
(12, 'Ingavi', 1),
(13, 'Nueva Esperanza', 1),
(14, 'Villa Nueva (Loma Alta)', 1),
(15, 'Mocomoco', 3),
(16, 'Puerto Carabuco', 3),
(17, 'Aucapata', 3),
(18, 'Chuma', 3),
(19, 'Sorata', 3),
(20, 'Guanay', 3),
(21, 'Quiabaya', 3),
(22, 'Combaya', 3),
(23, 'Tipuani', 3),
(24, 'Mapiri', 3),
(25, 'Teoponte', 3),
(26, 'Tacacoma', 3),
(27, 'Apolo', 3),
(28, 'Pelechuco', 3),
(29, 'Inquisivi', 3),
(30, 'Quime', 3),
(31, 'Ichoca', 3),
(32, 'Colquiri', 3),
(33, 'Licoma (Villa libertad)', 3),
(34, 'Cajuata', 3),
(35, 'Chulumani', 3),
(36, 'Irupana', 3),
(37, 'Yanacachi', 3),
(38, 'Palos Blancos', 3),
(39, 'Yanacachi', 3),
(40, 'La Asunta', 3),
(41, 'Ixiamas', 3),
(42, 'San Buenaventura', 3),
(43, 'Charazani (Gral. Pérez)', 3),
(44, 'Curva', 3),
(45, 'Caranavi', 3),
(46, 'Alto Beni', 3),
(47, 'Nuestra Señora de La Paz', 3),
(48, 'San Javier', 2),
(49, 'Trinidad', 2),
(50, 'Riberalta', 2),
(51, 'Guayaramerín', 2),
(52, 'Reyes', 2),
(53, 'San Borja', 2),
(54, 'Santa Rosa', 2),
(55, 'Rurrenabaque', 2),
(56, 'Santa Ana de Yacuma', 2),
(57, 'Exaltación', 2),
(58, 'San Ignacio', 2),
(59, 'Loreto', 2),
(60, 'San Andrés', 2),
(61, 'San Joaquín', 2),
(62, 'San Ramón', 2),
(63, 'Puerto Siles', 2),
(64, 'Magdalena', 2),
(65, 'Baures', 2),
(66, 'Huacaraje', 2),
(67, 'Porongo (Ayacucho)', 5),
(68, 'El Torno', 5),
(69, 'San Ignacio de Velasco', 5),
(70, 'Buena Vista', 5),
(71, 'San Carlos', 5),
(72, 'Yapacaní', 5),
(73, 'San Juan de Yapacaní', 5),
(74, 'Santa Rosa del Sara', 5),
(75, 'Portachuelo', 5),
(76, 'General Saavedra', 5),
(77, 'Mineros', 5),
(78, 'Fernández Alonso', 5),
(79, 'San Pedro', 5),
(80, 'Concepción', 5),
(81, 'San Julián', 5),
(82, 'Ascensión de Guarayos', 5),
(83, 'Urubichá', 5),
(84, 'El Puente', 5),
(85, 'Comarapa', 5),
(86, 'Mairana', 5),
(87, 'Pampa Grande', 5),
(88, 'Samaipata', 5),
(89, 'Warnes', 5),
(90, 'Independencia', 4),
(91, 'Morochata', 4),
(92, 'Cocapata', 4),
(93, 'Pojo', 4),
(94, 'Totora', 4),
(95, 'Entre Ríos (Bulo Bulo)', 4),
(96, 'Puerto Villarroel', 4),
(97, 'Chimoré', 4),
(98, 'Villa Tunari', 4),
(99, 'Tiraque', 4),
(100, 'Shinahota', 4),
(101, 'Tapacarí', 4);


-- [/schema > ubicaciones-geograficas > municipios]


-- [schema > ubicaciones-geograficas > comunidades-indigenas] --
CREATE TABLE comunidades_indigenas (
    id_comunidad  SERIAL,
    nombre        VARCHAR(100)    NOT NULL,
    PRIMARY KEY (id_comunidad)
);

INSERT INTO comunidades_indigenas (id_comunidad, nombre) VALUES
(1, 'Pacahuara'),
(2, 'Machineri'),
(3, 'Yaminahua'),
(4, 'Tacanas'),
(5, 'Cavineño'),
(6, 'Esse Ejja'),
(7, 'Mosetene'),
(8, 'La Organización del Pueblo Indígena Leco y Comunidades Originarias de Larecaja (PILCOL)'),
(9, 'La Central Indígena del Pueblo Leco de Apolo (CIPLA)'),
(10, 'Consejo Regional T''simane Mosetenes Pilón Lajas (CRTM-PL)'),
(11, 'Pueblo Indígena de San José de Uchupiamonas (PI-SJU)'),
(12, 'Afrobolivianos'),
(13, 'OPIM (Organización del Pueblo Indígena Mosetén) y OMIM (Organización de la Mujer Indígena Mosetén)'),
(14, 'Comunidad Agroecológica Originaria de Palos Blancos (CAOPB)'),
(15, 'Comunidad Indígena Apichana'),
(16, 'Consejo Indígena del Pueblo Tacana (CIPTA)'),
(17, 'Comunidad Indígena Puesto Araona (CAPIA)'),
(18, 'Central de Comunidades Indígenas Tacana II Río Madre de Dios (CITRMD)'),
(19, 'Comunidad Ese Ejja de Eyiyoquibo (CEEE)'),
(20, 'Lecos'),
(21, 'Canichana'),
(22, 'Moxeño'),
(23, 'Sirionó'),
(24, 'Javeriano'),
(25, 'Chacobo'),
(26, 'Reyesano / Moropa'),
(27, 'Tsimane'),
(28, 'Yuracare'),
(29, 'Movima'),
(30, 'Movima (TIM)'),
(31, 'Mojeño Trinitario (TIM)'),
(32, 'Tsimane (TIM)'),
(33, 'Yuracare (TIM)'),
(34, 'Mosetén'),
(35, 'Cayubaba'),
(36, 'Yuracaré'),
(37, 'Ignaciano'),
(38, 'Loretano'),
(39, 'Mojeño'),
(40, 'Itonama'),
(41, 'Joaquiniano'),
(42, 'Baure'),
(43, 'Moré'),
(44, 'Itonamas'),
(45, 'Chiquitano'),
(46, 'Guaragsug we'),
(47, 'Yuracaré-Mojeño'),
(48, 'Guarayo'),
(49, 'Consejo Indígena Yuqui Consejo Indígena del Río Ichilo (YUQUI CIRI)'),
(50, 'Trinitario Moxeño'),
(51, 'Trinitario Moxeño - Territorio Indígena del Parque Isiboro Sécure Consejo Indígena del Sur (TIPNIS)');


-- [/schema > ubicaciones-geograficas > comunidades-indigenas]


-- [schema > ubicaciones-geograficas > comunidades-municipios] --
CREATE TABLE comunidades_municipios (
    id_comunidad  INT     NOT NULL,
    id_municipio  INT     NOT NULL,
    PRIMARY KEY (id_comunidad, id_municipio),
    FOREIGN KEY (id_comunidad) REFERENCES comunidades_indigenas(id_comunidad),
    FOREIGN KEY (id_municipio) REFERENCES municipios(id_municipio)
);

INSERT INTO comunidades_municipios (id_municipio, id_comunidad) VALUES
(1, 1),
(3, 2),
(3, 3),
(4, 4),
(5, 4),
(5, 5),
(7, 5),
(8, 4),
(8, 5),
(8, 6),
(9, 4),
(9, 5),
(9, 6),
(10, 4),
(10, 5),
(12, 4),
(12, 5),
(12, 6),
(13, 4),
(20, 7),
(20, 8),
(23, 8),
(24, 8),
(25, 8),
(27, 7),
(27, 8),
(27, 9),
(27, 11),
(29, 12),
(30, 12),
(35, 12),
(36, 12),
(38, 7),
(38, 13),
(38, 14),
(38, 15),
(41, 8),
(41, 11),
(41, 15),
(41, 16),
(41, 17),
(41, 18),
(41, 19),
(42, 8),
(42, 11),
(42, 14),
(42, 16),
(42, 19),
(45, 20),
(48, 21),
(48, 22),
(48, 23),
(48, 24),
(49, 21),
(49, 22),
(49, 23),
(50, 1),
(50, 4),
(50, 5),
(50, 25),
(51, 25),
(52, 4),
(52, 5),
(52, 25),
(52, 26),
(52, 27),
(53, 4),
(53, 7),
(53, 13),
(53, 28),
(53, 29),
(54, 4),
(54, 5),
(54, 27),
(54, 28),
(55, 4),
(55, 6),
(55, 7),
(55, 26),
(56, 5),
(56, 30),
(56, 31),
(56, 32),
(56, 33),
(56, 34),
(57, 5),
(57, 25),
(57, 29),
(57, 35),
(58, 30),
(58, 31),
(58, 32),
(58, 34),
(58, 36),
(58, 37),
(59, 36),
(59, 38),
(59, 39),
(60, 39),
(61, 29),
(61, 39),
(61, 40),
(61, 41),
(61, 42),
(61, 43),
(62, 39),
(62, 40),
(62, 41),
(63, 41),
(63, 43),
(64, 39),
(64, 42),
(64, 44),
(65, 42),
(65, 44),
(66, 40),
(66, 42),
(69, 45),
(69, 46),
(72, 47),
(79, 4),
(79, 5),
(82, 42),
(82, 48),
(83, 48),
(84, 48),
(91, 7),
(96, 16),
(97, 36),
(97, 50),
(98, 16),
(98, 36);


-- [/schema > ubicaciones-geograficas > comunidades-municipios]


-- [/schema > ubicaciones-geograficas]


-- [schema > gestion-empresarial] --------------------------

-- [schema > gestion-empresarial > empresas] ---------------
CREATE TABLE empresas (
    id_empresa         SERIAL,
    id_forma_juridica  INT             NOT NULL,       -- forma jurídica de la empresa
    nombre             VARCHAR(100)    NOT NULL,
    anio_inicio_apoyo  INT             NOT NULL,        -- año en que la empresa comenzó a apoyar proyectos
    PRIMARY KEY (id_empresa),
    FOREIGN KEY (id_forma_juridica) REFERENCES formas_juridicas(id_forma)
);

-- Sin datos iniciales


-- [/schema > gestion-empresarial > empresas]


-- [schema > gestion-empresarial > departamentos-empresas] --
CREATE TABLE departamentos_empresas (
    id_departamento  INT     NOT NULL,
    id_empresa       INT     NOT NULL,
    PRIMARY KEY (id_departamento, id_empresa),
    FOREIGN KEY (id_departamento) REFERENCES departamentos(id_departamento),
    FOREIGN KEY (id_empresa)      REFERENCES empresas(id_empresa)
);

-- Sin datos iniciales


-- [/schema > gestion-empresarial > departamentos-empresas]


-- [schema > gestion-empresarial > motivos-empresas] -------
CREATE TABLE motivos_empresas (
    id_empresa  INT     NOT NULL,
    id_motivo   INT     NOT NULL,
    PRIMARY KEY (id_empresa, id_motivo),
    FOREIGN KEY (id_empresa) REFERENCES empresas(id_empresa),
    FOREIGN KEY (id_motivo)  REFERENCES motivos(id_motivo)
);

-- Sin datos iniciales


-- [/schema > gestion-empresarial > motivos-empresas]


-- [schema > gestion-empresarial > apoyos-empresas] --------
CREATE TABLE apoyos_empresas (
    id_apoyo    INT     NOT NULL,
    id_empresa  INT     NOT NULL,
    PRIMARY KEY (id_apoyo, id_empresa),
    FOREIGN KEY (id_apoyo)   REFERENCES apoyos(id_apoyo),
    FOREIGN KEY (id_empresa) REFERENCES empresas(id_empresa)
);

-- Sin datos iniciales


-- [/schema > gestion-empresarial > apoyos-empresas]


-- [schema > gestion-empresarial > ods-empresas] -----------
CREATE TABLE ods_empresas (
    id_ods      INT     NOT NULL,
    id_empresa  INT     NOT NULL,
    PRIMARY KEY (id_ods, id_empresa),
    FOREIGN KEY (id_ods)     REFERENCES ods(id_ods),
    FOREIGN KEY (id_empresa) REFERENCES empresas(id_empresa)
);

-- Sin datos iniciales


-- [/schema > gestion-empresarial > ods-empresas]


-- [/schema > gestion-empresarial]


-- [schema > gestion-organizacional] -----------------------

-- [schema > gestion-organizacional > organizaciones] ------
CREATE TABLE organizaciones (
    id_organizacion      SERIAL,
    id_tipo              INT             NOT NULL,     -- tipo de organización
    id_departamento      INT             NOT NULL,     -- departamento donde opera la organización
    nombre               VARCHAR(100)    NOT NULL,
    es_nacional          BOOLEAN         NOT NULL,      -- TRUE si la organización es de origen nacional, FALSE si es internacional
    anio_inicio_trabajo  INT             NOT NULL,      -- año en que la organización comenzó a trabajar en la zona
    PRIMARY KEY (id_organizacion),
    FOREIGN KEY (id_tipo)         REFERENCES tipos_organizaciones(id_tipo),
    FOREIGN KEY (id_departamento) REFERENCES departamentos(id_departamento)
);

-- Sin datos iniciales


-- [/schema > gestion-organizacional > organizaciones]


-- [schema > gestion-organizacional > organizaciones-empresas] --
CREATE TABLE organizaciones_empresas (
    id_orga_empresa  SERIAL,
    id_organizacion  INT,                                   -- organización a la que pertenece la empresa, si aplica
    id_empresa       INT             NOT NULL,              -- empresa asociada a la organización
    nombre           VARCHAR(300),                          -- nombre comercial alternativo de la empresa dentro de la organización
    PRIMARY KEY (id_orga_empresa),
    FOREIGN KEY (id_organizacion) REFERENCES organizaciones(id_organizacion),
    FOREIGN KEY (id_empresa)      REFERENCES empresas(id_empresa)
);

-- Sin datos iniciales


-- [/schema > gestion-organizacional > organizaciones-empresas]


-- [/schema > gestion-organizacional]


-- [schema > gestion-proyectos] ----------------------------

-- [schema > gestion-proyectos > proyectos] ----------------
CREATE TABLE proyectos (
    id_proyecto  SERIAL          NOT NULL,
    id_area      INT             NOT NULL,             -- área temática del proyecto (conservación, desarrollo de comunidades, etc.)
    id_tipo      INT             NOT NULL,             -- tipo de proyecto
    nombre       VARCHAR(300)    NOT NULL,
    descripcion  TEXT,                                  -- descripción detallada del proyecto
    anio_inicio  INT             NOT NULL,             -- año en que inició el proyecto
    anio_fin     INT,                                   -- año en que finalizó el proyecto, si ya concluyó
    PRIMARY KEY (id_proyecto),
    FOREIGN KEY (id_area) REFERENCES areas(id_area),
    FOREIGN KEY (id_tipo) REFERENCES tipos_proyectos(id_tipo)
);

-- Sin datos iniciales


-- [/schema > gestion-proyectos > proyectos]


-- [schema > gestion-proyectos > proyectos-empresas] -------
-- NOTA: id_participacion permite registrar múltiples periodos de participación
--       (una empresa puede salir y volver a un mismo proyecto).
CREATE TABLE proyectos_empresas (
    id_participacion  SERIAL  NOT NULL,
    id_proyecto       INT     NOT NULL,
    id_empresa        INT     NOT NULL,
    fecha_inicio      DATE    NOT NULL,                -- fecha en que la empresa comenzó a apoyar el proyecto
    fecha_fin         DATE,                             -- fecha en que la empresa dejó de apoyar el proyecto, si aplica
    PRIMARY KEY (id_participacion),
    FOREIGN KEY (id_proyecto) REFERENCES proyectos(id_proyecto),
    FOREIGN KEY (id_empresa)  REFERENCES empresas(id_empresa)
);

CREATE INDEX idx_proyectos_empresas_actor ON proyectos_empresas(id_empresa, id_proyecto);

-- Sin datos iniciales


-- [/schema > gestion-proyectos > proyectos-empresas]


-- [schema > gestion-proyectos > proyectos-organizaciones] --
-- NOTA: id_participacion permite registrar múltiples periodos de participación
--       (una organización puede salir y volver a un mismo proyecto).
CREATE TABLE proyectos_organizaciones (
    id_participacion  SERIAL  NOT NULL,
    id_proyecto       INT     NOT NULL,
    id_organizacion   INT     NOT NULL,
    fecha_inicio      DATE    NOT NULL,                -- fecha en que la organización comenzó a participar en el proyecto
    fecha_fin         DATE,                             -- fecha en que la organización dejó de participar en el proyecto, si aplica
    PRIMARY KEY (id_participacion),
    FOREIGN KEY (id_proyecto)     REFERENCES proyectos(id_proyecto)          ON DELETE CASCADE,
    FOREIGN KEY (id_organizacion) REFERENCES organizaciones(id_organizacion) ON DELETE CASCADE
);

CREATE INDEX idx_proyectos_organizaciones_actor ON proyectos_organizaciones(id_proyecto, id_organizacion);

-- Sin datos iniciales


-- [/schema > gestion-proyectos > proyectos-organizaciones]


-- [schema > gestion-proyectos > localidades-proyectos] ----
CREATE TABLE localidades_proyectos (
    id_localidad  SERIAL,
    id_proyecto   INT     NOT NULL,                    -- proyecto que se ejecuta en la localidad
    id_municipio  INT     NOT NULL,                    -- municipio donde se ubica la localidad
    id_comunidad  INT,                                  -- comunidad indígena de la localidad, si aplica
    PRIMARY KEY (id_localidad),
    FOREIGN KEY (id_proyecto)  REFERENCES proyectos(id_proyecto),
    FOREIGN KEY (id_municipio) REFERENCES municipios(id_municipio),
    FOREIGN KEY (id_comunidad) REFERENCES comunidades_indigenas(id_comunidad)
);

-- Sin datos iniciales


-- [/schema > gestion-proyectos > localidades-proyectos]


-- [schema > gestion-proyectos > actores-proyectos] --------
CREATE TABLE actores_proyectos (
    id_proyecto  INT     NOT NULL,
    id_actor     INT     NOT NULL,
    PRIMARY KEY (id_proyecto, id_actor),
    FOREIGN KEY (id_proyecto) REFERENCES proyectos(id_proyecto),
    FOREIGN KEY (id_actor)    REFERENCES actores_municipales(id_actor)
);

-- Sin datos iniciales


-- [/schema > gestion-proyectos > actores-proyectos]


-- [schema > gestion-proyectos > ayudas-proyectos] ---------
CREATE TABLE ayudas_proyectos (
    id_proyecto  INT     NOT NULL,
    id_ayuda     INT     NOT NULL,
    PRIMARY KEY (id_proyecto, id_ayuda),
    FOREIGN KEY (id_proyecto) REFERENCES proyectos(id_proyecto),
    FOREIGN KEY (id_ayuda)    REFERENCES ayudas(id_ayuda)
);

-- Sin datos iniciales


-- [/schema > gestion-proyectos > ayudas-proyectos]


-- [/schema > gestion-proyectos]


-- [schema > gestion-conservacion] -------------------------

-- [schema > gestion-conservacion > conservacion-animales] --
CREATE TABLE conservacion_animales (
    id_especie   INT     NOT NULL,
    id_proyecto  INT     NOT NULL,
    PRIMARY KEY (id_especie, id_proyecto),
    FOREIGN KEY (id_especie)  REFERENCES especies_animales(id_especie),
    FOREIGN KEY (id_proyecto) REFERENCES proyectos(id_proyecto)
);

-- Sin datos iniciales


-- [/schema > gestion-conservacion > conservacion-animales]


-- [schema > gestion-conservacion > conservacion-agricolas] --
CREATE TABLE conservacion_agricolas (
    id_practica  INT     NOT NULL,
    id_proyecto  INT     NOT NULL,
    PRIMARY KEY (id_practica, id_proyecto),
    FOREIGN KEY (id_practica) REFERENCES practicas_agricolas(id_practica),
    FOREIGN KEY (id_proyecto) REFERENCES proyectos(id_proyecto)
);

-- Sin datos iniciales


-- [/schema > gestion-conservacion > conservacion-agricolas]


-- [/schema > gestion-conservacion]


-- [schema > gestion-comunidades] --------------------------

-- [schema > gestion-comunidades > comunidades-indigenas-areas] --
CREATE TABLE comunidades_indigenas_areas (
    id_proyecto  INT     NOT NULL,
    id_area      INT     NOT NULL,
    PRIMARY KEY (id_proyecto, id_area),
    FOREIGN KEY (id_proyecto) REFERENCES proyectos(id_proyecto)         ON DELETE CASCADE,
    FOREIGN KEY (id_area)     REFERENCES areas_desarrollo(id_area)      ON DELETE CASCADE
);

-- Sin datos iniciales


-- [/schema > gestion-comunidades > comunidades-indigenas-areas]


-- [/schema > gestion-comunidades]


-- [schema > auth] -----------------------------------------
-- Tablas agregadas en: 2026-06-11 — Módulo de autenticación
-- ==========================================================

-- [schema > auth > usuarios] ------------------------------
CREATE TABLE usuarios (
    id_usuario        SERIAL,
    email             VARCHAR(255)    NOT NULL UNIQUE,
    password_hash     VARCHAR(255)    NOT NULL,            -- hash bcrypt (cost 12), nunca retornar en respuestas
    nombre            VARCHAR(150)    NOT NULL,
    rol               INT             NOT NULL,            -- 1=Superadmin, 2=Admin, 3=Investigador
    activo            BOOLEAN         NOT NULL DEFAULT TRUE,
    fecha_expiracion  TIMESTAMP,                           -- solo para Investigadores; NULL = sin expiración
    created_at        TIMESTAMP       NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMP       NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id_usuario)
);

CREATE UNIQUE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_rol ON usuarios(rol);

-- Sin datos iniciales — usar: npm run seed:superadmin


-- [/schema > auth > usuarios]


-- [schema > auth > solicitudes-acceso] --------------------
CREATE TABLE solicitudes_acceso (
    id_solicitud             SERIAL,
    nombre_solicitante       VARCHAR(150)     NOT NULL,
    email_solicitante        VARCHAR(255)     NOT NULL,    -- email del solicitante (no tiene que ser único)
    institucion              VARCHAR(255)     NOT NULL,
    proposito                TEXT             NOT NULL,
    estado                   VARCHAR(20)      NOT NULL DEFAULT 'pendiente',  -- pendiente | aprobada | rechazada
    fecha_expiracion_acceso  TIMESTAMP,                   -- definida por el admin al aprobar
    id_revisor               INT,                         -- FK al admin que revisó la solicitud
    id_usuario_creado        INT,                         -- FK al usuario creado al aprobar (Investigador)
    nota_rechazo             TEXT,
    fecha_revision           TIMESTAMP,
    created_at               TIMESTAMP        NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id_solicitud),
    FOREIGN KEY (id_revisor) REFERENCES usuarios(id_usuario)
);

CREATE INDEX idx_solicitudes_estado ON solicitudes_acceso(estado);
CREATE INDEX idx_solicitudes_email ON solicitudes_acceso(email_solicitante);

-- Sin datos iniciales


-- [/schema > auth > solicitudes-acceso]


-- [/schema > auth]


-- [/schema]
