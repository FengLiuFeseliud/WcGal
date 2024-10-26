import { useArticleStore } from "@/stores/ArticleStore";
import { AxiosUilt, type PageResponse, type Response } from "@/utils/AxiosUtils";
import type { UserInfo } from "./UserRequest";
import type { FavoriteItem } from "./FavoriteRequset"

interface Tag{
    tagId: number
    tagName: string
    tagCount: number
}

class TagData implements Tag {
    tagId: number
    tagName: string
    tagCount: number

    constructor(tagName: string){
        this.tagId = 0
        this.tagName = tagName
        this.tagCount = 0
    }
}

interface Article{
    articleId: number
    articleTitle: string
    articleAuthor: UserInfo
    articleContent: string
    cover: string
    tags: string
    tagsData: Tag[]
    createTime: string
    updateTime: string
    views: number
    likes: number
    favorites: number
    comments: number
    favoriteItems: FavoriteItem[]
}


class ArticleRequest{
    private static allTags: Tag[]

    public static async getArticle(articleId: number): Promise<Response<Article>>{
        return <Response<Article>><unknown>(await AxiosUilt.create().post("/galgame/" + articleId))
    }

    public static async getArticles(page: number, limit: number, desc: boolean, keyword?: string): Promise<PageResponse<Article[]> | null>{
        const key = keyword == null ? "": keyword.trimEnd()
        const data = <PageResponse<Article[]>><unknown>(await AxiosUilt.create().post(key != "" ? "/galgame/search" : "/galgame/list", {
            keyword: key,
            page: page,
            limit: limit,
            desc: desc != null ? desc : false
        }))

        if(keyword === undefined || keyword == ""){
            useArticleStore().setCount(data.count)
        }
        return data
    }

    public static async getCount(): Promise<number> {
        const data = await AxiosUilt.create().post("/galgame/count");
        if(data == null){
            return 0;
        }

        useArticleStore().setCount(data.data)
        return data.data == null ? 0: data.data
    }

    public static async getAllTags(): Promise<Tag[]> {
        if(ArticleRequest.allTags != null && ArticleRequest.allTags.length != 0){
            return ArticleRequest.allTags;
        }
        
        const data = await AxiosUilt.create().post("/galgame/tags/all")
        ArticleRequest.allTags = data != null ? data.data : {}
        useArticleStore().setTags(ArticleRequest.allTags)
        return ArticleRequest.allTags
    }

    public static async upload(articleId: number, text: string, title: string, cover: string, tags: Tag[], update: boolean){
        const tagNames: string[] = []
        tags.forEach(tag => {
            tagNames.push(tag.tagName)
        })
        
        return <Response<Article>><unknown>(await AxiosUilt.create().post("/galgame/" + (update ? "add": "update"), {
            articleId: articleId,
            articleTitle: title,
            articleContent: text,
            cover: cover,
            tags: tagNames
        }))
    }
}

export {ArticleRequest, TagData, type Tag, type Article}