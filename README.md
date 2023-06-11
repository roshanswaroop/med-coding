 # REMA ➕
 
<div>
<img src="https://img.shields.io/badge/%F0%9F%8E%89%20CS%20210%20Best%20Of-Clearest%20Value%20Proposition-brightgreen"/>
<img src="https://img.shields.io/badge/%F0%9F%8E%89%20CS%20210%20Best%20Of-Most%20Valuable%20Target%20Customer-blueviolet"/>
 Now supporting OpenEMR integration! 🎉
</div>
 
### AI Assistant to Automate Medical Coding
<img width="1726" alt="Screen Shot 2023-05-31 at 10 07 07 PM" src="https://github.com/cs210/2023-Unusual-Ventures-1/assets/66540748/5862a0ff-a897-4c3c-a8b7-2b4c262df451">

https://github.com/cs210/2023-Unusual-Ventures-1/assets/66540748/02eba8de-71d3-4df6-a145-757a104d933d


Read more through our [wiki](https://github.com/cs210/2023-Unusual-Ventures-1/wiki/REMA-Home)

## How it works

We offer an automated medical coding solution that takes in clinical notes and patient information as input, then prompts Open AI's GPT-4 model to identify the correct ICD-10 codes as well as cite its justifications. We verify all ICD-10 codes and their descriptions by cross-referencing output with the [CMS.gov database](https://www.cms.gov/Medicare/Coding/ICD10/2018-ICD-10-CM-and-GEMs). We then generate a CMS1500 claims form based on the information. 

We currently support OpenEMR integration so that you can effortlessly generate codes and CMS1500 forms using data directly from your EHR and no manual input. 

## Running Locally

After cloning the repo, save your Open AI API key in the .env file. 

To run the application, ensure that Vercel is installed. Create a vercel account on vercel.com if one doesn't already exist. Rename 2023-Unusual-Ventures-1 using `mv 2023-Unusual-Ventures-1 rema` so that the repo name is compatible with Vercel's standards. 

Then, run the application in the command line, authenticate with your credentials, and it will be available at `http://localhost:3000`.

```bash
npm run dev
```
## COMING SOON
hosted website :D


## Credits

We would like to credit parts of frontend source code to this [starter project](https://github.com/Nutlope/twitterbio).
