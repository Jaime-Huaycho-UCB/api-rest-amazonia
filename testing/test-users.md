# Test Users — Módulo Auth

> Este archivo contiene credenciales de prueba. **Nunca incluir en producción.**
> Agregar `testing/` al `.gitignore` si se requiere no versionar.

---

## Usuarios de prueba a crear

Crear con `npm run seed:superadmin` (para el Superadmin) y luego mediante
`POST /api/auth/register` (para Admin e Investigador).

| Rol          | Email                          | Password        | Estado                          |
|--------------|--------------------------------|-----------------|---------------------------------|
| Superadmin   | superadmin@kaaiya.test         | SuperPass1!     | Activo, sin expiración          |
| Admin        | admin@kaaiya.test              | AdminPass1!     | Activo, sin expiración          |
| Investigador | investigador@kaaiya.test       | InvPass2026!    | Activo, expira 2030-01-01       |
| Investigador | inv-expirado@kaaiya.test       | InvPass2026!    | Activo, expiró 2020-01-01       |
| (Admin)      | inactivo@kaaiya.test           | InacPass1!      | Inactivo (`activo=false`)       |

---

## Comandos para crear los usuarios de prueba

```bash
# 1. Superadmin (via seeder)
# En .env: SEED_SUPERADMIN_EMAIL=superadmin@kaaiya.test  SEED_SUPERADMIN_PASSWORD=SuperPass1!
npm run seed:superadmin

# 2. Admin (via endpoint — requiere token de Superadmin)
POST /api/auth/login
  { "email": "superadmin@kaaiya.test", "password": "SuperPass1!" }
# → copiar accessToken

POST /api/auth/register  [Bearer <accessToken>]
  { "email": "admin@kaaiya.test", "nombre": "Admin Test", "password": "AdminPass1!", "rol": 2 }

# 3. Investigador vigente (via solicitud de acceso)
POST /api/auth/solicitar-acceso
  { "nombreSolicitante": "Inv Test", "emailSolicitante": "investigador@kaaiya.test",
    "institucion": "UMSA", "proposito": "Pruebas de QA para el módulo de autenticación de Kaa Iya" }
# Luego como Admin:
PATCH /api/auth/solicitudes/1/aprobar  [Bearer <adminToken>]
  { "fechaExpiracionAcceso": "2030-01-01T00:00:00Z", "passwordTemporal": "InvPass2026!" }

# 4. Investigador expirado (crear con fecha pasada)
POST /api/auth/solicitar-acceso
  { "nombreSolicitante": "Inv Expirado", "emailSolicitante": "inv-expirado@kaaiya.test",
    "institucion": "UCB", "proposito": "Pruebas de QA para verificar expiración de acceso" }
PATCH /api/auth/solicitudes/2/aprobar  [Bearer <adminToken>]
  { "fechaExpiracionAcceso": "2020-01-01T00:00:00Z", "passwordTemporal": "InvPass2026!" }

# 5. Usuario inactivo (crear Admin y luego desactivar)
POST /api/auth/register  [Bearer <superadminToken>]
  { "email": "inactivo@kaaiya.test", "nombre": "Usuario Inactivo", "password": "InacPass1!", "rol": 2 }
# Obtener id del usuario creado (ej: id=5)
PATCH /api/auth/usuarios/5  [Bearer <superadminToken>]
  { "activo": false }
```

---

## Matriz de pruebas por rol y endpoint

| Usuario (rol)       | Endpoint                                   | Resultado esperado | ✅/❌ |
|---------------------|--------------------------------------------|--------------------|------|
| Sin token           | GET /api/auth/me                           | 401                |      |
| Sin token           | GET /api/auth/usuarios                     | 401                |      |
| Sin token           | POST /api/auth/solicitar-acceso            | 201                |      |
| Sin token           | GET /api/empresas?page=1                   | 200                |      |
| Sin token           | GET /api/proyectos?area=1                  | 200                |      |
| Token malformado    | GET /api/auth/me                           | 401                |      |
| Investigador        | GET /api/auth/me                           | 200                |      |
| Investigador        | GET /api/auth/usuarios                     | 403                |      |
| Investigador        | DELETE /api/auth/usuarios/1                | 403                |      |
| Investigador expirado | GET /api/auth/me                         | 401                |      |
| Admin               | GET /api/auth/me                           | 200                |      |
| Admin               | GET /api/auth/usuarios                     | 200                |      |
| Admin               | POST /api/auth/register (rol=Superadmin)   | 403                |      |
| Admin               | DELETE /api/auth/usuarios/1                | 403                |      |
| Admin               | GET /api/auth/solicitudes?estado=pendiente | 200                |      |
| Admin               | PATCH /api/auth/solicitudes/:id/aprobar    | 200                |      |
| Superadmin          | DELETE /api/auth/usuarios/:id              | 200                |      |
| Superadmin          | POST /api/auth/register (rol=Admin)        | 201                |      |
| Superadmin          | DELETE /api/auth/usuarios/<propio id>      | 403                |      |
| Usuario inactivo    | POST /api/auth/login                       | 401                |      |
| Admin               | GET /api/empresas?limit=101                | 400 (max 100)      |      |
| Sin token           | GET /api/departamentos?amazonico=true      | 200                |      |
| Sin token           | GET /api/municipios?search=Trinidad        | 200                |      |
| Sin token           | GET /api/proyectos?area=2&departamento=3   | 200                |      |

---

## Archivos `.spec.ts` a implementar (por prioridad)

1. `src/modules/auth/services/auth.service.spec.ts`
   - login exitoso → JWT con payload correcto
   - login email inexistente → 401
   - login password incorrecto → 401
   - login cuenta inactiva → 401
   - login investigador expirado → 401
   - register Admin crea Admin → 201
   - register Admin intenta crear Superadmin → 403
   - register email duplicado → 409

2. `src/modules/auth/services/solicitudes.service.spec.ts`
   - crear solicitud exitosa → 201
   - crear solicitud con email pendiente → 409
   - aprobar solicitud pendiente (transacción) → crea usuario + actualiza solicitud
   - aprobar solicitud ya procesada → 400
   - rechazar solicitud pendiente → 200
   - rechazar solicitud ya procesada → 400

3. `src/modules/auth/guards/roles.guard.spec.ts`
   - Superadmin pasa @Roles(Admin) → true
   - Admin pasa @Roles(Admin) → true
   - Investigador falla @Roles(Admin) → 403
   - Sin @Roles → true

4. `src/modules/auth/strategies/jwt.strategy.spec.ts`
   - Investigador vigente → retorna payload
   - Investigador expirado → 401
   - Superadmin (sin fecha) → retorna payload
