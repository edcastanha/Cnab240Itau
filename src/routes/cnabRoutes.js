
const express = require('express');
const router = express.Router();
const cnabService = require('../services/cnabService');

router.post('/generate', async (req, res) => {
  try {
    // console.log('Request body:', req.body); // Log the request body for debugging
    if (!req.body || !req.body.empresa || !req.body.pagamentos) {
      return res.status(400).json({ error: 'Invalid request body' });
    }
    // Validate the request body
    const { empresa, pagamentos } = req.body;
    // console.log('Empresa:', empresa);
    // console.log('Pagamentos:', pagamentos);
    
    const remessaContent = await cnabService.generateRemessaFile(empresa, pagamentos);
    
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', 'attachment; filename=remessa.rem');
    res.send(remessaContent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
