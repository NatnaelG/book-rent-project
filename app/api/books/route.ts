import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export function GET(req: NextRequest, res: NextApiResponse) {
    return res.json({ message: 'Hello from Next.js!' })
}

export function POST(req: NextRequest, res: NextApiResponse) {
    return res.json({ message: 'Hello from Next.js!' })
}
