const express = require("express");
const router = express.Router();

const path = require("path");

const {
 extractExcelData,
} = require(
 "../services/excelService"
);

router.post(
 "/extract",
 async (req,res)=>{

  try{

   const { fileName } =
   req.body;

   const filePath =
   path.join(
     __dirname,
     "../../uploads",
     fileName
   );

   const data =
   extractExcelData(
    filePath
   );

   res.json({
    success:true,
    data,
   });

  }catch(error){

   console.error(error);

   res.status(500).json({
    success:false,
   });

  }

 });

module.exports = router;