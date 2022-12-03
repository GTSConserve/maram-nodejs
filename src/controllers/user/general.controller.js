import { add_feedback, get_AppSettings } from '../../models/user/general.model';

    export const getAppSetting = async (req, res) => {
      try{

        const settings = await get_AppSettings()

        let appSettingData = {}
        for (const settingData of settings.body){
            appSettingData[settingData.key] = settingData.value;
            
        }
        res.status(200).json({ status: true,data: appSettingData }) 
       
        res.status(200).json({ status: true,data: settings.body }) 
      }
      catch (error) {
       
        res.status(500).json({ status: false,error }) 
      }
      }

      export const addFeedback = async (req,res) => {
        
        try{
          const date = new Date();
          let day = date.getDate();
          let month = date.getMonth() + 1;
          let year = date.getFullYear();
         let currentDate = `${year}-${month}-${day}`;
        console.log(currentDate); 
          
          const {user_id,comments,message_id,created_at} = req.body
          const feedback = await add_feedback (user_id,comments,message_id,currentDate)
         
            res.status(200).json({ status: true,message:"successs" })
          
        }
        catch(error){
          res.status(500).json({ status: false,error }) 
        }
      }