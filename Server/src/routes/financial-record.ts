import express, { Request, Response } from "express";
import FinancialRecordModel from "../schema/financial_schema";

const router = express.Router();

router.get('/',async(req: Request, res: Response): Promise<void> =>{
  try {
    const data=await FinancialRecordModel.find();
    // if(data.length==0){
    //   res.status(200).json({
    //     status:'succees',
    //     message:'no record found',
    //     length:0
    //   })
    //   return;
    // }
    res.status(200).json({
      status:'succees',
        message:'these record found',
        length:data.length,
        data
    })

  } catch (error) {
    res.status(500).json(error);
    
  }
})

router.get("/getAllByUserID/:userId", 
  async (req: Request, res: Response): Promise<void> => {
  try {
    // const userId = req.params.userId;
    const {userID}=req.params
    const records = await FinancialRecordModel.find({ userID });
    if (records.length === 0) {
      res.status(404).send("No records found for the user.");
      return;
    }
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", 
  async (req: Request, res: Response) : Promise<void>=> {
  try {
    const newRecordBody = req.body;
    const newRecord = new FinancialRecordModel(newRecordBody);
    const savedRecord = await newRecord.save();

    res.status(200).json(savedRecord);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", 
  async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const newRecordBody = req.body;
    const record = await FinancialRecordModel.findByIdAndUpdate(
      id,
      newRecordBody,
      { new: true ,runValidators: true}
    );

    if (!record){
      res.status(404).send();
      return; 
    }

    res.status(200).json(record);
  } catch (err) { 
     res.status(500).json(err);
  }
});

router.delete("/:id", 
  async (req: Request, res: Response) : Promise<void>=> {
  try {
    const id = req.params.id;
    const record = await FinancialRecordModel.findByIdAndDelete(id);
    if (!record){
      res.status(404).send();
    return;
    }
     res.status(200).json(record);
  } catch (err) {
     res.status(500).json(err);
  }
});

export default router;
