import {PDFDocument, StandardFonts, rgb, PDFTextField} from 'pdf-lib'
import {readFileSync} from "fs";
import path from 'path'
import downloadjs from "downloadjs";
import { promisify } from 'util';
import stream from 'stream';


export default async (req, res) => {

    const pt_name = req.body['pt_name']
    const pt_street = req.body['pt_street']
    const pt_city = req.body['pt_city']
    const pt_state = req.body['pt_state']
    const pt_zip = req.body['pt_zip']
    const pt_phone = req.body['pt_phone']
    const birth_mm = req.body['birth_mm']
    const birth_dd = req.body['birth_dd']
    const birth_yy = req.body['birth_yy']


    const pdfDoc = await PDFDocument.load(readFileSync(path.join(process.cwd(), '/public/pdf/cms1500.pdf')));
    const form = pdfDoc.getForm()
    const fields = form.getFields()

    form.getTextField('pt_street').setText(pt_street)
    form.getTextField('pt_name').setText(pt_name)
    form.getTextField('pt_city').setText(pt_city)
    form.getTextField('pt_state').setText(pt_state)
    form.getTextField('pt_zip').setText(pt_zip)
    form.getTextField('pt_phone').setText(pt_phone)
    form.getTextField('birth_mm').setText(birth_mm)
    form.getTextField('birth_dd').setText(birth_dd)
    form.getTextField('birth_yy').setText(birth_yy)


    let counter = 0
    for(let code of req.body['codes']){
        counter++
        let varname = 'diagnosis' + counter.toString()
        form.getTextField(varname).setText(req.body['codes'][counter - 1])
    }


    const pdfBytes = await pdfDoc.save()
     res.setHeader('Content-Type', 'application/pdf')
     return res.end(pdfBytes)

};

export const config = {
    api: {responseLimit: false},
};
