import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class ImageProcessor {
  async processImage(
    image: Buffer,
  ): Promise<{ thumbnail: Buffer; small: Buffer }> {
    // Comprimir la imagen a un tamaño menor
    const compressedImage = (await sharp(image)
      .toFormat('jpeg')
      .toBuffer()) as Buffer;

    // Reducir la imagen a 800px de ancho
    const thumbnailImage = (await sharp(compressedImage)
      .toFormat('jpeg')

      .resize({ width: 800 })
      .toBuffer()) as Buffer;

    // Reducir la imagen a 200px de ancho
    const smallImage = (await sharp(compressedImage)
      .toFormat('jpeg')

      .resize({ width: 200 })
      .toBuffer()) as Buffer;

    // Retornar un objeto con las imágenes resultantes
    return { thumbnail: thumbnailImage, small: smallImage };
  }
}
