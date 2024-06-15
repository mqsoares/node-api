import { Router } from "express";
import ProductController from "../controller/ProductController.js";
import { verifyJwt } from "../helpers/manager-jwt.js";
import imageUpload from "../helpers/image-upload.js";

const router = Router();

router.post("/", verifyJwt, imageUpload.array("images"), ProductController.create);
router.get("/", ProductController.index);

router.get("/showProductBy/:id", verifyJwt, ProductController.showProductById);

router.get("/showUserProducts", verifyJwt, ProductController.showUserProducts);

router.get("/showRecieverProducts", verifyJwt, ProductController.showRecieverProducts);

router.put("/:id", verifyJwt, imageUpload.array("images"), ProductController.update);

router.delete("/:id", verifyJwt, ProductController.delete);

router.patch("/schedule/:id", verifyJwt, ProductController.schedule);

router.patch("/concludeDonation/:id", verifyJwt, ProductController.concludeDonation);

// Define uma rota GET para "/:id" que chama o método show do ProductController para exibir os detalhes de um produto específico com base no ID fornecido.
router.get("/:id", ProductController.show);




export default router;