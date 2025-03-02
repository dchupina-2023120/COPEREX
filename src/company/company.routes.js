import express from "express";
import { createEmpresa, updateEmpresa,getEmpresasSortedAZ,getEmpresasSortedZA } from "../company/company.controller.js";


const router = express.Router();

router.post("/",  createEmpresa);
router.put("/:id",  updateEmpresa);
router.get("/ordenadas-az", getEmpresasSortedAZ);
router.get("/ordenadas-za", getEmpresasSortedZA);
export default router;
