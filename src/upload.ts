import {unlinkSync, createWriteStream} from "fs"

const storeFS = ({ stream, filename }: any) => {
    const uploadDir = '../backend/photos';
    const path = `${uploadDir}/${filename}`;
    return new Promise((resolve, reject) =>
        stream
            .on('error',( error : any )=> {
                if (stream.truncated)
                    // delete the truncated file
                    unlinkSync(path);
                reject(error);
            })
            .pipe(createWriteStream(path))
            .on('error', (error:any) => reject(error))
            .on('finish', () => resolve({ path }))
    );
}

export const addPhoto = async (args:any) => {
    //const { description, tags } = args;
    const { filename, mimetype, createReadStream } = await args.file;
    const stream = createReadStream();
    const pathObj = await storeFS({ stream, filename });
    
    console.log(pathObj)
}