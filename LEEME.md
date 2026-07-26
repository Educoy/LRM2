# Presupuestos · LR Mantenciones Domiciliaria

App de presupuestos en terreno. Se instala en la pantalla de inicio del celular
y funciona sin señal.

---

## Qué subir

**Los 11 archivos van sueltos, en la raíz del repositorio. No hay carpetas.**

```
index.html
manifest.webmanifest
sw.js
html2canvas.min.js
jspdf.umd.min.js
icon-192.png
icon-512.png
icon-maskable-512.png
apple-touch-icon.png
favicon.png
LEEME.md
```

Si ya subiste una versión anterior, sube estos encima: los que se repiten se
reemplazan solos.

---

## Pasos

### 1. Subir los archivos

1. Entra a tu repositorio en GitHub.
2. Botón **Add file** → **Upload files**.
3. Selecciona los 11 archivos y arrástralos.
4. Abajo, botón verde **Commit changes**.

### 2. Encender GitHub Pages

Si aún no lo hiciste:

1. Pestaña **Settings**.
2. Menú izquierdo → **Pages**.
3. En **Branch** elige `main` y carpeta `/ (root)` → **Save**.
4. Espera uno o dos minutos y recarga la página. Va a aparecer tu dirección.

Con un repositorio llamado `LRM2` y usuario `Educoy`, la dirección queda:

```
https://educoy.github.io/LRM2/
```

### 3. Instalarla en el celular

**Android (Chrome):** abre la dirección → menú de tres puntos →
**Instalar aplicación**.

**iPhone (Safari):** abre la dirección → botón de compartir → **Agregar a
pantalla de inicio**.

---

## Cómo saber si quedó bien

Abre la dirección en el computador y revisa:

- **Se ve la app** con el fondo cuadriculado → `index.html` está bien.
- **Abre un presupuesto → Ver documento → Descargar PDF.** Si baja el PDF,
  las dos librerías están bien.
- **En el celular aparece la opción de instalar.** Si no aparece, falta alguno
  de los iconos o el `manifest.webmanifest`.

---

## Cosas importantes

**Cada dispositivo guarda sus propios datos.** El celular y el computador no se
sincronizan. Para pasar datos de uno a otro: Ajustes → Respaldo → **Descargar
respaldo**, y en el otro dispositivo **Restaurar**.

**Haz respaldos.** Si borras los datos del navegador o desinstalas la app,
pierdes todo. Guarda el respaldo en tu correo cada cierto tiempo.

**El repositorio es público, tus presupuestos no.** Los datos quedan solo en tu
teléfono, nunca se suben a GitHub. Cualquiera con la dirección puede abrir la
app vacía, nadie puede ver tu información.

---

## Cuando actualices la app

1. Abre `sw.js` en GitHub (clic en el archivo → ícono del lápiz).
2. Cambia el número de versión:
   ```js
   const VERSION = 'v5';   →   const VERSION = 'v6';
   ```
3. **Commit changes**.
4. Sube el `index.html` nuevo.

Si no cambias el `VERSION`, los teléfonos que ya tienen la app instalada van a
seguir mostrando la versión vieja, porque usan su copia guardada.

---

## Detalles técnicos

- Un solo `index.html` sin compilación ni dependencias que instalar.
- `html2canvas` y `jsPDF` van incluidos para generar el PDF sin internet. Si
  faltaran, la app los baja de un CDN mientras haya señal.
- Los datos se guardan en el almacenamiento del navegador del dispositivo.
- Todas las rutas son relativas, así que funciona en cualquier nombre de
  repositorio sin cambiar nada.
