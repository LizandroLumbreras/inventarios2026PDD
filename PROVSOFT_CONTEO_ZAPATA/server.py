from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os
import webbrowser
import threading

HOST = '127.0.0.1'
PORT = 8000
BASE_DIR = Path(__file__).resolve().parent
os.chdir(BASE_DIR)

class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == '__main__':
    url = f'http://{HOST}:{PORT}/'
    print('=' * 58)
    print(' PROVSOFT - CONTEO INVENTARIO ZAPATA')
    print('=' * 58)
    print(f' Carpeta : {BASE_DIR}')
    print(f' URL     : {url}')
    print(' Cerrar  : Ctrl+C')
    print('=' * 58)

    threading.Timer(1.0, lambda: webbrowser.open(url)).start()
    try:
        ThreadingHTTPServer((HOST, PORT), NoCacheHandler).serve_forever()
    except KeyboardInterrupt:
        print('\nServidor cerrado.')
