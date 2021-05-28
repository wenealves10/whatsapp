#!/bin/bash
if [ -f ./puppeteer/link.json ]; then
  ls ./puppeteer
else
  echo '{
    "linkGeraPerson": "https://www.4devs.com.br/gerador_de_pessoas",
    "linkDownloadMusic": "https://yt1s.com/youtube-to-mp3/pt",
    "linkDownloadVideo": "https://yt1s.com/pt1"
  }' >./puppeteer/link.json
fi
