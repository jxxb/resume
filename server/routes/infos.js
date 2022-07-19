var express = require('express');
var router = express.Router();
var SeqGen = require('./sequenceGenerator');
var Info = require('../models/info');

router.get('/',(req,res,next) => {
   Info.find()
   // .populate('group')
   .then(infos => {
         res.status(200).json({
         message: 'Informations fetched successfully!',
         infos: infos
      });
   })
   .catch(error => {
      res.status(500).json({
         message: 'An error occurred',
         error: error
      });
   });
});

router.get('/:id',(req,res,next) => {
   Info.findOne({
      "id": req.params.id
   })
   // .populate('group')
   .then(info => {
         res.status(200).json({
         message: 'Information fetched successfully!',
         info: info
      })
   })
   .catch(error=>{
         res.status(500).json({
         message:'An error occurred',
         error:error
      })
   })
})

module.exports = router; 