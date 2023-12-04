const Tagihan = require('../models/tagihan_models');

module.exports = {
    //C
    store: async (req, res) => {
        try {
         const tagihan = await Tagihan.create(req.body)
         res.status(200).json({
           status : true,
           data : tagihan,
           method : req.method,
           url : req.url,
           message : "Data has been successfully added!"
         })
        } catch (error) {
         res.status(400).json({error})
         
        }
    },
    show: async (req, res) => {
      try {
        const tagihan = await Tagihan.findById(req.params.id)
        res.json({
          status: true,
          data: tagihan,
          method: req.method,  
          url: req.url,
          message: "Data successfully obtained"
        })
      } catch (error) {
        res.status(400).json({success : false, message: error})
        
      }
    
    },

    //R
    index: async (req, res) => {
      try {
        const tagihan = await Tagihan.find();
        if (tagihan.length > 0) {
          res.status(200).json({
            status: true,
            data: tagihan,
            method: req.method,
            url: req.url
          });
        } else {
          res.status(404).json({ success: false, message: 'No Data' });
        }
      } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    },

    showPaid: async (req, res) => {
      try {
        const tagihan = await Tagihan.findOne({status: 'Paid'})
        if(tagihan){
          res.json({
            status: true,
            data: tagihan,
            method: req.method,  
            url: req.url,
            message: "Data successfully obtained"
          })
        } else {
          res.json({
            status: false,
            message: "Data not found for status: Paid"
          });
        }
      } catch (error) {
        res.status(400).json({error})
        
      }
    },

    showPending: async (req, res) => {
      try {
        const tagihan = await Tagihan.findOne({status: 'Pending'})
        if(tagihan){
          res.json({
            status: true,
            data: tagihan,
            method: req.method,  
            url: req.url,
            message: "Data successfully obtained"
          })
        } else {
          res.json({
            status: false,
            message: "Data not found for status: Pending"
          });
        }
      } catch (error) {
        res.status(400).json({error})
        
      }
    },

    //U
    update: async (req, res) => {
      try {
        const allowedFields = ['tagihan', 'nominal_tagihan', 'deposit', 'status'];
        const updates = {};

        const disallowedFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));
    
    if (disallowedFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot update the following fields: ${disallowedFields.join(', ')}`,
      });
    }
    
        for (const field of allowedFields) {
          if (req.body[field] !== undefined) {
            updates[field] = req.body[field];
          }
        }
    
        const tagihan = await Tagihan.findByIdAndUpdate(req.params.id, updates, {
          new: true,
          runValidators: true,
        });
    
        if (!tagihan) {
          return res.status(404).json({ success: false, message: 'Data not found' });
        }
        
        res.json({
          status: true,
          data: tagihan,
          method: req.method,
          url: req.url,
          message: 'Data successfully updated',
        });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
    },

    //D
    delete: async (req, res) => {
      try {
        await Tagihan.findByIdAndDelete(req.params.id)
        res.json({
          status: true,
          method: req.method,
          url: req.url,
          message: "Data successfully deleted"
        })
      } catch (error) {
        res.status(400).json({success: false})
      }
    },
}