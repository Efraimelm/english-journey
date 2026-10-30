// Gera os ícones PNG do PWA (fundo verde-escuro + trilha de pontos verde-menta).
// Uso: node scripts/make-icons.mjs
import { writeFileSync } from 'node:fs'
import { deflateSync } from 'node:zlib'

const BG = [0x14, 0x25, 0x1f]
const MINT = [0x65, 0xd6, 0xa1]
const DEEP = [0x24, 0x48, 0x3b]

// Pontos da "jornada" em coordenadas normalizadas (0..1): x, y, raio, cor
const dots = [
  [0.3, 0.7, 0.07, DEEP],
  [0.5, 0.5, 0.095, DEEP],
  [0.7, 0.3, 0.13, MINT],
]

function pixel(x, y) {
  for (let i = dots.length - 1; i >= 0; i--) {
    const [cx, cy, r, c] = dots[i]
    if ((x - cx) ** 2 + (y - cy) ** 2 <= r * r) return c
  }
  return BG
}

function crc32(buf) {
  let c, crc = 0xffffffff
  for (let n = 0; n < buf.length; n++) {
    c = (crc ^ buf[n]) & 0xff
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    crc = (crc >>> 8) ^ c
  }
  return (crc ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length)
  const td = Buffer.concat([Buffer.from(type), data])
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td))
  return Buffer.concat([len, td, crc])
}

function png(size) {
  const ss = 4 // supersampling para bordas suaves
  const raw = Buffer.alloc(size * (size * 3 + 1))
  for (let y = 0; y < size; y++) {
    raw[y * (size * 3 + 1)] = 0
    for (let x = 0; x < size; x++) {
      let r = 0, g = 0, b = 0
      for (let sy = 0; sy < ss; sy++) for (let sx = 0; sx < ss; sx++) {
        const c = pixel((x + (sx + 0.5) / ss) / size, (y + (sy + 0.5) / ss) / size)
        r += c[0]; g += c[1]; b += c[2]
      }
      const o = y * (size * 3 + 1) + 1 + x * 3
      raw[o] = r / ss / ss; raw[o + 1] = g / ss / ss; raw[o + 2] = b / ss / ss
    }
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

writeFileSync('public/icon-192.png', png(192))
writeFileSync('public/icon-512.png', png(512))
writeFileSync('public/apple-touch-icon.png', png(180))

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="#14251F"/>${dots
  .map(([x, y, r, c]) => `<circle cx="${x * 100}" cy="${y * 100}" r="${r * 100}" fill="rgb(${c.join(',')})"/>`)
  .join('')}</svg>`
writeFileSync('public/icon.svg', svg)
console.log('ícones gerados')
