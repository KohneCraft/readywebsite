# PWA Icons

Bu klasöre aşağıdaki boyutlarda PWA ikonları ekleyin:

## Gerekli İkon Boyutları

- `icon-72x72.png` (72x72 piksel)
- `icon-96x96.png` (96x96 piksel)
- `icon-128x128.png` (128x128 piksel)
- `icon-144x144.png` (144x144 piksel)
- `icon-152x152.png` (152x152 piksel)
- `icon-180x180.png` (180x180 piksel - Apple Touch Icon)
- `icon-192x192.png` (192x192 piksel) ⭐ **Zorunlu**
- `icon-384x384.png` (384x384 piksel)
- `icon-512x512.png` (512x512 piksel) ⭐ **Zorunlu**

## İkon Oluşturma Araçları

İkonlarınızı oluşturmak için şu araçları kullanabilirsiniz:

1. [Real Favicon Generator](https://realfavicongenerator.net/)
2. [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator)
3. [Favicon.io](https://favicon.io/)

## Öneriler

- Şeffaf arka planlı PNG dosyaları kullanın
- Maskable icon için safe zone'u göz önünde bulundurun
- Logo/marka renklerinizi kullanın

## Örnek SVG'den PNG Oluşturma

```bash
# ImageMagick ile (Terminal)
convert logo.svg -resize 192x192 icon-192x192.png
convert logo.svg -resize 512x512 icon-512x512.png
```
