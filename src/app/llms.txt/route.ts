import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export function GET(): NextResponse {
  const filePath: string = path.join(process.cwd(), 'public', 'llms.txt')
  const content: string = fs.readFileSync(filePath, 'utf-8')

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
