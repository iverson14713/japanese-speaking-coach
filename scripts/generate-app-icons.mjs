import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

const sourceCandidates = [
  path.resolve(
    rootDir,
    '../.cursor/projects/c-Users-USER-JapaneseSpeakingCoach/assets/c__Users_USER_AppData_Roaming_Cursor_User_workspaceStorage_9f0f53e24b5e4d0b470448c6db2c8e37_images_ChatGPT_Image_2026_6_15____03_48_37-aab71196-0b16-4612-a832-2ca305baf6b0.png',
  ),
  path.resolve(rootDir, 'ios/App/App/Assets.xcassets/AppIcon.appiconset/icon-1024.png'),
]

const iosOutputDir = path.resolve(rootDir, 'ios/App/App/Assets.xcassets/AppIcon.appiconset')
const publicOutputDir = path.resolve(rootDir, 'public')

const IOS_ICON_SIZES = [
  { name: 'icon-20@2x.png', size: 40, idiom: 'iphone', scale: '2x', sizeLabel: '20x20' },
  { name: 'icon-20@3x.png', size: 60, idiom: 'iphone', scale: '3x', sizeLabel: '20x20' },
  { name: 'icon-29@2x.png', size: 58, idiom: 'iphone', scale: '2x', sizeLabel: '29x29' },
  { name: 'icon-29@3x.png', size: 87, idiom: 'iphone', scale: '3x', sizeLabel: '29x29' },
  { name: 'icon-40@2x.png', size: 80, idiom: 'iphone', scale: '2x', sizeLabel: '40x40' },
  { name: 'icon-40@3x.png', size: 120, idiom: 'iphone', scale: '3x', sizeLabel: '40x40' },
  { name: 'icon-60@2x.png', size: 120, idiom: 'iphone', scale: '2x', sizeLabel: '60x60' },
  { name: 'icon-60@3x.png', size: 180, idiom: 'iphone', scale: '3x', sizeLabel: '60x60' },
  { name: 'icon-20.png', size: 20, idiom: 'ipad', scale: '1x', sizeLabel: '20x20' },
  { name: 'icon-20@2x-ipad.png', size: 40, idiom: 'ipad', scale: '2x', sizeLabel: '20x20' },
  { name: 'icon-29.png', size: 29, idiom: 'ipad', scale: '1x', sizeLabel: '29x29' },
  { name: 'icon-29@2x-ipad.png', size: 58, idiom: 'ipad', scale: '2x', sizeLabel: '29x29' },
  { name: 'icon-40.png', size: 40, idiom: 'ipad', scale: '1x', sizeLabel: '40x40' },
  { name: 'icon-40@2x-ipad.png', size: 80, idiom: 'ipad', scale: '2x', sizeLabel: '40x40' },
  { name: 'icon-76.png', size: 76, idiom: 'ipad', scale: '1x', sizeLabel: '76x76' },
  { name: 'icon-76@2x.png', size: 152, idiom: 'ipad', scale: '2x', sizeLabel: '76x76' },
  { name: 'icon-83.5@2x.png', size: 167, idiom: 'ipad', scale: '2x', sizeLabel: '83.5x83.5' },
  { name: 'icon-1024.png', size: 1024, idiom: 'ios-marketing', scale: '1x', sizeLabel: '1024x1024' },
]

const PUBLIC_ICON_SIZES = [
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'favicon.png', size: 48 },
]

function lerp(a, b, t) {
  return Math.round(a + (b - a) * t)
}

function gradientColor(x, y, width, height) {
  const nx = x / (width - 1)
  const ny = y / (height - 1)

  const bottomLeft = [2, 32, 96]
  const bottomRight = [2, 55, 118]
  const topLeft = [1, 150, 175]
  const topRight = [1, 194, 193]

  const bottom = [
    lerp(bottomLeft[0], bottomRight[0], nx),
    lerp(bottomLeft[1], bottomRight[1], nx),
    lerp(bottomLeft[2], bottomRight[2], nx),
  ]
  const top = [
    lerp(topLeft[0], topRight[0], nx),
    lerp(topLeft[1], topRight[1], nx),
    lerp(topLeft[2], topRight[2], nx),
  ]

  const t = 1 - ny
  return [
    lerp(bottom[0], top[0], t),
    lerp(bottom[1], top[1], t),
    lerp(bottom[2], top[2], t),
  ]
}

async function createFullBleedMaster(inputPath) {
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  const output = Buffer.from(data)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const a = data[i + 3]

      const isCornerBlack = r + g + b < 20
      const isTransparent = a < 16

      if (isCornerBlack || isTransparent) {
        const [gr, gg, gb] = gradientColor(x, y, width, height)
        output[i] = gr
        output[i + 1] = gg
        output[i + 2] = gb
        output[i + 3] = 255
      } else {
        output[i + 3] = 255
      }
    }
  }

  return sharp(output, { raw: { width, height, channels: 4 } })
    .removeAlpha()
    .png({ compressionLevel: 9, force: true })
    .toBuffer()
}

async function writeOpaqueIcon(masterPng, outputPath, size) {
  await sharp(masterPng)
    .resize(size, size, {
      fit: 'cover',
      kernel: sharp.kernel.lanczos3,
    })
    .removeAlpha()
    .png({ compressionLevel: 9, force: true })
    .toFile(outputPath)

  const meta = await sharp(outputPath).metadata()
  if (meta.hasAlpha) {
    throw new Error(`${path.basename(outputPath)} still has alpha channel`)
  }
}

function buildContentsJson() {
  const images = IOS_ICON_SIZES.map((icon) => ({
    filename: icon.name,
    idiom: icon.idiom,
    scale: icon.scale,
    size: icon.sizeLabel,
  }))

  return {
    images,
    info: {
      author: 'xcode',
      version: 1,
    },
  }
}

function resolveSourceIcon() {
  for (const candidate of sourceCandidates) {
    if (fs.existsSync(candidate)) {
      return candidate
    }
  }

  throw new Error(`Source icon not found. Checked:\n${sourceCandidates.join('\n')}`)
}

async function main() {
  const sourceIcon = resolveSourceIcon()
  console.log(`Using source icon: ${sourceIcon}`)

  fs.mkdirSync(iosOutputDir, { recursive: true })
  fs.mkdirSync(publicOutputDir, { recursive: true })

  const masterPng = await createFullBleedMaster(sourceIcon)

  for (const icon of IOS_ICON_SIZES) {
    const outputPath = path.join(iosOutputDir, icon.name)
    await writeOpaqueIcon(masterPng, outputPath, icon.size)
  }

  for (const icon of PUBLIC_ICON_SIZES) {
    const outputPath = path.join(publicOutputDir, icon.name)
    await writeOpaqueIcon(masterPng, outputPath, icon.size)
  }

  fs.writeFileSync(path.join(iosOutputDir, 'Contents.json'), `${JSON.stringify(buildContentsJson(), null, 2)}\n`)

  console.log(`Generated ${IOS_ICON_SIZES.length} iOS icons in ${iosOutputDir}`)
  console.log(`Generated ${PUBLIC_ICON_SIZES.length} PWA icons in ${publicOutputDir}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
