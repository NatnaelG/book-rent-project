import { NextApiRequest, NextApiResponse } from "next";

export function GET(req: NextApiRequest, res: NextApiResponse) {
    return Response.json({ message: 'Hello from Next.js!' })
}

export function POST(req: NextApiRequest, res: NextApiResponse) {
    return Response.json({ message: 'Hello from Next.js!' })
}
