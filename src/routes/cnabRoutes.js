
const express = require('express');
const router = express.Router();
const cnabService = require('../services/cnabService');

router.post('/generate', async (req, res) => {
  try {
    const { empresa, pagamentos } = req.body;
    const remessaContent = await cnabService.generateRemessaFile(empresa, pagamentos);
    
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', 'attachment; filename=remessa.rem');
    res.send(remessaContent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
