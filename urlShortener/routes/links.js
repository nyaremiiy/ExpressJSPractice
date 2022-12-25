const express = require('express');
const router = express.Router();
const shortid = require('shortid');

const Link = require('../models/link');

router.post('/short', async (req, res) => {
  const link = req.body.link;
  console.log('Link: ', link);
  try {
    let url = await Link.findOne({source : link});

    if(url) {
      return res.json(url);
    }

    const code = shortid.generate();
    const shortUrl = `localhost:3000/links/${code}`;
    url = new Link({
      code,
      source : link,
      short : shortUrl
    });

    await url.save();

    return res.json(url);
  } catch (error) {
    return res.status(500).json({status : 500, message : JSON.stringify(error)});
  }
});

router.get('/:code', async (req, res) => {
  const code = req.params.code;
  
  const link = await Link.findOne({code});

  if(link) {
    return res.redirect(link.source);
  }

  return res.status(404).json({status : 404, message : 'Link not found'});
});

module.exports = router;