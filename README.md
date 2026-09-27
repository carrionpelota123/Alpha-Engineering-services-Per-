# NodoPro — Sitio web

Landing page de una página para NodoPro (servicios de informática y servicios generales).

## Comandos

```bash
npm install      # instala dependencias
npm run dev      # servidor de desarrollo en http://localhost:5173
npm run build    # genera la carpeta dist/ (build de producción)
npm run preview  # sirve dist/ localmente para probar el build
npm run lint     # revisa errores de estilo y tipos
```

En PowerShell de Windows, si `npm` da error de política de ejecución, usa `npm.cmd`.

## Dónde editar el contenido

Casi todo lo que verían tus clientes se edita en archivos de datos, sin tocar componentes:

| Archivo | Qué contiene |
| --- | --- |
| `src/config/business.ts` | Nombre, WhatsApp, correo, ciudad, mapa, horario, Formspree |
| `src/data/services.ts` | Los 8 servicios de la sección de servicios |
| `src/data/differentiators.ts` | Las 4 ventajas competitivas y las 4 cifras destacadas |
| `src/data/process.ts` | Los 4 pasos del proceso de trabajo |
| `src/data/privacy.ts` | El texto completo del aviso de privacidad |

### Cambiar el número de WhatsApp

En `src/config/business.ts`:

```ts
whatsapp: '51956071379',
```

Formato: **código de país + número, sin `+`, sin guiones y sin espacios.**
Para el númeroactual de NodoPro: `51956071379` (51 = Perú, 9 = celular).

Ese valor alimenta todos los botones de WhatsApp, el widget flotante y el formulario.

### Cambiar el correo

Campo `email`. El enlace `mailto:` y el botón "Mandar correo" se generan solos.

### Cambiar la zona del mapa

Campo `mapQuery`. Por defecto apunta a Piura, Perú. Si quieren resaltar una zona
más específica, cámbialo por el distrito o la localidad, por ejemplo
`mapQuery: 'Tambo, Piura, Perú'`.

Para cambiar qué distritos se listan en texto, edita el arreglo `zones` en
`src/components/Coverage.tsx`.

### Cambiar el texto legal

Todo en `src/data/privacy.ts`. El aviso sigue la estructura de la
Ley N.° 29733 de Protección de Datos Personales del Perú
(datos recabados, finalidad, terceros, conservación, derechos ARCO, seguridad).

> Este texto es una base de trabajo genérica. Si vas a facturar, valida que coincida
> con lo que realmente hacen y con la razón social que registren en SUNAT.

### Agregar o quitar un servicio

En `src/data/services.ts`, agrega o quita un objeto del arreglo `services`.
El campo `icon` acepta estos valores:

```
monitor | network | cctv | printer | code | shield | wrench | sparkles
```

## Activar el envío de correo en el formulario

Por defecto el formulario **abre WhatsApp** con el mensaje ya escrito, porque eso no
requiere ningún servicio externo ni cuenta.

Si prefieres que también llegue a tu correo, activa Formspree (gratis, 50 envíos al mes):

1. Entra a [formspree.io](https://formspree.io) y crea una cuenta
2. Crea un formulario nuevo
3. Copia el ID que aparece en la URL (la parte entre `/f/` y el final)
4. Pégalo en `src/config/business.ts`:

```ts
formspreeId: 'xyzabcde',
```

El formulario detecta el cambio solo: con el ID manda por correo, sin el ID
sigue funcionando por WhatsApp. Si el envío por correo falla, automáticamente
abre WhatsApp como respaldo para que el cliente no se quede sin respuesta.

## Colores y estilo

Todo el tema visual está en dos archivos:

- `tailwind.config.js` — colores de marca (`cyan`, `volt`, `amber`, `void`, `panel`, `edge`) y animaciones
- `src/index.css` — clases reutilizables como `.glass`, `.btn-primary`, `.eyebrow`, `.title`

Para cambiar el color principal, modifica el valor de `cyan` en `tailwind.config.js`.
El acento secundario es `volt`.

## Nota sobre el chat de WhatsApp

El widget flotante es propio, **no** es el widget oficial de WhatsApp
(ese solo existe dentro de la app de Facebook Business y no se puede embeber en un sitio).

Lo que hace el widget:
- Panel con mensaje de bienvenida y 4 respuestas rápidas que ya mandan el texto armado
- Campo para escribir tu propio mensaje
- Abre WhatsApp Web en una ventana emergente, no en la app del celular

Requiere que el visitante tenga sesión iniciada en WhatsApp Web. Por eso también
dejamos el botón grande "Cotizar por WhatsApp" por si prefieran abrirlo normal.

## Despliegue

El build es estático (carpeta `dist/`), así que sirve en cualquier hosting gratuito.

**Netlify** (recomendado, el más simple):

1. Sube la carpeta del proyecto a GitHub
2. Entra a [app.netlify.com](https://app.netlify.com) y conéctala
3. Netlify detecta Vite automáticamente: build `npm run build`, carpeta `dist/`

**Vercel:**

1. Importa el repositorio en [vercel.com](https://vercel.com)
2. Framework preset: Vite

**Cloudflare Pages:**

1. Conecta el repositorio
2. Build command: `npm run build`
3. Output directory: `dist`

## Dominio

Ninguno de los tres hostings anteriores incluye dominio. Se compra aparte
(~$150 MXN al año por un `.com` o `.com.mx`) y se conecta desde el panel del hosting.

## Notas técnicas

- **Stack:** React 19 + TypeScript + Vite 8 + Tailwind CSS 3 + Framer Motion
- **Animación de fondo:** canvas con partículas y líneas de conexión (`src/components/Background.tsx`)
- **Accesibilidad:** respeta `prefers-reduced-motion`, desactiva animaciones si el usuario lo pide en su sistema
- **Sin base de datos:** nada de lo que envía el visitante se guarda en servidor, así que no hay nada que respaldar
