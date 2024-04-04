export default function createMailMessage(datas){
    const messages=datas.map(data=>{
        return `
        \nID: ${data.sno}
        Name: ${data.name}
        Email: ${data.email}
        Phone Number: ${data.phone}
        Hobbies: ${data.hobbies.join(", ")}
        `
    }).join("\n")
    return messages
}