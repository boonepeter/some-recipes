import azure, { BlobService } from "azure-storage";
import { BlobServiceClient, newPipeline } from "@azure/storage-blob";
import Jimp from "jimp";
import getStream from "into-stream";

import * as dotenv from "dotenv";
dotenv.config();

const blobService = azure.createBlobService();



const resizeAndCrop = async (buffer: Buffer): Promise<Jimp|undefined> => {
    const image = await Jimp.read(buffer);
    if (image) {
        image.resize(Jimp.AUTO, 250);
        if (image.getWidth() > image.getHeight()) {
            image.crop(image.getWidth() / 4, 0, image.getHeight(), image.getHeight());
        }
        return image;
    }
    return undefined;
}

const uploadToBlob = async (image: Jimp, container: string, blob: string): Promise<string|undefined> => {
    const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
    const stream = getStream(buffer);
    blobService.createBlockBlobFromStream(container, blob, stream, buffer.length,
        function(error, result, response) {
            if (error) {
                return undefined;
            } else {
            }
        })
    return blobService.getUrl(container, blob);
}

export const saveRecipePicture = async (recipeId: string, containerName: string, buffer: Buffer): Promise<string|undefined> => {
    const blobName = `pics/recipes/${recipeId}/recipe.png`;
    const image = await resizeAndCrop(buffer);
    if (image) {
        return await uploadToBlob(image, containerName, blobName);
    }

}

export const saveProfilePicture = async (username: string, containerName: string, buffer: Buffer): Promise<string|undefined> => {
    const blobName = `pics/${username.toLowerCase()}/profile.png`;
    const image = await Jimp.read(buffer);
    if (image) {
        return await uploadToBlob(image, containerName, blobName);
    }
}

export const createBlob = async (containerName: string) => {
    /*
    const conString = process.env.AZURE_STORAGE_CONNECTION_STRING || "";
    const blobServiceClient = BlobServiceClient.fromConnectionString(conString);
    for await (const container of blobServiceClient.listContainers()) {
        console.log(`Container ${container.name}`);
    }*/
    console.log("creating service");
    var blobService = azure.createBlobService();
    console.log('2');
    blobService.createContainerIfNotExists(containerName, {
        publicAccessLevel: 'blob'
    }, function (error, result, response) {
        if (!error) {
            console.log('3');
            console.log(result);
        } else {
            console.log(error.message);
        }

    });

    console.log('adding file');
    blobService.createBlockBlobFromLocalFile(containerName, "text/text1.txt", "text.txt", 
        function (error, result, response) {
            if (!error) {
                console.log("uploaded");
                return "uploaded";
            } else {
                console.log(error.message);
            }
        }
    )
}