import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'uploads/');
    },
    filename: (req, file, cd) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() *  1E9);
        cd(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

export default upload;
