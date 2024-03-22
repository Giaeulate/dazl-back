/// <reference types="node" />
export declare class ImageProcessor {
    processImage(image: Buffer): Promise<{
        thumbnail: Buffer;
        small: Buffer;
    }>;
}
