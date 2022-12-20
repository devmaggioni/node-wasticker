
# NODE-WASTICKER
## Crie stickers e os receba diretamente no whatsapp

Esse app usa o framework <a href="https://github.com/adiwajshing/Baileys">Baileys</a> para se conectar com o whatsapp e enviar o sticker.
Ao iniciar o app pela primeira vez você precisará escanear o QR Code gerado e conectar com o seu WhatsApp.
Você pode gerar stickers webp tanto por URLs, como arquivos em seu computador.

1. Faça Download dos apps necessários:
- Download <a href="https://play.google.com/store/apps/details?id=com.termux">Termux</a>
- Download <a href="https://play.google.com/store/apps/details?id=com.foxdebug.acodefree">Acode</a>

2. Configure o Termux: 

```
yes "yes" | pkg update && yes "yes" | pkg upgrade
yes "yes" | pkg install nodejs
yes "yes" | pkg install yarn
yes "yes" | pkg install git
termux-setup-storage
am start -a android.intent.action.VIEW -d "content://com.android.externalstorage.documents/root/primary"
```

3. Instalando o app:

```
git clone https://github.com/devmaggioni/node-wasticker
cd node-wasticker
npm run config
npm i
npm start
```