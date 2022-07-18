var express = require('express');
var router = express.Router();
var SequenceGenerator = require('./sequenceGenerator');
var Entry = require('../models/entry');

router.get('/',(req,res,next) => {
   Entry.find()
   // .populate('group')
   .then(entries => {
         res.status(200).json({
         message: 'Entries fetched successfully!',
         entries: entries
      });
   })
   // .catch(error => {
   //    res.status(500).json({
   //       message: 'An error occurred',
   //       error: error
   //    });
   // });
});

router.get('/:id',(req,res,next) => {
   Entry.findOne({
      "id": req.params.id
   })
   // .populate('group')
   .then(entry => {
         res.status(200).json({
         message: 'Entry fetched successfully!',
         entry: entry
      })
   })
   .catch(error=>{
         res.status(500).json({
         message:'An error occurred',
         error:error
      })
   })
})

router.post('/', (req,res,next)=>{
   const newEntryId=SequenceGenerator.nextId("entries");
   const entry = new entry({
      id: newEntryId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      imageUrl: req.body.imageUrl,
      group: req.body.group
   });

   entry
   .save()
   .then((createdEntry)=>{
      res.status(201)
      .json({
         message: 'entry added successfully!',
         entry:createdEntry
      });

   }) 
   .catch(error=>{
      res.status(500).json({
         message:'An error occurred',
         error:error
      })
   })
})

router.put('/:id', (req, res, next) => {
   entry.findOne({ id: req.params.id })
   .then(entry => {
      entry.name = req.body.name;
      entry.email = req.body.email;
      entry.phone = req.body.phone;
      entry.imageUrl = req.body.imageUrl;
      entry.group = req.body.group;

      Entry.updateOne({ id: req.params.id }, entry)
         .then(result => {
            res.status(204).json({
            message: 'entry updated successfully'
         })
         })
         .catch(error => {
            res.status(500).json({
            message: 'An error occurred',
            error: error
         });
         });
   })
   .catch(error => {
         res.status(500).json({
         message: 'Entry not found.',
         error: { entry: 'Entry not found'}
      });
   });
});


router.delete("/:id", (req, res, next) => {
   Entry.findOne({ id: req.params.id })
   .then(entry => {
      Entry.deleteOne({ id: req.params.id })
         .then(result => {
            res.status(204).json({
            message: "Entry deleted successfully"
         });
         })
         .catch(error => {
            res.status(500).json({
            message: 'An error occurred',
            error: error
         });
         });
   })
   .catch(error => {
         res.status(500).json({
         message: 'entry not found.',
         error: { entry: 'entry not found'}
      });
   });
});

module.exports = router; 