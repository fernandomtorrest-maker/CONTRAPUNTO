import sys
from PIL import Image

def remove_bg_and_watermark(input_path, output_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()
        
        # 1. Remover fondo gris oscuro
        newData = []
        for item in datas:
            # Si el color es cercano al fondo gris original (alrededor de 45, 45, 45)
            if 30 <= item[0] <= 60 and 30 <= item[1] <= 60 and 30 <= item[2] <= 60:
                newData.append((255, 255, 255, 0)) # 100% transparente
            else:
                newData.append(item)
        img.putdata(newData)
        
        # 2. Recortar la caja delimitadora (autocrop) para eliminar el aire invisible de los lados
        bbox = img.getbbox()
        if not bbox:
            print("No se encontró caja delimitadora.")
            return
            
        img_cropped = img.crop(bbox)
        
        # 3. Remover el diamante de agua (marca en la esquina inferior derecha)
        # Cargamos los píxeles de la imagen recortada
        width, height = img_cropped.size
        pixels = img_cropped.load()
        
        # La marca de agua (diamante) está en la esquina inferior derecha.
        # Vamos a escanear esa región (los últimos 80 píxeles de ancho y alto) y remover cualquier objeto
        # haciéndolo transparente.
        for x in range(width - 90, width):
            for y in range(height - 90, height):
                r, g, b, a = pixels[x, y]
                # Si el píxel tiene color y no es completamente transparente
                # (la marca del diamante es de color crema/blanco opaco)
                if a > 0:
                    # Lo hacemos totalmente transparente
                    pixels[x, y] = (255, 255, 255, 0)
        
        # 4. Hacemos un segundo autocrop rápido por si la eliminación del diamante dejó espacio libre abajo
        final_bbox = img_cropped.getbbox()
        if final_bbox:
            img_final = img_cropped.crop(final_bbox)
        else:
            img_final = img_cropped
            
        img_final.save(output_path, "PNG")
        print(f"Éxito: Fondo y diamante removidos. Tamaño final: {img_final.size}")
        
    except Exception as e:
        print(f"Error procesando la imagen: {e}")

if __name__ == "__main__":
    remove_bg_and_watermark(
        "/home/daniel/contrapunto/Gemini_Generated_Image_.png",
        "/home/daniel/contrapunto/contrapunto-web/public/logo.png"
    )
