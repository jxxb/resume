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
   .catch(error => {
      res.status(500).json({
         message: 'An error occurred',
         error: error
      });
   });
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
   const entry = new Entry({
      id: newEntryId,
      title: req.body.title,
      company: req.body.company,
      date: req.body.date,
      location: req.body.location,
      category: req.body.category,
      imageUrl: req.body.imageUrl,
      link: req.body.link,
      actions: req.body.actions
   });
   entry
   .save()
   .then((createdEntry)=>{
      res.status(201)
      .json({
         message: 'Entry added successfully!',
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
   Entry.findOne({ id: req.params.id })
   .then(entry => {
      entry.title = req.body.title;
      entry.company = req.body.company;
      entry.date = req.body.date;
      entry.location = req.body.location;
      entry.category = req.body.category;
      entry.imageUrl = req.body.imageUrl;
      entry.link = req.body.link;
      entry.actions = req.body.actions

      Entry.updateOne({ id: req.params.id }, entry)
         .then(result => {
            res.status(204).json({
            message: 'entry updated successfully'
         })
         })
         // .catch(error => {
         //    res.status(500).json({
         //    message: 'An error occurred',
         //    error: error
         // });
         // });
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