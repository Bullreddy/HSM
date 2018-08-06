import Authentication from '../controllers/authentication';
import Donations from '../controllers/donations';

const router = require('express').Router();

router.get('/', (req, res)=>{
    res.send('connected');
})

router.get('/userProfile', (req, res)=>{
    res.send(req.user);
})

router.post('/userProfile', Authentication.updateProfile)
router.get('/getdonationbystudent',Donations.getdonationbystudent )
router.post('/adddonation',Donations.addDonation)
router.put('/updatedonation',Donations.updateDonation)
router.delete('/deletedonation',Donations.deleteDonation)


router.get('/getdonations',Donations.getStudentList )
export default router;