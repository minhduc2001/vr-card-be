const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const QRCode = require('qrcode');
const puppeteer = require('puppeteer');

class HandleHtml {
  readFile(fileName) {
    const pathFile = path.join(__dirname, '../public', fileName);
    const data = fs.readFileSync(pathFile, 'utf-8');
    return data.toString();
  }

  async putData(user) {
    let qrcode = await QRCode.toDataURL(user.id);
    const source = this.readFile('card.html');
    const template = handlebars.compile(source);
    const tmp = user._doc;
    tmp.name = tmp.name?.toLocaleUpperCase();
    const result = template({ ...tmp, qrcode });

    return result;
  }

  async exportToImg(user) {
    const date = new Date().getTime();
    const pathFile = path.join(
      __dirname,
      `../public/images/${date}_${user.id}.png`,
    );

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`http://localhost:3000/api/users/test/${user.id}`, {
      waitUntil: 'networkidle0',
    });

    await page.setViewport({ width: 420, height: 245 });

    const screenshot = await page.screenshot({
      type: '',
      path: pathFile,
      fullPage: true,
    });

    require('fs').writeFileSync(pathFile, screenshot);
    await browser.close();
    const urlHost = 'https://ae54-123-17-150-73.ngrok-free.app';
    return {
      urlHost: urlHost + `/public/images/${date}_${user.id}.png`,
      url: `/public/images/${date}_${user.id}.png`,
    };
  }
}

module.exports = new HandleHtml();