import multer ,{diskStorage} from "multer"

const storage = diskStorage({
  destination:  (req, file, cb) => {
    cb(null, './src/storage/images/')
  },
  filename: (req, file, cb) => {
    console.log(file)
    const uniqueSuffix = Date.now() + '-'+ file.originalname
    cb(null, `${file.fieldname}-${uniqueSuffix}`)
  }
})

export const upload = multer({ storage })