import { diskStorage } from "multer";

export const storage = diskStorage({
    destination: `./tmp`,
    filename: (req,file,cb) => {
        const extension = file.originalname.split('.').pop(); //pop toma el ultimo valor del array
        const filename = `${Date.now()}.${extension}`;
        cb(null, filename)
    }
});