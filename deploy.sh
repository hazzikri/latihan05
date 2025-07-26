#!/bin/bash

# Instalasi Nginx
sudo apt update
sudo apt install -y nginx

# Konfigurasi Nginx
sudo cp /tmp/nginx.conf /etc/nginx/sites-available/website
sudo ln -sf /etc/nginx/sites-available/website /etc/nginx/sites-enabled/
sudo nginx -s reload

# Siapkan direktori
sudo mkdir -p /var/www/html/
sudo chown -R $USER:$USER /var/www/html/

# <!-- updated from GitHub --> baris dari local
# <!-- updated from GitHub -->
#perubahan dari web

# update dari feature B

