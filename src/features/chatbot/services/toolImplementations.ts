import { registerTool, executeToolCall } from './toolRouter'
import { searchListings, getListingById, getCategoriesWithCounts, getSellerInfo } from './marketplaceSearch'
import { logger } from './logger'

export function registerPhase2Tools(): void {
  registerTool({
    name: 'searchListings',
    description: 'Search marketplace listings with filters for category, price range, location, and keywords',
    execute: async (params, _role) => {
      try {
        const categories = params.categories as string[] | undefined
        const minPrice = params.minPrice as number | undefined
        const maxPrice = params.maxPrice as number | undefined
        const location = params.location as string | undefined
        const query = params.query as string | undefined

        const results = await searchListings({
          categories,
          minPrice,
          maxPrice,
          location,
          query,
          status: 'active',
          sort: 'newest',
          limit: 12,
          page: 1,
        })
        return {
          toolName: 'searchListings',
          success: true,
          data: { listings: results.listings, count: results.total },
        }
      } catch (err) {
        return {
          toolName: 'searchListings',
          success: false,
          error: err instanceof Error ? err.message : 'Search failed',
        }
      }
    },
  })

  registerTool({
    name: 'getListingDetails',
    description: 'Get detailed information about a specific listing by ID',
    execute: async (params, _role) => {
      try {
        const id = params.listingId as string
        const listing = await getListingById(id)
        if (!listing) {
          return { toolName: 'getListingDetails', success: false, error: 'Listing not found' }
        }
        return { toolName: 'getListingDetails', success: true, data: listing }
      } catch (err) {
        return {
          toolName: 'getListingDetails',
          success: false,
          error: err instanceof Error ? err.message : 'Failed to get listing',
        }
      }
    },
  })

  registerTool({
    name: 'getCategories',
    description: 'Get all available marketplace categories with active listing counts',
    execute: async (_params, _role) => {
      try {
        const cats = await getCategoriesWithCounts()
        return { toolName: 'getCategories', success: true, data: { categories: cats } }
      } catch (err) {
        return {
          toolName: 'getCategories',
          success: false,
          error: err instanceof Error ? err.message : 'Failed to get categories',
        }
      }
    },
  })

  registerTool({
    name: 'getSellerInfo',
    description: 'Get public information about a seller by ID',
    execute: async (params, _role) => {
      try {
        const sellerId = params.sellerId as string
        const seller = await getSellerInfo(sellerId)
        if (!seller) {
          return { toolName: 'getSellerInfo', success: false, error: 'Seller not found' }
        }
        return { toolName: 'getSellerInfo', success: true, data: seller }
      } catch (err) {
        return {
          toolName: 'getSellerInfo',
          success: false,
          error: err instanceof Error ? err.message : 'Failed to get seller info',
        }
      }
    },
  })

  logger.info('phase2_tools_registered', { details: { count: 4 } })
}

export { executeToolCall }