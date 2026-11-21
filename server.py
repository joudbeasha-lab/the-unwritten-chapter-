
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import webbrowser
import threading

HOST = "127.0.0.1"
PORT = 8000

def open_browser():
    webbrowser.open(f"http://{HOST}:{PORT}")

if __name__ == "__main__":
    server = ThreadingHTTPServer((HOST, PORT), SimpleHTTPRequestHandler)
    print(f"Project running at http://{HOST}:{PORT}")
    print("Keep this window open while using the project.")
    threading.Timer(1, open_browser).start()

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        server.server_close()
