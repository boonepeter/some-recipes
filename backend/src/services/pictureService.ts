import azure from "azure-storage";
import Jimp from "jimp";
import getStream from "into-stream";
import config from "../utils/config";


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
    const blobService = azure.createBlobService(config.AZURE_STORAGE_CONNECTION_STRING as string);
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