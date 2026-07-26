# Presupuestos · LR Mantenciones Domiciliaria

App de presupuestos en terreno. Funciona sin señal y se instala en la pantalla
de inicio del celular como cualquier otra app.

---

## Cómo publicarla en GitHub Pages

### 1. Crear la cuenta y el repositorio

1. Entra a **github.com** y crea una cuenta si no tienes.
2. Arriba a la derecha, botón **+** → **New repository**.
3. Llénalo así:
   - **Repository name:** `presupuestos`
   - Marca **Public** (Pages gratis solo funciona con repositorios públicos)
   - **No** marques "Add a README file"
4. Botón **Create repository**.

### 2. Subir los archivos

1. En la página del repositorio vacío, haz clic en **uploading an existing file**.
2. Arrastra **todo el contenido** de esta carpeta. Importante: los archivos y las
   carpetas `icons` y `vendor`, no la carpeta que los contiene.
3. Abajo, botón verde **Commit changes**.

Al terminar, el repositorio debe verse así:

```
index.html
manifest.webmanifest
sw.js
LEEME.md
icons/
  icon-192.png
  icon-512.png
  icon-maskable-512.png
  apple-touch-icon.png
  favicon.png
vendor/
  html2canvas.min.js
  jspdf.umd.min.js
```

### 3. Encender GitHub Pages

1. Pestaña **Settings** (arriba, en el repositorio).
2. Menú izquierdo → **Pages**.
3. En **Branch**, elige `main` y carpeta `/ (root)`. Botón **Save**.
4. Espera uno o dos minutos y recarga. Va a aparecer la dirección:

```
https://TU-USUARIO.github.io/presupuestos/
```

Esa es la dirección de tu app. Guárdala.

### 4. Instalarla en el celular

**Android (Chrome):** abre la dirección → menú de tres puntos →
**Instalar aplicación** o **Agregar a pantalla principal**.

**iPhone (Safari):** abre la dirección → botón de compartir (el cuadrado con la
flecha) → **Agregar a pantalla de inicio**.

Queda con el logo, se abre a pantalla completa y funciona sin señal.

---

## Cosas importantes

**Cada dispositivo guarda sus propios datos.** El celular y el computador no se
sincronizan. Para pasar datos de uno a otro: en Ajustes → Respaldo →
**Descargar respaldo**, y en el otro dispositivo **Restaurar**.

**Haz respaldos.** Si borras los datos del navegador o desinstalas la app,
pierdes todo. Descarga el respaldo cada cierto tiempo y guárdalo en tu correo.

**El repositorio es público.** Cualquiera con la dirección puede abrir la app,
pero **no** puede ver tus presupuestos: esos quedan solo en tu teléfono, nunca
se suben a GitHub. Eso sí, no pongas datos privados dentro del código.

---

## Cuando quieras actualizar la app

1. Abre `sw.js` en GitHub y súbele el número a la línea:
   ```js
   const VERSION = 'v1';   →   const VERSION = 'v2';
   ```
2. Sube el `index.html` nuevo.

Si no cambias el `VERSION`, los teléfonos que ya la tienen instalada van a
seguir mostrando la versión vieja, porque usan la copia guardada.

---

## Detalles técnicos

- Un solo archivo `index.html`, sin compilación ni dependencias que instalar.
- `html2canvas` y `jsPDF` van incluidos en `vendor/` para generar el PDF sin
  necesidad de internet.
- Los datos se guardan en el almacenamiento del navegador del dispositivo.
