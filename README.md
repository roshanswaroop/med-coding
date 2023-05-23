 # REMA ➕
 
<div>
<img src="https://img.shields.io/badge/%F0%9F%8E%89%20CS%20210%20Best%20Of-Clearest%20Value%20Proposition-brightgreen"/>
<img src="https://img.shields.io/badge/%F0%9F%8E%89%20CS%20210%20Best%20Of-Most%20Valuable%20Target%20Customer-blueviolet"/>
</div>
 
### AI Assistant to Automate Medical Coding

https://user-images.githubusercontent.com/66540748/225138370-22ac9320-ac45-478f-bcb0-367cab45ac22.mov


Read more through our [wiki](https://github.com/cs210/2023-Unusual-Ventures-1/wiki/REMA-Home)

## How it works

Our site takes in clinical notes as input, then prompts Open AI's GPT-4 model to identify the correct ICD-10 codes as well as cite its justifications. We verify all ICD-10 codes and their descriptions by cross-referencing output with the [CMS.gov database](https://www.cms.gov/Medicare/Coding/ICD10/2018-ICD-10-CM-and-GEMs). 

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

We would like to credit our landing page design and parts of frontend source code to this [starter project](https://github.com/Nutlope/twitterbio).
