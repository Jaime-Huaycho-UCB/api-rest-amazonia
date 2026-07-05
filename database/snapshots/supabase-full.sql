--
-- PostgreSQL database dump
--

\restrict 1ifaf2YSTl7xmvQfQi6VbtKoujBDaHnGQhDSNeoLIg9hCBLWn6WoNVd4yU5dPRz

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA IF NOT EXISTS public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: refresh_dashboard_views(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.refresh_dashboard_views() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  REFRESH MATERIALIZED VIEW mv_dashboard_resumen_global;
  REFRESH MATERIALIZED VIEW mv_dashboard_por_region;
  REFRESH MATERIALIZED VIEW mv_dashboard_timeline;
  REFRESH MATERIALIZED VIEW mv_proyectos_detalle;
  REFRESH MATERIALIZED VIEW mv_dashboard_por_tipo;
  REFRESH MATERIALIZED VIEW mv_empresas_detalle;
  RETURN NULL;
END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: actores_municipales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.actores_municipales (
    id_actor integer NOT NULL,
    nombre character varying(150) NOT NULL,
    es_propio boolean DEFAULT true
);


--
-- Name: actores_municipales_id_actor_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.actores_municipales_id_actor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: actores_municipales_id_actor_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.actores_municipales_id_actor_seq OWNED BY public.actores_municipales.id_actor;


--
-- Name: actores_proyectos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.actores_proyectos (
    id_proyecto integer NOT NULL,
    id_actor integer NOT NULL
);


--
-- Name: apoyos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.apoyos (
    id_apoyo integer NOT NULL,
    nombre character varying(100) NOT NULL,
    es_propio boolean DEFAULT true NOT NULL
);


--
-- Name: apoyos_empresas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.apoyos_empresas (
    id_apoyo integer NOT NULL,
    id_empresa integer NOT NULL
);


--
-- Name: apoyos_id_apoyo_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.apoyos_id_apoyo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: apoyos_id_apoyo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.apoyos_id_apoyo_seq OWNED BY public.apoyos.id_apoyo;


--
-- Name: areas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.areas (
    id_area integer NOT NULL,
    nombre character varying(100) NOT NULL
);


--
-- Name: areas_desarrollo; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.areas_desarrollo (
    id_area integer NOT NULL,
    nombre character varying(100) NOT NULL
);


--
-- Name: areas_desarrollo_id_area_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.areas_desarrollo_id_area_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: areas_desarrollo_id_area_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.areas_desarrollo_id_area_seq OWNED BY public.areas_desarrollo.id_area;


--
-- Name: areas_id_area_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.areas_id_area_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: areas_id_area_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.areas_id_area_seq OWNED BY public.areas.id_area;


--
-- Name: ayudas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ayudas (
    id_ayuda integer NOT NULL,
    nombre character varying(150) NOT NULL,
    es_propio boolean DEFAULT true
);


--
-- Name: ayudas_id_ayuda_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.ayudas_id_ayuda_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ayudas_id_ayuda_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.ayudas_id_ayuda_seq OWNED BY public.ayudas.id_ayuda;


--
-- Name: ayudas_proyectos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ayudas_proyectos (
    id_proyecto integer NOT NULL,
    id_ayuda integer NOT NULL
);


--
-- Name: comunidades_indigenas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comunidades_indigenas (
    id_comunidad integer NOT NULL,
    nombre character varying(100) NOT NULL
);


--
-- Name: comunidades_indigenas_areas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comunidades_indigenas_areas (
    id_proyecto integer NOT NULL,
    id_area integer NOT NULL
);


--
-- Name: comunidades_indigenas_id_comunidad_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comunidades_indigenas_id_comunidad_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comunidades_indigenas_id_comunidad_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comunidades_indigenas_id_comunidad_seq OWNED BY public.comunidades_indigenas.id_comunidad;


--
-- Name: comunidades_municipios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comunidades_municipios (
    id_comunidad integer NOT NULL,
    id_municipio integer NOT NULL
);


--
-- Name: conservacion_agricolas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.conservacion_agricolas (
    id_practica integer NOT NULL,
    id_proyecto integer NOT NULL
);


--
-- Name: conservacion_animales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.conservacion_animales (
    id_especie integer NOT NULL,
    id_proyecto integer NOT NULL
);


--
-- Name: departamentos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.departamentos (
    id_departamento integer NOT NULL,
    nombre character varying(100) NOT NULL,
    amazonico boolean NOT NULL
);


--
-- Name: departamentos_empresas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.departamentos_empresas (
    id_departamento integer NOT NULL,
    id_empresa integer NOT NULL
);


--
-- Name: departamentos_id_departamento_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.departamentos_id_departamento_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: departamentos_id_departamento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.departamentos_id_departamento_seq OWNED BY public.departamentos.id_departamento;


--
-- Name: empresas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.empresas (
    id_empresa integer NOT NULL,
    nombre character varying(100) NOT NULL,
    id_forma_juridica integer NOT NULL,
    anio_inicio_apoyo integer NOT NULL,
    logo_url text,
    logo_path text
);


--
-- Name: empresas_id_empresa_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.empresas_id_empresa_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: empresas_id_empresa_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.empresas_id_empresa_seq OWNED BY public.empresas.id_empresa;


--
-- Name: especies_animales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.especies_animales (
    id_especie integer NOT NULL,
    nombre character varying(100) NOT NULL,
    es_propio boolean DEFAULT true
);


--
-- Name: especies_animales_id_especie_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.especies_animales_id_especie_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: especies_animales_id_especie_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.especies_animales_id_especie_seq OWNED BY public.especies_animales.id_especie;


--
-- Name: formas_juridicas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.formas_juridicas (
    id_forma integer NOT NULL,
    nombre character varying(100) NOT NULL,
    es_propio boolean DEFAULT true NOT NULL
);


--
-- Name: formas_juridicas_id_forma_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.formas_juridicas_id_forma_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: formas_juridicas_id_forma_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.formas_juridicas_id_forma_seq OWNED BY public.formas_juridicas.id_forma;


--
-- Name: localidades_proyectos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.localidades_proyectos (
    id_localidad integer NOT NULL,
    id_proyecto integer NOT NULL,
    id_municipio integer NOT NULL,
    id_comunidad integer
);


--
-- Name: localidades_proyectos_id_localidad_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.localidades_proyectos_id_localidad_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: localidades_proyectos_id_localidad_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.localidades_proyectos_id_localidad_seq OWNED BY public.localidades_proyectos.id_localidad;


--
-- Name: logs_auditoria; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.logs_auditoria (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    tipo character varying(20) NOT NULL,
    severidad character varying(10) NOT NULL,
    usuario_id integer,
    accion character varying(200) NOT NULL,
    detalle jsonb,
    ip_origen character varying(45),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT logs_auditoria_severidad_check CHECK (((severidad)::text = ANY ((ARRAY['info'::character varying, 'warn'::character varying, 'error'::character varying, 'critico'::character varying])::text[]))),
    CONSTRAINT logs_auditoria_tipo_check CHECK (((tipo)::text = ANY ((ARRAY['aplicacion'::character varying, 'seguridad'::character varying])::text[])))
);


--
-- Name: motivos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.motivos (
    id_motivo integer NOT NULL,
    nombre character varying(100) NOT NULL,
    es_propio boolean DEFAULT true NOT NULL
);


--
-- Name: motivos_empresas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.motivos_empresas (
    id_empresa integer NOT NULL,
    id_motivo integer NOT NULL
);


--
-- Name: motivos_id_motivo_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.motivos_id_motivo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: motivos_id_motivo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.motivos_id_motivo_seq OWNED BY public.motivos.id_motivo;


--
-- Name: municipios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.municipios (
    id_municipio integer NOT NULL,
    nombre character varying(100) NOT NULL,
    id_departamento integer NOT NULL
);


--
-- Name: municipios_id_municipio_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.municipios_id_municipio_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: municipios_id_municipio_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.municipios_id_municipio_seq OWNED BY public.municipios.id_municipio;


--
-- Name: organizaciones; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.organizaciones (
    id_organizacion integer NOT NULL,
    nombre character varying(100) NOT NULL,
    id_tipo integer NOT NULL,
    id_departamento integer NOT NULL,
    es_nacional boolean NOT NULL,
    anio_inicio_trabajo integer NOT NULL,
    logo_url text,
    logo_path text
);


--
-- Name: proyectos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.proyectos (
    id_proyecto integer NOT NULL,
    id_area integer NOT NULL,
    nombre character varying(300) NOT NULL,
    descripcion text,
    id_tipo integer NOT NULL,
    anio_inicio integer NOT NULL,
    anio_fin integer,
    imagen_principal_url text,
    imagen_principal_path text,
    lat numeric(10,7),
    lng numeric(10,7),
    department character varying(100),
    municipality character varying(150),
    georef_resolved_at timestamp without time zone,
    georef_failed boolean DEFAULT false NOT NULL
);


--
-- Name: mv_dashboard_por_region; Type: MATERIALIZED VIEW; Schema: public; Owner: -
--

CREATE MATERIALIZED VIEW public.mv_dashboard_por_region AS
 SELECT d.id_departamento,
    d.nombre AS departamento,
    d.amazonico,
    (count(DISTINCT de.id_empresa))::integer AS total_empresas,
    (count(DISTINCT o.id_organizacion))::integer AS total_organizaciones,
    (count(DISTINCT p_dep.id_proyecto))::integer AS total_proyectos,
    (count(DISTINCT
        CASE
            WHEN (p.id_area = 1) THEN p.id_proyecto
            ELSE NULL::integer
        END))::integer AS proyectos_conservacion,
    (count(DISTINCT
        CASE
            WHEN (p.id_area = 2) THEN p.id_proyecto
            ELSE NULL::integer
        END))::integer AS proyectos_desarrollo
   FROM ((((public.departamentos d
     LEFT JOIN public.departamentos_empresas de ON ((d.id_departamento = de.id_departamento)))
     LEFT JOIN public.organizaciones o ON ((d.id_departamento = o.id_departamento)))
     LEFT JOIN ( SELECT lp.id_proyecto,
            mu.id_departamento
           FROM (public.localidades_proyectos lp
             JOIN public.municipios mu ON ((lp.id_municipio = mu.id_municipio)))) p_dep ON ((d.id_departamento = p_dep.id_departamento)))
     LEFT JOIN public.proyectos p ON ((p_dep.id_proyecto = p.id_proyecto)))
  GROUP BY d.id_departamento, d.nombre, d.amazonico
  ORDER BY d.nombre
  WITH NO DATA;


--
-- Name: proyectos_empresas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.proyectos_empresas (
    id_empresa integer NOT NULL,
    id_proyecto integer NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_fin date,
    id_participacion integer NOT NULL
);


--
-- Name: proyectos_organizaciones; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.proyectos_organizaciones (
    id_proyecto integer NOT NULL,
    id_organizacion integer NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_fin date,
    id_participacion integer NOT NULL
);


--
-- Name: tipos_proyectos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tipos_proyectos (
    id_tipo integer NOT NULL,
    nombre character varying(200) NOT NULL,
    es_propio boolean DEFAULT true NOT NULL
);


--
-- Name: mv_dashboard_por_tipo; Type: MATERIALIZED VIEW; Schema: public; Owner: -
--

CREATE MATERIALIZED VIEW public.mv_dashboard_por_tipo AS
 SELECT p.id_area,
    a.nombre AS area,
    p.id_tipo,
    tp.nombre AS tipo_proyecto,
    (count(DISTINCT p.id_proyecto))::integer AS total_proyectos,
    (count(DISTINCT p.id_proyecto) FILTER (WHERE (p.anio_fin IS NULL)))::integer AS proyectos_activos,
    (count(DISTINCT p.id_proyecto) FILTER (WHERE (p.anio_fin IS NOT NULL)))::integer AS proyectos_finalizados,
    (count(DISTINCT pe.id_empresa))::integer AS empresas_participantes,
    (count(DISTINCT po.id_organizacion))::integer AS organizaciones_participantes,
    (count(DISTINCT mu.id_departamento))::integer AS departamentos_cubiertos
   FROM ((((((public.proyectos p
     JOIN public.areas a ON ((p.id_area = a.id_area)))
     JOIN public.tipos_proyectos tp ON ((p.id_tipo = tp.id_tipo)))
     LEFT JOIN public.proyectos_empresas pe ON ((p.id_proyecto = pe.id_proyecto)))
     LEFT JOIN public.proyectos_organizaciones po ON ((p.id_proyecto = po.id_proyecto)))
     LEFT JOIN public.localidades_proyectos lp ON ((p.id_proyecto = lp.id_proyecto)))
     LEFT JOIN public.municipios mu ON ((lp.id_municipio = mu.id_municipio)))
  GROUP BY p.id_area, a.nombre, p.id_tipo, tp.nombre
  ORDER BY p.id_area, tp.nombre
  WITH NO DATA;


--
-- Name: ods_empresas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ods_empresas (
    id_ods integer NOT NULL,
    id_empresa integer NOT NULL
);


--
-- Name: mv_dashboard_resumen_global; Type: MATERIALIZED VIEW; Schema: public; Owner: -
--

CREATE MATERIALIZED VIEW public.mv_dashboard_resumen_global AS
 SELECT 1 AS id,
    ( SELECT (count(*))::integer AS count
           FROM public.empresas) AS total_empresas,
    ( SELECT (count(*))::integer AS count
           FROM public.organizaciones) AS total_organizaciones,
    ( SELECT (count(*))::integer AS count
           FROM public.proyectos) AS total_proyectos,
    ( SELECT (count(*))::integer AS count
           FROM public.proyectos
          WHERE (proyectos.id_area = 1)) AS proyectos_conservacion,
    ( SELECT (count(*))::integer AS count
           FROM public.proyectos
          WHERE (proyectos.id_area = 2)) AS proyectos_desarrollo,
    ( SELECT (count(*))::integer AS count
           FROM public.proyectos
          WHERE (proyectos.anio_fin IS NULL)) AS proyectos_activos,
    ( SELECT (count(*))::integer AS count
           FROM public.proyectos
          WHERE (proyectos.anio_fin IS NOT NULL)) AS proyectos_finalizados,
    ( SELECT (count(DISTINCT proyectos_empresas.id_empresa))::integer AS count
           FROM public.proyectos_empresas) AS empresas_con_proyectos,
    ( SELECT (count(DISTINCT proyectos_organizaciones.id_organizacion))::integer AS count
           FROM public.proyectos_organizaciones) AS organizaciones_con_proyectos,
    ( SELECT (count(*))::integer AS count
           FROM public.departamentos
          WHERE (departamentos.amazonico = true)) AS departamentos_amazonicos,
    ( SELECT (count(DISTINCT localidades_proyectos.id_municipio))::integer AS count
           FROM public.localidades_proyectos) AS municipios_cubiertos,
    ( SELECT (count(DISTINCT localidades_proyectos.id_comunidad))::integer AS count
           FROM public.localidades_proyectos
          WHERE (localidades_proyectos.id_comunidad IS NOT NULL)) AS comunidades_indigenas_beneficiadas,
    ( SELECT (count(*))::integer AS count
           FROM public.organizaciones
          WHERE (organizaciones.es_nacional = true)) AS organizaciones_nacionales,
    ( SELECT (count(*))::integer AS count
           FROM public.organizaciones
          WHERE (organizaciones.es_nacional = false)) AS organizaciones_internacionales,
    ( SELECT (count(DISTINCT ods_empresas.id_ods))::integer AS count
           FROM public.ods_empresas) AS total_ods_cubiertos,
    COALESCE(LEAST(( SELECT min(empresas.anio_inicio_apoyo) AS min
           FROM public.empresas), ( SELECT min(organizaciones.anio_inicio_trabajo) AS min
           FROM public.organizaciones), ( SELECT min(proyectos.anio_inicio) AS min
           FROM public.proyectos)), (EXTRACT(year FROM CURRENT_DATE))::integer) AS anio_inicio_mas_antiguo,
    COALESCE(GREATEST(( SELECT max(empresas.anio_inicio_apoyo) AS max
           FROM public.empresas), ( SELECT max(organizaciones.anio_inicio_trabajo) AS max
           FROM public.organizaciones), ( SELECT max(proyectos.anio_inicio) AS max
           FROM public.proyectos)), (EXTRACT(year FROM CURRENT_DATE))::integer) AS anio_inicio_mas_reciente,
    now() AS ultima_actualizacion
  WITH NO DATA;


--
-- Name: mv_dashboard_timeline; Type: MATERIALIZED VIEW; Schema: public; Owner: -
--

CREATE MATERIALIZED VIEW public.mv_dashboard_timeline AS
 WITH year_range AS (
         SELECT COALESCE(LEAST(( SELECT min(empresas.anio_inicio_apoyo) AS min
                   FROM public.empresas), ( SELECT min(organizaciones.anio_inicio_trabajo) AS min
                   FROM public.organizaciones), ( SELECT min(proyectos.anio_inicio) AS min
                   FROM public.proyectos)), (EXTRACT(year FROM CURRENT_DATE))::integer) AS min_anio,
            (EXTRACT(year FROM CURRENT_DATE))::integer AS max_anio
        ), years AS (
         SELECT generate_series(year_range.min_anio, year_range.max_anio) AS anio
           FROM year_range
        ), emp AS (
         SELECT empresas.anio_inicio_apoyo AS anio,
            (count(*))::integer AS n
           FROM public.empresas
          GROUP BY empresas.anio_inicio_apoyo
        ), org AS (
         SELECT organizaciones.anio_inicio_trabajo AS anio,
            (count(*))::integer AS n
           FROM public.organizaciones
          GROUP BY organizaciones.anio_inicio_trabajo
        ), proy AS (
         SELECT proyectos.anio_inicio AS anio,
            (count(*))::integer AS n
           FROM public.proyectos
          GROUP BY proyectos.anio_inicio
        )
 SELECT y.anio,
    COALESCE(emp.n, 0) AS nuevas_empresas,
    COALESCE(org.n, 0) AS nuevas_organizaciones,
    COALESCE(proy.n, 0) AS nuevos_proyectos
   FROM (((years y
     LEFT JOIN emp ON ((y.anio = emp.anio)))
     LEFT JOIN org ON ((y.anio = org.anio)))
     LEFT JOIN proy ON ((y.anio = proy.anio)))
  ORDER BY y.anio
  WITH NO DATA;


--
-- Name: ods; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ods (
    id_ods integer NOT NULL,
    nombre character varying(100) NOT NULL
);


--
-- Name: organizaciones_empresas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.organizaciones_empresas (
    id_orga_empresa integer NOT NULL,
    id_organizacion integer,
    id_empresa integer NOT NULL,
    nombre character varying(300)
);


--
-- Name: mv_empresas_detalle; Type: MATERIALIZED VIEW; Schema: public; Owner: -
--

CREATE MATERIALIZED VIEW public.mv_empresas_detalle AS
 SELECT e.id_empresa,
    e.nombre,
    e.anio_inicio_apoyo,
    jsonb_build_object('id', fj.id_forma, 'nombre', fj.nombre) AS forma_juridica,
    COALESCE(( SELECT json_agg(jsonb_build_object('id', d.id_departamento, 'nombre', d.nombre, 'amazonico', d.amazonico)) AS json_agg
           FROM (public.departamentos_empresas de_pivot
             JOIN public.departamentos d ON ((de_pivot.id_departamento = d.id_departamento)))
          WHERE (de_pivot.id_empresa = e.id_empresa)), '[]'::json) AS departamentos,
    COALESCE(( SELECT json_agg(jsonb_build_object('id', m.id_motivo, 'nombre', m.nombre)) AS json_agg
           FROM (public.motivos_empresas me_pivot
             JOIN public.motivos m ON ((me_pivot.id_motivo = m.id_motivo)))
          WHERE (me_pivot.id_empresa = e.id_empresa)), '[]'::json) AS motivos_apoyo,
    COALESCE(( SELECT json_agg(jsonb_build_object('id', ap.id_apoyo, 'nombre', ap.nombre)) AS json_agg
           FROM (public.apoyos_empresas ae_pivot
             JOIN public.apoyos ap ON ((ae_pivot.id_apoyo = ap.id_apoyo)))
          WHERE (ae_pivot.id_empresa = e.id_empresa)), '[]'::json) AS tipos_apoyo,
    COALESCE(( SELECT json_agg(jsonb_build_object('id', o.id_ods, 'nombre', o.nombre)) AS json_agg
           FROM (public.ods_empresas oe_pivot
             JOIN public.ods o ON ((oe_pivot.id_ods = o.id_ods)))
          WHERE (oe_pivot.id_empresa = e.id_empresa)), '[]'::json) AS ods_alineados,
    COALESCE(( SELECT json_agg(jsonb_build_object('id', org.id_organizacion, 'nombre', org.nombre, 'es_nacional', org.es_nacional)) AS json_agg
           FROM (public.organizaciones_empresas oe
             JOIN public.organizaciones org ON ((oe.id_organizacion = org.id_organizacion)))
          WHERE ((oe.id_empresa = e.id_empresa) AND (oe.id_organizacion IS NOT NULL))), '[]'::json) AS organizaciones_vinculadas,
    ( SELECT (count(DISTINCT pe.id_proyecto))::integer AS count
           FROM public.proyectos_empresas pe
          WHERE (pe.id_empresa = e.id_empresa)) AS total_proyectos_participantes,
    ( SELECT (count(DISTINCT pe.id_proyecto))::integer AS count
           FROM (public.proyectos_empresas pe
             JOIN public.proyectos p ON ((pe.id_proyecto = p.id_proyecto)))
          WHERE ((pe.id_empresa = e.id_empresa) AND (p.anio_fin IS NULL))) AS proyectos_activos_participantes
   FROM (public.empresas e
     JOIN public.formas_juridicas fj ON ((e.id_forma_juridica = fj.id_forma)))
  ORDER BY e.id_empresa
  WITH NO DATA;


--
-- Name: practicas_agricolas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.practicas_agricolas (
    id_practica integer NOT NULL,
    nombre character varying(100) NOT NULL,
    es_propio boolean DEFAULT true
);


--
-- Name: mv_proyectos_detalle; Type: MATERIALIZED VIEW; Schema: public; Owner: -
--

CREATE MATERIALIZED VIEW public.mv_proyectos_detalle AS
 SELECT p.id_proyecto,
    p.nombre,
    p.descripcion,
    p.anio_inicio,
    p.anio_fin,
    (p.anio_fin IS NULL) AS activo,
    a.id_area,
    a.nombre AS area,
    tp.id_tipo,
    tp.nombre AS tipo_proyecto,
    ( SELECT (count(DISTINCT pe.id_empresa))::integer AS count
           FROM public.proyectos_empresas pe
          WHERE (pe.id_proyecto = p.id_proyecto)) AS total_empresas_participantes,
    ( SELECT (count(DISTINCT po.id_organizacion))::integer AS count
           FROM public.proyectos_organizaciones po
          WHERE (po.id_proyecto = p.id_proyecto)) AS total_organizaciones_participantes,
    COALESCE(( SELECT json_agg(row_to_json(sub.*)) AS json_agg
           FROM ( SELECT DISTINCT d.id_departamento AS id,
                    d.nombre,
                    d.amazonico
                   FROM ((public.localidades_proyectos lp
                     JOIN public.municipios mu ON ((lp.id_municipio = mu.id_municipio)))
                     JOIN public.departamentos d ON ((mu.id_departamento = d.id_departamento)))
                  WHERE (lp.id_proyecto = p.id_proyecto)) sub), '[]'::json) AS departamentos,
    COALESCE(( SELECT json_agg(jsonb_build_object('id', mu.id_municipio, 'nombre', mu.nombre)) AS json_agg
           FROM (public.localidades_proyectos lp
             JOIN public.municipios mu ON ((lp.id_municipio = mu.id_municipio)))
          WHERE (lp.id_proyecto = p.id_proyecto)), '[]'::json) AS municipios,
    COALESCE(( SELECT json_agg(jsonb_build_object('id', ci.id_comunidad, 'nombre', ci.nombre)) AS json_agg
           FROM (public.localidades_proyectos lp
             JOIN public.comunidades_indigenas ci ON ((lp.id_comunidad = ci.id_comunidad)))
          WHERE ((lp.id_proyecto = p.id_proyecto) AND (lp.id_comunidad IS NOT NULL))), '[]'::json) AS comunidades_indigenas,
    COALESCE(( SELECT json_agg(jsonb_build_object('id', ay.id_ayuda, 'nombre', ay.nombre)) AS json_agg
           FROM (public.ayudas_proyectos ayp
             JOIN public.ayudas ay ON ((ayp.id_ayuda = ay.id_ayuda)))
          WHERE (ayp.id_proyecto = p.id_proyecto)), '[]'::json) AS tipos_ayuda,
    COALESCE(( SELECT json_agg(jsonb_build_object('id', am.id_actor, 'nombre', am.nombre)) AS json_agg
           FROM (public.actores_proyectos actp
             JOIN public.actores_municipales am ON ((actp.id_actor = am.id_actor)))
          WHERE (actp.id_proyecto = p.id_proyecto)), '[]'::json) AS actores_locales,
        CASE
            WHEN (p.id_area = 1) THEN COALESCE(( SELECT json_agg(jsonb_build_object('id', ea.id_especie, 'nombre', ea.nombre)) AS json_agg
               FROM (public.conservacion_animales ca
                 JOIN public.especies_animales ea ON ((ca.id_especie = ea.id_especie)))
              WHERE (ca.id_proyecto = p.id_proyecto)), '[]'::json)
            ELSE NULL::json
        END AS especies_animales,
        CASE
            WHEN (p.id_area = 1) THEN COALESCE(( SELECT json_agg(jsonb_build_object('id', pra.id_practica, 'nombre', pra.nombre)) AS json_agg
               FROM (public.conservacion_agricolas cag
                 JOIN public.practicas_agricolas pra ON ((cag.id_practica = pra.id_practica)))
              WHERE (cag.id_proyecto = p.id_proyecto)), '[]'::json)
            ELSE NULL::json
        END AS practicas_agricolas,
        CASE
            WHEN (p.id_area = 2) THEN COALESCE(( SELECT json_agg(jsonb_build_object('id', ad.id_area, 'nombre', ad.nombre)) AS json_agg
               FROM (public.comunidades_indigenas_areas cia
                 JOIN public.areas_desarrollo ad ON ((cia.id_area = ad.id_area)))
              WHERE (cia.id_proyecto = p.id_proyecto)), '[]'::json)
            ELSE NULL::json
        END AS areas_desarrollo
   FROM ((public.proyectos p
     JOIN public.areas a ON ((p.id_area = a.id_area)))
     JOIN public.tipos_proyectos tp ON ((p.id_tipo = tp.id_tipo)))
  ORDER BY p.id_proyecto
  WITH NO DATA;


--
-- Name: ods_id_ods_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.ods_id_ods_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ods_id_ods_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.ods_id_ods_seq OWNED BY public.ods.id_ods;


--
-- Name: organizaciones_empresas_id_orga_empresa_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.organizaciones_empresas_id_orga_empresa_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: organizaciones_empresas_id_orga_empresa_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.organizaciones_empresas_id_orga_empresa_seq OWNED BY public.organizaciones_empresas.id_orga_empresa;


--
-- Name: organizaciones_id_organizacion_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.organizaciones_id_organizacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: organizaciones_id_organizacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.organizaciones_id_organizacion_seq OWNED BY public.organizaciones.id_organizacion;


--
-- Name: practicas_agricolas_id_practica_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.practicas_agricolas_id_practica_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: practicas_agricolas_id_practica_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.practicas_agricolas_id_practica_seq OWNED BY public.practicas_agricolas.id_practica;


--
-- Name: proyecto_imagenes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.proyecto_imagenes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    id_proyecto integer NOT NULL,
    url text NOT NULL,
    path text NOT NULL,
    descripcion text,
    orden integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: proyectos_empresas_id_participacion_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.proyectos_empresas_id_participacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: proyectos_empresas_id_participacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.proyectos_empresas_id_participacion_seq OWNED BY public.proyectos_empresas.id_participacion;


--
-- Name: proyectos_id_proyecto_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.proyectos_id_proyecto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: proyectos_id_proyecto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.proyectos_id_proyecto_seq OWNED BY public.proyectos.id_proyecto;


--
-- Name: proyectos_organizaciones_id_participacion_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.proyectos_organizaciones_id_participacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: proyectos_organizaciones_id_participacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.proyectos_organizaciones_id_participacion_seq OWNED BY public.proyectos_organizaciones.id_participacion;


--
-- Name: publicacion_imagenes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.publicacion_imagenes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    id_publicacion uuid NOT NULL,
    url text NOT NULL,
    path text NOT NULL,
    descripcion text,
    orden integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: publicaciones; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.publicaciones (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    autor_id integer NOT NULL,
    titulo character varying(500) NOT NULL,
    slug character varying(600) NOT NULL,
    contenido jsonb DEFAULT '[]'::jsonb NOT NULL,
    estado character varying(20) DEFAULT 'borrador'::character varying NOT NULL,
    fecha_creacion timestamp with time zone DEFAULT now() NOT NULL,
    fecha_ultima_edicion timestamp with time zone,
    fecha_publicacion timestamp with time zone,
    editado_por integer,
    CONSTRAINT publicaciones_estado_check CHECK (((estado)::text = ANY ((ARRAY['borrador'::character varying, 'publicado'::character varying])::text[])))
);


--
-- Name: solicitudes_acceso; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.solicitudes_acceso (
    id_solicitud integer NOT NULL,
    nombre_solicitante character varying(150) NOT NULL,
    email_solicitante character varying(255) NOT NULL,
    institucion character varying(255) NOT NULL,
    proposito text NOT NULL,
    estado character varying(20) DEFAULT 'pendiente'::character varying NOT NULL,
    fecha_expiracion_acceso timestamp without time zone,
    id_revisor integer,
    id_usuario_creado integer,
    nota_rechazo text,
    fecha_revision timestamp without time zone,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: solicitudes_acceso_id_solicitud_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.solicitudes_acceso_id_solicitud_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: solicitudes_acceso_id_solicitud_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.solicitudes_acceso_id_solicitud_seq OWNED BY public.solicitudes_acceso.id_solicitud;


--
-- Name: tipos_organizaciones; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tipos_organizaciones (
    id_tipo integer NOT NULL,
    nombre character varying(100) NOT NULL,
    es_propio boolean DEFAULT true
);


--
-- Name: tipos_organizaciones_id_tipo_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tipos_organizaciones_id_tipo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tipos_organizaciones_id_tipo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tipos_organizaciones_id_tipo_seq OWNED BY public.tipos_organizaciones.id_tipo;


--
-- Name: tipos_proyectos_id_tipo_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tipos_proyectos_id_tipo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tipos_proyectos_id_tipo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tipos_proyectos_id_tipo_seq OWNED BY public.tipos_proyectos.id_tipo;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    nombre character varying(150) NOT NULL,
    rol integer NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    fecha_expiracion timestamp without time zone,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    token_valid_from timestamp without time zone
);


--
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;


--
-- Name: actores_municipales id_actor; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.actores_municipales ALTER COLUMN id_actor SET DEFAULT nextval('public.actores_municipales_id_actor_seq'::regclass);


--
-- Name: apoyos id_apoyo; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.apoyos ALTER COLUMN id_apoyo SET DEFAULT nextval('public.apoyos_id_apoyo_seq'::regclass);


--
-- Name: areas id_area; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.areas ALTER COLUMN id_area SET DEFAULT nextval('public.areas_id_area_seq'::regclass);


--
-- Name: areas_desarrollo id_area; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.areas_desarrollo ALTER COLUMN id_area SET DEFAULT nextval('public.areas_desarrollo_id_area_seq'::regclass);


--
-- Name: ayudas id_ayuda; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ayudas ALTER COLUMN id_ayuda SET DEFAULT nextval('public.ayudas_id_ayuda_seq'::regclass);


--
-- Name: comunidades_indigenas id_comunidad; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comunidades_indigenas ALTER COLUMN id_comunidad SET DEFAULT nextval('public.comunidades_indigenas_id_comunidad_seq'::regclass);


--
-- Name: departamentos id_departamento; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.departamentos ALTER COLUMN id_departamento SET DEFAULT nextval('public.departamentos_id_departamento_seq'::regclass);


--
-- Name: empresas id_empresa; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.empresas ALTER COLUMN id_empresa SET DEFAULT nextval('public.empresas_id_empresa_seq'::regclass);


--
-- Name: especies_animales id_especie; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.especies_animales ALTER COLUMN id_especie SET DEFAULT nextval('public.especies_animales_id_especie_seq'::regclass);


--
-- Name: formas_juridicas id_forma; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.formas_juridicas ALTER COLUMN id_forma SET DEFAULT nextval('public.formas_juridicas_id_forma_seq'::regclass);


--
-- Name: localidades_proyectos id_localidad; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.localidades_proyectos ALTER COLUMN id_localidad SET DEFAULT nextval('public.localidades_proyectos_id_localidad_seq'::regclass);


--
-- Name: motivos id_motivo; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.motivos ALTER COLUMN id_motivo SET DEFAULT nextval('public.motivos_id_motivo_seq'::regclass);


--
-- Name: municipios id_municipio; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.municipios ALTER COLUMN id_municipio SET DEFAULT nextval('public.municipios_id_municipio_seq'::regclass);


--
-- Name: ods id_ods; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ods ALTER COLUMN id_ods SET DEFAULT nextval('public.ods_id_ods_seq'::regclass);


--
-- Name: organizaciones id_organizacion; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organizaciones ALTER COLUMN id_organizacion SET DEFAULT nextval('public.organizaciones_id_organizacion_seq'::regclass);


--
-- Name: organizaciones_empresas id_orga_empresa; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organizaciones_empresas ALTER COLUMN id_orga_empresa SET DEFAULT nextval('public.organizaciones_empresas_id_orga_empresa_seq'::regclass);


--
-- Name: practicas_agricolas id_practica; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.practicas_agricolas ALTER COLUMN id_practica SET DEFAULT nextval('public.practicas_agricolas_id_practica_seq'::regclass);


--
-- Name: proyectos id_proyecto; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proyectos ALTER COLUMN id_proyecto SET DEFAULT nextval('public.proyectos_id_proyecto_seq'::regclass);


--
-- Name: proyectos_empresas id_participacion; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proyectos_empresas ALTER COLUMN id_participacion SET DEFAULT nextval('public.proyectos_empresas_id_participacion_seq'::regclass);


--
-- Name: proyectos_organizaciones id_participacion; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proyectos_organizaciones ALTER COLUMN id_participacion SET DEFAULT nextval('public.proyectos_organizaciones_id_participacion_seq'::regclass);


--
-- Name: solicitudes_acceso id_solicitud; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.solicitudes_acceso ALTER COLUMN id_solicitud SET DEFAULT nextval('public.solicitudes_acceso_id_solicitud_seq'::regclass);


--
-- Name: tipos_organizaciones id_tipo; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tipos_organizaciones ALTER COLUMN id_tipo SET DEFAULT nextval('public.tipos_organizaciones_id_tipo_seq'::regclass);


--
-- Name: tipos_proyectos id_tipo; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tipos_proyectos ALTER COLUMN id_tipo SET DEFAULT nextval('public.tipos_proyectos_id_tipo_seq'::regclass);


--
-- Name: usuarios id_usuario; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);


--
-- Data for Name: actores_municipales; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.actores_municipales (id_actor, nombre, es_propio) FROM stdin;
1	Gobiernos municipales	f
2	Financiero	f
3	Capacitaciones	f
4	Fortalecimiento de organizaciones sociales	f
5	Actores privados	f
\.


--
-- Data for Name: actores_proyectos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.actores_proyectos (id_proyecto, id_actor) FROM stdin;
1	1
1	4
2	3
2	4
3	3
4	1
4	2
4	4
5	2
5	3
13	1
14	5
15	1
16	1
17	1
17	5
18	1
18	5
19	1
19	4
20	1
20	3
21	1
21	2
22	1
22	3
23	1
23	4
24	1
24	3
25	4
25	5
26	1
\.


--
-- Data for Name: apoyos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.apoyos (id_apoyo, nombre, es_propio) FROM stdin;
1	Donaciones	f
2	Financiero	f
3	Logistico	f
4	Talento Humano	f
5	Investigaciones	f
8	Asesoría técnica especializada	t
\.


--
-- Data for Name: apoyos_empresas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.apoyos_empresas (id_apoyo, id_empresa) FROM stdin;
3	1
4	1
1	9
2	9
1	10
3	10
5	11
8	11
2	12
4	12
3	13
4	13
1	14
5	14
2	15
3	15
1	16
1	19
2	19
\.


--
-- Data for Name: areas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.areas (id_area, nombre) FROM stdin;
1	Conservacion
2	Desarrollo de comunidades indigenas
\.


--
-- Data for Name: areas_desarrollo; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.areas_desarrollo (id_area, nombre) FROM stdin;
1	Ecoturismo
2	Restauración ecológica
3	Apoyo legal y administrativo para la protección de territorios
4	Educación
\.


--
-- Data for Name: ayudas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.ayudas (id_ayuda, nombre, es_propio) FROM stdin;
1	Donaciones	f
2	Financiero	f
3	Capacitaciones	f
4	Fortalecimiento de organizaciones sociales	f
5	Investigaciones	f
6	Construcción/refacción de infraestructura	f
\.


--
-- Data for Name: ayudas_proyectos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.ayudas_proyectos (id_proyecto, id_ayuda) FROM stdin;
1	2
1	3
2	3
2	6
3	3
4	2
4	3
4	4
5	3
5	4
13	2
14	1
14	3
15	5
16	3
17	2
17	5
18	1
18	5
19	1
19	3
20	1
20	5
21	3
21	5
22	1
22	5
23	1
23	2
23	3
24	1
24	2
24	5
25	3
25	5
26	1
\.


--
-- Data for Name: comunidades_indigenas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.comunidades_indigenas (id_comunidad, nombre) FROM stdin;
1	Pacahuara
2	Machineri
3	Yaminahua
4	Tacanas
5	Cavineño
6	Esse Ejja
7	Mosetene
8	La Organización del Pueblo Indígena Leco y Comunidades Originarias de Larecaja (PILCOL)
9	La Central Indígena del Pueblo Leco de Apolo (CIPLA)
10	Consejo Regional T'simane Mosetenes Pilón Lajas (CRTM-PL)
11	Pueblo Indígena de San José de Uchupiamonas (PI-SJU)
12	Afrobolivianos
13	OPIM (Organización del Pueblo Indígena Mosetén) y OMIM (Organización de la Mujer Indígena Mosetén)
14	Comunidad Agroecológica Originaria de Palos Blancos (CAOPB)
15	Comunidad Indígena Apichana
16	Consejo Indígena del Pueblo Tacana (CIPTA)
17	Comunidad Indígena Puesto Araona (CAPIA)
18	Central de Comunidades Indígenas Tacana II Río Madre de Dios (CITRMD)
19	Comunidad Ese Ejja de Eyiyoquibo (CEEE)
20	Lecos
21	Canichana
22	Moxeño
23	Sirionó
24	Javeriano
25	Chacobo
26	Reyesano / Moropa
27	Tsimane
28	Yuracare
29	Movima
30	Movima (TIM)
31	Mojeño Trinitario (TIM)
32	Tsimane (TIM)
33	Yuracare (TIM)
34	Mosetén
35	Cayubaba
36	Yuracaré
37	Ignaciano
38	Loretano
39	Mojeño
40	Itonama
41	Joaquiniano
42	Baure
43	Moré
44	Itonamas
45	Chiquitano
46	Guaragsug we
47	Yuracaré-Mojeño
48	Guarayo
49	Consejo Indígena Yuqui Consejo Indígena del Río Ichilo (YUQUI CIRI)
50	Trinitario Moxeño
51	Trinitario Moxeño - Territorio Indígena del Parque Isiboro Sécure Consejo Indígena del Sur (TIPNIS)
\.


--
-- Data for Name: comunidades_indigenas_areas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.comunidades_indigenas_areas (id_proyecto, id_area) FROM stdin;
14	1
14	2
16	4
18	1
19	2
21	1
23	2
25	3
25	4
26	2
\.


--
-- Data for Name: comunidades_municipios; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.comunidades_municipios (id_comunidad, id_municipio) FROM stdin;
1	1
2	3
3	3
4	4
4	5
5	5
5	7
4	8
5	8
6	8
4	9
5	9
6	9
4	10
5	10
4	12
5	12
6	12
4	13
7	20
8	20
8	23
8	24
8	25
7	27
8	27
9	27
11	27
12	29
12	30
12	35
12	36
7	38
13	38
14	38
15	38
8	41
11	41
15	41
16	41
17	41
18	41
19	41
8	42
11	42
14	42
16	42
19	42
20	45
21	48
22	48
23	48
24	48
21	49
22	49
23	49
1	50
4	50
5	50
25	50
25	51
4	52
5	52
25	52
26	52
27	52
4	53
7	53
13	53
28	53
29	53
4	54
5	54
27	54
28	54
4	55
6	55
7	55
26	55
5	56
30	56
31	56
32	56
33	56
34	56
5	57
25	57
29	57
35	57
30	58
31	58
32	58
34	58
36	58
37	58
36	59
38	59
39	59
39	60
29	61
39	61
40	61
41	61
42	61
43	61
39	62
40	62
41	62
41	63
43	63
39	64
42	64
44	64
42	65
44	65
40	66
42	66
45	69
46	69
47	72
4	79
5	79
42	82
48	82
48	83
48	84
7	91
16	96
36	97
50	97
16	98
36	98
\.


--
-- Data for Name: conservacion_agricolas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.conservacion_agricolas (id_practica, id_proyecto) FROM stdin;
3	1
6	1
4	2
5	3
3	4
5	4
4	5
1	13
2	13
2	15
3	15
4	17
2	20
3	20
2	22
4	22
2	24
3	24
\.


--
-- Data for Name: conservacion_animales; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.conservacion_animales (id_especie, id_proyecto) FROM stdin;
4	1
6	1
2	2
4	3
4	4
3	5
1	13
2	13
3	15
4	17
1	20
7	20
1	22
2	22
3	22
2	24
4	24
\.


--
-- Data for Name: departamentos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.departamentos (id_departamento, nombre, amazonico) FROM stdin;
1	Pando	t
2	Beni	t
3	La Paz	t
4	Cochabamba	t
5	Santa Cruz	t
\.


--
-- Data for Name: departamentos_empresas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.departamentos_empresas (id_departamento, id_empresa) FROM stdin;
1	1
2	1
3	1
2	9
5	10
3	11
5	12
2	13
5	14
2	15
2	16
2	19
3	19
\.


--
-- Data for Name: empresas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.empresas (id_empresa, nombre, id_forma_juridica, anio_inicio_apoyo, logo_url, logo_path) FROM stdin;
1	fdafsdg	4	2000	\N	\N
9	Fundación Iténez S.R.L.	1	2015	\N	\N
10	AgriNorte Bolivia S.A.	2	2019	\N	\N
11	Consultora Verde Amazónica	7	2021	\N	\N
12	Gravetal Bolivia S.A.	2	2019	\N	\N
13	Cooperativa Integral Agropecuaria El Progreso	8	2015	\N	\N
14	Fundación para la Conservación del Bosque Chiquitano	9	2002	\N	\N
15	Rurrenabaque Ecoturismo S.R.L.	1	2010	\N	\N
16	Test Degradación Elegante Corp S.A.	1	2024	\N	\N
19	Empresa Prueba Frontend	1	2019	\N	\N
\.


--
-- Data for Name: especies_animales; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.especies_animales (id_especie, nombre, es_propio) FROM stdin;
1	Jaguar	f
2	Bufeo	f
3	Oso andino	f
4	Paraba barba azul	f
5	Paraba frente roja	f
6	Ninguno	f
7	Águila harpía	f
\.


--
-- Data for Name: formas_juridicas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.formas_juridicas (id_forma, nombre, es_propio) FROM stdin;
1	S.R.L	f
2	S.A	f
3	Empresa individual	f
4	fdfdf	t
7	Consultoría Ambiental Independiente	t
8	Cooperativa	t
9	Fundación	t
\.


--
-- Data for Name: localidades_proyectos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.localidades_proyectos (id_localidad, id_proyecto, id_municipio, id_comunidad) FROM stdin;
1	1	79	5
2	1	69	45
3	2	48	22
4	3	35	12
5	4	38	7
6	5	20	7
14	13	49	\N
15	14	80	\N
16	15	20	\N
17	16	49	\N
18	17	58	\N
19	18	82	\N
20	19	65	\N
21	20	85	\N
22	21	2	\N
23	22	46	\N
24	23	97	\N
25	24	42	\N
26	25	3	\N
27	26	65	\N
\.


--
-- Data for Name: logs_auditoria; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.logs_auditoria (id, tipo, severidad, usuario_id, accion, detalle, ip_origen, created_at) FROM stdin;
644d5cbb-9550-491f-a540-68ee1c6eebd3	seguridad	info	1	LOGIN_EXITOSO	{"rol": 1, "email": "superadmin@kaaiya.test"}	\N	2026-06-29 16:49:39.613468+00
4dba231e-f217-4b57-aa9f-9776c1caf0c8	seguridad	info	11	LOGIN_EXITOSO	{"rol": 3, "email": "investigador@test.kaaiya.com"}	\N	2026-06-29 16:49:41.683297+00
6a0fef65-3865-480a-9feb-463870a48a59	seguridad	info	1	LOGIN_EXITOSO	{"rol": 1, "email": "superadmin@kaaiya.test"}	\N	2026-06-29 16:50:02.596909+00
4a90ea07-7a42-4e71-8288-c8c9d92d8227	seguridad	info	11	LOGIN_EXITOSO	{"rol": 3, "email": "investigador@test.kaaiya.com"}	\N	2026-06-29 16:50:03.038177+00
52565749-53a6-4931-a8e7-0562e2a5a1ba	seguridad	warn	1	PUBLICACION_EDITADA_POR_ADMIN	{"autorId": 11, "editadoPor": "superadmin@kaaiya.test", "publicacionId": "31e4fa88-1592-4146-80e5-a90276b8db15"}	\N	2026-06-29 16:50:05.093143+00
59f0fd28-3069-4c91-a45a-fe5ebd76dbdb	seguridad	info	1	LOGIN_EXITOSO	{"rol": 1, "email": "superadmin@kaaiya.test"}	\N	2026-07-01 00:27:34.555958+00
d328366b-0146-44c2-9f81-49f645968929	seguridad	info	1	LOGIN_EXITOSO	{"rol": 1, "email": "superadmin@kaaiya.test"}	\N	2026-07-01 00:27:45.588417+00
ecf311a9-e8a3-49c1-86f9-f5c124d41a0a	seguridad	info	1	USUARIO_CREADO	{"rolNuevo": 2, "creadoPor": "superadmin@kaaiya.test", "emailNuevo": "admin.test@kaaiya.test"}	\N	2026-07-01 00:27:48.248917+00
f3ee7520-1938-4162-88c3-2a922baac23b	seguridad	info	1	USUARIO_CREADO	{"rolNuevo": 3, "creadoPor": "superadmin@kaaiya.test", "emailNuevo": "investigador.test@kaaiya.test"}	\N	2026-07-01 00:27:49.60056+00
b1779530-76fb-4629-bf21-b5cc372f312e	seguridad	info	12	LOGIN_EXITOSO	{"rol": 2, "email": "admin.test@kaaiya.test"}	\N	2026-07-01 00:30:52.979806+00
7795a296-7081-4c0f-b8a0-e1e05e702924	seguridad	info	12	LOGIN_EXITOSO	{"rol": 2, "email": "admin.test@kaaiya.test"}	\N	2026-07-01 00:30:55.78302+00
f28270b9-3e13-4295-af85-52a396bb9b03	seguridad	info	13	LOGIN_EXITOSO	{"rol": 3, "email": "investigador.test@kaaiya.test"}	\N	2026-07-01 00:31:00.085533+00
7b58cc2d-b387-4050-bfcc-95dcd94a9474	seguridad	info	12	LOGIN_EXITOSO	{"rol": 2, "email": "admin.test@kaaiya.test"}	\N	2026-07-01 00:31:00.786093+00
9afb5edc-47f0-4d01-a535-c2eabf17fe17	seguridad	info	12	LOGIN_EXITOSO	{"rol": 2, "email": "admin.test@kaaiya.test"}	\N	2026-07-01 00:31:01.891595+00
3d0396b2-2c03-4917-a555-e130e6577b81	seguridad	info	13	LOGIN_EXITOSO	{"rol": 3, "email": "investigador.test@kaaiya.test"}	\N	2026-07-01 00:32:09.785454+00
bfe0f0e4-f515-4129-ab8a-cf7b9184a15f	seguridad	info	12	LOGIN_EXITOSO	{"rol": 2, "email": "admin.test@kaaiya.test"}	\N	2026-07-01 00:32:34.36658+00
74b4d572-95e8-48da-a847-ecd28187a4f6	seguridad	info	12	LOGIN_EXITOSO	{"rol": 2, "email": "admin.test@kaaiya.test"}	\N	2026-07-01 00:32:41.645185+00
c74ad9fb-6b2c-4e32-a4d6-00cf9a706f28	seguridad	info	12	LOGIN_EXITOSO	{"rol": 2, "email": "admin.test@kaaiya.test"}	\N	2026-07-01 00:34:31.176695+00
27c995af-d71c-42f0-b8ad-90fbeb1535a9	seguridad	info	12	LOGIN_EXITOSO	{"rol": 2, "email": "admin.test@kaaiya.test"}	\N	2026-07-01 00:34:38.200956+00
05c1241d-e17b-4c25-83b2-c1684fa52d90	seguridad	info	13	LOGIN_EXITOSO	{"rol": 3, "email": "investigador.test@kaaiya.test"}	\N	2026-07-01 00:35:17.694559+00
c98982cf-a23c-44b4-9b26-bd18f4226aa9	seguridad	info	12	LOGIN_EXITOSO	{"rol": 2, "email": "admin.test@kaaiya.test"}	\N	2026-07-01 00:35:19.160154+00
3906e3c7-c514-426e-bec0-d29b94a97615	seguridad	warn	12	PUBLICACION_ELIMINADA_POR_ADMIN	{"autorId": 13, "eliminadaPor": "admin.test@kaaiya.test", "publicacionId": "7afb481e-eadf-4a01-b135-33b82f1a7d4f"}	\N	2026-07-01 00:35:20.346203+00
a2ce4bc7-5903-4773-b935-60b7a79b9949	seguridad	info	13	LOGIN_EXITOSO	{"rol": 3, "email": "investigador.test@kaaiya.test"}	\N	2026-07-01 00:35:20.817524+00
ec9ba3f5-05e7-4c14-b4b5-e58fddbaed53	seguridad	info	13	LOGIN_EXITOSO	{"rol": 3, "email": "investigador.test@kaaiya.test"}	\N	2026-07-01 01:07:30.277408+00
abeedaf7-7084-48ee-9abe-68dc97cab050	seguridad	info	13	LOGIN_EXITOSO	{"rol": 3, "email": "investigador.test@kaaiya.test"}	\N	2026-07-01 01:08:10.835009+00
6f86526e-b4a4-47a7-b8c5-1f65cbe3999e	seguridad	info	12	LOGIN_EXITOSO	{"rol": 2, "email": "admin.test@kaaiya.test"}	\N	2026-07-01 01:08:22.524198+00
db2284b0-aa12-407f-8974-43bcb6cf26d7	seguridad	info	12	LOGIN_EXITOSO	{"rol": 2, "email": "admin.test@kaaiya.test"}	\N	2026-07-01 01:08:24.334806+00
456807d8-1670-4cd1-b532-21abc9f1786f	seguridad	info	12	LOGIN_EXITOSO	{"rol": 2, "email": "admin.test@kaaiya.test"}	\N	2026-07-01 01:08:24.81412+00
a57b24a1-313b-43d6-ae9b-b40e03bb9717	seguridad	info	1	LOGIN_EXITOSO	{"rol": 1, "email": "superadmin@kaaiya.test"}	\N	2026-07-01 01:11:35.193513+00
fb5d27d0-9f67-4bea-b2cb-d1c369e2b07a	seguridad	info	12	LOGIN_EXITOSO	{"rol": 2, "email": "admin.test@kaaiya.test"}	\N	2026-07-01 01:11:37.650338+00
1e8515bc-61bd-4365-8058-416b7b5ffbf0	seguridad	info	13	LOGIN_EXITOSO	{"rol": 3, "email": "investigador.test@kaaiya.test"}	\N	2026-07-01 01:11:40.215651+00
246e6599-b1a8-4196-a64a-3e0646fdc94e	seguridad	info	1	LOGIN_EXITOSO	{"rol": 1, "email": "superadmin@kaaiya.test"}	\N	2026-07-01 01:12:01.620032+00
7604b7fb-c3a0-45cf-a7a6-b67364c7790b	seguridad	info	12	LOGIN_EXITOSO	{"rol": 2, "email": "admin.test@kaaiya.test"}	\N	2026-07-01 01:12:04.089621+00
ab6662ea-d4d3-4724-b589-7e81b4203e44	seguridad	info	12	LOGIN_EXITOSO	{"rol": 2, "email": "admin.test@kaaiya.test"}	\N	2026-07-01 01:13:21.374303+00
e86941a8-ab88-4903-b2b0-8cb9e97d4b46	seguridad	info	13	LOGIN_EXITOSO	{"rol": 3, "email": "investigador.test@kaaiya.test"}	\N	2026-07-01 01:13:27.134231+00
b976d6ff-9c46-44d3-a698-834a2301219e	seguridad	warn	12	PUBLICACION_ELIMINADA_POR_ADMIN	{"autorId": 13, "eliminadaPor": "admin.test@kaaiya.test", "publicacionId": "24dc3459-2df4-413d-93fa-01e499fc8a52"}	\N	2026-07-01 01:13:38.091589+00
8da7e06c-c906-4e15-b87f-df5c44f0183b	seguridad	warn	12	PUBLICACION_EDITADA_POR_ADMIN	{"autorId": 13, "editadoPor": "admin.test@kaaiya.test", "publicacionId": "9b1ac2f1-0382-4a8b-a638-bc79fa5dd490"}	\N	2026-07-01 01:13:39.523768+00
3d2040aa-999e-43fc-80d5-f2b93e75e1ef	seguridad	warn	12	PUBLICACION_ELIMINADA_POR_ADMIN	{"autorId": 13, "eliminadaPor": "admin.test@kaaiya.test", "publicacionId": "9b1ac2f1-0382-4a8b-a638-bc79fa5dd490"}	\N	2026-07-01 01:13:41.461429+00
26878bc0-fdf0-4033-b509-6c9a4bbca962	seguridad	warn	12	PUBLICACION_ELIMINADA_POR_ADMIN	{"autorId": 13, "eliminadaPor": "admin.test@kaaiya.test", "publicacionId": "7761fbba-5f08-4aef-91cc-fda3f1a72d2e"}	\N	2026-07-01 01:13:43.616639+00
22b060b8-c0db-4948-a17f-01f074aef5f3	seguridad	info	13	LOGIN_EXITOSO	{"rol": 3, "email": "investigador.test@kaaiya.test"}	\N	2026-07-01 01:13:48.501737+00
75fe3f18-1f80-4d6c-bdfe-e9cc5f62c3a2	seguridad	info	13	LOGIN_EXITOSO	{"rol": 3, "email": "investigador.test@kaaiya.test"}	\N	2026-07-01 01:14:06.834164+00
6bacd955-2fca-4a99-8055-dcf332401d79	seguridad	info	12	LOGIN_EXITOSO	{"rol": 2, "email": "admin.test@kaaiya.test"}	\N	2026-07-01 01:14:28.887541+00
0bd56057-a651-4425-a476-8f7dc0f90c0f	seguridad	info	12	LOGIN_EXITOSO	{"rol": 2, "email": "admin.test@kaaiya.test"}	\N	2026-07-01 01:14:34.575882+00
8cf5d4b3-7e64-45e0-9566-267bdf739398	seguridad	warn	12	PUBLICACION_ELIMINADA_POR_ADMIN	{"autorId": 13, "eliminadaPor": "admin.test@kaaiya.test", "publicacionId": "7c032590-d9c4-4d54-b232-23f02e9c56e2"}	\N	2026-07-01 01:17:09.761132+00
5b0ab0e2-abb2-43fa-866b-80aabf78d935	seguridad	warn	12	PUBLICACION_EDITADA_POR_ADMIN	{"autorId": 13, "editadoPor": "admin.test@kaaiya.test", "publicacionId": "656bfbb9-591d-4bcf-adb6-cb45d697f28a"}	\N	2026-07-01 01:17:11.257187+00
f71a0bf8-3450-4103-a33d-ca39af848033	seguridad	warn	12	PUBLICACION_ELIMINADA_POR_ADMIN	{"autorId": 13, "eliminadaPor": "admin.test@kaaiya.test", "publicacionId": "656bfbb9-591d-4bcf-adb6-cb45d697f28a"}	\N	2026-07-01 01:17:13.2043+00
3f4ba87f-fb8a-4d62-b19d-ee8e38074984	seguridad	warn	12	PUBLICACION_ELIMINADA_POR_ADMIN	{"autorId": 13, "eliminadaPor": "admin.test@kaaiya.test", "publicacionId": "55b5ed61-218e-4ff9-8688-06d97cc6419e"}	\N	2026-07-01 01:17:15.386117+00
c44265d4-7a69-478d-9ba6-45dbda09b2ab	seguridad	info	12	LOGIN_EXITOSO	{"rol": 2, "email": "admin.test@kaaiya.test"}	\N	2026-07-01 01:17:55.632174+00
774e7977-6ea9-48b0-b537-2b4388edbfa4	seguridad	info	12	LOGIN_EXITOSO	{"rol": 2, "email": "admin.test@kaaiya.test"}	\N	2026-07-01 01:18:01.297666+00
3c99dea1-fdcc-4663-b23b-6e002da50293	seguridad	warn	12	PUBLICACION_ELIMINADA_POR_ADMIN	{"autorId": 13, "eliminadaPor": "admin.test@kaaiya.test", "publicacionId": "80a8ef5d-b877-4a78-8597-2a15591bb19a"}	\N	2026-07-01 01:18:58.192827+00
d4c89ee9-3c48-4e04-98a0-43403d569477	seguridad	warn	12	PUBLICACION_EDITADA_POR_ADMIN	{"autorId": 13, "editadoPor": "admin.test@kaaiya.test", "publicacionId": "21983cb1-fbee-4302-8379-faa72d22625d"}	\N	2026-07-01 01:18:59.567147+00
dd950a2c-bbad-4c9a-a610-86a9d1239cb4	seguridad	warn	12	PUBLICACION_ELIMINADA_POR_ADMIN	{"autorId": 13, "eliminadaPor": "admin.test@kaaiya.test", "publicacionId": "d1a6f81b-41bc-41a2-80f5-ca61b95690d6"}	\N	2026-07-01 01:19:03.74035+00
8fee8e61-5b03-478c-b94d-c0be7e708d74	seguridad	info	12	LOGIN_EXITOSO	{"rol": 2, "email": "admin.test@kaaiya.test"}	\N	2026-07-01 01:19:42.275679+00
47d36803-1466-470f-b9e0-d6b9c5cab106	seguridad	warn	12	PUBLICACION_ELIMINADA_POR_ADMIN	{"autorId": 13, "eliminadaPor": "admin.test@kaaiya.test", "publicacionId": "21983cb1-fbee-4302-8379-faa72d22625d"}	\N	2026-07-01 01:19:01.495679+00
9ddd7602-b869-4d82-bc07-079ddcaea3b5	seguridad	info	12	LOGIN_EXITOSO	{"rol": 2, "email": "admin.test@kaaiya.test"}	\N	2026-07-01 01:19:47.81788+00
0963c7be-7f34-4223-a0ad-ae07e4c10478	seguridad	info	1	LOGIN_EXITOSO	{"rol": 1, "email": "superadmin@kaaiya.test"}	\N	2026-07-01 01:25:05.945069+00
1c0b7dac-0185-4fd9-9b77-6e276074e4b8	seguridad	info	1	USUARIO_CREADO	{"rolNuevo": 3, "creadoPor": "superadmin@kaaiya.test", "emailNuevo": "marco@gmail.com"}	\N	2026-07-01 01:29:33.166911+00
4d2b0b6e-3060-480a-b14b-4432e5c046ef	seguridad	info	14	LOGIN_EXITOSO	{"rol": 3, "email": "marco@gmail.com"}	\N	2026-07-01 01:29:52.161575+00
f2bba965-dec2-4068-8081-787d81aa0480	seguridad	warn	12	PUBLICACION_ELIMINADA_POR_ADMIN	{"autorId": 13, "eliminadaPor": "admin.test@kaaiya.test", "publicacionId": "41f95acd-4de5-4149-ae3b-028235822072"}	\N	2026-07-01 01:47:14.689541+00
679333fd-084a-4bbf-af44-981585786df6	seguridad	warn	12	PUBLICACION_EDITADA_POR_ADMIN	{"autorId": 13, "editadoPor": "admin.test@kaaiya.test", "publicacionId": "4a9e1af5-674f-4b2a-87c8-ae2582c87099"}	\N	2026-07-01 01:47:16.094812+00
f00b41f1-c939-4bfe-92f4-371ab47fdab6	seguridad	warn	12	PUBLICACION_ELIMINADA_POR_ADMIN	{"autorId": 13, "eliminadaPor": "admin.test@kaaiya.test", "publicacionId": "4a9e1af5-674f-4b2a-87c8-ae2582c87099"}	\N	2026-07-01 01:47:18.083717+00
b45cf49e-60e1-49b8-bd8e-fbc9bc97a1ac	seguridad	warn	12	PUBLICACION_ELIMINADA_POR_ADMIN	{"autorId": 13, "eliminadaPor": "admin.test@kaaiya.test", "publicacionId": "a6262f31-8161-46bb-b838-2837275adfdf"}	\N	2026-07-01 01:47:20.248245+00
c7a69785-03f4-4157-83ec-6ca9c421c57f	seguridad	info	12	LOGIN_EXITOSO	{"rol": 2, "email": "admin.test@kaaiya.test"}	\N	2026-07-01 01:48:06.022761+00
ecd4d805-cb7f-44c1-b5bc-183f270772b9	seguridad	info	12	LOGIN_EXITOSO	{"rol": 2, "email": "admin.test@kaaiya.test"}	\N	2026-07-01 01:48:12.588201+00
d6ea2004-bc05-4ad4-807c-3df661089454	seguridad	warn	12	PUBLICACION_ELIMINADA_POR_ADMIN	{"autorId": 13, "eliminadaPor": "admin.test@kaaiya.test", "publicacionId": "b0b362f8-eed3-4a0f-b072-a87edd93407d"}	\N	2026-07-01 02:18:18.674762+00
615703e1-515c-433e-bbe6-ae7d82337ea8	seguridad	warn	12	PUBLICACION_EDITADA_POR_ADMIN	{"autorId": 13, "editadoPor": "admin.test@kaaiya.test", "publicacionId": "105f9b47-248b-4efb-91a7-4a719012dae1"}	\N	2026-07-01 02:18:20.055152+00
d938d1b7-92d2-4979-bfc3-c4b2453e811e	seguridad	warn	12	PUBLICACION_ELIMINADA_POR_ADMIN	{"autorId": 13, "eliminadaPor": "admin.test@kaaiya.test", "publicacionId": "105f9b47-248b-4efb-91a7-4a719012dae1"}	\N	2026-07-01 02:18:22.109356+00
647615d9-bba0-43c3-a5f2-8c15e066adfd	seguridad	warn	12	PUBLICACION_ELIMINADA_POR_ADMIN	{"autorId": 13, "eliminadaPor": "admin.test@kaaiya.test", "publicacionId": "0fd21cac-9aa7-4367-9a40-c52b6fcb3405"}	\N	2026-07-01 02:18:24.425204+00
5eb6ae2f-d4b4-41f5-a02d-7b92e30487cb	seguridad	info	12	LOGIN_EXITOSO	{"rol": 2, "email": "admin.test@kaaiya.test"}	\N	2026-07-01 02:19:15.338344+00
30c3f3c0-e738-4f4a-8f7e-cf6726d9ca5a	seguridad	info	12	LOGIN_EXITOSO	{"rol": 2, "email": "admin.test@kaaiya.test"}	\N	2026-07-01 02:19:23.964519+00
c2de88df-23dd-4817-b399-b10931382059	seguridad	info	1	LOGIN_EXITOSO	{"rol": 1, "email": "superadmin@kaaiya.test"}	\N	2026-07-01 03:37:52.069181+00
27787991-73da-4bae-a820-d658a5aec747	seguridad	info	1	LOGIN_EXITOSO	{"rol": 1, "email": "superadmin@kaaiya.test"}	\N	2026-07-01 03:38:08.863358+00
07d3081e-3b88-4b7d-bffd-0abe21b2f2e2	seguridad	info	1	LOGIN_EXITOSO	{"rol": 1, "email": "superadmin@kaaiya.test"}	\N	2026-07-01 03:38:31.442908+00
9d9e4709-93e2-4426-8695-18bd0946cecb	seguridad	info	1	LOGIN_EXITOSO	{"rol": 1, "email": "superadmin@kaaiya.test"}	\N	2026-07-01 03:41:28.825274+00
9e3c1a7c-4be7-4fc3-a62f-25928bb83a39	seguridad	info	1	LOGIN_EXITOSO	{"rol": 1, "email": "superadmin@kaaiya.test"}	\N	2026-07-01 03:41:51.758273+00
7813a3f7-1f40-4533-9d89-25a1a371afba	seguridad	info	1	LOGIN_EXITOSO	{"rol": 1, "email": "superadmin@kaaiya.test"}	\N	2026-07-01 03:51:59.695386+00
93ff5d3b-bd2e-41d6-aa75-5d0317b25941	seguridad	warn	\N	LOGIN_FALLIDO	{"email": "noexiste@test.com"}	\N	2026-07-01 03:52:02.570913+00
c162f896-cc51-444b-a736-5a2a95e4e004	seguridad	warn	\N	LOGIN_FALLIDO	{"email": "noexiste@test.com"}	\N	2026-07-01 03:52:03.509541+00
2a81cc30-5493-4bfe-babd-8e9ea0d3486f	seguridad	warn	\N	LOGIN_FALLIDO	{"email": "noexiste@test.com"}	\N	2026-07-01 03:52:04.157643+00
08f228fb-2487-4f97-ba06-1a1f54473a23	seguridad	warn	\N	LOGIN_FALLIDO	{"email": "noexiste@test.com"}	\N	2026-07-01 03:52:04.774236+00
9d6072c4-1322-4b14-9309-f9a8604eccef	seguridad	info	1	LOGIN_EXITOSO	{"rol": 1, "email": "superadmin@kaaiya.test"}	\N	2026-07-02 02:24:56.489644+00
a67f3364-67a0-4250-93ad-f34b2272c8aa	seguridad	info	12	LOGIN_EXITOSO	{"rol": 2, "email": "admin.test@kaaiya.test"}	\N	2026-07-02 02:25:18.92558+00
5ba20794-0df7-4630-a72f-7b4bcde19062	seguridad	info	13	LOGIN_EXITOSO	{"rol": 3, "email": "investigador.test@kaaiya.test"}	\N	2026-07-02 02:25:41.348701+00
\.


--
-- Data for Name: motivos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.motivos (id_motivo, nombre, es_propio) FROM stdin;
1	Responsabilidad Social	f
2	Interés económico-productivo	f
3	Imagen institucional	f
\.


--
-- Data for Name: motivos_empresas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.motivos_empresas (id_empresa, id_motivo) FROM stdin;
1	1
9	1
10	2
11	1
11	3
12	1
12	2
13	1
13	3
14	1
15	2
15	3
16	1
19	1
\.


--
-- Data for Name: municipios; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.municipios (id_municipio, nombre, id_departamento) FROM stdin;
1	Cobija	1
2	Porvenir	1
3	Bolpebra	1
4	Bella Flor	1
5	Puerto Rico	1
6	San Pedro	1
7	Filadelfia	1
8	Puerto Gonzalo Moreno	1
9	San Lorenzo	1
10	Sena	1
11	Santa Rosa	1
12	Ingavi	1
13	Nueva Esperanza	1
14	Villa Nueva (Loma Alta)	1
15	Mocomoco	3
16	Puerto Carabuco	3
17	Aucapata	3
18	Chuma	3
19	Sorata	3
20	Guanay	3
21	Quiabaya	3
22	Combaya	3
23	Tipuani	3
24	Mapiri	3
25	Teoponte	3
26	Tacacoma	3
27	Apolo	3
28	Pelechuco	3
29	Inquisivi	3
30	Quime	3
31	Ichoca	3
32	Colquiri	3
33	Licoma (Villa libertad)	3
34	Cajuata	3
35	Chulumani	3
36	Irupana	3
37	Yanacachi	3
38	Palos Blancos	3
39	Yanacachi	3
40	La Asunta	3
41	Ixiamas	3
42	San Buenaventura	3
43	Charazani (Gral. Pérez)	3
44	Curva	3
45	Caranavi	3
46	Alto Beni	3
47	Nuestra Señora de La Paz	3
48	San Javier	2
49	Trinidad	2
50	Riberalta	2
51	Guayaramerín	2
52	Reyes	2
53	San Borja	2
54	Santa Rosa	2
55	Rurrenabaque	2
56	Santa Ana de Yacuma	2
57	Exaltación	2
58	San Ignacio	2
59	Loreto	2
60	San Andrés	2
61	San Joaquín	2
62	San Ramón	2
63	Puerto Siles	2
64	Magdalena	2
65	Baures	2
66	Huacaraje	2
67	Porongo (Ayacucho)	5
68	El Torno	5
69	San Ignacio de Velasco	5
70	Buena Vista	5
71	San Carlos	5
72	Yapacaní	5
73	San Juan de Yapacaní	5
74	Santa Rosa del Sara	5
75	Portachuelo	5
76	General Saavedra	5
77	Mineros	5
78	Fernández Alonso	5
79	San Pedro	5
80	Concepción	5
81	San Julián	5
82	Ascensión de Guarayos	5
83	Urubichá	5
84	El Puente	5
85	Comarapa	5
86	Mairana	5
87	Pampa Grande	5
88	Samaipata	5
89	Warnes	5
90	Independencia	4
91	Morochata	4
92	Cocapata	4
93	Pojo	4
94	Totora	4
95	Entre Ríos (Bulo Bulo)	4
96	Puerto Villarroel	4
97	Chimoré	4
98	Villa Tunari	4
99	Tiraque	4
100	Shinahota	4
101	Tapacarí	4
\.


--
-- Data for Name: ods; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.ods (id_ods, nombre) FROM stdin;
1	Fin de la pobreza
2	Hambre cero
3	Salud y bienestar
4	Educacion de calidad
5	Igualdad de genero
6	Agua limpia y saneamiento
7	Energia asequible y no contaminante
8	Trabajo decente y crecimiento economico
9	Industria, innovacion e infraestructura
10	Reduccion de las desigualdades
11	Ciudades y comunidades sostenibles
12	Produccion y consumo responsables
13	Accion por el clima
14	Vida submarina
15	Vida de ecosistemas terrestres
16	Paz, justicia e instituciones solidas
17	Alianzas para lograr los objetivos
\.


--
-- Data for Name: ods_empresas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.ods_empresas (id_ods, id_empresa) FROM stdin;
3	1
10	1
13	9
15	9
1	10
8	10
12	10
13	11
14	11
15	11
2	12
8	12
12	12
15	12
1	13
2	13
10	13
15	13
13	14
14	14
15	14
8	15
11	15
14	15
15	15
15	16
3	19
6	19
\.


--
-- Data for Name: organizaciones; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.organizaciones (id_organizacion, nombre, id_tipo, id_departamento, es_nacional, anio_inicio_trabajo, logo_url, logo_path) FROM stdin;
1	nncvnbnbv	5	5	t	2000	\N	\N
2	bfdbd	3	3	t	2000	\N	\N
3	c<zcz<x	2	3	t	3432432	\N	\N
4	fsafsafas	2	3	f	2000	\N	\N
9	Fundación Hábitat Bolivia	3	2	t	2010	\N	\N
10	CIPCA Amazónico	1	3	t	2005	\N	\N
11	WWF Bolivia	4	2	f	2000	\N	\N
12	WWF Bolivia (World Wildlife Fund)	4	3	f	1991	\N	\N
13	AOPEB - Asociación de Organizaciones de Productores Ecológicos de Bolivia	3	4	t	1991	\N	\N
14	FAN - Fundación Amigos de la Naturaleza	3	5	t	1988	\N	\N
15	Cátedra Amazónica UCB – Querida Amazonía	6	3	t	2022	\N	\N
16	Org Prueba Frontend	3	2	t	2015	\N	\N
\.


--
-- Data for Name: organizaciones_empresas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.organizaciones_empresas (id_orga_empresa, id_organizacion, id_empresa, nombre) FROM stdin;
\.


--
-- Data for Name: practicas_agricolas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.practicas_agricolas (id_practica, nombre, es_propio) FROM stdin;
1	Acai	f
2	Castaña	f
3	Cacao silvestre	f
4	Plantas medicinales	f
5	Paraba frente roja	f
6	Camu Camu	f
7	Miel	f
\.


--
-- Data for Name: proyecto_imagenes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.proyecto_imagenes (id, id_proyecto, url, path, descripcion, orden, created_at) FROM stdin;
\.


--
-- Data for Name: proyectos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.proyectos (id_proyecto, id_area, nombre, descripcion, id_tipo, anio_inicio, anio_fin, imagen_principal_url, imagen_principal_path, lat, lng, department, municipality, georef_resolved_at, georef_failed) FROM stdin;
1	1	fasff	sdfdfds	3	2026	\N	\N	\N	\N	\N	\N	\N	\N	f
2	1	gdfgdfg	dasdsa	5	2026	\N	\N	\N	\N	\N	\N	\N	\N	f
3	1	asdfasdf	adf	4	2026	\N	\N	\N	\N	\N	\N	\N	\N	f
4	1	fsdfdsfsd	fsdfsdfsd	8	2026	\N	\N	\N	\N	\N	\N	\N	\N	f
5	1	dfdfdsf	dfsfsd	8	2026	\N	\N	\N	\N	\N	\N	\N	\N	f
13	1	Áreas Protegidas del Iténez	Conservación y vigilancia de las áreas protegidas en la cuenca del río Iténez, Beni	1	2015	\N	\N	\N	\N	\N	\N	\N	\N	f
14	2	Desarrollo Productivo Sostenible Chiquitanía	Fomento del desarrollo productivo sostenible y ecoturismo en la Chiquitanía, Santa Cruz	5	2019	\N	\N	\N	\N	\N	\N	\N	\N	f
15	1	Conservación del Oso Andino en La Paz	Monitoreo y conservación del oso andino en la región norte del departamento de La Paz	6	2021	\N	\N	\N	\N	\N	\N	\N	\N	f
16	2	Educación Ambiental para Comunidades del Beni	Programa de educación ambiental y soberanía alimentaria en comunidades indígenas del Beni	10	2022	\N	\N	\N	\N	\N	\N	\N	\N	f
17	1	Manejo Sostenible de Cuencas en Moxos	Manejo sostenible de recursos naturales en las cuencas de la región de Moxos, Beni	7	2018	\N	\N	\N	\N	\N	\N	\N	\N	f
18	2	Certificación de sostenibilidad en producción de soya RTRS	Programa de certificación Round Table on Responsible Soy (RTRS) para 15,000 ha en el oriente boliviano, con trazabilidad completa de la cadena productiva.	5	2019	\N	\N	\N	-17.7500000	-63.2500000	Santa Cruz	AndrésIbáñez	2026-06-12 20:28:20.418	f
19	2	Ganadería silvopastoril en el Beni con conservación forestal	Implementación de sistemas silvopastoriles que combinan ganadería sostenible y conservación forestal en 8,000 ha del departamento del Beni.	7	2015	\N	\N	\N	-14.8333000	-64.9000000	Beni	Cercado	2026-06-12 20:33:21.139	f
20	1	Corredor de Biodiversidad Chiquitano-Pantanal	Conservación de 1.2 millones de hectáreas del bosque seco más grande del mundo, conectando el Bosque Chiquitano con el Pantanal. Incluye monitoreo de fauna silvestre y trabajo con comunidades.	6	2002	\N	\N	\N	-16.3500000	-60.9500000	Santa Cruz	Velasco	2026-06-12 20:34:03.601	f
21	2	Turismo de naturaleza sostenible en el Parque Madidi	Operación de turismo sostenible con guías locales indígenas, conservación del hábitat y distribución equitativa de beneficios con comunidades del área del Parque Nacional Madidi.	8	2010	\N	\N	\N	-14.4441000	-67.5280000	Beni	GeneralJoséBallivián	2026-06-12 20:35:01.525	f
22	1	Monitoreo de fauna silvestre en la Amazonía boliviana	Red de cámaras trampa y monitoreo satelital de jaguares, tapires y caimanes en la Amazonía boliviana. Análisis de corredores de biodiversidad y publicación de datos abiertos.	6	2018	\N	\N	\N	-13.5000000	-66.0000000	Beni	Yacuma	2026-06-12 20:35:54.595	f
23	2	Certificación orgánica para 500 familias productoras amazónicas	Proceso de certificación orgánica de café, cacao y frutas tropicales para 500 familias de productores en el trópico boliviano, con acceso a mercados internacionales justos.	7	2020	\N	\N	\N	-17.3895000	-66.1568000	Cochabamba	Cercado	2026-06-12 20:36:25.787	f
24	1	Programa de conservación de tortugas acuáticas en el Chiquitano	Monitoreo y conservación de poblaciones de tortugas acuáticas y otros reptiles en los ríos y lagunas del bosque chiquitano y Pantanal boliviano, con participación comunitaria.	6	2016	\N	\N	\N	-16.3500000	-60.9500000	Santa Cruz	Velasco	2026-06-12 20:36:47.841	f
25	2	Plataforma de datos Kaa Iya para la sostenibilidad amazónica	Sistema de información geoespacial para visibilizar y sistematizar iniciativas sostenibles vinculadas a la Amazonía boliviana, desarrollado por la Universidad Católica Boliviana San Pablo.	10	2024	\N	\N	\N	-16.4897000	-68.1193000	La Paz	Murillo	2026-06-12 20:37:14.048	f
26	2	Proyecto test sin GeoRef activo	Proyecto de prueba para verificar degradación elegante cuando GeoRef está caído.	2	2024	\N	\N	\N	-14.8333000	-64.9000000	\N	\N	\N	t
\.


--
-- Data for Name: proyectos_empresas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.proyectos_empresas (id_empresa, id_proyecto, fecha_inicio, fecha_fin, id_participacion) FROM stdin;
1	5	2026-05-01	2026-05-07	1
9	13	2015-03-01	\N	8
10	14	2019-06-15	\N	9
11	15	2021-01-10	\N	10
9	13	2024-01-15	\N	11
12	18	2019-03-01	\N	12
13	19	2015-06-15	\N	13
14	20	2002-01-10	\N	14
15	21	2010-04-20	\N	15
16	26	2024-01-01	\N	16
\.


--
-- Data for Name: proyectos_organizaciones; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.proyectos_organizaciones (id_proyecto, id_organizacion, fecha_inicio, fecha_fin, id_participacion) FROM stdin;
1	1	2026-04-16	2026-05-07	1
2	2	2026-05-01	2026-05-07	2
3	3	2026-04-27	2026-05-19	3
4	4	2026-05-01	2026-05-07	4
16	9	2022-02-01	\N	10
13	9	2015-06-01	\N	11
15	10	2021-01-10	\N	12
17	11	2018-04-20	\N	13
13	11	2016-01-01	\N	14
22	12	2018-01-01	\N	15
23	13	2020-03-05	\N	16
24	14	2016-09-01	\N	17
25	15	2024-03-01	\N	18
\.


--
-- Data for Name: publicacion_imagenes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.publicacion_imagenes (id, id_publicacion, url, path, descripcion, orden, created_at) FROM stdin;
\.


--
-- Data for Name: publicaciones; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.publicaciones (id, autor_id, titulo, slug, contenido, estado, fecha_creacion, fecha_ultima_edicion, fecha_publicacion, editado_por) FROM stdin;
31e4fa88-1592-4146-80e5-a90276b8db15	11	Título editado por admin	titulo-editado-por-admin-31e4fa88	[{"tipo": "subtitulo", "texto": "Intro"}, {"tipo": "parrafo", "texto": "El jaguar es el depredador apex..."}]	publicado	2026-06-29 16:41:03.152+00	2026-06-29 16:50:05.157+00	2026-06-29 16:41:05.087+00	1
350fcafb-e52a-4e3a-837b-af1cfb551022	13	Borrador test 1782868436362	borrador-test-1782868436362-350fcafb	[{"tipo": "parrafo", "texto": "Contenido del borrador."}]	borrador	2026-07-01 01:13:56.564+00	\N	\N	\N
8188d811-1eb6-4b77-a894-1f3e2c4903d8	13	Borrador test 1782868645664	borrador-test-1782868645664-8188d811	[{"tipo": "parrafo", "texto": "Contenido del borrador."}]	borrador	2026-07-01 01:17:25.853+00	\N	\N	\N
816172e2-f277-4b2e-82ba-6eb5aaa67fed	13	Borrador test 1782868752899	borrador-test-1782868752899-816172e2	[{"tipo": "parrafo", "texto": "Contenido del borrador."}]	borrador	2026-07-01 01:19:13.097+00	\N	\N	\N
febe329a-779d-4730-adb9-11a939dc22e4	14	dfdsfsd	dfdsfsd-febe329a	[{"tipo": "parrafo", "texto": "fsdf"}, {"tipo": "subtitulo", "texto": ""}, {"tipo": "parrafo", "texto": ""}, {"url": "", "tipo": "imagen"}]	borrador	2026-07-01 01:30:03.141+00	\N	\N	\N
8adace8c-3cc6-46c2-ab79-4fb23671e428	13	Borrador test 1782870452241	borrador-test-1782870452241-8adace8c	[{"tipo": "parrafo", "texto": "Contenido del borrador."}]	borrador	2026-07-01 01:47:32.443+00	\N	\N	\N
95f27495-97d5-4bcc-ac68-99c033aa2a09	13	Borrador test 1782872316849	borrador-test-1782872316849-95f27495	[{"tipo": "parrafo", "texto": "Contenido del borrador."}]	borrador	2026-07-01 02:18:37.058+00	\N	\N	\N
\.


--
-- Data for Name: solicitudes_acceso; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.solicitudes_acceso (id_solicitud, nombre_solicitante, email_solicitante, institucion, proposito, estado, fecha_expiracion_acceso, id_revisor, id_usuario_creado, nota_rechazo, fecha_revision, created_at) FROM stdin;
1	Investigador Test	investigador@kaaiya.test	UMSA	Pruebas de QA para el modulo de autenticacion de la plataforma Kaa Iya	aprobada	2029-12-31 20:00:00	2	3	\N	2026-06-12 10:45:48.087	2026-06-12 14:44:53.497849
2	Investigador Expirado	inv-expirado@kaaiya.test	UCB	Pruebas de QA para verificar el comportamiento de accesos expirados en el sistema	aprobada	2019-12-31 20:00:00	2	4	\N	2026-06-12 10:45:49.72	2026-06-12 14:44:54.32593
3	Nuevo Inv	nuevo@test.com	UCB	Investigacion sobre biodiversidad amazonica para proyecto de grado universitario	pendiente	\N	\N	\N	\N	\N	2026-06-12 14:51:20.714368
\.


--
-- Data for Name: tipos_organizaciones; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tipos_organizaciones (id_tipo, nombre, es_propio) FROM stdin;
1	Cooperación internacional Bilateral	f
2	Cooperación internacional Multilateral	f
3	ONG/Fundación nacional	f
4	ONG/Fundación internacional	f
5	Empresa privada	f
6	Institución académica	t
\.


--
-- Data for Name: tipos_proyectos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tipos_proyectos (id_tipo, nombre, es_propio) FROM stdin;
1	Áreas protegidas	f
2	Conservación de bosques	f
3	Restauración ecológica	f
4	Conservación y aprovechamiento de bosques	f
5	Desarrollo productivo sostenible	f
6	Conservación de especies	f
7	Manejo sostenible	f
8	Ecoturismo	f
9	Apoyo legal y administrativo para la protección de territorios	f
10	Educación	f
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.usuarios (id_usuario, email, password_hash, nombre, rol, activo, fecha_expiracion, created_at, updated_at, token_valid_from) FROM stdin;
1	superadmin@kaaiya.test	$2b$12$TYl/W2o3F87hcsGnQOlGR.wVqObNttvQsX9qtRA4lnnKO2KIIUoVO	Superadmin	1	t	\N	2026-06-12 14:41:23.037929	2026-06-12 14:41:23.037929	\N
4	inv-expirado@kaaiya.test	$2b$12$u5priRGfp.DTBcovLZDBHe4ZgpttPEa8EE1iYTNOD/HQtZfQkVhiy	Investigador Expirado	3	t	2019-12-31 20:00:00	2026-06-12 14:45:50.224704	2026-06-12 14:45:50.224704	\N
5	inactivo@kaaiya.test	$2b$12$CUHLE77gAHwBVGse9hYc6exqzEOnsFdf2KHo0I2.72M.5AjM2wfMS	Usuario Inactivo	2	f	\N	2026-06-12 14:46:05.53814	2026-06-12 14:46:06.540773	\N
7	sa3@kaaiya.test	$2b$12$WwgQ.pnZXwhMhLfMpVjr8.eRiabFRhDwfVdDdvCyCKf6.Qd2mKVeS	SA3	1	t	\N	2026-06-12 14:49:52.067829	2026-06-12 14:49:52.067829	\N
3	investigador@kaaiya.test	$2b$12$5b2oSD.rvBUYGEydQYEj3.wp1ZI83o4NtkgU52WmZ40GSCFuKqv1.	Inv Actualizado	3	t	2029-12-31 20:00:00	2026-06-12 14:45:48.599785	2026-06-12 17:58:57.607538	2026-06-12 11:27:15.655
8	test_admin_tmp@x.com	$2b$12$Wn0fbevb2kMTz6ceIEp.puyqLaxfn.x9TiaArFs3nyA2bdh/BCh1W	TmpAdmin	2	t	\N	2026-06-12 17:59:00.188972	2026-06-12 17:59:00.188972	\N
2	admin@kaaiya.test	$2b$12$hXk9K2LPsdcHJOTEhujEseXFVk4BDCTfI.YQ/SFu7jei7YgtipCJO	Admin Actualizado	2	t	\N	2026-06-12 14:44:00.018665	2026-06-12 17:59:04.508177	2026-06-12 13:59:01.206
11	investigador@test.kaaiya.com	$2b$12$4sHwRf0Y6yH7snQmY.Ywa.d1nU5yXHnfypb3Z2CkuzYDoQtMD/Ho.	Inv Test	3	t	\N	2026-06-29 16:40:40.347952	2026-06-29 16:40:40.347952	\N
12	admin.test@kaaiya.test	$2b$12$PFT3jXjESYkf7z45OwwItuzix8hmQuy/PEzD.YcrEze5G3jtrjlo.	Admin Test	2	t	\N	2026-07-01 00:27:47.656333	2026-07-01 00:27:47.656333	\N
13	investigador.test@kaaiya.test	$2b$12$YgCyY5x0RpGtDby1g/HzFeXjkc2sWfoT3Mrk2RJXZ.ECqxfTkTM9a	Investigador Test	3	t	\N	2026-07-01 00:27:49.028971	2026-07-01 00:27:49.028971	\N
14	marco@gmail.com	$2b$12$J5lGBLlKtgJfIuJIdeK9Ou0kIA/.BCL6C8grO0Bn8p2c5Cq6v0tvK	prueba12	3	t	\N	2026-07-01 01:29:32.583259	2026-07-01 01:29:32.583259	\N
\.


--
-- Name: actores_municipales_id_actor_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.actores_municipales_id_actor_seq', 5, true);


--
-- Name: apoyos_id_apoyo_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.apoyos_id_apoyo_seq', 8, true);


--
-- Name: areas_desarrollo_id_area_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.areas_desarrollo_id_area_seq', 4, true);


--
-- Name: areas_id_area_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.areas_id_area_seq', 2, true);


--
-- Name: ayudas_id_ayuda_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.ayudas_id_ayuda_seq', 6, true);


--
-- Name: comunidades_indigenas_id_comunidad_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.comunidades_indigenas_id_comunidad_seq', 1, false);


--
-- Name: departamentos_id_departamento_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.departamentos_id_departamento_seq', 1, false);


--
-- Name: empresas_id_empresa_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.empresas_id_empresa_seq', 19, true);


--
-- Name: especies_animales_id_especie_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.especies_animales_id_especie_seq', 7, true);


--
-- Name: formas_juridicas_id_forma_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.formas_juridicas_id_forma_seq', 9, true);


--
-- Name: localidades_proyectos_id_localidad_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.localidades_proyectos_id_localidad_seq', 29, true);


--
-- Name: motivos_id_motivo_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.motivos_id_motivo_seq', 3, true);


--
-- Name: municipios_id_municipio_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.municipios_id_municipio_seq', 1, false);


--
-- Name: ods_id_ods_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.ods_id_ods_seq', 17, true);


--
-- Name: organizaciones_empresas_id_orga_empresa_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.organizaciones_empresas_id_orga_empresa_seq', 1, false);


--
-- Name: organizaciones_id_organizacion_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.organizaciones_id_organizacion_seq', 16, true);


--
-- Name: practicas_agricolas_id_practica_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.practicas_agricolas_id_practica_seq', 7, true);


--
-- Name: proyectos_empresas_id_participacion_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.proyectos_empresas_id_participacion_seq', 18, true);


--
-- Name: proyectos_id_proyecto_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.proyectos_id_proyecto_seq', 28, true);


--
-- Name: proyectos_organizaciones_id_participacion_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.proyectos_organizaciones_id_participacion_seq', 18, true);


--
-- Name: solicitudes_acceso_id_solicitud_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.solicitudes_acceso_id_solicitud_seq', 4, true);


--
-- Name: tipos_organizaciones_id_tipo_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.tipos_organizaciones_id_tipo_seq', 6, true);


--
-- Name: tipos_proyectos_id_tipo_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.tipos_proyectos_id_tipo_seq', 10, true);


--
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuarios_id_usuario_seq', 14, true);


--
-- Name: actores_municipales actores_municipales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.actores_municipales
    ADD CONSTRAINT actores_municipales_pkey PRIMARY KEY (id_actor);


--
-- Name: actores_proyectos actores_proyectos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.actores_proyectos
    ADD CONSTRAINT actores_proyectos_pkey PRIMARY KEY (id_proyecto, id_actor);


--
-- Name: apoyos_empresas apoyos_empresas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.apoyos_empresas
    ADD CONSTRAINT apoyos_empresas_pkey PRIMARY KEY (id_apoyo, id_empresa);


--
-- Name: apoyos apoyos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.apoyos
    ADD CONSTRAINT apoyos_pkey PRIMARY KEY (id_apoyo);


--
-- Name: areas_desarrollo areas_desarrollo_nombre_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.areas_desarrollo
    ADD CONSTRAINT areas_desarrollo_nombre_key UNIQUE (nombre);


--
-- Name: areas_desarrollo areas_desarrollo_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.areas_desarrollo
    ADD CONSTRAINT areas_desarrollo_pkey PRIMARY KEY (id_area);


--
-- Name: areas areas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.areas
    ADD CONSTRAINT areas_pkey PRIMARY KEY (id_area);


--
-- Name: ayudas ayudas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ayudas
    ADD CONSTRAINT ayudas_pkey PRIMARY KEY (id_ayuda);


--
-- Name: ayudas_proyectos ayudas_proyectos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ayudas_proyectos
    ADD CONSTRAINT ayudas_proyectos_pkey PRIMARY KEY (id_proyecto, id_ayuda);


--
-- Name: comunidades_indigenas_areas comunidades_indigenas_areas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comunidades_indigenas_areas
    ADD CONSTRAINT comunidades_indigenas_areas_pkey PRIMARY KEY (id_proyecto, id_area);


--
-- Name: comunidades_indigenas comunidades_indigenas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comunidades_indigenas
    ADD CONSTRAINT comunidades_indigenas_pkey PRIMARY KEY (id_comunidad);


--
-- Name: comunidades_municipios comunidades_municipios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comunidades_municipios
    ADD CONSTRAINT comunidades_municipios_pkey PRIMARY KEY (id_comunidad, id_municipio);


--
-- Name: conservacion_agricolas conservacion_agricolas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conservacion_agricolas
    ADD CONSTRAINT conservacion_agricolas_pkey PRIMARY KEY (id_practica, id_proyecto);


--
-- Name: conservacion_animales conservacion_animales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conservacion_animales
    ADD CONSTRAINT conservacion_animales_pkey PRIMARY KEY (id_especie, id_proyecto);


--
-- Name: departamentos_empresas departamentos_empresas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.departamentos_empresas
    ADD CONSTRAINT departamentos_empresas_pkey PRIMARY KEY (id_departamento, id_empresa);


--
-- Name: departamentos departamentos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.departamentos
    ADD CONSTRAINT departamentos_pkey PRIMARY KEY (id_departamento);


--
-- Name: empresas empresas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.empresas
    ADD CONSTRAINT empresas_pkey PRIMARY KEY (id_empresa);


--
-- Name: especies_animales especies_animales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.especies_animales
    ADD CONSTRAINT especies_animales_pkey PRIMARY KEY (id_especie);


--
-- Name: formas_juridicas formas_juridicas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.formas_juridicas
    ADD CONSTRAINT formas_juridicas_pkey PRIMARY KEY (id_forma);


--
-- Name: localidades_proyectos localidades_proyectos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.localidades_proyectos
    ADD CONSTRAINT localidades_proyectos_pkey PRIMARY KEY (id_localidad);


--
-- Name: logs_auditoria logs_auditoria_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.logs_auditoria
    ADD CONSTRAINT logs_auditoria_pkey PRIMARY KEY (id);


--
-- Name: motivos_empresas motivos_empresas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.motivos_empresas
    ADD CONSTRAINT motivos_empresas_pkey PRIMARY KEY (id_empresa, id_motivo);


--
-- Name: motivos motivos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.motivos
    ADD CONSTRAINT motivos_pkey PRIMARY KEY (id_motivo);


--
-- Name: municipios municipios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.municipios
    ADD CONSTRAINT municipios_pkey PRIMARY KEY (id_municipio);


--
-- Name: ods_empresas ods_empresas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ods_empresas
    ADD CONSTRAINT ods_empresas_pkey PRIMARY KEY (id_ods, id_empresa);


--
-- Name: ods ods_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ods
    ADD CONSTRAINT ods_pkey PRIMARY KEY (id_ods);


--
-- Name: organizaciones_empresas organizaciones_empresas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organizaciones_empresas
    ADD CONSTRAINT organizaciones_empresas_pkey PRIMARY KEY (id_orga_empresa);


--
-- Name: organizaciones organizaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organizaciones
    ADD CONSTRAINT organizaciones_pkey PRIMARY KEY (id_organizacion);


--
-- Name: practicas_agricolas practicas_agricolas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.practicas_agricolas
    ADD CONSTRAINT practicas_agricolas_pkey PRIMARY KEY (id_practica);


--
-- Name: proyecto_imagenes proyecto_imagenes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proyecto_imagenes
    ADD CONSTRAINT proyecto_imagenes_pkey PRIMARY KEY (id);


--
-- Name: proyectos_empresas proyectos_empresas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proyectos_empresas
    ADD CONSTRAINT proyectos_empresas_pkey PRIMARY KEY (id_participacion);


--
-- Name: proyectos_organizaciones proyectos_organizaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proyectos_organizaciones
    ADD CONSTRAINT proyectos_organizaciones_pkey PRIMARY KEY (id_participacion);


--
-- Name: proyectos proyectos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_pkey PRIMARY KEY (id_proyecto);


--
-- Name: publicacion_imagenes publicacion_imagenes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.publicacion_imagenes
    ADD CONSTRAINT publicacion_imagenes_pkey PRIMARY KEY (id);


--
-- Name: publicaciones publicaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.publicaciones
    ADD CONSTRAINT publicaciones_pkey PRIMARY KEY (id);


--
-- Name: publicaciones publicaciones_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.publicaciones
    ADD CONSTRAINT publicaciones_slug_key UNIQUE (slug);


--
-- Name: solicitudes_acceso solicitudes_acceso_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.solicitudes_acceso
    ADD CONSTRAINT solicitudes_acceso_pkey PRIMARY KEY (id_solicitud);


--
-- Name: tipos_organizaciones tipos_organizaciones_nombre_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tipos_organizaciones
    ADD CONSTRAINT tipos_organizaciones_nombre_key UNIQUE (nombre);


--
-- Name: tipos_organizaciones tipos_organizaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tipos_organizaciones
    ADD CONSTRAINT tipos_organizaciones_pkey PRIMARY KEY (id_tipo);


--
-- Name: tipos_proyectos tipos_proyectos_nombre_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tipos_proyectos
    ADD CONSTRAINT tipos_proyectos_nombre_key UNIQUE (nombre);


--
-- Name: tipos_proyectos tipos_proyectos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tipos_proyectos
    ADD CONSTRAINT tipos_proyectos_pkey PRIMARY KEY (id_tipo);


--
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);


--
-- Name: idx_logs_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_logs_created_at ON public.logs_auditoria USING btree (created_at);


--
-- Name: idx_logs_severidad; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_logs_severidad ON public.logs_auditoria USING btree (severidad);


--
-- Name: idx_logs_tipo; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_logs_tipo ON public.logs_auditoria USING btree (tipo);


--
-- Name: idx_logs_usuario; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_logs_usuario ON public.logs_auditoria USING btree (usuario_id);


--
-- Name: idx_mv_empresas_detalle_anio; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_mv_empresas_detalle_anio ON public.mv_empresas_detalle USING btree (anio_inicio_apoyo);


--
-- Name: idx_mv_empresas_detalle_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_mv_empresas_detalle_id ON public.mv_empresas_detalle USING btree (id_empresa);


--
-- Name: idx_mv_por_tipo_area; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_mv_por_tipo_area ON public.mv_dashboard_por_tipo USING btree (id_area);


--
-- Name: idx_mv_por_tipo_pk; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_mv_por_tipo_pk ON public.mv_dashboard_por_tipo USING btree (id_area, id_tipo);


--
-- Name: idx_mv_proyectos_detalle_activo; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_mv_proyectos_detalle_activo ON public.mv_proyectos_detalle USING btree (((anio_fin IS NULL)));


--
-- Name: idx_mv_proyectos_detalle_anio; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_mv_proyectos_detalle_anio ON public.mv_proyectos_detalle USING btree (anio_inicio);


--
-- Name: idx_mv_proyectos_detalle_area; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_mv_proyectos_detalle_area ON public.mv_proyectos_detalle USING btree (id_area);


--
-- Name: idx_mv_proyectos_detalle_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_mv_proyectos_detalle_id ON public.mv_proyectos_detalle USING btree (id_proyecto);


--
-- Name: idx_mv_region_amazonico; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_mv_region_amazonico ON public.mv_dashboard_por_region USING btree (amazonico);


--
-- Name: idx_mv_region_id_dep; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_mv_region_id_dep ON public.mv_dashboard_por_region USING btree (id_departamento);


--
-- Name: idx_mv_resumen_global_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_mv_resumen_global_id ON public.mv_dashboard_resumen_global USING btree (id);


--
-- Name: idx_mv_timeline_anio; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_mv_timeline_anio ON public.mv_dashboard_timeline USING btree (anio);


--
-- Name: idx_proyecto_imagenes_proyecto; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_proyecto_imagenes_proyecto ON public.proyecto_imagenes USING btree (id_proyecto);


--
-- Name: idx_proyectos_department; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_proyectos_department ON public.proyectos USING btree (department) WHERE (department IS NOT NULL);


--
-- Name: idx_proyectos_empresas_actor; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_proyectos_empresas_actor ON public.proyectos_empresas USING btree (id_empresa, id_proyecto);


--
-- Name: idx_proyectos_lat_lng; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_proyectos_lat_lng ON public.proyectos USING btree (lat, lng) WHERE ((lat IS NOT NULL) AND (lng IS NOT NULL));


--
-- Name: idx_proyectos_organizaciones_actor; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_proyectos_organizaciones_actor ON public.proyectos_organizaciones USING btree (id_proyecto, id_organizacion);


--
-- Name: idx_pub_imagenes_publicacion; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_pub_imagenes_publicacion ON public.publicacion_imagenes USING btree (id_publicacion);


--
-- Name: idx_publicaciones_autor; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_publicaciones_autor ON public.publicaciones USING btree (autor_id);


--
-- Name: idx_publicaciones_estado; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_publicaciones_estado ON public.publicaciones USING btree (estado);


--
-- Name: idx_publicaciones_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_publicaciones_slug ON public.publicaciones USING btree (slug);


--
-- Name: idx_solicitudes_email; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_solicitudes_email ON public.solicitudes_acceso USING btree (email_solicitante);


--
-- Name: idx_solicitudes_estado; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_solicitudes_estado ON public.solicitudes_acceso USING btree (estado);


--
-- Name: idx_usuarios_email; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_usuarios_email ON public.usuarios USING btree (email);


--
-- Name: idx_usuarios_rol; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_usuarios_rol ON public.usuarios USING btree (rol);


--
-- Name: empresas trg_dashboard_refresh_empresas; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER trg_dashboard_refresh_empresas AFTER INSERT OR DELETE OR UPDATE ON public.empresas FOR EACH STATEMENT EXECUTE FUNCTION public.refresh_dashboard_views();


--
-- Name: organizaciones trg_dashboard_refresh_organizaciones; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER trg_dashboard_refresh_organizaciones AFTER INSERT OR DELETE OR UPDATE ON public.organizaciones FOR EACH STATEMENT EXECUTE FUNCTION public.refresh_dashboard_views();


--
-- Name: proyectos trg_dashboard_refresh_proyectos; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER trg_dashboard_refresh_proyectos AFTER INSERT OR DELETE OR UPDATE ON public.proyectos FOR EACH STATEMENT EXECUTE FUNCTION public.refresh_dashboard_views();


--
-- Name: actores_proyectos actores_proyectos_id_actor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.actores_proyectos
    ADD CONSTRAINT actores_proyectos_id_actor_fkey FOREIGN KEY (id_actor) REFERENCES public.actores_municipales(id_actor);


--
-- Name: actores_proyectos actores_proyectos_id_proyecto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.actores_proyectos
    ADD CONSTRAINT actores_proyectos_id_proyecto_fkey FOREIGN KEY (id_proyecto) REFERENCES public.proyectos(id_proyecto);


--
-- Name: apoyos_empresas apoyos_empresas_id_apoyo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.apoyos_empresas
    ADD CONSTRAINT apoyos_empresas_id_apoyo_fkey FOREIGN KEY (id_apoyo) REFERENCES public.apoyos(id_apoyo);


--
-- Name: apoyos_empresas apoyos_empresas_id_empresa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.apoyos_empresas
    ADD CONSTRAINT apoyos_empresas_id_empresa_fkey FOREIGN KEY (id_empresa) REFERENCES public.empresas(id_empresa);


--
-- Name: ayudas_proyectos ayudas_proyectos_id_ayuda_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ayudas_proyectos
    ADD CONSTRAINT ayudas_proyectos_id_ayuda_fkey FOREIGN KEY (id_ayuda) REFERENCES public.ayudas(id_ayuda);


--
-- Name: ayudas_proyectos ayudas_proyectos_id_proyecto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ayudas_proyectos
    ADD CONSTRAINT ayudas_proyectos_id_proyecto_fkey FOREIGN KEY (id_proyecto) REFERENCES public.proyectos(id_proyecto);


--
-- Name: comunidades_indigenas_areas comunidades_indigenas_areas_id_area_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comunidades_indigenas_areas
    ADD CONSTRAINT comunidades_indigenas_areas_id_area_fkey FOREIGN KEY (id_area) REFERENCES public.areas_desarrollo(id_area) ON DELETE CASCADE;


--
-- Name: comunidades_indigenas_areas comunidades_indigenas_areas_id_proyecto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comunidades_indigenas_areas
    ADD CONSTRAINT comunidades_indigenas_areas_id_proyecto_fkey FOREIGN KEY (id_proyecto) REFERENCES public.proyectos(id_proyecto) ON DELETE CASCADE;


--
-- Name: comunidades_municipios comunidades_municipios_id_comunidad_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comunidades_municipios
    ADD CONSTRAINT comunidades_municipios_id_comunidad_fkey FOREIGN KEY (id_comunidad) REFERENCES public.comunidades_indigenas(id_comunidad);


--
-- Name: comunidades_municipios comunidades_municipios_id_municipio_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comunidades_municipios
    ADD CONSTRAINT comunidades_municipios_id_municipio_fkey FOREIGN KEY (id_municipio) REFERENCES public.municipios(id_municipio);


--
-- Name: conservacion_agricolas conservacion_agricolas_id_practica_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conservacion_agricolas
    ADD CONSTRAINT conservacion_agricolas_id_practica_fkey FOREIGN KEY (id_practica) REFERENCES public.practicas_agricolas(id_practica);


--
-- Name: conservacion_agricolas conservacion_agricolas_id_proyecto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conservacion_agricolas
    ADD CONSTRAINT conservacion_agricolas_id_proyecto_fkey FOREIGN KEY (id_proyecto) REFERENCES public.proyectos(id_proyecto);


--
-- Name: conservacion_animales conservacion_animales_id_especie_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conservacion_animales
    ADD CONSTRAINT conservacion_animales_id_especie_fkey FOREIGN KEY (id_especie) REFERENCES public.especies_animales(id_especie);


--
-- Name: conservacion_animales conservacion_animales_id_proyecto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conservacion_animales
    ADD CONSTRAINT conservacion_animales_id_proyecto_fkey FOREIGN KEY (id_proyecto) REFERENCES public.proyectos(id_proyecto);


--
-- Name: departamentos_empresas departamentos_empresas_id_departamento_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.departamentos_empresas
    ADD CONSTRAINT departamentos_empresas_id_departamento_fkey FOREIGN KEY (id_departamento) REFERENCES public.departamentos(id_departamento);


--
-- Name: departamentos_empresas departamentos_empresas_id_empresa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.departamentos_empresas
    ADD CONSTRAINT departamentos_empresas_id_empresa_fkey FOREIGN KEY (id_empresa) REFERENCES public.empresas(id_empresa);


--
-- Name: empresas empresas_id_forma_juridica_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.empresas
    ADD CONSTRAINT empresas_id_forma_juridica_fkey FOREIGN KEY (id_forma_juridica) REFERENCES public.formas_juridicas(id_forma);


--
-- Name: localidades_proyectos localidades_proyectos_id_comunidad_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.localidades_proyectos
    ADD CONSTRAINT localidades_proyectos_id_comunidad_fkey FOREIGN KEY (id_comunidad) REFERENCES public.comunidades_indigenas(id_comunidad);


--
-- Name: localidades_proyectos localidades_proyectos_id_municipio_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.localidades_proyectos
    ADD CONSTRAINT localidades_proyectos_id_municipio_fkey FOREIGN KEY (id_municipio) REFERENCES public.municipios(id_municipio);


--
-- Name: localidades_proyectos localidades_proyectos_id_proyecto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.localidades_proyectos
    ADD CONSTRAINT localidades_proyectos_id_proyecto_fkey FOREIGN KEY (id_proyecto) REFERENCES public.proyectos(id_proyecto);


--
-- Name: logs_auditoria logs_auditoria_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.logs_auditoria
    ADD CONSTRAINT logs_auditoria_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id_usuario);


--
-- Name: motivos_empresas motivos_empresas_id_empresa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.motivos_empresas
    ADD CONSTRAINT motivos_empresas_id_empresa_fkey FOREIGN KEY (id_empresa) REFERENCES public.empresas(id_empresa);


--
-- Name: motivos_empresas motivos_empresas_id_motivo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.motivos_empresas
    ADD CONSTRAINT motivos_empresas_id_motivo_fkey FOREIGN KEY (id_motivo) REFERENCES public.motivos(id_motivo);


--
-- Name: municipios municipios_id_departamento_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.municipios
    ADD CONSTRAINT municipios_id_departamento_fkey FOREIGN KEY (id_departamento) REFERENCES public.departamentos(id_departamento);


--
-- Name: ods_empresas ods_empresas_id_empresa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ods_empresas
    ADD CONSTRAINT ods_empresas_id_empresa_fkey FOREIGN KEY (id_empresa) REFERENCES public.empresas(id_empresa);


--
-- Name: ods_empresas ods_empresas_id_ods_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ods_empresas
    ADD CONSTRAINT ods_empresas_id_ods_fkey FOREIGN KEY (id_ods) REFERENCES public.ods(id_ods);


--
-- Name: organizaciones_empresas organizaciones_empresas_id_empresa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organizaciones_empresas
    ADD CONSTRAINT organizaciones_empresas_id_empresa_fkey FOREIGN KEY (id_empresa) REFERENCES public.empresas(id_empresa);


--
-- Name: organizaciones_empresas organizaciones_empresas_id_organizacion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organizaciones_empresas
    ADD CONSTRAINT organizaciones_empresas_id_organizacion_fkey FOREIGN KEY (id_organizacion) REFERENCES public.organizaciones(id_organizacion);


--
-- Name: organizaciones organizaciones_id_departamento_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organizaciones
    ADD CONSTRAINT organizaciones_id_departamento_fkey FOREIGN KEY (id_departamento) REFERENCES public.departamentos(id_departamento);


--
-- Name: organizaciones organizaciones_id_tipo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organizaciones
    ADD CONSTRAINT organizaciones_id_tipo_fkey FOREIGN KEY (id_tipo) REFERENCES public.tipos_organizaciones(id_tipo);


--
-- Name: proyecto_imagenes proyecto_imagenes_id_proyecto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proyecto_imagenes
    ADD CONSTRAINT proyecto_imagenes_id_proyecto_fkey FOREIGN KEY (id_proyecto) REFERENCES public.proyectos(id_proyecto) ON DELETE CASCADE;


--
-- Name: proyectos_empresas proyectos_empresas_id_empresa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proyectos_empresas
    ADD CONSTRAINT proyectos_empresas_id_empresa_fkey FOREIGN KEY (id_empresa) REFERENCES public.empresas(id_empresa);


--
-- Name: proyectos_empresas proyectos_empresas_id_proyecto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proyectos_empresas
    ADD CONSTRAINT proyectos_empresas_id_proyecto_fkey FOREIGN KEY (id_proyecto) REFERENCES public.proyectos(id_proyecto);


--
-- Name: proyectos proyectos_id_area_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_id_area_fkey FOREIGN KEY (id_area) REFERENCES public.areas(id_area);


--
-- Name: proyectos proyectos_id_tipo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_id_tipo_fkey FOREIGN KEY (id_tipo) REFERENCES public.tipos_proyectos(id_tipo);


--
-- Name: proyectos_organizaciones proyectos_organizaciones_id_organizacion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proyectos_organizaciones
    ADD CONSTRAINT proyectos_organizaciones_id_organizacion_fkey FOREIGN KEY (id_organizacion) REFERENCES public.organizaciones(id_organizacion) ON DELETE CASCADE;


--
-- Name: proyectos_organizaciones proyectos_organizaciones_id_proyecto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proyectos_organizaciones
    ADD CONSTRAINT proyectos_organizaciones_id_proyecto_fkey FOREIGN KEY (id_proyecto) REFERENCES public.proyectos(id_proyecto) ON DELETE CASCADE;


--
-- Name: publicacion_imagenes publicacion_imagenes_id_publicacion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.publicacion_imagenes
    ADD CONSTRAINT publicacion_imagenes_id_publicacion_fkey FOREIGN KEY (id_publicacion) REFERENCES public.publicaciones(id) ON DELETE CASCADE;


--
-- Name: publicaciones publicaciones_autor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.publicaciones
    ADD CONSTRAINT publicaciones_autor_id_fkey FOREIGN KEY (autor_id) REFERENCES public.usuarios(id_usuario);


--
-- Name: publicaciones publicaciones_editado_por_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.publicaciones
    ADD CONSTRAINT publicaciones_editado_por_fkey FOREIGN KEY (editado_por) REFERENCES public.usuarios(id_usuario);


--
-- Name: solicitudes_acceso solicitudes_acceso_id_revisor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.solicitudes_acceso
    ADD CONSTRAINT solicitudes_acceso_id_revisor_fkey FOREIGN KEY (id_revisor) REFERENCES public.usuarios(id_usuario);


--
-- Name: mv_dashboard_por_region; Type: MATERIALIZED VIEW DATA; Schema: public; Owner: -
--

REFRESH MATERIALIZED VIEW public.mv_dashboard_por_region;


--
-- Name: mv_dashboard_por_tipo; Type: MATERIALIZED VIEW DATA; Schema: public; Owner: -
--

REFRESH MATERIALIZED VIEW public.mv_dashboard_por_tipo;


--
-- Name: mv_dashboard_resumen_global; Type: MATERIALIZED VIEW DATA; Schema: public; Owner: -
--

REFRESH MATERIALIZED VIEW public.mv_dashboard_resumen_global;


--
-- Name: mv_dashboard_timeline; Type: MATERIALIZED VIEW DATA; Schema: public; Owner: -
--

REFRESH MATERIALIZED VIEW public.mv_dashboard_timeline;


--
-- Name: mv_empresas_detalle; Type: MATERIALIZED VIEW DATA; Schema: public; Owner: -
--

REFRESH MATERIALIZED VIEW public.mv_empresas_detalle;


--
-- Name: mv_proyectos_detalle; Type: MATERIALIZED VIEW DATA; Schema: public; Owner: -
--

REFRESH MATERIALIZED VIEW public.mv_proyectos_detalle;


--
-- PostgreSQL database dump complete
--

\unrestrict 1ifaf2YSTl7xmvQfQi6VbtKoujBDaHnGQhDSNeoLIg9hCBLWn6WoNVd4yU5dPRz

