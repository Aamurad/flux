import {z} from 'zod'
import * as fs from "fs";


// This is the Zod validation schema, you define
// all the validation logic in here, then run
// the validation during the request lifecycle.
// If you prefer to use your own way of validating the 
// incoming data, you can use it.
const Body = z.object({})

export default async (req: import('next').NextApiRequest, res: import('next').NextApiResponse) => {
    try {
        // This will throw when the validation fails
        const body = req.body

        console.log(body)
        // Write the new matrix to public/pricing.json
        fs.writeFileSync("public/pricing.json", JSON.stringify(body, null, 2));
        res.statusCode = 200
        res.json(body)
    } catch (e) {
        console.error(e)
        // if(e) {
        // Handle the validation error and return a proper response

        // return
        // }

        res.statusCode = 500
        res.json({error: 'Unknown Error'})
    }
}