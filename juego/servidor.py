
from flask import Flask, send_from_directory
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"

app = Flask(__name__)

ARCHIVOS_PERMITIDOS = {
    "style.css",
    "game.js",
    "inicio.jpg",
    "how.jpg",
    "libro.jpg"
}


@app.route("/")
def inicio():
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/static/<path:filename>")
def archivos_estaticos(filename):

    if filename not in ARCHIVOS_PERMITIDOS:
        return "Archivo no encontrado", 404

    if (STATIC_DIR / filename).is_file():
        return send_from_directory(STATIC_DIR, filename)

    if (BASE_DIR / filename).is_file():
        return send_from_directory(BASE_DIR, filename)

    return f"No se encontró {filename}", 404


if __name__ == "__main__":
    print("English Quest está iniciando...")
    print("Abrí http://127.0.0.1:5000")
    app.run(debug=True, port=5000)
