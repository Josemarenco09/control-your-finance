# Control Your Finance

Aplicación de finanzas personales para registrar ingresos y gastos, ver el saldo actual y analizar en qué categorías se va el dinero.

## Funcionalidades

- **Cantidad inicial:** asigna el dinero con el que empiezas. Se guarda en la base de datos, así que no se pierde al recargar.
- **Registro de movimientos:** agrega ingresos y gastos desde un formulario. Los gastos llevan categoría (Hogar, Trabajo, Merienda u Otro).
- **Tabla de movimientos:** lista todos los movimientos, del más reciente al más antiguo, con montos en pesos colombianos.
- **Saldo actual:** se calcula automáticamente como `cantidad inicial + ingresos − gastos`.
- **Gastos por categoría:** total, porcentaje y barra de cada categoría, ordenadas de mayor a menor.
- **Validación en el servidor:** la API rechaza datos inválidos (montos negativos, categorías inexistentes, JSON mal formado) con mensajes claros.

## Tecnologías

| Tecnología | Uso |
|---|---|
| [Next.js 16](https://nextjs.org) (App Router) | Páginas, Server Components y rutas de API |
| [React 19](https://react.dev) | Interfaz y estado del formulario |
| [TypeScript](https://www.typescriptlang.org) | Tipado de todo el proyecto |
| [Prisma 7](https://www.prisma.io) | ORM y migraciones de la base de datos |
| [SQLite](https://sqlite.org) | Base de datos local (`dev.db`) |
| CSS Modules | Estilos por componente |

## Requisitos

- [Node.js](https://nodejs.org) **20.19 o superior** (Prisma 7 no funciona con versiones anteriores)
- npm

## Instalación

1. Clona el repositorio e instala las dependencias:

   ```bash
   git clone https://github.com/Josemarenco09/control-your-finance.git
   cd control-your-finance
   npm install
   ```

2. Crea un archivo `.env` en la raíz del proyecto con la ruta de la base de datos:

   ```env
   DATABASE_URL="file:./dev.db"
   ```

3. Crea la base de datos aplicando las migraciones y genera el cliente de Prisma:

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Estructura del proyecto

```
app/
├── api/
│   ├── account/route.ts        # PUT: guarda la cantidad inicial
│   └── movement/
│       ├── route.ts            # GET: lista movimientos · POST: crea uno
│       └── [id]/route.ts       # GET: un movimiento por id
├── page.tsx                    # Página principal (lee la base de datos)
└── page.module.css             # Diseño en tres columnas
components/
├── counterMoney/               # Tarjeta con la cantidad inicial y el saldo
├── spent/                      # Botón y formulario para agregar movimientos
├── movementTable/              # Tabla de movimientos
└── categorySummary/            # Resumen de gastos por categoría
lib/
└── prisma.ts                   # Cliente de Prisma compartido
prisma/
├── schema.prisma               # Modelos Movement y Account
└── migrations/                 # Historial de cambios de la base de datos
```

## API

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/movement` | Lista todos los movimientos |
| `POST` | `/api/movement` | Crea un movimiento (`typeMovement`, `amount`, `whyMovement`) |
| `GET` | `/api/movement/:id` | Devuelve un movimiento por su id |
| `PUT` | `/api/account` | Guarda la cantidad inicial (`initialAmount`) |

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run start` | Ejecuta la versión compilada |
| `npm run lint` | Revisa el código con ESLint |
| `npx prisma studio` | Abre una interfaz visual para ver la base de datos |

## Próximas mejoras

- Editar y eliminar movimientos (`PUT` y `DELETE` en `/api/movement/:id`)
- Recomendaciones automáticas según los gastos
- Filtro de movimientos por mes
