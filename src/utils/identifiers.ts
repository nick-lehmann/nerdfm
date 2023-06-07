import { z } from 'zod'

/**
 * International standard code (ISRC) for uniquely identifying sound recordings and music video recordings.
 *
 * Source: https://en.wikipedia.org/wiki/International_Standard_Recording_Code
 */
export const InternationalStandardRecordingCode = z.string()
export type InternationalStandardRecordingCode = z.infer<typeof InternationalStandardRecordingCode>

/**
 * A standard describing a barcode symbology and numbering system used in global trade to identify a specific retail product type, in a specific packaging configuration, from a specific manufacturer.
 *
 * Short: EAN
 *
 * Source: https://en.wikipedia.org/wiki/International_Article_Number
 */
export const InternalArticleNumber = z.string()
export type InternalArticleNumber = z.infer<typeof InternalArticleNumber>

/**
 * The Universal Product Code (UPC or UPC code) is a barcode symbology that is widely used worldwide for tracking trade items in stores.
 *
 * Source: https://en.wikipedia.org/wiki/Universal_Product_Code
 */
export const UniversalProductCode = z.string()
export type UniversalProductCode = z.infer<typeof UniversalProductCode>

export const GlobalIdentifiers = z.object({
  isrc: InternationalStandardRecordingCode.nullable(),
  ean: InternalArticleNumber.nullable(),
  upc: UniversalProductCode.nullable(),
})
export type GlobalTrackIdentifiers = z.infer<typeof GlobalIdentifiers>
