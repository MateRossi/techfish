import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'uploads/');
    },
    filename: (req, file, cd) => {
        const especieId = req.params.especieId;
        const userId = req.params.userId;
        const uniqueSuffix = `usr${userId}esp${especieId}`;
        cd(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

export default upload;
