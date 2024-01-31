// ES6+ example
import {
  RekognitionClient,
  DetectFacesCommand,
  DetectModerationLabelsCommand,
  DetectModerationLabelsCommandOutput,
} from '@aws-sdk/client-rekognition';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DetectFacesCommandOutput } from '@aws-sdk/client-rekognition/dist-types/commands';

@Injectable()
export class Rekognition {
  private readonly client: RekognitionClient;

  constructor(private configService: ConfigService) {
    this.client = new RekognitionClient({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID_REK'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY_REK'),
      },
      maxAttempts: 3,
    });
  }

  async run(file: Buffer, facesFlag: boolean, expliciteContent: boolean) {
    let faces: DetectFacesCommandOutput;
    let strongContent: DetectModerationLabelsCommandOutput;
    try {
      const command = new DetectFacesCommand({
        Image: {
          Bytes: new Uint8Array(file),
        },
        Attributes: ['ALL'],
      });
      const command2 = new DetectModerationLabelsCommand({
        Image: {
          Bytes: new Uint8Array(file),
        },
        MinConfidence: 50,
      });
      faces = await this.client.send(command);
      strongContent = await this.client.send(command2);
      console.log('Faces:', faces);
      console.log(faces.FaceDetails);
      console.log(strongContent);

      // process data.
    } catch (error) {
      console.log(error);
      throw new NotFoundException('No se pudo procesar la imagen.');
    }
    if (facesFlag) {
      this.ensureAreTheFaces(faces);
    }
    if (expliciteContent) {
      this.ensureNotStrongContent(strongContent);
    }
  }

  private ensureAreTheFaces(faces: DetectFacesCommandOutput) {
    if (faces.FaceDetails.length === 0) {
      throw new NotFoundException(
        'Debes enviar una foto donde se vea al menos un rostro.',
      );
    }
  }

  private ensureNotStrongContent(
    strongContent: DetectModerationLabelsCommandOutput,
  ) {
    const parentLabels = [
      'Explicit Nudity',
      'Violence',
      'Visually Disturbing',
      'Drugs',
      'Hate Symbols',
    ];
    const confidence = 95;
    const labels = strongContent.ModerationLabels.filter(
      (label) =>
        label.ParentName &&
        parentLabels.includes(label.ParentName) &&
        label.Confidence > confidence,
    );
    if (labels.length > 0) {
      throw new NotFoundException(
        'No puedes enviar imágenes con contenido explícito.',
      );
    }
  }
}
