import os
from bs4 import BeautifulSoup

def test_index_html_exists():
    assert os.path.isfile('website/index.html'), "index.html tidak ditemukan!"

def test_index_html_not_empty():
    with open('website/index.html', 'r') as f:
        contents = f.read().strip()
        assert len(contents) > 0, "index.html kosong!"

def test_index_html_title():
    with open('website/index.html', 'r') as f:
        soup = BeautifulSoup(f, 'html.parser')
        title = soup.title.string
        expected_title = "DevOps Portfolio - Hafidz A"
        assert title == expected_title, f"Title salah! Harusnya '{expected_title}', tetapi mendapatkan '{title}'."


#if __name__ == "__main__":
 #   test_index_html_exists()
 #  test_index_html_not_empty()
 #   test_index_html_title()
 #   print("Semua tes berhasil!")