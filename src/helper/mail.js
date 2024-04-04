import google from '@googleapis/gmail'
import MailComposer from 'nodemailer/lib/mail-composer/index.js'
import {config} from 'dotenv'
config()

const credentialsObj={
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uris: [
            "http://localhost:5000/callback"
        ]
    }
const {client_id,client_secret,redirect_uris}=credentialsObj
const Oauth2Client=new google.auth.OAuth2(client_id,client_secret,redirect_uris[0])

Oauth2Client.setCredentials({refresh_token:process.env.GMAIL_REFRESH_TOKEN})
const gmail=google.gmail({
    version:'v1',
    auth:Oauth2Client
})

async function makebody({to,from,subject,body}){
    const obj = {
        to: to,
        from: `${from.name}<${from.email}>`,
        subject: subject,
        text: body,
        html: `<p>
        <h4>The entries that you have requested:<h4/>:
              ${body.replace(/\n/g,'<br>')}
        </p>`,
        textEncoding: 'base64',
    }
    const mailbody = new MailComposer(obj)
    const msg = await mailbody.compile().build()
    const raw = new Buffer.from(msg)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    return raw
}

export default async function mailSender(mailBody){
    const raw=await makebody(mailBody)
    
    const {data:{id}}=await gmail.users.messages.send({
        userId:"me",
        resource:{
            raw
        }
    })
    console.log(id)
}