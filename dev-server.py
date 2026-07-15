"""Yerel gelistirme sunucusu — HTTP Range destekli.

python -m http.server Range istegi desteklemez; video scrub (currentTime seek)
Chrome'da Range olmadan takilir. Bu sunucu 206 Partial Content dondurur.

Kullanim:  python dev-server.py [port]   (varsayilan 8099)
"""
import os
import re
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class RangeHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            return super().send_head()
        rng = self.headers.get("Range")
        if not rng:
            return super().send_head()
        m = re.match(r"bytes=(\d*)-(\d*)", rng)
        if not m:
            return super().send_head()
        try:
            f = open(path, "rb")
        except OSError:
            self.send_error(404, "File not found")
            return None
        size = os.fstat(f.fileno()).st_size
        start = int(m.group(1)) if m.group(1) else 0
        end = int(m.group(2)) if m.group(2) else size - 1
        end = min(end, size - 1)
        if start > end or start >= size:
            f.close()
            self.send_error(416, "Requested Range Not Satisfiable")
            return None
        self.send_response(206)
        self.send_header("Content-Type", self.guess_type(path))
        self.send_header("Accept-Ranges", "bytes")
        self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
        self.send_header("Content-Length", str(end - start + 1))
        self.end_headers()
        f.seek(start)
        self._range_remaining = end - start + 1
        return f

    def copyfile(self, source, outputfile):
        remaining = getattr(self, "_range_remaining", None)
        if remaining is None:
            return super().copyfile(source, outputfile)
        self._range_remaining = None
        while remaining > 0:
            chunk = source.read(min(64 * 1024, remaining))
            if not chunk:
                break
            outputfile.write(chunk)
            remaining -= len(chunk)

    def end_headers(self):
        if not any(h.lower() == "accept-ranges" for h in self._headers_buffer_keys()):
            self.send_header("Accept-Ranges", "bytes")
        super().end_headers()

    def _headers_buffer_keys(self):
        try:
            return [
                line.decode("latin-1").split(":")[0]
                for line in self._headers_buffer
                if b":" in line
            ]
        except Exception:
            return []


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8099
    handler = partial(RangeHandler, directory=os.path.dirname(os.path.abspath(__file__)))
    print(f"Range destekli sunucu: http://127.0.0.1:{port}")
    ThreadingHTTPServer(("127.0.0.1", port), handler).serve_forever()
