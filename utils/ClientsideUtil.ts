import {NextApiRequest} from "next";
import requestIp from "request-ip";

export const getIP = (req: NextApiRequest): string | undefined => {
    const cfIP = req.headers['cf-connecting-ip'] as string
    if (cfIP) {
        console.log("cloudflare: ", cfIP)
        return cfIP
    }
    return requestIp.getClientIp(req) as string
}