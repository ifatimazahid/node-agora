//***** Modules goes here *****//
var _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const Joi = require('joi');
var _ = require("lodash");
const { placeData } = require('../../Models/places.model');
const { visitplaceData } = require('../../Models/visitPlaces.model');
const auth = require('../../middleware/auth');
//***** ///// *****//

//***** Express Router to export in module *****//
const app = express();
//***** ///// *****//

//***** Post Request for Login *****//
app.get('/', auth, async(req, res)=> {
 const MyPlace = await getPlaceByUser(req);   
 let placeId = _.map(MyPlace, "_placeId");
 let allPlaces= await getAllPlaces(placeId);

 var success = {
    success:true,
    msg:'Places Found',
    data:allPlaces
};
res.send(success);

});
 
//***** ///// *****//
async function getPlaceByUser(body) {
    const myPlace = await visitplaceData
      .find()
      .and([{ _userId: body.user._id }])
      .sort({ visitingNo: -1 });
    return myPlace;
  }
  async function getAllPlaces(body) {
    const allPlaces = await placeData.find({
      _id: {
        $in: body
      }
    });
    return allPlaces;
  }

module.exports = app;