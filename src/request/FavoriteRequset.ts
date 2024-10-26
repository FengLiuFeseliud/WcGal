import { AxiosUilt, type PageResponse } from "@/utils/AxiosUtils"
import { type Response } from "@/utils/AxiosUtils"
import type { UserInfo } from "./UserRequest"
import type { Article } from "./ArticleRequest"


interface Favorite {
    favoriteId: number
    favoriteName: string
    favoriteDescribe: string
    favoritePublic: boolean
    size: number
    cover: string
    inLike: boolean
    createUser: UserInfo
    createTime: string
    updateTime: string
}


interface FavoriteItem {
    favoriteId: number
    favoriteUserId: number
    resourceId: string
    article: Article
    createTime: string
}


class FavoriteRequset {
    public static async getFavorite(favoriteId: number): Promise<Response<Favorite> | null>{
        return <Response<Favorite>><unknown>(await AxiosUilt.create().post("/favorite/" + favoriteId))
    }

    public static async getMyFavorites(): Promise<Response<Favorite[]> | null>{
        return <Response<Favorite[]>><unknown>(await AxiosUilt.create().post("/favorite/my"))
    }

    public static async getFavoriteItems(favoriteId: number, page: number, limit: number, desc: boolean): Promise<PageResponse<FavoriteItem[]> | null>{
        return <PageResponse<FavoriteItem[]>><unknown>(await AxiosUilt.create().post("/favorite/list/" + favoriteId, {
            page: page,
            limit: limit,
            desc: desc,
        }))
    }

    public static async createFavorite(favoriteName: string, favoritePublic: boolean, 
        cover?: string, favoriteDescribe?: string): Promise<Response<Favorite> | null>{

        return <Response<Favorite>><unknown>(await AxiosUilt.create().post("/favorite/create", {
            favoriteName: favoriteName,
            favoritePublic: favoritePublic,
            cover: cover,
            favoriteDescribe: favoriteDescribe,
        }))
    }

    public static async addFavoriteItem(favoriteIds: number[], resourceId: string): Promise<Response<null>>{
        return <Response<null>><unknown>(await AxiosUilt.create().post("/favorite/add", {
            favoriteIds: favoriteIds,
            resourceId: resourceId
        }))
    }

    public static async delFavoriteItem(favoriteIds: number[], resourceId: string): Promise<Response<null>>{
        return <Response<null>><unknown>(await AxiosUilt.create().post("/favorite/del", {
            favoriteIds: favoriteIds,
            resourceId: resourceId
        }))
    }

    public static async like(resourceId: string, like: boolean): Promise<Response<null>>{
        return <Response<null>><unknown>(await AxiosUilt.create().post("/favorite/" + (like ? "like": "unlike") + "/" + resourceId))
    }
}

export { FavoriteRequset, type FavoriteItem, type Favorite }